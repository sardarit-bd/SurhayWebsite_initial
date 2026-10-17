/* ---------------------------------------------------------------------------
   Vorlagen-Teil einer .astro-Datei nach JSX umschreiben.

   Der mechanische Teil der Migration, und der umfangreichste: 872 class=,
   147 style="…", 32 class:list, 11 set:html, dazu die HTML-Attribute, die
   React anders schreibt. Von Hand ueber 15.000 Zeilen waere das langsamer und
   uneinheitlicher — und ein vergessenes `class=` faellt beim Bauen nicht auf,
   es rendert nur ohne Stil.

   Der Frontmatter-Teil wird NICHT angefasst: er ist kurz und braucht
   Entscheidungen (welche Eigenschaft kommt herein, welcher Astro-Zugriff wird
   was). Den schreibt der Mensch.

   Aufruf:  node scripts/astro-template-to-jsx.mjs <datei.astro>
   Ausgabe: das umgeschriebene JSX auf stdout, Hinweise auf stderr.
--------------------------------------------------------------------------- */
import { readFile } from 'node:fs/promises';

const UMBENENNUNG = {
  'class': 'className',
  'for': 'htmlFor',
  'tabindex': 'tabIndex',
  'autocomplete': 'autoComplete',
  'datetime': 'dateTime',
  'inputmode': 'inputMode',
  'spellcheck': 'spellCheck',
  'charset': 'charSet',
  'http-equiv': 'httpEquiv',
  'stroke-width': 'strokeWidth',
  'stroke-linecap': 'strokeLinecap',
  'stroke-linejoin': 'strokeLinejoin',
  'stroke-dasharray': 'strokeDasharray',
  'stroke-dashoffset': 'strokeDashoffset',
  'stroke-opacity': 'strokeOpacity',
  'fill-rule': 'fillRule',
  'clip-rule': 'clipRule',
  'fill-opacity': 'fillOpacity',
  'stop-color': 'stopColor',
  'stop-opacity': 'stopOpacity',
  'text-anchor': 'textAnchor',
  'clip-path': 'clipPath',
  'vector-effect': 'vectorEffect',
  'maxlength': 'maxLength',
  'minlength': 'minLength',
  'readonly': 'readOnly',
  'colspan': 'colSpan',
  'rowspan': 'rowSpan',
  'srcset': 'srcSet',
  'novalidate': 'noValidate',
  'enctype': 'encType',
  'crossorigin': 'crossOrigin',
  'referrerpolicy': 'referrerPolicy',
  'hreflang': 'hrefLang',
  'onsubmit': 'onSubmit',
  'fetchpriority': 'fetchPriority',
};

/* Attribute, die React als Zahl typisiert. Als Zeichenkette funktionieren sie
   zur Laufzeit auch, aber der Typcheck (npm run check) meldet sie — und ein
   Typcheck, der 16 Falschmeldungen enthaelt, wird nicht mehr gelesen. */
const NUMERISCH = new Set(['tabIndex', 'rows', 'cols', 'span', 'start', 'maxLength', 'minLength', 'colSpan', 'rowSpan', 'size']);

const VOID = new Set(['img','br','hr','input','meta','link','source','area','base','col','embed','param','track','wbr']);

const hinweise = [];

/** Attributwert ab Position lesen (String, {Ausdruck} oder blank). */
function leseWert(s, i) {
  if (s[i] === '"' || s[i] === "'") {
    const q = s[i];
    const e = s.indexOf(q, i + 1);
    return { roh: s.slice(i, e + 1), inhalt: s.slice(i + 1, e), art: 'string', ende: e + 1 };
  }
  if (s[i] === '{') {
    let tief = 0, j = i;
    for (; j < s.length; j++) {
      /* Kommentare zuerst: ein JSX-Kommentar enthaelt Prosa, und Prosa
         enthaelt Anfuehrungszeichen. Wuerde das Zeichen ' oder " darin als
         String-Anfang gelten, uebersprang der Parser den halben Rest der
         Datei — genau das passierte in Header.astro, wo ein Kommentar im
         Attributbereich das Wort "Menue-Widget" in geraden
         Anfuehrungszeichen enthielt. */
      if (s.startsWith('/*', j)) {
        const e = s.indexOf('*/', j + 2);
        j = e === -1 ? s.length : e + 1;
        continue;
      }
      if (s.startsWith('//', j)) {
        const e = s.indexOf('\n', j);
        j = e === -1 ? s.length : e;
        continue;
      }
      if (s[j] === '{') tief++;
      else if (s[j] === '}') { tief--; if (tief === 0) break; }
      else if (s[j] === '`' || s[j] === '"' || s[j] === "'") {
        const q = s[j]; j++;
        while (j < s.length && s[j] !== q) { if (s[j] === '\\') j++; j++; }
      }
    }
    return { roh: s.slice(i, j + 1), inhalt: s.slice(i + 1, j), art: 'ausdruck', ende: j + 1 };
  }
  return { roh: '', inhalt: '', art: 'leer', ende: i };
}

/** Einen oeffnenden Tag umschreiben. */
function tagUmschreiben(quelle, start) {
  // start zeigt auf '<'
  const nameM = /^<([A-Za-z][\w.-]*)/.exec(quelle.slice(start));
  if (!nameM) return null;
  const tag = nameM[1];
  let i = start + nameM[0].length;
  const attrs = [];
  let selbstSchliessend = false;

  while (i < quelle.length) {
    // Whitespace
    const ws = /^\s*/.exec(quelle.slice(i))[0];
    i += ws.length;
    if (quelle[i] === '>') { i++; break; }
    if (quelle.startsWith('/>', i)) { selbstSchliessend = true; i += 2; break; }
    // Spread {...x}
    if (quelle.startsWith('{', i)) {
      const w = leseWert(quelle, i);
      attrs.push({ art: 'spread', roh: w.roh });
      i = w.ende;
      continue;
    }
    const nm = /^([A-Za-z_@][\w:.-]*)/.exec(quelle.slice(i));
    if (!nm) { i++; continue; }
    const name = nm[1];
    i += name.length;
    const ws2 = /^\s*/.exec(quelle.slice(i))[0];
    if (quelle[i + ws2.length] === '=') {
      i += ws2.length + 1;
      i += /^\s*/.exec(quelle.slice(i))[0].length;
      const w = leseWert(quelle, i);
      attrs.push({ art: 'paar', name, wert: w });
      i = w.ende;
    } else {
      attrs.push({ art: 'blank', name });
    }
  }

  const raus = [];
  for (const a of attrs) {
    if (a.art === 'spread') {
      /* Ein JSX-Kommentar im Attributbereich, also {/* … *\/}, ist in TSX kein
         gueltiges Attribut — ein einfacher Blockkommentar ohne Klammern schon.
         Der Text bleibt an seiner Stelle, direkt am erklaerten Attribut. */
      const k = /^\{\s*(\/\*[\s\S]*?\*\/)\s*\}$/.exec(a.roh);
      raus.push(k ? k[1] : a.roh);
      continue;
    }
    if (a.art === 'blank') {
      const n = a.name;
      if (n === 'selected') { hinweise.push(`<${tag} selected> → defaultValue am <select> setzen`); continue; }
      /* Ein blankes data-Attribut ergibt in React `true` und damit
         data-reveal="true" — Astro schrieb data-reveal, also den leeren Wert.
         Im DOM sind data-reveal und data-reveal="" dasselbe, data-reveal="true"
         nicht. Echte HTML-Boolean-Attribute (hidden, disabled, required …)
         behandelt React von sich aus richtig und gibt hidden="" aus. */
      if (n.startsWith('data-')) { raus.push(`${n}=""`); continue; }
      raus.push(UMBENENNUNG[n] ?? n);
      continue;
    }
    let { name, wert } = a;

    // class:list -> className={clsx(...)}
    if (name === 'class:list') {
      raus.push(`className={clsx(${wert.art === 'ausdruck' ? wert.inhalt : JSON.stringify(wert.inhalt)})}`);
      continue;
    }
    // set:html -> dangerouslySetInnerHTML
    if (name === 'set:html') {
      raus.push(`dangerouslySetInnerHTML={{ __html: ${wert.art === 'ausdruck' ? wert.inhalt : JSON.stringify(wert.inhalt)} }}`);
      continue;
    }
    if (name === 'set:text') {
      hinweise.push(`<${tag} set:text> → als Kind ausgeben`);
      raus.push(`/* set:text */`);
      continue;
    }
    // style als Zeichenkette -> css('...')
    if (name === 'style') {
      if (wert.art === 'string') {
        raus.push(`style={css(${JSON.stringify(wert.inhalt)})}`);
      } else {
        const inner = wert.inhalt.trim();
        // Template-Literal oder Ausdruck: durch css() schicken
        raus.push(`style={css(${inner})}`);
      }
      continue;
    }
    // Formularfelder: unkontrolliert halten, sonst uebernimmt React die Kontrolle
    if (name === 'value' && (tag === 'input' || tag === 'textarea')) {
      hinweise.push(`<${tag} value> → defaultValue (sonst controlled input)`);
      name = 'defaultValue';
    }
    if (name === 'checked' && tag === 'input') {
      hinweise.push(`<input checked> → defaultChecked (sonst controlled input)`);
      name = 'defaultChecked';
    }
    const neu = UMBENENNUNG[name] ?? name;
    if (wert.art === 'string') {
      if (NUMERISCH.has(neu) && /^-?\d+$/.test(wert.inhalt.trim())) raus.push(`${neu}={${wert.inhalt.trim()}}`);
      else raus.push(`${neu}=${JSON.stringify(wert.inhalt)}`);
    } else raus.push(`${neu}=${wert.roh}`);
  }

  const attrText = raus.length ? ' ' + raus.join(' ') : '';
  const schluss = selbstSchliessend || VOID.has(tag) ? ' />' : '>';
  return { text: `<${tag}${attrText}${schluss}`, ende: i, tag, selbstSchliessend: selbstSchliessend || VOID.has(tag) };
}

const pfad = process.argv[2];
const quelle = await readFile(pfad, 'utf8');

// Frontmatter abtrennen
let vorlage = quelle;
if (quelle.startsWith('---')) {
  /* Nur eine Zeile, die ausschliesslich --- enthaelt, beendet die
     Frontmatter. Base.astro hat ----------Trennlinien in Kommentaren; ein
     einfaches indexOf('\n---') schnitt dort mitten hinein. */
  const m = /\n---[ \t]*(?:\r?\n|$)/.exec(quelle.slice(3));
  vorlage = m ? quelle.slice(3 + m.index + m[0].length) : quelle;
}
// <style> und Modul-<script> entfernen (liegen bereits als eigene Dateien vor)
vorlage = vorlage.replace(/\n?[ \t]*<style>[\s\S]*?<\/style>\n?/g, '\n');
vorlage = vorlage.replace(/\n?[ \t]*<script>\n[\s\S]*?\n[ \t]*<\/script>\n?/g, '\n');

/* <style is:inline>…</style> gehoert zum Markup (es steckt in <noscript>) und
   muss ausgeliefert werden. React nimmt den Inhalt als Textkind. */
vorlage = vorlage.replace(/<style\s+is:inline>([\s\S]*?)<\/style>/g,
  (_, inhalt) => `<style>{${JSON.stringify(inhalt)}}</style>`);

// Tags durchlaufen
let out = '';
let i = 0;
while (i < vorlage.length) {
  const ch = vorlage[i];
  /* Geschweifte Klammern werden NICHT uebersprungen: in
     `{lead && (<p class="…">…</p>)}` steckt Markup, das umgeschrieben werden
     muss. Gepruefte Voraussetzung dafuer: in keiner der 86 Vorlagen kommt '<'
     als Vergleichsoperator oder als Textzeichen vor, nur als Tag oder als
     Fragment `<>`. Ein '<' im Datenstrom ist also immer Markup. */
  if (ch === '<' && /[A-Za-z]/.test(vorlage[i + 1] ?? '')) {
    const r = tagUmschreiben(vorlage, i);
    if (r) { out += r.text; i = r.ende; continue; }
  }
  out += ch;
  i++;
}

/* HTML-Kommentare gibt es in JSX nicht. */
out = out.replace(/<!--([\s\S]*?)-->/g, (_, inhalt) => `{/*${inhalt}*/}`);

// <slot /> -> {children}
out = out.replace(/<slot\s*\/>/g, '{children}');
out = out.replace(/<slot\s+name="head"\s*\/>/g, '{head}');
out = out.replace(/<slot><\/slot>/g, '{children}');

process.stdout.write(out.trim() + '\n');
if (hinweise.length) {
  process.stderr.write('\nHINWEISE:\n' + [...new Set(hinweise)].map((h) => '  - ' + h).join('\n') + '\n');
}
