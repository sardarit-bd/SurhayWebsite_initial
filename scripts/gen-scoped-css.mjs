/* ---------------------------------------------------------------------------
   Scoped <style>-Bloecke der Astro-Komponenten zu echten CSS-Dateien machen.

   EINMALIG, NICHT IM BUILD. Erzeugt src/styles/components/*.css; danach sind
   diese Dateien die Quelle. Das Skript bleibt liegen, damit die Umschreibung
   nachvollziehbar und wiederholbar ist.

   WAS ASTRO MACHTE (gemessen an dist/_astro/*.css der eingefrorenen Referenz)
   Jede Komponente bekam eine Kennung `data-astro-cid-xxxxxxxx`, die an JEDES
   Compound eines Selektors gehaengt wurde — nicht nur an das rechte:
       .cf-two > .cf-field .cf-input
     → .cf-two[cid] > .cf-field[cid] .cf-input[cid]
   Teile in `:global(...)` blieben ungeschuetzt und wurden entpackt:
       :global(header.menu-open) .brand-main
     → header.menu-open .brand-main[cid]
   Pseudo-Klassen und -Elemente stehen HINTER der Kennung:
       .cf-input:focus  →  .cf-input[cid]:focus

   WARUM NICHT EINFACHER (Nachkommen-Scoping `[data-c-x] .a .b`)
   Weil das die Spezifitaet aendert: Astro macht aus `.a .b` (0,2,0) eine
   (0,4,0), Nachkommen-Scoping nur (0,3,0). Wo eine scoped Regel mit einer
   anderen um dieselbe Eigenschaft streitet, koennte die Entscheidung kippen —
   und genau das soll diese Migration nicht tun.

   `@keyframes` bleibt unberuehrt: `from`/`to`/`50%` sind keine Selektoren.
--------------------------------------------------------------------------- */
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { join, dirname, basename } from 'node:path';
import { fileURLToPath } from 'node:url';
import { glob } from 'node:fs/promises';

const wurzel = join(dirname(fileURLToPath(import.meta.url)), '..');
const ziel = join(wurzel, 'src/styles/components');

/** Selektorliste an Kommas der obersten Ebene teilen (Klammern beachten). */
function teileListe(s) {
  const teile = [];
  let tief = 0, klammer = 0, akt = '';
  for (const ch of s) {
    if (ch === '(') tief++;
    else if (ch === ')') tief--;
    else if (ch === '[') klammer++;
    else if (ch === ']') klammer--;
    if (ch === ',' && tief === 0 && klammer === 0) { teile.push(akt); akt = ''; continue; }
    akt += ch;
  }
  if (akt.trim()) teile.push(akt);
  return teile;
}

/** Einen Selektor in Compounds + Kombinatoren zerlegen. */
function zerlege(sel) {
  const stuecke = [];
  let tief = 0, klammer = 0, akt = '';
  const schiebe = () => { if (akt.trim()) stuecke.push({ art: 'compound', text: akt.trim() }); akt = ''; };
  for (let i = 0; i < sel.length; i++) {
    const ch = sel[i];
    if (ch === '(') tief++;
    else if (ch === ')') tief--;
    else if (ch === '[') klammer++;
    else if (ch === ']') klammer--;
    if (tief === 0 && klammer === 0) {
      if (ch === '>' || ch === '+' || ch === '~') { schiebe(); stuecke.push({ art: 'komb', text: ch }); continue; }
      if (/\s/.test(ch)) { schiebe(); stuecke.push({ art: 'leer', text: ' ' }); continue; }
    }
    akt += ch;
  }
  schiebe();
  // aufeinanderfolgende Leerzeichen/Kombinatoren zusammenfassen
  const sauber = [];
  for (const st of stuecke) {
    const letzt = sauber[sauber.length - 1];
    if (st.art !== 'compound' && letzt && letzt.art !== 'compound') {
      if (st.art === 'komb') letzt.art = 'komb', letzt.text = st.text;
      continue;
    }
    sauber.push({ ...st });
  }
  while (sauber.length && sauber[0].art !== 'compound') sauber.shift();
  while (sauber.length && sauber[sauber.length - 1].art !== 'compound') sauber.pop();
  return sauber;
}

/** Kennung in ein Compound einsetzen: vor der ersten Pseudo-Angabe. */
function scopeCompound(text, attr) {
  // Vollstaendig global -> entpacken, nicht scopen
  const nurGlobal = /^:global\((.*)\)$/.exec(text);
  if (nurGlobal) return nurGlobal[1];
  // :global(...) innerhalb entpacken (bleibt dann Teil des Compounds)
  const entpackt = text.replace(/:global\(([^)]*)\)/g, '$1');
  // Position der ersten Pseudo-Angabe auf oberster Ebene finden
  let tief = 0, klammer = 0, pos = -1;
  for (let i = 0; i < entpackt.length; i++) {
    const ch = entpackt[i];
    if (ch === '(') tief++;
    else if (ch === ')') tief--;
    else if (ch === '[') klammer++;
    else if (ch === ']') klammer--;
    else if (ch === ':' && tief === 0 && klammer === 0) { pos = i; break; }
  }
  return pos === -1 ? entpackt + attr : entpackt.slice(0, pos) + attr + entpackt.slice(pos);
}

function scopeSelektor(sel, attr) {
  return teileListe(sel)
    .map((einzel) =>
      zerlege(einzel)
        .map((st) => (st.art === 'compound' ? scopeCompound(st.text, attr) : st.art === 'komb' ? ` ${st.text} ` : ' '))
        .join('')
        .replace(/\s+/g, ' ')
        .trim()
    )
    .join(',\n');
}

/**
 * CSS zeichenweise durchlaufen und jede Selektorzeile umschreiben.
 * Innerhalb von @keyframes wird nichts angefasst.
 */
function scopeCss(css, attr) {
  let out = '';
  let i = 0;
  let puffer = '';                 // gesammelter Text vor einer '{'
  const keyframeTiefe = [];        // Stack: true = innerhalb @keyframes

  const inKeyframes = () => keyframeTiefe.includes(true);

  while (i < css.length) {
    // Kommentare unveraendert durchlassen
    if (css.startsWith('/*', i)) {
      const e = css.indexOf('*/', i + 2);
      const ende = e === -1 ? css.length : e + 2;
      puffer += css.slice(i, ende);
      i = ende;
      continue;
    }
    const ch = css[i];
    if (ch === '{') {
      const kopf = puffer;
      const getrimmt = kopf.trim();
      // Praeludium (Kommentare/Leerzeilen) vom eigentlichen Kopf trennen
      const m = /^([\s\S]*?)([^\s\/][^]*?)$/.exec(kopf);
      let vorspann = '', selektor = getrimmt;
      const idx = kopf.lastIndexOf('*/');
      if (idx !== -1) { vorspann = kopf.slice(0, idx + 2); selektor = kopf.slice(idx + 2).trim(); }
      else {
        const nl = kopf.search(/\S/);
        vorspann = nl === -1 ? kopf : kopf.slice(0, nl);
        selektor = kopf.slice(vorspann.length).trimEnd();
      }
      const einzug = /(^|\n)([ \t]*)$/.exec(vorspann)?.[2] ?? '';

      const istAt = selektor.startsWith('@');
      const istKeyframes = /^@(-\w+-)?keyframes\b/.test(selektor);
      if (istAt || inKeyframes()) {
        out += vorspann + selektor + '{';
        keyframeTiefe.push(istKeyframes || (inKeyframes() && !istAt));
      } else {
        const neu = scopeSelektor(selektor, attr).replace(/,\n/g, ',\n' + einzug);
        out += vorspann + neu + ' {';
        keyframeTiefe.push(false);
      }
      puffer = '';
      i++;
      continue;
    }
    if (ch === '}') {
      out += puffer + '}';
      puffer = '';
      keyframeTiefe.pop();
      i++;
      continue;
    }
    puffer += ch;
    i++;
  }
  return out + puffer;
}

/** Aus einem Astro-Pfad den CSS-Dateinamen und die Kennung bilden. */
const kebab = (s) => s.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();

const dateien = [];
for await (const p of glob(join(wurzel, 'src/**/*.astro'))) dateien.push(p);
dateien.sort();

await mkdir(ziel, { recursive: true });
const erzeugt = [];

for (const pfad of dateien) {
  const quelle = await readFile(pfad, 'utf8');
  const bloecke = [...quelle.matchAll(/<style>\n([\s\S]*?)\n<\/style>/g)].map((m) => m[1]);
  if (!bloecke.length) continue;

  const komponente = kebab(basename(pfad, '.astro'));
  const attr = `[data-c-${komponente}]`;
  const relativ = pfad.slice(wurzel.length + 1);

  const kopf =
    `/* Aus ${relativ} (Astro-Fassung), <style>-Block.\n` +
    `   Die Regeln sind unveraendert; hinzugekommen ist nur die Bereichskennung\n` +
    `   ${attr} an jedem Compound — dieselbe Umschreibung, die Astro mit\n` +
    `   data-astro-cid-* vornahm. Erzeugt von scripts/gen-scoped-css.mjs.\n` +
    `   Die Komponente setzt ${attr.slice(1, -1)}="" an jedes eigene Element. */\n\n`;

  const koerper = bloecke.map((b) => scopeCss(b, attr)).join('\n\n');
  await writeFile(join(ziel, `${komponente}.css`), kopf + koerper.trim() + '\n');
  erzeugt.push(komponente);
}

// Sammel-Datei, die die Wurzel-Layouts einmal einbinden
const index =
  `/* Alle Bauteil-Styles, die unter Astro in <style>-Bloecken standen.\n` +
  `   Einmal aus dem Wurzel-Layout eingebunden — Astro haengte sie pro Seite\n` +
  `   an; Next buendelt sie selbst. Angewandt wird dasselbe. */\n\n` +
  erzeugt.map((n) => `@import './components/${n}.css';`).join('\n') + '\n';
await writeFile(join(wurzel, 'src/styles/components.css'), index);

console.log(`${erzeugt.length} CSS-Dateien erzeugt:`);
for (const n of erzeugt) console.log(`  ${n}.css`);
