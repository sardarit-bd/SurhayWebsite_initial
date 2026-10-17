import { ui, defaultLang, locales, localeMeta, type Lang, type UiKey } from './ui';
/* Astro stellte den Base-Pfad als Umgebungswert des Bundlers bereit; in Next
   gibt es den nicht. Derselbe Wert, dieselbe Schreibweise (mit
   Schlussstrich), kommt aus ../base.ts. */
import { BASE_URL } from '../base';
import { routes, type RouteKey } from './routes';

/* Die Slug-Tabelle steht in ./routes.ts — sie wird auch von astro.config.mjs
   (Sitemap) gelesen und darf deshalb nichts aus dieser Datei brauchen. */
export { routes };
export type { RouteKey };

/**
 * Pfad ohne Base-Praefix.
 *
 * Auf GitHub Pages liegt die Seite in einem Unterordner (/SurhayWebsite/...).
 * Ohne dieses Abschneiden hielt die Spracherkennung "SurhayWebsite" fuer das
 * erste Pfadsegment — Folge: /en/ wurde auf Pages komplett deutsch gerendert
 * und verlinkte in den deutschen Blog. Jede Pfadauswertung geht deshalb
 * durch diese Funktion.
 */
export function stripBase(pathname: string): string {
  const base = BASE_URL;
  const trimmed = base.endsWith('/') ? base.slice(0, -1) : base;
  const path = trimmed && pathname.startsWith(trimmed) ? pathname.slice(trimmed.length) : pathname;
  return path.startsWith('/') ? path : `/${path}`;
}

/** Alle Sprachen ausser der Standardsprache tragen ihr Kuerzel als erstes Segment. */
const prefixed = locales.filter((l) => l !== defaultLang);

export function getLangFromUrl(url: URL): Lang {
  const [, first] = stripBase(url.pathname).split('/');
  return prefixed.find((l) => l === first) ?? defaultLang;
}

/**
 * Übersetzungsfunktion: const t = useTranslations('tr'); t('nav.services')
 *
 * Fehlt ein Schlüssel in der Zielsprache, greift der Rückfall auf Deutsch.
 * Ein roher Schlüssel oder ein leerer String kann damit nie im Markup landen;
 * zusätzlich bricht schon der Build, wenn eine Sprache unvollständig ist
 * (siehe `_vollstaendig` in ui.ts).
 */
export function useTranslations(lang: Lang) {
  return (key: UiKey): string => t(key, lang);
}

/** Einzelaufruf ohne vorher gebundene Sprache. */
export function t(key: UiKey, lang: Lang): string {
  const table = ui[lang] as Record<string, string | undefined>;
  return table[key] ?? ui[defaultLang][key];
}

/**
 * Stellt den konfigurierten Base-Pfad voran (GitHub Pages liegt in einem
 * Unterordner, Hostinger im Root). Ohne Base bleibt der Pfad unveraendert.
 * withBase('/images/x.webp') → '/SurhayWebsite/images/x.webp'
 */
export function withBase(path: string): string {
  const base = BASE_URL;
  if (!path.startsWith('/')) return path; // externe URLs, mailto:, #anker
  const trimmed = base.endsWith('/') ? base.slice(0, -1) : base;
  return `${trimmed}${path}`;
}

/** Lokalisierter Pfad inkl. Base: localePath('tr', '/blog') → '/tr/blog' */
export function localePath(lang: Lang, path: string): string {
  const clean = path.startsWith('/') ? path : `/${path}`;
  const localized = lang === defaultLang ? clean : `/${lang}${clean === '/' ? '' : clean}`;
  return withBase(localized);
}


/** Kurzform für einen Seitenpfad: path('tr', 'pricing') → '/tr/fiyatlar' (inkl. Base). */
export function path(lang: Lang, key: RouteKey, sub?: string): string {
  const tail = sub ? `/${sub}` : '';
  return localePath(lang, `/${routes[lang][key]}${tail}`);
}

/**
 * hreflang-/Sprachumschalter-Satz für eine Sammelseite.
 * Optional mit unterschiedlichem Slug je Sprache (Leistungs-Unterseiten).
 *
 * Fehlt der Unter-Slug in einer Sprache — etwa eine Case Study, die es nur
 * auf Deutsch gibt —, zeigt der Eintrag auf die Sammelseite dieser Sprache
 * statt auf eine 404.
 */
export function altPaths(key: RouteKey, sub?: string | Partial<Record<Lang, string>>): Record<Lang, string> {
  const pick = (lang: Lang) => (typeof sub === 'string' ? sub : sub?.[lang]);
  return Object.fromEntries(
    locales.map((lang) => {
      const tail = pick(lang);
      // Kein Slug in dieser Sprache → Sammelseite statt Sackgasse.
      return [lang, typeof sub === 'undefined' || tail ? path(lang, key, tail) : path(lang, key)];
    })
  ) as Record<Lang, string>;
}

/** Startseiten aller Sprachen — Rückfall, wenn eine Seite keine Alternates mitbringt. */
export function homePaths(): Record<Lang, string> {
  return Object.fromEntries(locales.map((lang) => [lang, localePath(lang, '/')])) as Record<Lang, string>;
}

/** true, wenn `href` die aktuell geöffnete Seite ist (oder deren Unterseite). */
export function isActive(currentPathname: string, href: string, exact = false): boolean {
  const norm = (p: string) => {
    const s = stripBase(p).replace(/\/+$/, '');
    return s === '' ? '/' : s;
  };
  const current = norm(currentPathname);
  const target = norm(href);
  const homes = ['/', ...prefixed.map((l) => `/${l}`)];
  if (homes.includes(target)) return current === target;
  return exact ? current === target : current === target || current.startsWith(`${target}/`);
}

/** Trennt Collection-IDs wie "tr/mein-slug" in Sprache + Slug. */
export function splitId(id: string): { lang: Lang; slug: string } {
  const [first, ...rest] = id.split('/');
  const lang = locales.find((l) => l === first) ?? defaultLang;
  return { lang, slug: rest.join('/') };
}

/** Datum lokalisiert formatieren. */
export function formatDate(date: Date, lang: Lang): string {
  return new Intl.DateTimeFormat(localeMeta[lang].intl, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}

/** Grobe Lesezeit aus Markdown-Body. */
export function readingTime(body: string): number {
  const words = body.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 220));
}

/** Zahl lokalisiert formatieren (Kennzahlen der Case Studies, Konfigurator). */
export function formatNumber(value: number, lang: Lang): string {
  return new Intl.NumberFormat(localeMeta[lang].intl).format(value);
}

export { locales, localeMeta };
