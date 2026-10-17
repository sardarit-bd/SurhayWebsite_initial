/* ---------------------------------------------------------------------------
   Base-Pfad und Site-URL — der Ersatz fuer Astros `import.meta.env.BASE_URL`
   und `Astro.site`.

   Astro stellte beides selbst bereit; Next kennt die Werte nur als
   Umgebungsvariablen. Dieselben zwei Variablen wie vorher (SITE_URL,
   BASE_PATH), damit beide Deploy-Ziele unveraendert weiterlaufen:
     Hostinger    SITE_URL=https://surhay.design        BASE_PATH=/
     GitHub Pages SITE_URL=https://surhay276.github.io  BASE_PATH=/SurhayWebsite

   Gelesen wird nur zur Bauzeit: alle Seiten sind Server Components und werden
   statisch vorgerendert, die Werte stehen danach fest im HTML.
--------------------------------------------------------------------------- */
import { SITE } from './config';

/**
 * Wie Astros `import.meta.env.BASE_URL`: IMMER mit Schlussstrich.
 * `stripBase()` und `withBase()` in i18n/utils.ts verlassen sich darauf.
 */
export const BASE_URL: string = (() => {
  const raw = process.env.BASE_PATH || '/';
  return raw.endsWith('/') ? raw : `${raw}/`;
})();

/**
 * Wie `Astro.site?.href` — mit Schlussstrich, weil `new URL(pfad, site)`
 * sonst das letzte Segment verschluckt. Fehlt SITE_URL, gilt die Domain aus
 * der Konfiguration; genau die Reihenfolge hatte `Astro.site?.href ?? SITE.domain`.
 */
export const SITE_HREF: string = (() => {
  const raw = process.env.SITE_URL || SITE.domain;
  return raw.endsWith('/') ? raw : `${raw}/`;
})();
