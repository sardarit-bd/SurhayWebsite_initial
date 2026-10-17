/* ---------------------------------------------------------------------------
   Die Case-Study-Detailrouten anlegen — aber nur, wenn es welche gibt.

   DAS PROBLEM
   Astro erlaubte ein leeres `getStaticPaths()`: keine Eintraege, keine Seiten,
   fertig. Genau das ist der aktuelle Zustand, denn jede Case Study steht auf
   `real: false` (siehe das Feld in src/content.config.ts — ein erfundener
   Kundenname mit erfundener Kennzahl ist irrefuehrende Werbung). Die gebaute
   Astro-Referenz enthaelt deshalb keine einzige /projekte/<slug>/-Seite.

   Next bricht bei `output: 'export'` ab, wenn `generateStaticParams()` ein
   leeres Array liefert: "at least one route must be generated".

   WARUM NICHT EINFACH DIE ROUTE LOESCHEN
   Weil `real` ein Schalter ist, der umgelegt werden soll, sobald ein Projekt
   freigegeben ist. Waere die Route weg, wuerde das Umlegen unter Astro Seiten
   erzeugen und unter Next nichts — ein stiller Fehler genau in dem Moment, in
   dem es darauf ankommt.

   DIE LOESUNG
   Dieses Skript laeuft vor jedem Build, sieht in den Inhalten nach und legt
   die Route je Sprache an oder entfernt sie. Damit verhaelt sich der Schalter
   wie vorher: `real: true` setzen genuegt. Die erzeugten Dateien sind nicht
   versioniert (siehe .gitignore); die Vorlage steht unten.
--------------------------------------------------------------------------- */
import { readdir, readFile, mkdir, writeFile, rm } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const wurzel = join(dirname(fileURLToPath(import.meta.url)), '..');
const inhalte = join(wurzel, 'src/content/case-studies');

/** Slug der Sammelseite je Sprache — dieselbe Tabelle wie src/i18n/routes.ts. */
const workSlug = { de: 'projekte', tr: 'projeler', en: 'work' };

const vorlage = (lang, slug) => `import CaseStudy from '@/layouts/CaseStudy';
import { getCollection } from '@/lib/content';
import type { CaseStudyData } from '@/content.config';
import { splitId } from '@/i18n/utils';
import { astroPathname } from '@/lib/props';

/* ERZEUGT von scripts/sync-case-study-routes.mjs — nicht von Hand aendern.
   Die Datei existiert, weil mindestens eine Case Study dieser Sprache
   \`real: true\` traegt. Steht keine mehr auf true, verschwindet sie wieder;
   Next bricht sonst ab, weil generateStaticParams() leer waere. */
async function reale() {
  return (
    await getCollection<CaseStudyData>(
      'case-studies',
      ({ id, data }) => splitId(id).lang === '${lang}' && data.real
    )
  ).sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export async function generateStaticParams() {
  return (await reale()).map((entry) => ({ slug: splitId(entry.id).slug }));
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cases = await reale();
  const i = cases.findIndex((c) => splitId(c.id).slug === slug);
  return (
    <CaseStudy
      entry={cases[i]}
      next={cases[(i + 1) % cases.length] ?? null}
      lang="${lang}"
      pathname={astroPathname(\`${lang === 'de' ? '' : '/' + lang}/${slug}/\${slug}\`)}
    />
  );
}
`;

/** Traegt in dieser Sprache mindestens eine Case Study `real: true`? */
async function hatReale(lang) {
  const ordner = join(inhalte, lang);
  let dateien;
  try {
    dateien = (await readdir(ordner)).filter((f) => f.endsWith('.md'));
  } catch {
    return false;
  }
  for (const f of dateien) {
    const roh = await readFile(join(ordner, f), 'utf8');
    const front = /^---\n([\s\S]*?)\n---/.exec(roh)?.[1] ?? '';
    if (/^real:\s*true\s*$/m.test(front)) return true;
  }
  return false;
}

const bericht = [];
for (const [lang, slug] of Object.entries(workSlug)) {
  const ordner = join(wurzel, 'src/app', `(${lang})`, ...(lang === 'de' ? [] : [lang]), slug, '[slug]');
  if (await hatReale(lang)) {
    await mkdir(ordner, { recursive: true });
    await writeFile(join(ordner, 'page.tsx'), vorlage(lang, slug));
    bericht.push(`${lang}: angelegt`);
  } else {
    await rm(ordner, { recursive: true, force: true });
    bericht.push(`${lang}: keine reale Case Study, Route entfaellt`);
  }
}
console.log('case-study-routen — ' + bericht.join('; '));
