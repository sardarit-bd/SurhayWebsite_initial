import clsx from 'clsx';
import { scoped } from '../lib/scoped';
import type { LangProp } from '../lib/props';
import { useTranslations, withBase } from '../i18n/utils';
import { locales, localeMeta, type Lang } from '../i18n/ui';

/**
 * HINWEIS ZUM SKRIPT
 * Das Bauteil gibt sein <script> NICHT selbst aus — Header.tsx tut es, weil
 * Header den Umschalter ZWEIMAL rendert: als Dropdown fuer die Desktop-Leiste
 * und als Liste im Mobilmenue. Zweimal ausgegeben wuerde das Skript seine
 * Klick-Handler doppelt binden, `setOpen(!open)` liefe zweimal pro Klick und
 * das Dropdown ginge auf und sofort wieder zu. Astro buendelte pro Seite
 * einmal; hier sorgt die Aufrufstelle dafuer.
 *
 * Sprachumschalter — Flagge UND Textlabel, in drei Sprachen.
 *
 * ZWEI DARSTELLUNGEN, EINE QUELLE
 * `variant="dropdown"` steht in der Kopfleiste rechts neben der Navigation:
 * Bei sieben Navigationspunkten plus Schaltflaeche bleiben ab 1024 px keine
 * 150 px fuer eine dreiteilige Segmentleiste uebrig — die Auswahl klappt
 * deshalb auf. `variant="list"` steht im Burger-Menue, wo Platz fuer alle
 * drei Sprachen nebeneinander ist (Ziele mind. 44 px hoch).
 *
 * NIE NUR DIE FLAGGE
 * Jede Option traegt Kuerzel bzw. Sprachnamen. Flaggen sind fuer Screenreader
 * unsichtbar, in 12 px kaum unterscheidbar und bezeichnen Staaten, keine
 * Sprachen — sie sind hier Schmuck (aria-hidden), die Bedeutung traegt der
 * Text. Der Sprachname steht in der Zielsprache („Türkçe“, nicht „Türkisch“).
 *
 * ZIEL BLEIBT DIE AKTUELLE SEITE
 * `alternates` kommt aus Base.astro und damit aus derselben Tabelle wie die
 * hreflang-Angaben (i18n/utils.ts → routes). Von /leistungen fuehrt TR auf
 * /tr/hizmetler, nicht auf die Startseite. Fehlt eine Sprachfassung, zeigt
 * der Eintrag auf die Sammelseite bzw. Startseite dieser Sprache.
 *
 * KEINE AUTOMATISCHE UMLEITUNG
 * Weder Accept-Language noch ein gemerkter Wert leiten hier um. Die Sprache
 * waehlt ausschliesslich, wer klickt — sonst waeren geteilte Links kaputt und
 * die Indexierung unklar. Aus demselben Grund gibt es keinen localStorage-
 * Eintrag: Welche Sprache aktiv ist, steht in der URL, nicht im Browser.
 */
interface Props extends LangProp {
  alternates: Record<Lang, string>;
  variant?: 'dropdown' | 'list';
  /** Hiess unter Astro `class`. */
  className?: string;
}
export default function LanguageSwitcher({ alternates, variant = 'dropdown', className: extraClass, lang }: Props) {
  const t = useTranslations(lang);

  const options = locales.map((code) => ({
    code,
    meta: localeMeta[code],
    href: alternates[code],
    current: code === lang,
  }));
  const active = localeMeta[lang];

  /* Flaggenhoehe in px — Breite folgt aus dem Seitenverhaeltnis des Originals
     (DE 5:3, TR 3:2, GB 5:3). Nichts wird ins Quadrat gepresst. */
  const FLAG_H = 12;

  /* Alle Flaggen `eager`, auch die im zugeklappten Menue: `loading="lazy"`
     laedt in einem Container mit `visibility: hidden` nicht — die Flaggen
     blieben dauerhaft leer, weil das Aufklappen den Ladevorgang nicht
     nachtraegt. Drei SVGs mit zusammen rund 1,3 kB rechtfertigen kein
     Nachladen. */
  const flagSize = (ratio: number) => ({ width: Math.round(FLAG_H * ratio), height: FLAG_H });

  return (
    <>
      {scoped(
        'data-c-language-switcher',
        <>
        {
          variant === 'dropdown' ? (
            <div className={clsx(['lang', extraClass])} data-lang-switcher="">
              <button type="button" className="lang-button" aria-expanded="false" aria-controls="lang-menu" /* Kein aria-haspopup: „true" bedeutet Menue-Widget und verspricht
                    Pfeiltasten-Bedienung. Was hier aufklappt, ist eine Liste von
                    Links — dafuer ist aria-expanded allein das richtige Muster
                    (WCAG 4.1.2). */ data-lang-toggle="">
                <span className="sr-only">{t('nav.langSwitch')} — {t('nav.langCurrent')}:</span>
                <img className="flag" src={withBase(`/flags/${active.flag.file}`)} alt="" aria-hidden="true" {...flagSize(active.flag.ratio)} loading="eager" decoding="async" />
                <span className="lang-code" lang={active.hreflang}>{active.short}</span>
                <svg className="lang-caret" viewBox="0 0 10 6" fill="none" aria-hidden="true">
                  <path d="M1 1.5 5 5l4-3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              <ul id="lang-menu" className="lang-menu" aria-label={t('nav.langSwitch')} data-lang-menu="">
                {options.map((option) => (
                  <li>
                    <a href={option.href} className={clsx(['lang-option', option.current && 'is-current'])} hrefLang={option.meta.hreflang} lang={option.meta.hreflang} aria-current={option.current ? 'true' : undefined} data-lang-link="">
                      <img className="flag" src={withBase(`/flags/${option.meta.flag.file}`)} alt="" aria-hidden="true" {...flagSize(option.meta.flag.ratio)} loading="eager" decoding="async" />
                      <span className="lang-name">{option.meta.native}</span>
                      <span className="lang-short" aria-hidden="true">{option.meta.short}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <nav className={clsx(['lang-list', extraClass])} aria-label={t('nav.langSwitch')}>
              <p className="lang-list-label">{t('nav.langSwitch')}</p>
              <ul className="lang-list-items">
                {options.map((option) => (
                  <li>
                    <a href={option.href} className={clsx(['lang-tile', option.current && 'is-current'])} hrefLang={option.meta.hreflang} lang={option.meta.hreflang} aria-current={option.current ? 'true' : undefined} data-lang-link="">
                      <img className="flag" src={withBase(`/flags/${option.meta.flag.file}`)} alt="" aria-hidden="true" {...flagSize(option.meta.flag.ratio)} loading="eager" decoding="async" />
                      <span className="lang-tile-text">
                        <span className="lang-short-strong" aria-hidden="true">{option.meta.short}</span>
                        <span className="lang-name">{option.meta.native}</span>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          )
        }
        </>
      )}
    </>
  );
}
