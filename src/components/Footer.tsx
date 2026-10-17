import { scoped } from '../lib/scoped';
import { css } from '../lib/css';
import type { LangProp, PfadProp } from '../lib/props';
import { SITE } from '../config';
import { services } from '../data/services';
import { useTranslations, localePath, path, isActive } from '../i18n/utils';

/**
 * Fusszeile — vollstaendige Seitenuebersicht.
 *
 * Bei einer Multipage-Seite ist der Footer die zweite Navigation: Er zeigt
 * auf einen Blick, was es alles gibt, und faengt Punkte auf, die oben
 * bewusst nicht stehen (FAQ, Konfigurator, Rechtstexte).
 */

export default function Footer({ lang, pathname }: LangProp & PfadProp) {
  const t = useTranslations(lang);
  const home = localePath(lang, '/');
  const year = new Date().getFullYear();

  /**
   * Rechtslinks der unteren Zeile.
   *
   * Sie stehen bewusst hier und nicht in einer der Spalten oben: Impressum und
   * Datenschutzerklaerung muessen von jeder Seite aus unmittelbar erreichbar
   * sein — nicht hinter einem Aufklapper, nicht nur im Mobilmenue. Die untere
   * Zeile ist der einzige Bereich, den jede Seite in identischer Form traegt.
   *
   * „Cookie-Einstellungen“ fuehrt hier auf eine Seite statt auf einen Dialog:
   * Es gibt nichts einzustellen, weil die Website keine einwilligungs-
   * pflichtigen Ressourcen laedt (siehe src/pages/cookie-einstellungen.astro).
   * Ein Dialog mit Schaltern, die nichts tun, waere eine Behauptung.
   */
  const legalLinks = [
    { href: path(lang, 'imprint'), label: t('footer.imprint') },
    { href: path(lang, 'privacy'), label: t('footer.privacy') },
    { href: path(lang, 'cookies'), label: t('footer.cookies') },
  ];

  const here = pathname;

  const columns = [
    {
      title: t('footer.servicesCol'),
      links: [
        ...services.map((s) => ({ href: path(lang, 'services', s[lang].slug), label: s[lang].title, external: false })),
        { href: path(lang, 'services'), label: t('nav.allServices'), external: false },
      ],
    },
    {
      title: t('footer.company'),
      links: [
        { href: path(lang, 'about'), label: t('nav.about'), external: false },
        { href: path(lang, 'process'), label: t('nav.process'), external: false },
        { href: path(lang, 'work'), label: t('nav.work'), external: false },
        { href: path(lang, 'pricing'), label: t('nav.pricing'), external: false },
      ],
    },
    {
      title: t('footer.resources'),
      links: [
        { href: path(lang, 'blog'), label: t('nav.blog'), external: false },
        { href: path(lang, 'faq'), label: t('nav.faq'), external: false },
        { href: path(lang, 'configurator'), label: t('contact.configurator'), external: false },
      ],
    },
    {
      title: t('footer.social'),
      links: [
        { href: SITE.social.linkedin, label: 'LinkedIn', external: true },
        { href: SITE.social.instagram, label: 'Instagram', external: true },
        { href: SITE.social.github, label: 'GitHub', external: true },
      ],
    },
  ];

  return scoped(
    'data-c-footer',
    <footer className="dark-section grain" style={css("border-top: 1px solid var(--line-dark);")}>
      <div className="relative mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr_1fr]">
          <div>
            <a href={home} className="group inline-flex items-baseline gap-0.5" aria-label={`Surhay Design — ${t('nav.home')}`}>
              <span className="font-display text-2xl font-bold tracking-tight">Surhay</span>
              <span className="pulse-dot inline-block h-2 w-2 rounded-full bg-accent-ctx" aria-hidden="true"></span>
              <span className="font-display text-2xl font-light tracking-tight text-mute-dark">Design</span>
            </a>
            <p className="mt-4 max-w-xs text-mute-dark">{t('footer.tagline')}</p>
            <a href={`mailto:${SITE.email}`} className="link-slide tap-24 mt-6 inline-block font-semibold">{SITE.email}</a>
            <p className="mt-2 text-sm text-mute-dark">{SITE.city}, {t('common.country')}</p>
            <a href={path(lang, 'contact')} className="btn btn-ghost btn-sm mt-6">
              {t('nav.cta')}
              <svg className="btn-arrow h-3.5 w-3.5" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M1 8h13M9 3l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
              </svg>
            </a>
          </div>

          {
            columns.map((col) => (
              <nav aria-label={col.title}>
                <h2 className="eyebrow mb-5 text-mute-dark">{col.title}</h2>
                <ul className="space-y-3">
                  {col.links.map((link) => (
                    <li>
                      {/* tap-24: Ein Textlink dieser Groesse ist rund 22 px hoch —
                          knapp unter den 24 px aus WCAG 2.5.8. Die Klasse legt
                          eine unsichtbare Flaeche darueber, ohne das Satzbild zu
                          aendern (Definition in global.css).
                          Der Zusatz bei externen Zielen sagt vorher an, dass sich
                          ein neuer Tab oeffnet — ein Wechsel, der sonst
                          unangekuendigt kommt. */}
                      <a href={link.href} className="link-slide tap-24 text-[0.95rem]" rel={link.external ? 'noopener noreferrer' : undefined} target={link.external ? '_blank' : undefined}>
                        {link.label}
                        {link.external && <span className="sr-only"> ({t('nav.newTab')})</span>}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            ))
          }
        </div>

        <div className="footer-bottom mt-16 pt-8 text-sm text-mute-dark" style={css("border-top: 1px solid var(--line-dark);")}>
          <p className="footer-bottom__copy">© {year} {SITE.name}. {t('footer.rights')}</p>

          <nav className="footer-legal" aria-label={t('footer.legal')}>
            <ul>
              {
                legalLinks.map((link, i) => (
                  <li>
                    {i > 0 && <span className="footer-legal__sep" aria-hidden="true">·</span>}
                    <a href={link.href} className="footer-legal__link tap-24" aria-current={isActive(here, link.href, true) ? 'page' : undefined}>
                      {link.label}
                    </a>
                  </li>
                ))
              }
            </ul>
          </nav>

          <p className="footer-bottom__made">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent-ctx" aria-hidden="true"></span>
            {t('footer.madeIn')}
          </p>
        </div>
      </div>
    </footer>
  );
}

