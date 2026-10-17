import { Fragment } from 'react';
import Base from '@/layouts/Base';
import { useTranslations, localePath, path, t as translate } from '@/i18n/utils';
import { locales, localeMeta } from '@/i18n/ui';
import { css } from '@/lib/css';
import clsx from 'clsx';
import { astroPathname } from '@/lib/props';

/**
 * 404 — mit Wegweiser statt Sackgasse.
 *
 * Seit die Seite aus mehreren Unterseiten besteht, ist die Wahrscheinlichkeit
 * hoeher, dass jemand hier landet (alter Link, Tippfehler, veraltetes
 * Lesezeichen). Deshalb nicht nur zurueck zur Startseite, sondern die
 * wichtigsten Ziele direkt anbieten.
 *
 * WARUM SIE EINE GEWOEHNLICHE ROUTE IST UND KEIN not-found.tsx
 * Astro legte genau eine Datei ab: dist/404.html, mit <html lang="de"
 * class="no-js"> und canonical /404/. Der Webserver liefert sie bei
 * unbekanntem Pfad aus — auf Apache ueber .htaccess, auf GitHub Pages von
 * selbst.
 *
 * Nexts not-found.tsx bringt das nicht zustande. Gemessen:
 *   - im Wurzelverzeichnis von app/ greift keins der drei Sprach-Layouts;
 *     Next baut selbst eine <html>-Huelle OHNE lang-Attribut, und eine
 *     zweite von Hand waere verschachtelt und ungueltig
 *   - innerhalb der Route Group (de) gilt sie nur fuer Pfade UNTERHALB dieser
 *     Gruppe; global lieferte Next weiter seine Standardseite aus
 *
 *   - unter dem Routennamen /404 ueberschreibt Nexts eigene Ausgabe das
 *     Ergebnis wieder; der Pfad ist reserviert
 *
 * Also eine normale Seite unter einem eigenen Pfad, die damit das deutsche
 * Wurzel-Layout bekommt. scripts/postbuild.mjs verschiebt sie danach nach
 * out/404.html und entfernt das Verzeichnis — dieselbe eine Datei, die Astro
 * ablegte, und weder /404/ noch dieser Pfad sind erreichbare URLs.
 *
 * Als URL nennt die Seite selbst /404/ (canonical, og:url), genau wie die
 * Astro-Fassung: das ist die Adresse, unter der der Webserver sie ausliefert.
 *
 * `lang` steht auf deutsch; der sichtbare Text steht in allen drei Sprachen,
 * jede mit eigenem lang am Element.
 */
export default function Page() {
  const lang = 'de' as const;
  const t = useTranslations(lang);

  const targets = [
    { href: path('de', 'services'), label: 'Leistungen', desc: 'Webdesign, Entwicklung, SEO, Wartung' },
    { href: path('de', 'pricing'), label: 'Preise', desc: 'Pakete, Wartung und Zusatzleistungen' },
    { href: path('de', 'blog'), label: 'Blog', desc: 'Praxiswissen zu Web, Performance und SEO' },
    { href: path('de', 'contact'), label: 'Kontakt', desc: 'Antwort innerhalb von 24 Stunden' },
  ];

  return (
    <Base title={`404 — ${t('404.title')} | Surhay Design`} description={t('404.text')} noIndex lang={lang} pathname={astroPathname('/404')}>
      <section className="grid-bg mx-auto flex min-h-svh max-w-3xl flex-col justify-center px-5 py-32 text-center md:px-8">
        <p className="font-display text-[clamp(5rem, 16vw, 14rem)] font-bold leading-none tracking-tight" aria-hidden="true">
          4<span className="text-accent-600">0</span>4
        </p>
        {/* Diese eine Seite wird fuer jeden unbekannten Pfad ausgeliefert — auch
            unter /tr/ und /en/. Sie kann deshalb nicht in einer Sprache stehen:
            Ueberschrift und Wege gibt es in allen dreien. */}
        {/* Jede Fassung mit eigenem lang: In einer Zeichenkette zusammengefuegt
            laese eine deutsche Sprachausgabe „Page not found" mit deutscher
            Aussprache vor und „Sayfa bulunamadı" gar nicht (WCAG 3.1.2). Die
            Trenner sind aria-hidden — sie sind Satzzeichen, kein Inhalt. */}
        <h1 className="h2 mt-4">
          {locales.map((code, i) => (
            <>
              {i > 0 && <span aria-hidden="true"> / </span>}
              <span lang={localeMeta[code].hreflang}>{translate('404.title', code)}</span>
            </>
          ))}
        </h1>
        <p className="lead mx-auto mt-4 max-w-md text-mute">{t('404.text')}</p>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          {locales.map((code) => (
            <a href={localePath(code, '/')} className={clsx(['btn', code === 'de' ? 'btn-primary' : 'btn-ghost'])} hrefLang={localeMeta[code].hreflang} lang={localeMeta[code].hreflang}>
              {translate('404.cta', code)}
            </a>
          ))}
        </div>

        <ul className="mt-14 grid gap-px overflow-hidden rounded-2xl border text-left sm:grid-cols-2" style={css("border-color: var(--line); background: var(--line);")}>
          {
            targets.map((target) => (
              <li className="bg-paper" key={target.href}>
                <a href={target.href} className="block h-full p-6 no-underline transition-colors hover:bg-paper-2">
                  <span className="font-display block text-lg font-bold tracking-tight">{target.label}</span>
                  <span className="mt-1.5 block text-[0.88rem] leading-snug text-mute">{target.desc}</span>
                </a>
              </li>
            ))
          }
        </ul>
      </section>
    </Base>
  );
}
