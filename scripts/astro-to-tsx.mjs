/* ---------------------------------------------------------------------------
   Vollstaendigen .tsx-Entwurf aus einer .astro-Datei erzeugen.

   Baut auf astro-template-to-jsx.mjs auf (Vorlagen-Teil) und uebernimmt
   zusaetzlich den Frontmatter-Teil. Das Ergebnis ist ein ENTWURF: jede Datei
   wird danach gelesen und nachgezogen — Whitespace zwischen Inline-Inhalt,
   `key` an .map(), Sonderfaelle. Der Generator nimmt nur das Mechanische ab,
   und zwar einheitlich.

   Was er umschreibt:
     import X from './Y.astro'        → './Y'
     from 'astro:content'             → '../lib/content'  (getCollection/render)
     const lang = getLangFromUrl(...) → entfaellt, `lang` kommt als Eigenschaft
     const here = Astro.url.pathname  → `pathname` als Eigenschaft
     Astro.site?.href ?? SITE.domain  → SITE_HREF aus ../base
     Astro.generator                  → entfaellt (siehe MIGRATION-NOTES)
     const { … } = Astro.props        → Parameterliste der Funktion
     <slot />                          → children
     <style>-Block                     → bereits als src/styles/components/*.css
     <script>-Block                    → inlineScripts['name']

   Aufruf: node scripts/astro-to-tsx.mjs <datei.astro> [--out <ziel.tsx>]
--------------------------------------------------------------------------- */
import { readFile, writeFile, access } from 'node:fs/promises';
import { basename, dirname, relative, join } from 'node:path';
import { execFileSync } from 'node:child_process';

const kebab = (s) => s.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
const da = (p) => access(p).then(() => true, () => false);

const quelleDatei = process.argv[2];
const outIdx = process.argv.indexOf('--out');
const zielDatei = outIdx !== -1 ? process.argv[outIdx + 1] : quelleDatei.replace(/\.astro$/, '.tsx');

const roh = await readFile(quelleDatei, 'utf8');
const name = basename(quelleDatei, '.astro');
const komponente = kebab(name);

/* --- Frontmatter abtrennen --- */
let frontmatter = '';
let frontEnde = 0;
if (roh.startsWith('---')) {
  /* Das schliessende --- ist eine Zeile, die NUR aus --- besteht. `indexOf`
     auf '\n---' traf in Base.astro mitten in einen Kommentar mit einer
     ----------Trennlinie und schnitt die Frontmatter in der Mitte durch. */
  const m = /\n---[ \t]*(?:\r?\n|$)/.exec(roh.slice(3));
  const e = m ? 3 + m.index : roh.length;
  frontmatter = roh.slice(4, e);
  frontEnde = e;
}

/* --- Vorlage vom bestehenden Konverter holen --- */
const jsx = execFileSync('node', [join(dirname(process.argv[1]), 'astro-template-to-jsx.mjs'), quelleDatei], {
  encoding: 'utf8',
});

/* --- Frontmatter zerlegen --- */
const zeilen = frontmatter.split('\n');
const kopfkommentar = [];
const imports = [];
const koerper = [];
let phase = 'kopf';
let i = 0;

// Fuehrender Blockkommentar
if (zeilen[0]?.trimStart().startsWith('/**') || zeilen[0]?.trimStart().startsWith('/*')) {
  for (; i < zeilen.length; i++) {
    kopfkommentar.push(zeilen[i]);
    if (zeilen[i].includes('*/')) { i++; break; }
  }
}
for (; i < zeilen.length; i++) {
  const z = zeilen[i];
  if (/^\s*import\s/.test(z)) { phase = 'import'; imports.push(z); continue; }
  if (phase === 'import' && /^\s*$/.test(z) && imports.length) { phase = 'koerper'; continue; }
  koerper.push(z);
}

/* --- Imports umschreiben --- */
const neueImports = [];
let brauchtContent = false;
for (let z of imports) {
  z = z.replace(/(['"])([^'"]+)\.astro\1/g, '$1$2$1');
  if (/from 'astro:content'/.test(z)) {
    brauchtContent = true;
    const tiefe = relative(dirname(quelleDatei), 'src').replace(/\\/g, '/') || '.';
    const symbole = /import\s+(?:type\s+)?\{([^}]*)\}/.exec(z)?.[1] ?? '';
    const liste = symbole.split(',').map((s) => s.trim()).filter(Boolean);
    const ausContent = [];
    const ausConfig = [];
    for (const s of liste) {
      if (/^type\s+CollectionEntry$/.test(s) || s === 'CollectionEntry') continue; // wird pro Datei ersetzt
      if (s === 'getCollection') ausContent.push('getCollection');
      else if (s === 'render') ausContent.push('renderEntry');
      else ausConfig.push(s);
    }
    if (ausContent.length) neueImports.push(`import { ${ausContent.join(', ')} } from '${tiefe}/lib/content';`);
    continue;
  }
  // getLangFromUrl aus dem i18n-Import entfernen
  if (/i18n\/utils/.test(z)) {
    z = z.replace(/getLangFromUrl,\s*/, '').replace(/,\s*getLangFromUrl/, '');
    if (/import\s*\{\s*\}\s*from/.test(z)) continue;
  }
  neueImports.push(z);
}

/* --- Koerper umschreiben --- */
let brauchtLang = false;
let brauchtPfad = false;
let brauchtSiteHref = false;
const koerperNeu = [];
let propsZeile = null;

for (const z of koerper) {
  if (/getLangFromUrl\(Astro\.url\)/.test(z)) { brauchtLang = true; continue; }
  if (/=\s*Astro\.props\s*;?\s*$/.test(z)) { propsZeile = z; continue; }
  let n = z;
  if (/Astro\.url\.pathname/.test(n)) { brauchtPfad = true; n = n.replace(/Astro\.url\.pathname/g, 'pathname'); }
  if (/Astro\.site\?\.href\s*\?\?\s*SITE\.domain/.test(n)) { brauchtSiteHref = true; n = n.replace(/Astro\.site\?\.href\s*\?\?\s*SITE\.domain/g, 'SITE_HREF'); }
  if (/Astro\.generator/.test(n)) n = n.replace(/Astro\.generator/g, "'' /* Astro.generator — siehe MIGRATION-NOTES */");
  koerperNeu.push(n);
}

/* --- interface Props aus dem Koerper herausziehen (gehoert vor die Funktion) --- */
let propsInterface = '';
{
  const text = koerperNeu.join('\n');
  const m = /(?:^|\n)(interface\s+Props\s*\{[\s\S]*?\n\})/.exec(text);
  if (m) {
    propsInterface = m[1];
    const rest = text.replace(m[1], '');
    koerperNeu.length = 0;
    koerperNeu.push(...rest.split('\n'));
  }
}

/* --- Parameterliste --- */
let params = '';
let propsTyp = '';
const hatPropsInterface = Boolean(propsInterface);
if (propsZeile) {
  const m = /const\s+(\{[\s\S]*\})\s*=\s*Astro\.props/.exec(propsZeile);
  params = m ? m[1] : '';
}
const zusatz = [];
if (brauchtLang) zusatz.push('lang');
if (brauchtPfad) zusatz.push('pathname');
if (/\{children\}/.test(jsx)) zusatz.push('children');
if (/\{head\}/.test(jsx)) zusatz.push('head');

if (params) {
  const inner = params.replace(/^\{|\}$/g, '').trim();
  params = `{ ${[inner, ...zusatz].filter(Boolean).join(', ')} }`;
} else if (zusatz.length) {
  params = `{ ${zusatz.join(', ')} }`;
}
if (hatPropsInterface) {
  propsTyp = ': Props';
  /* Die vorhandene Props-Schnittstelle um die hereingegebenen Werte erweitern. */
  const erben = [brauchtLang && 'LangProp', brauchtPfad && 'PfadProp'].filter(Boolean);
  if (erben.length) propsInterface = propsInterface.replace(/interface\s+Props\s*\{/, `interface Props extends ${erben.join(', ')} {`);
  if (/\{children\}/.test(jsx) && !/children/.test(propsInterface)) {
    propsInterface = propsInterface.replace(/\n\}$/, '\n  /** Hiess unter Astro <slot />. */\n  children?: ReactNode;\n}');
  }
  if (/\{head\}/.test(jsx) && !/head\??:/.test(propsInterface)) {
    propsInterface = propsInterface.replace(/\n\}$/, '\n  /** Hiess unter Astro <slot name="head" />. */\n  head?: ReactNode;\n}');
  }
} else if (zusatz.length) {
  const teileT = [brauchtLang && 'LangProp', brauchtPfad && 'PfadProp'].filter(Boolean);
  const inline = [];
  if (/\{children\}/.test(jsx)) inline.push('children?: ReactNode');
  if (/\{head\}/.test(jsx)) inline.push('head?: ReactNode');
  if (inline.length) teileT.push(`{ ${inline.join('; ')} }`);
  propsTyp = teileT.length ? ': ' + teileT.join(' & ') : '';
}

/* --- Helfer-Imports nach Bedarf --- */
const tiefe = relative(dirname(quelleDatei), 'src').replace(/\\/g, '/') || '.';
const helfer = [];
if (/clsx\(/.test(jsx)) helfer.push(`import clsx from 'clsx';`);
if (await da(`src/styles/components/${komponente}.css`)) helfer.push(`import { scoped } from '${tiefe}/lib/scoped';`);
if (/css\(/.test(jsx)) helfer.push(`import { css } from '${tiefe}/lib/css';`);
if (brauchtSiteHref) helfer.push(`import { SITE_HREF } from '${tiefe}/base';`);
const skript = await da(`src/inline/${komponente}.script.ts`);
if (skript) helfer.push(`import { inlineScripts } from '${tiefe}/inline/generated';`);
if (/\{children\}/.test(jsx) || /\{head\}/.test(jsx)) helfer.push(`import type { ReactNode } from 'react';`);
if (brauchtLang || brauchtPfad) helfer.push(`import type { ${[brauchtLang && 'LangProp', brauchtPfad && 'PfadProp'].filter(Boolean).join(', ')} } from '${tiefe}/lib/props';`);

/* --- Zusammensetzen --- */
const istAsync = /\bawait\b/.test(koerperNeu.join('\n'));
const hatScope = await da(`src/styles/components/${komponente}.css`);

/* Beginnt die Vorlage mit einer geschweiften Klammer, ist sie entweder ein
   Kommentar vor dem Wurzelelement (zwei Kinder — React nimmt eins) oder ein
   Ausdrucksblock, der als Argument ein Objektliteral waere. Ein Fragment loest
   beides und erzeugt selbst kein Element. */
let jsxRumpf = jsx.trim();
if (jsxRumpf.startsWith('{')) jsxRumpf = `<>\n${jsxRumpf}\n</>`;
const jsxEingerueckt = jsxRumpf.split('\n').map((l) => (l ? '    ' + l : l)).join('\n');
const ruempfe = hatScope
  ? `  return scoped(\n    'data-c-${komponente}',\n${jsxEingerueckt}\n  );`
  : `  return (\n${jsxEingerueckt}\n  );`;

const teile = [
  [...new Set([...helfer, ...neueImports])].join('\n'),
  '',
  kopfkommentar.join('\n'),
  propsInterface,
  `export default ${istAsync ? 'async ' : ''}function ${name.replace(/[^\w]/g, '')}(${params}${propsTyp}) {`,
  koerperNeu.join('\n').replace(/^\n+|\n+$/g, '').split('\n').map((l) => (l ? '  ' + l : l)).join('\n'),
  '',
  ruempfe,
  '}',
  skript ? `\n/* HINWEIS: inlineScripts['${komponente}'] noch einsetzen. */` : '',
].filter((x) => x !== null);

await writeFile(zielDatei, teile.join('\n').replace(/\n{3,}/g, '\n\n') + '\n');
console.log(`${zielDatei}`);
if (brauchtLang) console.log('   lang als Eigenschaft ergaenzt');
if (brauchtPfad) console.log('   pathname als Eigenschaft ergaenzt');
if (hatScope) console.log(`   scoped('data-c-${komponente}') gesetzt`);
if (skript) console.log(`   Inline-Skript '${komponente}' EINSETZEN`);
if (brauchtContent) console.log('   astro:content ersetzt — CollectionEntry-Typen pruefen');
