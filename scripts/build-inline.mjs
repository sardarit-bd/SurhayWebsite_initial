/* ---------------------------------------------------------------------------
   Inline-Skripte erzeugen — der Ersatz fuer Astros <script>-Verarbeitung.

   Astro nahm jeden <script>-Block einer Komponente, kompilierte das
   TypeScript darin zu JavaScript, minifizierte es (esbuild, ueber Vite) und
   lieferte es inline im HTML aus — messbar: 0 .js-Dateien in dist/, sieben
   <script type="module">-Bloecke auf der Startseite, alle in einer Zeile und
   mit gemangelten Variablennamen.

   Next hat davon nichts. Dieses Skript macht denselben Schritt mit demselben
   Werkzeug: src/inline/*.script.ts  →  src/inline/generated.ts, das die
   fertigen JS-Texte als Strings exportiert. Die Komponenten setzen sie per
   dangerouslySetInnerHTML in ein <script type="module"> — dieselbe Stelle,
   dieselbe Ausfuehrungsreihenfolge (Modul-Skripte sind ohnehin deferred).

   Laeuft als `prebuild`, also vor jedem `next build`, und zusaetzlich vor
   `next dev`. Die erzeugte Datei ist im Repo nicht versioniert.
--------------------------------------------------------------------------- */
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { transform } from 'esbuild';

const wurzel = join(dirname(fileURLToPath(import.meta.url)), '..');
const quelle = join(wurzel, 'src/inline');

const dateien = (await readdir(quelle)).filter((f) => f.endsWith('.script.ts')).sort();

const teile = [];
for (const datei of dateien) {
  const name = datei.replace(/\.script\.ts$/, '');
  const code = await readFile(join(quelle, datei), 'utf8');
  const { code: js, warnings } = await transform(code, {
    loader: 'ts',
    /* Minifiziert wie vorher. `legalComments: 'none'` wirft auch den
       Kopfkommentar der Quelldatei weg — er gehoert ins Repo, nicht in die
       ausgelieferte Seite. */
    minify: true,
    legalComments: 'none',
    target: 'es2022',
    format: 'esm',
  });
  for (const w of warnings) console.warn(`[inline:${name}] ${w.text}`);
  teile.push([name, js.trim()]);
}

const kopf = `/* AUTOMATISCH ERZEUGT von scripts/build-inline.mjs — nicht von Hand aendern.
   Quelle: src/inline/*.script.ts (die woertlich uebernommenen <script>-Bloecke
   der Astro-Fassung). Neu erzeugen mit: node scripts/build-inline.mjs */

`;
const koerper =
  'export const inlineScripts = {\n' +
  teile.map(([n, js]) => `  ${JSON.stringify(n)}: ${JSON.stringify(js)},`).join('\n') +
  '\n} as const;\n\nexport type InlineScriptName = keyof typeof inlineScripts;\n';

await writeFile(join(quelle, 'generated.ts'), kopf + koerper);

console.log(`${teile.length} Inline-Skripte erzeugt:`);
for (const [n, js] of teile) console.log(`  ${n.padEnd(20)} ${String(js.length).padStart(6)} Zeichen`);
