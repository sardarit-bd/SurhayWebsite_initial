import { locales, defaultLang, type Lang } from './ui';
import { services } from '../data/services';

/**
 * Lokalisierte Slugs aller Sammel- und Unterseiten — die EINE Zuordnung
 * zwischen den Sprachfassungen einer Seite.
 *
 * Jede Sprache bekommt eigene URLs: deutsche fuer DE, tuerkische fuer TR,
 * englische fuer EN. Navigation, Footer, Breadcrumbs, hreflang-Alternates,
 * der Sprachumschalter und die Sitemap ziehen alle hier — dadurch landet der
 * Umschalter von /leistungen auf /tr/hizmetler und nicht auf der Startseite.
 *
 * VOLLSTAENDIG UEBERSETZTE SLUGS, KEINE MISCHFORM
 * Wer eine Seite ergaenzt, traegt sie in allen drei Spalten ein — sonst
 * bricht der Typ. Halb uebersetzte Pfade gibt es hier nicht.
 *
 * Die tuerkischen Slugs sind bewusst ohne Sonderzeichen geschrieben
 * (hizmetler, surec, iletisim): ı, ş und ğ waeren in der URL prozentkodiert
 * und damit in Mails, Chats und Analysewerkzeugen unlesbar.
 */
export const routes = {
  de: {
    services: 'leistungen',
    work: 'work',
    process: 'process',
    pricing: 'pricing',
    about: 'about',
    faq: 'faq',
    blog: 'blog',
    contact: 'contact',
    configurator: 'configurator',
    imprint: 'imprint',
    privacy: 'privacy',
    cookies: 'cookie-settings',
  },
  tr: {
    services: 'hizmetler',
    work: 'work',
    process: 'process',
    pricing: 'pricing',
    about: 'about',
    faq: 'faq',
    blog: 'blog',
    contact: 'contact',
    configurator: 'configurator',
    imprint: 'imprint',
    privacy: 'privacy',
    cookies: 'cookie-settings',
  },
  en: {
    services: 'services',
    work: 'work',
    process: 'process',
    pricing: 'pricing',
    about: 'about',
    faq: 'faq',
    blog: 'blog',
    contact: 'contact',
    configurator: 'configurator',
    imprint: 'imprint',
    privacy: 'privacy',
    cookies: 'cookie-settings',
  },
} as const satisfies Record<Lang, Record<string, string>>;

export type RouteKey = keyof (typeof routes)['de'];

const routeKeys = Object.keys(routes[defaultLang]) as RouteKey[];

/** Pfad einer Seite OHNE Base-Praefix: rawPath('tr', 'pricing') → '/tr/fiyatlar' */
export function rawPath(lang: Lang, key?: RouteKey, sub?: string): string {
  const prefix = lang === defaultLang ? '' : `/${lang}`;
  if (!key) return prefix || '/';
  return `${prefix}/${routes[lang][key]}${sub ? `/${sub}` : ''}`;
}

const bySlug = (lang: Lang, slug: string) => routeKeys.find((key) => routes[lang][key] === slug);

const spread = (build: (lang: Lang) => string) =>
  Object.fromEntries(locales.map((lang) => [lang, build(lang)])) as Record<Lang, string>;

/**
 * Alle Sprachfassungen eines Pfades — aus dem Pfad selbst hergeleitet, ohne
 * dass die aufrufende Stelle den Seitenschluessel kennen muss.
 *
 * Gebraucht wird das an genau einer Stelle: in der Sitemap (astro.config.mjs).
 * Sie sieht nur fertige URLs, waehrend die Seiten ihre Alternates ueber
 * `altPaths(key)` direkt aus derselben Tabelle bauen.
 *
 * `null` heisst „keine bekannte Seite“ — dann bleibt der Eintrag ohne
 * Alternates, statt eine falsche Zuordnung zu behaupten.
 */
export function alternatePaths(pathname: string): Record<Lang, string> | null {
  const segments = pathname.split('/').filter(Boolean);
  const prefix = locales.find((lang) => lang !== defaultLang && lang === segments[0]);
  const lang: Lang = prefix ?? defaultLang;
  const rest = prefix ? segments.slice(1) : segments;

  if (rest.length === 0) return spread((l) => rawPath(l));

  const key = bySlug(lang, rest[0]);
  if (!key) return null;
  if (rest.length === 1) return spread((l) => rawPath(l, key));
  if (rest.length > 2) return null;

  /* Leistungs-Unterseiten tragen je Sprache einen eigenen Slug; Blog-,
     Projekt- und alle Collection-Seiten teilen sich den Dateinamen. */
  if (key === 'services') {
    const service = services.find((entry) => entry[lang].slug === rest[1]);
    return service ? spread((l) => rawPath(l, key, service[l].slug)) : null;
  }
  return spread((l) => rawPath(l, key, rest[1]));
}
