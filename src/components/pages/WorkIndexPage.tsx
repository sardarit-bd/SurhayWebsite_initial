import { scoped } from '../../lib/scoped';
import { css } from '../../lib/css';
import type { LangProp, PfadProp } from '../../lib/props';
import { getCollection } from '../../lib/content';
import Base from '../../layouts/Base';
import PageHeader from '../PageHeader';
import ContactCta from '../ContactCta';
import { useTranslations, path, altPaths, splitId, withBase, formatNumber } from '../../i18n/utils';
import type { CaseStudyData } from '../../content.config';
import { InlineScript } from '../../lib/inline-once';

/**
 * Projektuebersicht (/projekte, /en/work).
 *
 * Bisher gab es nur Detailseiten unter /projekte/<slug> und keine Uebersicht
 * — die Karten der Startseite verlinkten direkt hinein. Eine eigene Seite
 * braucht es, sobald „Projekte“ ein Navigationspunkt ist.
 *
 * Wie auf der Startseite gilt: Nur Case Studies mit `real: true` werden
 * gezeigt. Ist keine freigegeben, steht hier der ehrliche Zwischenstand
 * statt eines leeren Rasters — inklusive der Wege, die stattdessen tragen.
 */

export default async function WorkIndexPage({ lang, pathname }: LangProp & PfadProp) {
  const t = useTranslations(lang);

  const all = await getCollection<CaseStudyData>('case-studies', ({ id, data }) => splitId(id).lang === lang && data.real);
  const cases = all.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
  const industries = [...new Set(cases.map((c) => c.data.industry))];

  const pendingPoints = [1, 2, 3].map((n) => ({
    title: t(`work.pending.${n}.title` as Parameters<typeof t>[0]),
    desc: t(`work.pending.${n}.desc` as Parameters<typeof t>[0]),
  }));

  return (
    <>
      {scoped(
        'data-c-work-index-page',
        <Base pathname={pathname} lang={lang} title={t('page.work.metaTitle')} description={t('page.work.metaDesc')} alternates={altPaths('work')}>
          <PageHeader lang={lang} eyebrow={t('work.eyebrow')} title={cases.length > 0 ? t('work.title') : t('work.pending.title')} lead={cases.length > 0 ? t('page.work.lead') : t('work.pending.sub')} crumbs={[{ label: t('nav.work') }]} />

          <section style={css("padding-bottom: var(--spacing-section);")}>
            <div className="mx-auto max-w-7xl px-5 md:px-8">
              {
                cases.length > 0 ? (
                  <>
                    {industries.length > 1 && (
                      <div className="flex flex-wrap gap-2.5" role="group" aria-label="Filter" data-reveal="">
                        <button className="filter-btn is-active rounded-full border px-5 py-2.5 text-sm font-semibold transition-colors" data-filter="all" aria-pressed="true">
                          {t('work.filter.all')}
                        </button>
                        {industries.map((industry) => (
                          <button className="filter-btn rounded-full border px-5 py-2.5 text-sm font-semibold transition-colors" data-filter={industry} aria-pressed="false">
                            {industry}
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Ergebnisstand als Statusmeldung: Der Filter blendet Karten
                        aus, ohne dass sich Fokus oder Ueberschrift aendern — ohne
                        Ansage merkt jemand mit Screenreader nichts davon
                        (WCAG 4.1.3). role="status" meldet hoeflich, ohne den Fokus
                        zu verschieben. */}
                    <p id="case-count" className="sr-only" role="status" data-count-template={t('work.filterCount')}></p>
                    <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3" id="case-grid">
                      {cases.map((entry, i) => {
                        const { slug } = splitId(entry.id);
                        const kpi = entry.data.results[0];
                        return (
                          <a href={path(lang, 'work', slug)} className="case-card group flex flex-col overflow-hidden rounded-2xl border bg-white" style={css(`border-color: var(--line); --reveal-delay: calc(${(i % 3)} * var(--stagger));`)} data-industry={entry.data.industry} data-reveal="">
                            <div className="overflow-hidden">
                              <img src={withBase(entry.data.cover)} alt={entry.data.coverAlt} width="800" height="600" loading="lazy" decoding="async" className="case-image aspect-[4/3] w-full object-cover group-hover:scale-[1.04]" />
                            </div>
                            <div className="flex flex-1 flex-col p-6">
                              <p className="text-xs font-semibold uppercase tracking-wider text-mute">
                                {entry.data.client} · {entry.data.industry}
                              </p>
                              <h2 className="mt-3 flex items-start justify-between gap-4 font-display text-xl font-bold tracking-tight">
                                {entry.data.title}
                                <svg className="case-arrow mt-1.5 h-3.5 w-3.5 flex-none group-hover:translate-x-1" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                                  <path d="M1 8h13M9 3l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                              </h2>
                              <p className="mt-3 flex-1 text-[0.92rem] leading-relaxed text-mute">{entry.data.excerpt}</p>
                              {kpi && (
                                <p className="mt-5 border-t pt-4 text-sm text-mute" style={css("border-color: var(--line);")}>
                                  <span className="font-display text-lg font-bold text-accent-600">
                                    {kpi.prefix ?? ''}
                                    {formatNumber(kpi.value, lang)}
                                    {kpi.suffix ?? ''}
                                  </span>{' '}
                                  {kpi.label}
                                </p>
                              )}
                              <span className="sr-only">{t('work.viewCase')}</span>
                            </div>
                          </a>
                        );
                      })}
                    </div>

                    <p id="case-empty" className="mt-10 hidden text-mute">{t('work.empty')}</p>
                  </>
                ) : (
                  /* Kein freigegebenes Projekt: zeigen, was stattdessen ueberpruefbar ist. */
                  <div className="grid gap-5 md:grid-cols-3">
                    {pendingPoints.map((point, i) => (
                      <div className="rounded-2xl border p-8" style={css(`border-color: var(--line); background: var(--color-paper-2); --reveal-delay: calc(${i} * var(--stagger));`)} data-reveal="">
                        <p className="font-display text-lg font-bold tracking-tight">{point.title}</p>
                        <p className="mt-3 text-[0.93rem] leading-relaxed text-mute">{point.desc}</p>
                      </div>
                    ))}
                  </div>
                )
              }

              {
                cases.length === 0 && (
                  <div className="mt-12 flex flex-wrap items-center gap-4" data-reveal="" style={css("--reveal-delay: 0.24s;")}>
                    <a href={path(lang, 'configurator')} className="btn btn-primary">
                      {t('work.pending.cta')}
                      <svg className="btn-arrow h-4 w-4" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                        <path d="M1 8h13M9 3l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </a>
                    <a href={path(lang, 'pricing')} className="btn btn-ghost">{t('work.pending.ctaSecondary')}</a>
                  </div>
                )
              }
            </div>
          </section>

          <ContactCta lang={lang} />
        </Base>
      )}
      <InlineScript name="work-index-page" />
    </>
  );
}

