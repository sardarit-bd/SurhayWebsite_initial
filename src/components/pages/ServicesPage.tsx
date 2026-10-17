import { scoped } from '../../lib/scoped';
import { css } from '../../lib/css';
import type { LangProp, PfadProp } from '../../lib/props';
import Base from '../../layouts/Base';
import PageHeader from '../PageHeader';
import ContactCta from '../ContactCta';
import ServiceIcon from '../ServiceIcon';
import { services } from '../../data/services';
import { useTranslations, path, altPaths } from '../../i18n/utils';

/**
 * Leistungsuebersicht (/leistungen, /en/services).
 *
 * Die Startseite nennt die vier Leistungen nur; hier bekommt jede eine
 * eigene Karte mit Lieferumfang, Preisrahmen und Dauer — und einen Weg auf
 * die Detailseite. Das ist der Knotenpunkt der neuen Seitenstruktur: Von hier
 * fuehrt jeder Weg entweder tiefer in eine Leistung oder ins Gespraech.
 */

export default function ServicesPage({ lang, pathname }: LangProp & PfadProp) {
  const t = useTranslations(lang);

  return scoped(
    'data-c-services-page',
    <Base pathname={pathname} lang={lang} title={t('page.services.metaTitle')} description={t('page.services.metaDesc')} alternates={altPaths('services')}>
      <PageHeader lang={lang} eyebrow={t('services.eyebrow')} title={t('page.services.title')} lead={t('page.services.lead')} crumbs={[{ label: t('nav.services') }]} />

      <section style={css("padding-bottom: var(--spacing-section);")}>
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <ol className="grid gap-5 lg:grid-cols-2">
            {
              services.map((service, i) => {
                const copy = service[lang];
                return (
                  <li className="service-card fx-fill fx-card flex flex-col rounded-2xl border bg-white p-8 md:p-10" style={css(`border-color: var(--line); --reveal-delay: calc(${(i % 2)} * var(--stagger));`)} data-reveal="">
                    <div className="flex items-start justify-between gap-6">
                      <span className="fx-dim font-display text-sm font-semibold tracking-widest text-mute">{service.index}</span>
                      <ServiceIcon service={service.id} size={28} className="text-accent-600" />
                    </div>

                    <h2 className="h3 mt-6">
                      <a href={path(lang, 'services', copy.slug)} className="card-cover">
                        {copy.title}
                      </a>
                    </h2>
                    <p className="mt-3 leading-relaxed text-mute">{copy.tagline}</p>

                    <ul className="fx-list mt-7 grid gap-2.5 border-t pt-6 text-[0.92rem]" style={css("border-color: var(--line);")}>
                      {copy.deliverables.slice(0, 4).map((item) => (
                        <li className="flex items-start gap-2.5">
                          <svg className="mt-1.5 h-3 w-3 flex-none text-accent-600" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                            <path d="M2 7.5 5.5 11 12 3" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                          {item.title}
                        </li>
                      ))}
                    </ul>

                    <dl className="mt-7 flex flex-wrap gap-x-10 gap-y-3 border-t pt-6 text-sm" style={css("border-color: var(--line);")}>
                      <div>
                        <dt className="fx-dim text-xs font-semibold uppercase tracking-wider text-mute">{t('pricing.eyebrow')}</dt>
                        <dd className="mt-1 font-semibold">{copy.priceHint}</dd>
                      </div>
                      <div>
                        <dt className="fx-dim text-xs font-semibold uppercase tracking-wider text-mute">{t('process.eyebrow')}</dt>
                        <dd className="mt-1 font-semibold">{copy.duration}</dd>
                      </div>
                    </dl>

                    <p className="mt-8">
                      <span className="inline-flex items-center gap-2 text-sm font-semibold text-accent-600">
                        {t('common.readMore')}
                        <svg className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                          <path d="M1 8h13M9 3l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                    </p>
                  </li>
                );
              })
            }
          </ol>

          {/* Wie die vier zusammenspielen — beantwortet die Frage, ob man alles buchen muss. */}
          <div className="mt-16 grid gap-8 rounded-2xl border p-8 md:grid-cols-[1fr_1.4fr] md:p-10" style={css("border-color: var(--line); background: var(--color-paper-2);")} data-reveal="">
            <h2 className="h3">{t('page.services.combineTitle')}</h2>
            <div>
              <p className="leading-relaxed text-mute">{t('page.services.combineText')}</p>
              <div className="mt-6 flex flex-wrap gap-4">
                <a href={path(lang, 'process')} className="link-slide font-semibold">{t('nav.process')} <span aria-hidden="true">→</span></a>
                <a href={path(lang, 'pricing')} className="link-slide font-semibold">{t('nav.pricing')} <span aria-hidden="true">→</span></a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ContactCta lang={lang} />
    </Base>
  );
}

