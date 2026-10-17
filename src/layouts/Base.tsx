import type { ReactNode } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { SITE, formAction, formspreeAction } from '../config';
import { SITE_HREF } from '../base';
import { useTranslations, withBase, homePaths } from '../i18n/utils';
import { locales, localeMeta, defaultLang, type Lang } from '../i18n/ui';
import { InlineScript } from '../lib/inline-once';
import type { LangProp, PfadProp } from '../lib/props';

/* ---------------------------------------------------------------------------
   Grundgeruest jeder Seite.

   WAS SICH GEGENUEBER DER ASTRO-FASSUNG GEAENDERT HAT — UND WARUM
   Base.astro rendert selbst <html>, <head> und <body>. In Next darf das nur
   das Wurzel-Layout (src/app/(de|en|tr)/layout.tsx), und ein Layout bekommt
   keine Eigenschaften von der Seite. Der Kopfbereich haengt aber an der Seite:
   Titel, Beschreibung, canonical und die hreflang-Paare sind pro Seite
   verschieden, und `Header` braucht `alternates` und `pathname`.

   Deshalb liegt hier nur noch der INHALT: die Kopf-Tags als lose Elemente und
   der Rumpf. React 19 hebt <title>, <meta> und <link> von selbst in den
   <head> — gemessen an der gebauten Ausgabe, in der Reihenfolge, in der sie
   hier stehen. Die Huelle <html lang> … <body> liefert das Wurzel-Layout.

   ZWEI STELLEN, DIE NICHT GEHOBEN WERDEN — siehe MIGRATION-NOTES.md
   - das JSON-LD-Skript und das Reveal-Skript bleiben im Rumpf. Bei JSON-LD
     ist das ohne Folge (es gilt an beliebiger Stelle im Dokument), beim
     Reveal-Skript ebenfalls: es steht am Anfang des Rumpfs und laeuft damit
     vor dem ersten Paint des Inhalts.
   - Nexts eigene Skript-Tags stehen im <head> VOR dem CSP-<meta>. Astro
     setzte es bewusst als erstes. Die Herkunftssperre gilt weiter fuer alles
     danach; nur Nexts eigene, gleichnamige Dateien stehen davor.
--------------------------------------------------------------------------- */
interface Props extends LangProp, PfadProp {
  title?: string;
  description?: string;
  /** Pfade der Sprachvarianten dieser Seite (ohne Domain) für hreflang + Sprachumschalter. */
  alternates?: Record<Lang, string>;
  ogImage?: string;
  /** 'website' | 'article' */
  ogType?: string;
  noIndex?: boolean;
  /** Hiess unter Astro <slot name="head" />. */
  head?: ReactNode;
  /** Hiess unter Astro <slot />. */
  children?: ReactNode;
}

export default function Base({
  lang,
  pathname,
  title,
  description,
  alternates,
  ogImage = '/og-default.png',
  ogType = 'website',
  noIndex = false,
  head,
  children,
}: Props) {
  const t = useTranslations(lang);

  const titel = title ?? t('meta.title');
  const beschreibung = description ?? t('meta.description');
  /* Ohne eigene Angabe zeigen die Sprachlinks auf die jeweilige Startseite —
     nie ins Leere und nie auf eine 404. */
  const alt = alternates ?? homePaths();

  const meta = localeMeta[lang];

  /* ---------------------------------------------------------------------------
     Content-Security-Policy — der Riegel gegen Datenabfluss

     WARUM ALS <meta> UND NICHT ALS HEADER
     GitHub Pages liefert nur feste Header aus; eigene lassen sich dort nicht
     setzen. Die meta-Variante deckt alles ab, was hier zaehlt (frame-ancestors
     und HSTS kann sie nicht — die stehen deshalb in public/.htaccess fuer das
     Apache-Ziel).

     WAS SIE LEISTET
     Sie macht die Messung dauerhaft: Ein Skript, eine Schrift, ein Bild oder ein
     Frame von einer fremden Domain wird vom Browser blockiert, nicht bloss
     unterlassen. Ein spaeter eingebautes Analysewerkzeug faellt damit sofort auf,
     statt still Daten zu senden.

     'unsafe-inline' — ehrlich benannt
     Die Seite liefert Skripte und Styles inline aus; ohne diese Freigabe waere
     sie kaputt. Gegen XSS schuetzt die Richtlinie dadurch kaum. Der Zweck
     hier ist die Herkunftssperre, nicht der XSS-Schutz.

     FORMULARZIELE
     form-action und connect-src werden aus src/config.ts abgeleitet, damit ein
     spaeter eingetragener Endpunkt (eigener Server oder Dienstleister) nicht
     versehentlich blockiert wird. Ist kein Endpunkt gepflegt, steht form-action
     auf 'none': dann kann auch ein natives POST ohne JavaScript die Eingaben
     nicht an den eigenen Webserver schicken.
  --------------------------------------------------------------------------- */
  const submitTargets = [formAction, formspreeAction].filter((x): x is string => Boolean(x));
  const submitOrigins = [
    ...new Set(submitTargets.filter((x) => /^https?:\/\//.test(x)).map((x) => new URL(x).origin)),
  ];
  const submitSelf = submitTargets.some((x) => !/^https?:\/\//.test(x));
  const formSources = [...(submitSelf ? ["'self'"] : []), ...submitOrigins];

  const csp = [
    "default-src 'self'",
    "base-uri 'self'",
    "object-src 'none'",
    "frame-src 'none'",
    "worker-src 'none'",
    "manifest-src 'self'",
    /* data: nur fuer Bilder — die Rausch-Textur in global.css ist ein inline-SVG. */
    "img-src 'self' data:",
    "font-src 'self'",
    "style-src 'self' 'unsafe-inline'",
    "script-src 'self' 'unsafe-inline'",
    ["connect-src 'self'", ...submitOrigins].join(' '),
    `form-action ${formSources.length > 0 ? formSources.join(' ') : "'none'"}`,
    'upgrade-insecure-requests',
  ].join('; ');
  const siteBase = SITE_HREF;
  const canonical = new URL(pathname, siteBase).href;
  const ogImageAbs = new URL(ogImage.startsWith('http') ? ogImage : withBase(ogImage), siteBase).href;

  /* LocalBusiness / ProfessionalService Schema (JSON-LD) */
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${SITE.domain}/#business`,
    name: SITE.name,
    description: t('meta.description'),
    url: SITE.domain,
    email: SITE.email,
    image: ogImageAbs,
    priceRange: '€€',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Berlin',
      addressCountry: 'DE',
    },
    areaServed: ['DE', 'AT', 'CH'],
    sameAs: Object.values(SITE.social),
    knowsAbout: ['Webdesign', 'Webentwicklung', 'SEO', 'Website-Wartung'],
  };

  return (
    <>
      {/* So frueh wie moeglich: die Richtlinie gilt erst ab ihrer eigenen Zeile. */}
      <meta httpEquiv="Content-Security-Policy" content={csp} />
      {/* Beim Verlassen der Seite geht nur noch die Herkunft mit, nie der volle
          Pfad — ein Klick von /leistungen/webdesign verraet dem Ziel nicht mehr,
          welche Unterseite gelesen wurde. Chrome und Firefox machen das seit
          laengerem von selbst; ausgeschrieben gilt es in jedem Browser. */}
      <meta name="referrer" content="strict-origin-when-cross-origin" />
      {/* Astro trug hier seine eigene Kennung ein (Astro.generator). Das Werkzeug
          ist ein anderes, also nennt das Tag das andere Werkzeug. */}
      <meta name="generator" content="Next.js" />
      <title>{titel}</title>
      <meta name="description" content={beschreibung} />
      <link rel="canonical" href={canonical} />
      {noIndex && <meta name="robots" content="noindex, nofollow" />}

      <link rel="icon" type="image/svg+xml" href={withBase('/favicon.svg')} />
      <link rel="apple-touch-icon" href={withBase('/apple-touch-icon.png')} />
      <meta name="theme-color" content="#0a0a0b" />

      {/* hreflang-Alternates — alle Sprachen wechselseitig, x-default auf DE */}
      {locales.map((code) => (
        <link
          rel="alternate"
          hrefLang={localeMeta[code].hreflang}
          href={new URL(alt[code], siteBase).href}
          key={code}
        />
      ))}
      <link rel="alternate" hrefLang="x-default" href={new URL(alt[defaultLang], siteBase).href} />

      {/* Open Graph / Twitter */}
      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content={SITE.name} />
      <meta property="og:title" content={titel} />
      <meta property="og:description" content={beschreibung} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={ogImageAbs} />
      <meta property="og:locale" content={meta.ogLocale} />
      {locales
        .filter((code) => code !== lang)
        .map((code) => <meta property="og:locale:alternate" content={localeMeta[code].ogLocale} key={code} />)}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={titel} />
      <meta name="twitter:description" content={beschreibung} />
      <meta name="twitter:image" content={ogImageAbs} />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      {head}

      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[var(--z-sprung)] focus:rounded-full focus:bg-accent-600 focus:px-5 focus:py-3 focus:font-semibold focus:text-white"
      >
        {t('nav.skip')}
      </a>

      <Header alternates={alt} lang={lang} pathname={pathname} />

      <main id="main">{children}</main>

      <Footer lang={lang} pathname={pathname} />

      {/* ------------------------------------------------------------------
          Animationssystem — Vanilla JS, kein Framework. Woertlich aus
          Base.astro uebernommen, siehe src/inline/base.script.ts.
      ------------------------------------------------------------------ */}
      <InlineScript name="base" />
    </>
  );
}
