import { readdir, readFile } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import matter from 'gray-matter';
import { collections, type CollectionKey } from '../content.config';
import { renderMarkdown } from './markdown';

/* ---------------------------------------------------------------------------
   Content-Layer — der Ersatz fuer Astros `astro:content`.

   Astro brachte `getCollection()` und `render()` mit; Next hat nichts
   Vergleichbares. Nachgebaut ist genau die Oberflaeche, die die Seiten
   benutzen — und zwar so, dass die aufrufenden Stellen unveraendert bleiben:

     getCollection('blog', filter)  →  Eintraege mit { id, data, body }
     renderEntry(entry)             →  fertiges HTML des Rumpfs

   Die `id` ist derselbe Wert wie unter Astro: der Pfad unterhalb des
   Sammlungsordners ohne Endung, also `de/mein-slug`. `splitId()` in
   i18n/utils.ts zerlegt sie weiter — unveraendert.

   Geprueft wird mit den Zod-Schemas aus ../content.config.ts. Ein Verstoss
   wirft, und weil alle Seiten statisch vorgerendert werden, bricht damit der
   Build — dieselbe Wirkung wie vorher.
--------------------------------------------------------------------------- */

const WURZEL = resolve(process.cwd(), 'src/content');

export interface Entry<T> {
  /** Pfad unterhalb des Sammlungsordners ohne Endung, z. B. `de/mein-slug`. */
  id: string;
  collection: CollectionKey;
  data: T;
  /** Roher Markdown-Rumpf ohne Frontmatter — Grundlage von `readingTime()`. */
  body: string;
  /** Absoluter Dateipfad; das Tabellen-Plugin liest daraus die Sprache. */
  filePath: string;
}

/** Alle .md-Dateien unterhalb eines Ordners, relativ zu ihm. */
async function markdownDateien(wurzel: string, praefix = ''): Promise<string[]> {
  const eintraege = await readdir(join(wurzel, praefix), { withFileTypes: true });
  const ergebnis: string[] = [];
  for (const e of eintraege) {
    const pfad = praefix ? `${praefix}/${e.name}` : e.name;
    if (e.isDirectory()) ergebnis.push(...(await markdownDateien(wurzel, pfad)));
    else if (e.name.endsWith('.md')) ergebnis.push(pfad);
  }
  return ergebnis;
}

/* Einmal einlesen, dann wiederverwenden: bei 70 Seiten wuerde jede Sammlung
   sonst dutzendfach von der Platte gelesen. */
const zwischenspeicher = new Map<CollectionKey, Promise<Entry<unknown>[]>>();

async function ladeCollection(name: CollectionKey): Promise<Entry<unknown>[]> {
  const ordner = join(WURZEL, name);
  const schema = collections[name];
  const dateien = (await markdownDateien(ordner)).sort();

  return Promise.all(
    dateien.map(async (relativ) => {
      const filePath = join(ordner, relativ);
      const roh = await readFile(filePath, 'utf8');
      const { data, content } = matter(roh);
      const geprueft = schema.safeParse(data);
      if (!geprueft.success) {
        /* Beim Bauen ist das ein Abbruch — mit Dateiname, sonst sucht man
           den Tippfehler in 120 Dateien. */
        throw new Error(
          `[content] ${name}/${relativ} verletzt das Schema:\n${JSON.stringify(geprueft.error.issues, null, 2)}`
        );
      }
      return {
        id: relativ.replace(/\.md$/, ''),
        collection: name,
        data: geprueft.data,
        body: content,
        filePath,
      };
    })
  );
}

/**
 * Wie Astros `getCollection`: alle Eintraege einer Sammlung, optional
 * gefiltert. Der Filter bekommt denselben Eintrag wie vorher, sodass
 * `({ id, data }) => splitId(id).lang === lang && data.real` unveraendert
 * weiterlaeuft.
 */
export async function getCollection<T>(
  name: CollectionKey,
  filter?: (entry: Entry<T>) => boolean
): Promise<Entry<T>[]> {
  if (!zwischenspeicher.has(name)) zwischenspeicher.set(name, ladeCollection(name));
  const alle = (await zwischenspeicher.get(name)!) as Entry<T>[];
  return filter ? alle.filter(filter) : alle;
}

/**
 * Wie Astros `render(entry)` — nur gibt es hier HTML statt einer Komponente.
 * Astros `<Content />` fuegte kein Element hinzu; die drei aufrufenden Stellen
 * setzen das HTML deshalb per `dangerouslySetInnerHTML` auf den Wrapper, den
 * sie schon hatten (`.prose`, `.faq-panel-inner`), und nicht in ein neues.
 */
export async function renderEntry(entry: Entry<unknown>): Promise<string> {
  return renderMarkdown(entry.body, entry.filePath);
}
