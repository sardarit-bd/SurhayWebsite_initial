import { scoped } from '../../lib/scoped';
import { css } from '../../lib/css';
import type { LangProp, PfadProp } from '../../lib/props';
import Base from '../../layouts/Base';
import PageHeader from '../PageHeader';
import ContactCta from '../ContactCta';
import { phases, workingRules } from '../../data/process';
import { useTranslations, path, altPaths } from '../../i18n/utils';

/**
 * Ablaufseite (/prozess, /en/process).
 *
 * Sechs Phasen, jede mit drei Spalten: was passiert, was Sie bekommen, was
 * wir von Ihnen brauchen. Die dritte Spalte ist der eigentliche Grund fuer
 * diese Seite — Webprojekte scheitern fast nie an der Technik, sondern
 * daran, dass Inhalte nicht kommen und das vorher niemand gesagt hat.
 */

export default function ProcessPage({ lang, pathname }: LangProp & PfadProp) {
  const t = useTranslations(lang);

  return scoped(
    'data-c-process-page',
    <Base pathname={pathname} lang={lang} title={t('page.process.metaTitle')} description={t('page.process.metaDesc')} alternates={altPaths('process')}>
      <PageHeader lang={lang} eyebrow={t('process.eyebrow')} title={t('process.title')} lead={t('page.process.lead')} crumbs={[{ label: t('nav.process') }]} />

      <section style={css("padding-bottom: var(--spacing-section);")}>
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <ol className="phase-list">
            {
              phases.map((phase) => (
                <li className="phase border-t py-10 md:py-14" style={css("border-color: var(--line);")} data-reveal="" data-step-mark="">
                  <div className="grid gap-8 lg:grid-cols-[16rem_1fr] lg:gap-14">
                    <div className="lg:sticky lg:top-28 lg:self-start">
                      <span className="phase-number font-display text-6xl font-bold tracking-tight md:text-7xl">{phase.index}</span>
                      <h2 className="h3 mt-4">{phase.title[lang]}</h2>
                      <p className="eyebrow mt-4 !text-[0.7rem] text-mute">{phase.duration[lang]}</p>
                    </div>

                    <div>
                      <p className="lead max-w-2xl text-mute">{phase.summary[lang]}</p>

                      <div className="mt-9 grid gap-8 md:grid-cols-2">
                        <div>
                          <h3 className="text-xs font-semibold uppercase tracking-wider text-mute">{t('page.process.work')}</h3>
                          <ul className="mt-4 space-y-2.5">
                            {phase.work[lang].map((item) => (
                              <li className="flex items-start gap-2.5 text-[0.93rem] leading-relaxed">
                                <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-accent-600" aria-hidden="true" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h3 className="text-xs font-semibold uppercase tracking-wider text-mute">{t('page.process.output')}</h3>
                          <ul className="mt-4 space-y-2.5">
                            {phase.output[lang].map((item) => (
                              <li className="flex items-start gap-2.5 text-[0.93rem] leading-relaxed">
                                <svg className="mt-1.5 h-3 w-3 flex-none text-accent-600" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                                  <path d="M2 7.5 5.5 11 12 3" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <p className="mt-8 rounded-xl border-l-2 py-3 pl-5 text-[0.93rem] leading-relaxed text-mute" style={css("border-color: var(--color-accent-400); background: var(--color-paper-2);")}>
                        <span className="font-semibold text-ink">{t('page.process.yourPart')}:</span> {phase.yourPart[lang]}
                      </p>
                    </div>
                  </div>
                </li>
              ))
            }
          </ol>
          <div className="border-t" style={css("border-color: var(--line);")}></div>
        </div>
      </section>

      {/* ------------------------------------------------ Regeln der Zusammenarbeit */}
      <section className="dark-section grain" style={css("padding-block: var(--spacing-section);")}>
        <div className="relative mx-auto max-w-7xl px-5 md:px-8">
          <h2 className="h2 h2-sm max-w-2xl" data-reveal="">{t('page.process.rulesTitle')}</h2>
          <p className="lead mt-5 max-w-2xl text-mute-dark" data-reveal="" style={css("--reveal-delay: 0.08s;")}>{t('page.process.rulesSub')}</p>

          <ol className="mt-12 grid gap-px overflow-hidden rounded-2xl border md:grid-cols-2" style={css("border-color: var(--line-dark); background: var(--line-dark);")}>
            {
              workingRules.map((rule, i) => (
                <li className="quiet-cell p-8" style={css(`background: var(--color-ink-2); --reveal-delay: calc(${(i % 2)} * var(--stagger));`)} data-reveal="">
                  <p className="font-display text-lg font-bold tracking-tight">{rule.title[lang]}</p>
                  <p className="mt-3 text-[0.93rem] leading-relaxed text-mute-dark">{rule.desc[lang]}</p>
                </li>
              ))
            }
          </ol>

          <div className="mt-12 flex flex-wrap gap-6">
            <a href={path(lang, 'pricing')} className="link-slide font-semibold">{t('nav.pricing')} <span aria-hidden="true">→</span></a>
            <a href={path(lang, 'faq')} className="link-slide font-semibold">{t('nav.faq')} <span aria-hidden="true">→</span></a>
            <a href={path(lang, 'services')} className="link-slide font-semibold">{t('nav.services')} <span aria-hidden="true">→</span></a>
          </div>
        </div>
      </section>

      <ContactCta lang={lang} />
    </Base>
  );
}

