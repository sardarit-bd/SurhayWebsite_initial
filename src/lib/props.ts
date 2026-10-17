import type { Lang } from '../i18n/ui';
import { BASE_URL } from '../base';

/* ---------------------------------------------------------------------------
   Sprache und Pfad als Eigenschaften statt aus der Anfrage.

   Unter Astro holte sich jedes Bauteil die Sprache selbst:
   `const lang = getLangFromUrl(Astro.url)` — 31 Mal. Next hat in einer
   Server Component kein Gegenstueck zu `Astro.url`; die Seite kennt ihren
   Pfad, das Bauteil nicht.

   Also wird beides von der Seite hereingegeben. Das ist derselbe Wert wie
   vorher, nur explizit: jede der 49 Seiten weiss zur Bauzeit, welche Sprache
   und welchen Pfad sie hat.
--------------------------------------------------------------------------- */

/** Was jedes Bauteil braucht, das vorher `getLangFromUrl(Astro.url)` rief. */
export interface LangProp {
  lang: Lang;
}

/** Zusaetzlich fuer Bauteile, die vorher `Astro.url.pathname` lasen. */
export interface PfadProp {
  /** Genau wie Astros `Astro.url.pathname` — siehe `astroPathname()`. */
  pathname: string;
}

/**
 * Astros `Astro.url.pathname` nachbilden.
 *
 * Gemessen an der eingefrorenen Referenz, beide Deploy-Ziele:
 *   Ziel Hostinger (base '/')            Startseite  /
 *                                        Unterseite  /agentur/
 *   Ziel Pages (base '/SurhayWebsite')   Startseite  /SurhayWebsite
 *                                        Unterseite  /SurhayWebsite/agentur/
 *
 * Also: Unterseiten tragen einen Schlussstrich, die Startseite nur dann,
 * wenn es kein Base-Praefix gibt. Genau das stand im canonical der
 * Referenz — auf Pages `https://surhay276.github.io/SurhayWebsite`, ohne
 * Strich, und nicht `/SurhayWebsite/`.
 *
 * Zwei Nutzungen haengen daran:
 *   - Base       → canonical und og:url (der Strich ist dort sichtbar)
 *   - Header/Footer → isActive(), das den Strich selbst wieder abschneidet
 *
 * `roh` ist der Pfad ohne Base und ohne Schlussstrich, also '/' oder
 * '/leistungen/webdesign' — das, was `rawPath()` in i18n/routes.ts liefert.
 */
export function astroPathname(roh: string): string {
  const base = BASE_URL.replace(/\/$/, ''); // '' oder '/SurhayWebsite'
  if (roh === '/') return base || '/';
  return `${base}${roh.replace(/\/$/, '')}/`;
}
