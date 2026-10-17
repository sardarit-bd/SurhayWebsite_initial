import { getCollection } from './content';
import type { BlogData } from '../content.config';
import { services } from '../data/services';
import { locales, defaultLang } from '../i18n/ui';
import { routes, rawPath, alternatePaths } from '../i18n/routes';
import { splitId } from '../i18n/utils';
import { BASE_URL, SITE_HREF } from '../base';

/* ---------------------------------------------------------------------------
   Sitemap — nachgebaut, was @astrojs/sitemap mit eigener serialize() lieferte.

   WARUM NICHT app/sitemap.ts (die Next-Konvention)
   Weil die Datei dann /sitemap.xml heisst. public/robots.txt verweist auf
   /sitemap-index.xml, und diese Adresse ist bei Suchmaschinen gemeldet — ein
   umbenannter Pfad waere eine 404 an einer Stelle, die niemand nachschlaegt.
   Also dieselben zwei Dateien wie vorher, ueber Route Handler.

   FORMAT: aus der eingefrorenen Referenz uebernommen — dieselben fuenf
   Namensraeume am <urlset>, dieselbe Reihenfolge (alphabetisch nach URL),
   Schlussstrich an jeder URL, hreflang-Alternates je Eintrag.

   Die Alternates kommen aus derselben Tabelle wie ueberall sonst
   (src/i18n/routes.ts). Die eingebaute i18n-Option des Astro-Plugins konnte
   das nicht: sie paart Sprachfassungen ueber gleiche Pfade, hier sind die
   Slugs uebersetzt (/leistungen ↔ /tr/hizmetler).

   Die 404 steht nicht drin — auch nicht in der Referenz.
--------------------------------------------------------------------------- */

const base = BASE_URL.replace(/\/$/, '');

/** Volle URL mit Schlussstrich, wie in der Referenz. */
function volleUrl(rohPfad: string): string {
  const pfad = rohPfad === '/' ? '/' : `${rohPfad}/`;
  return new URL(`${base}${pfad}`, SITE_HREF).href;
}

/** Alle Pfade, die eine Seite haben — ohne Base, ohne Schlussstrich. */
export async function alleRohpfade(): Promise<string[]> {
  const raus: string[] = [];
  for (const lang of locales) {
    raus.push(rawPath(lang));
    for (const key of Object.keys(routes[lang]) as (keyof (typeof routes)['de'])[]) {
      raus.push(rawPath(lang, key));
    }
    for (const service of services) raus.push(rawPath(lang, 'services', service[lang].slug));
    const posts = await getCollection<BlogData>('blog', ({ id }) => splitId(id).lang === lang);
    for (const post of posts) raus.push(rawPath(lang, 'blog', splitId(post.id).slug));
    /* Case Studies nur mit `real: true` — derzeit keine, siehe
       scripts/sync-case-study-routes.mjs. Die Sitemap fragt dieselbe Quelle
       ab wie die Route, damit beide nicht auseinanderlaufen. */
  }
  return raus;
}

export async function sitemapUrlset(): Promise<string> {
  const pfade = await alleRohpfade();
  const eintraege = pfade
    .map((p) => ({ roh: p, url: volleUrl(p) }))
    .sort((a, b) => (a.url < b.url ? -1 : a.url > b.url ? 1 : 0));

  const bloecke = eintraege.map(({ roh, url }) => {
    const alt = alternatePaths(roh);
    const links = alt
      ? locales
          .map((code) => `<xhtml:link rel="alternate" hreflang="${code}" href="${volleUrl(alt[code])}"/>`)
          .join('')
      : '';
    return `<url><loc>${url}</loc>${links}</url>`;
  });

  return (
    '<?xml version="1.0" encoding="UTF-8"?>' +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"' +
    ' xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"' +
    ' xmlns:xhtml="http://www.w3.org/1999/xhtml"' +
    ' xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"' +
    ' xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">' +
    bloecke.join('') +
    '</urlset>'
  );
}

export function sitemapIndex(): string {
  return (
    '<?xml version="1.0" encoding="UTF-8"?>' +
    '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' +
    `<sitemap><loc>${new URL(`${base}/sitemap-0.xml`, SITE_HREF).href}</loc></sitemap>` +
    '</sitemapindex>'
  );
}

void defaultLang;
