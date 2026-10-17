import clsx from 'clsx';
import { scoped } from '../lib/scoped';
import { css } from '../lib/css';
import type { LangProp, PfadProp } from '../lib/props';
import { services } from '../data/services';
import ServiceIcon from './ServiceIcon';
import LanguageSwitcher from './LanguageSwitcher';
import { useTranslations, localePath, path, isActive } from '../i18n/utils';
import type { Lang } from '../i18n/ui';
import { InlineScript } from '../lib/inline-once';

/**
 * Kopfzeile — echte Desktop-Navigation, Burger nur noch auf Mobil/Tablet.
 *
 * Vorher trug jede Breite dasselbe Burger-Menue. Auf dem Desktop ist das ein
 * Fehler: Es versteckt die gesamte Seitenstruktur hinter einem Klick und
 * kostet damit genau das, was eine Agenturseite verkaufen soll — den
 * Ueberblick ueber die Leistungen. Ab `lg` steht die Navigation deshalb
 * offen in der Leiste; der Burger verschwindet komplett.
 *
 * AUFKLAPPMENUE OHNE JS
 * Die Leistungen oeffnen ueber :hover und :focus-within. Der Ausloeser ist
 * ein echter Link auf die Uebersichtsseite — Tastaturnutzer erreichen ihn
 * zuerst, wodurch die Flaeche sichtbar wird, bevor der naechste Tab-Schritt
 * hineinfuehrt. Das JS unten ergaenzt nur aria-expanded und die Escape-Taste.
 */
interface Props extends LangProp, PfadProp {
  alternates: Record<Lang, string>;
}
export default function Header({ alternates, lang, pathname }: Props) {
  const t = useTranslations(lang);
  const home = localePath(lang, '/');
  const here = pathname;

  const servicesHref = path(lang, 'services');
  const contactHref = path(lang, 'contact');

  const serviceLinks = services.map((s) => ({
    href: path(lang, 'services', s[lang].slug),
    label: s[lang].title,
    desc: s[lang].tagline,
    index: s.index,
    id: s.id,
  }));

  /* Hauptnavigation. `children` macht aus dem Punkt ein Aufklappmenue. */
  const navItems = [
    { href: servicesHref, label: t('nav.services'), children: serviceLinks },
    { href: path(lang, 'work'), label: t('nav.work'), children: null },
    { href: path(lang, 'process'), label: t('nav.process'), children: null },
    { href: path(lang, 'pricing'), label: t('nav.pricing'), children: null },
    { href: path(lang, 'about'), label: t('nav.about'), children: null },
    { href: path(lang, 'blog'), label: t('nav.blog'), children: null },
    { href: path(lang, 'faq'), label: t('nav.faq'), children: null },
  ];

  /* Im Burger-Menue zusaetzlich Kontakt — auf dem Desktop steckt der in der
     Schaltflaeche rechts. */
  const menuItems = [...navItems, { href: contactHref, label: t('nav.contact'), children: null }];

  /* Dieselben drei Rechtslinks wie in der Fusszeile — dort sind sie die
     verbindliche Stelle, hier stehen sie nur zusaetzlich am Ende des
     Burger-Menues. */
  const legalLinks = [
    { href: path(lang, 'imprint'), label: t('footer.imprint') },
    { href: path(lang, 'privacy'), label: t('footer.privacy') },
    { href: path(lang, 'cookies'), label: t('footer.cookies') },
  ];

  return (
    <>
      {scoped(
        'data-c-header',
        <header className="fixed inset-x-0 top-0 z-[var(--z-leiste)]">
          <div className="header-bar relative z-[var(--z-leiste)] mx-auto flex h-[var(--header-h)] max-w-7xl items-center gap-4 px-5 md:px-8">
            {/* Der zugaengliche Name enthaelt den sichtbaren Text („Surhay Design"),
                sonst findet Sprachsteuerung den Link nicht (WCAG 2.5.3). */}
            <a href={home} className="group flex flex-none items-baseline gap-0.5" aria-label={`Surhay Design — ${t('nav.home')}`}>
              <span className="brand-main font-display text-[1.35rem] font-bold tracking-tight">Surhay</span>
              <span className="pulse-dot inline-block h-2 w-2 rounded-full bg-accent-600" aria-hidden="true"></span>
              <span className="brand-sub font-display text-[1.35rem] font-light tracking-tight text-mute">Design</span>
            </a>

            {/* ------------------------------------------------ Desktop-Navigation */}
            <nav className="desktop-nav flex-1 justify-center" aria-label={t('nav.mainLabel')}>
              <ul className="flex items-center gap-1">
                {
                  navItems.map((item) => {
                    const active = isActive(here, item.href);
                    return (
                      <li className={clsx(['nav-item relative', item.children && 'has-menu'])}>
                        <a href={item.href} className={clsx(['nav-link', active && 'is-active'])} aria-current={active ? 'page' : undefined} /* Kein aria-haspopup: das bedeutet „Menue-Widget" und
                              verspricht Pfeiltasten-Bedienung, die es hier nicht gibt.
                              Was aufklappt, ist eine Liste von Links — dafuer ist
                              aria-expanded allein das richtige Muster. */ aria-expanded={item.children ? 'false' : undefined}>
                          {item.label}
                          {item.children && (
                            <svg className="nav-caret h-2.5 w-2.5" viewBox="0 0 10 6" fill="none" aria-hidden="true">
                              <path d="M1 1.5 5 5l4-3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          )}
                        </a>

                        {item.children && (
                          <div className="nav-panel absolute left-0 top-full w-[min(36rem,calc(100vw-3rem))] pt-3">
                            <div className="overflow-hidden rounded-2xl border bg-paper shadow-[0_28px_60px_-30px_rgb(10_10_11/0.45)]" style={css("border-color: var(--line);")}>
                              <ul className="grid grid-cols-2 gap-px" style={css("background: var(--line);")}>
                                {item.children.map((child) => {
                                  const childActive = isActive(here, child.href, true);
                                  return (
                                    <li className="bg-paper">
                                      <a href={child.href} className={clsx(['panel-link flex h-full gap-3 p-5', childActive && 'is-active'])} aria-current={childActive ? 'page' : undefined}>
                                        {/* Die einzige Stelle, an der alle vier Zeichen nebeneinander
                                            stehen — deshalb in einer Spalte, so laesst sich die
                                            Liste am Icon entlang lesen. */}
                                        <ServiceIcon service={child.id} size={20} className="nav-icon" />
                                        <span className="min-w-0 flex-1">
                                          <span className="flex items-baseline gap-2.5">
                                            <span className="font-display text-[0.7rem] font-semibold tracking-widest text-mute">{child.index}</span>
                                            <span className="font-display text-[1.02rem] font-bold tracking-tight">{child.label}</span>
                                          </span>
                                          <span className="mt-1.5 block text-[0.83rem] leading-snug text-mute">{child.desc}</span>
                                        </span>
                                      </a>
                                    </li>
                                  );
                                })}
                              </ul>
                              <div className="flex items-center justify-between gap-4 border-t px-5 py-4" style={css("border-color: var(--line); background: var(--color-paper-2);")}>
                                <p className="max-w-[20rem] text-[0.8rem] leading-snug text-mute">{t('nav.servicesHint')}</p>
                                <a href={servicesHref} className="link-slide flex-none text-sm font-semibold">
                                  {t('nav.allServices')} <span aria-hidden="true">→</span>
                                </a>
                              </div>
                            </div>
                          </div>
                        )}
                      </li>
                    );
                  })
                }
              </ul>
            </nav>

            <div className="header-right ml-auto flex flex-none items-center gap-3">
              <LanguageSwitcher lang={lang} alternates={alternates} />

              <a href={contactHref} className="header-cta btn btn-primary btn-sm">{t('nav.cta')}</a>

              {/* Nur bis lg: darueber traegt die offene Navigation die Struktur. */}
              <button id="menu-toggle" type="button" className="menu-toggle relative z-[var(--z-leiste)] flex h-11 w-11 items-center justify-center" aria-expanded="false" aria-controls="mobile-menu" aria-label={t('nav.menuOpen')} data-label-open={t('nav.menuOpen')} data-label-close={t('nav.menuClose')}>
                <span className="menu-lines relative block h-[2px] w-5 bg-current"></span>
              </button>
            </div>
          </div>

          {/* ------------------------------- Burger-Menue (unter der Schwelle)
              role="dialog" + aria-modal: Solange es offen ist, ist es die ganze
              Seite. Der Hintergrund liegt bereits auf `inert` (siehe Skript); die
              Rolle sagt einem Screenreader zusaetzlich, dass er sich in einem
              Dialog befindet und ihn mit Escape verlassen kann. */}
          <div id="mobile-menu" className="menu-sheet invisible fixed inset-x-0 top-0 z-[var(--z-blatt)] flex flex-col bg-ink text-paper opacity-0" role="dialog" aria-modal="true" aria-label={t('nav.menuLabel')} tabIndex={-1}>
            {/* Das Blatt selbst scrollt NICHT. Es ist eine Spalte aus zwei Teilen:
                oben eine Polsterung in Hoehe der Leiste, darunter der scrollende
                Bereich. Dadurch beginnt der Inhalt unter der Kopfzeile und kommt
                auch beim Scrollen nie wieder hervor — die Polsterung gehoert dem
                Blatt, nicht dem Inhalt, und scrollt deshalb nicht mit weg. */}
            <div className="menu-scroll">
              <div className="menu-inner">
                <nav className="mx-auto flex w-full max-w-2xl flex-col gap-1" aria-label={t('nav.mainLabel')}>
                  {
                    menuItems.map((item, i) => (
                      <a href={item.href} className={clsx(['menu-item font-display border-b py-3 text-[1.55rem] font-bold tracking-tight md:text-[1.9rem]', isActive(here, item.href) && 'is-active'])} aria-current={isActive(here, item.href) ? 'page' : undefined} style={css(`border-color: var(--line-dark); transition-delay: ${50 + i * 30}ms;`)}>
                        {item.label}
                      </a>
                    ))
                  }
                  {/* Leistungen ausgeklappt statt versteckt — auf Mobil gibt es keinen Hover. */}
                  <ul className="menu-item mt-5 grid gap-2" style={css("transition-delay: 320ms;")}>
                    {
                      serviceLinks.map((child) => (
                        <li>
                          <a href={child.href} className="menu-service link-slide text-[0.95rem] text-mute-dark">
                            <ServiceIcon service={child.id} size={20} className="nav-icon" />
                            <span><span className="font-semibold text-paper">{child.index}</span> {child.label}</span>
                          </a>
                        </li>
                      ))
                    }
                  </ul>
                </nav>
                <div className="mx-auto w-full max-w-2xl">
                  <div className="menu-item pt-8" style={css("transition-delay: 380ms;")}>
                    <a href={contactHref} className="btn btn-primary">{t('nav.cta')}</a>
                  </div>
                  {/* Alle drei Sprachen offen — auf Mobil gibt es kein Aufklappen. */}
                  <LanguageSwitcher lang={lang} alternates={alternates} variant="list" className="menu-item mt-8" />
                  <div className="menu-item mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-mute-dark" style={css("transition-delay: 460ms;")}>
                    {legalLinks.map((link) => (
                      <a href={link.href} className="menu-legal link-slide tap-24 inline-flex items-center">{link.label}</a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Das Skript des Sprachumschalters steht INNERHALB des <header> —
              genau dort lieferte es auch Astro aus (gemessen: Position 96 der
              Startseite, mitten im Header, waehrend das Header-Skript direkt
              danach folgt). Der Ort ist nicht bloss Kosmetik: das Mobilmenue
              setzt beim Oeffnen `inert` und `aria-hidden` auf alle
              Geschwister des <header>, und ein Skript-Tag mehr auf dieser
              Ebene aendert deren Zahl. Wirkung hat das keine (ein <script>
              ist weder sichtbar noch fokussierbar), aber der Zustand ist so
              derselbe wie vorher.

              Der Umschalter gibt sein Skript nicht selbst aus, weil er hier
              ZWEIMAL steht — als Dropdown und als Liste im Mobilmenue. Zwei
              Ausgaben wuerden die Klick-Handler doppelt binden und das
              Dropdown ginge auf und sofort wieder zu. Siehe
              LanguageSwitcher.tsx. */}
          <InlineScript name="language-switcher" />
        </header>
      )}
      <InlineScript name="header" />
    </>
  );
}
