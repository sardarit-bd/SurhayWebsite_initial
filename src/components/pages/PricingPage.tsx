import clsx from 'clsx';
import { css } from '../../lib/css';
import type { LangProp, PfadProp } from '../../lib/props';
import Base from '../../layouts/Base';
import PageHeader from '../PageHeader';
import ContactCta from '../ContactCta';
import { projectPlans, carePlans, addOns, priceFactors, alwaysIncluded, paymentTerms, type Plan } from '../../data/pricing';
import { useTranslations, path, altPaths } from '../../i18n/utils';

/**
 * Preisseite (/preise, /en/pricing).
 *
 * Vier Bloecke in der Reihenfolge, in der gefragt wird: Was kostet die
 * Website? Was kostet der Betrieb danach? Was kostet Zusaetzliches? Und:
 * Warum ist das eine Spanne und kein Preis?
 */

export default function PricingPage({ lang, pathname }: LangProp & PfadProp) {
  const t = useTranslations(lang);

  /* Beide Kartensaetze teilen sich dasselbe Markup — der einzige Unterschied
     ist der Zusatz „pro Monat“ bei der Wartung. */
  const planCards = (plans: Plan[], monthly: boolean) => plans.map((p) => ({ plan: p, monthly }));
  const projectCards = planCards(projectPlans, false);
  const careCards = planCards(carePlans, true);

  return (
    <Base pathname={pathname} lang={lang} title={t('page.pricing.metaTitle')} description={t('page.pricing.metaDesc')} alternates={altPaths('pricing')}>
      <PageHeader lang={lang} eyebrow={t('pricing.eyebrow')} title={t('pricing.title')} lead={t('page.pricing.lead')} crumbs={[{ label: t('nav.pricing') }]} />

      {/* --------------------------------------------------- Projektpakete */}
      <section style={css("padding-bottom: var(--spacing-section-sm);")}>
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <h2 className="sr-only">{t('page.pricing.projectsTitle')}</h2>
          <div className="price-grid grid gap-5 lg:grid-cols-3">
            {
              projectCards.map(({ plan, monthly }, i) => (
                <div className={clsx(['price-cell', plan.popular && 'price-cell--ink'])} style={css(`--reveal-delay: calc(${i} * var(--stagger));`)} data-reveal="">
                  <article className={clsx([
                      'price-card flex h-full flex-col rounded-2xl border p-8 md:p-9',
                      plan.popular ? 'dark-section' : 'price-card--light',
                    ])} style={css(`border-color: ${plan.popular ? 'transparent' : 'var(--line)'};`)}>
                    <h3 className="h3">{plan.name[lang]}</h3>
                    <p className={clsx(['mt-2 text-sm leading-relaxed', plan.popular ? 'text-mute-dark' : 'text-mute'])}>{plan.desc[lang]}</p>

                    <p className="mt-6">
                      {plan.from && (
                        <span className={clsx(['mr-2 text-sm font-medium', plan.popular ? 'text-mute-dark' : 'text-mute'])}>{t('common.from')}</span>
                      )}{' '}
                      <span className="font-display text-4xl font-bold tracking-tight">{plan.price[lang]}</span>{' '}
                      {monthly && <span className={clsx(['ml-2 text-sm', plan.popular ? 'text-mute-dark' : 'text-mute'])}>/ {t('common.perMonth')}</span>}
                    </p>
                    <p className={clsx(['mt-2 text-sm', plan.popular ? 'text-mute-dark' : 'text-mute'])}>{plan.timeline[lang]}</p>

                    <ul className="mt-7 flex-1 space-y-2.5 border-t pt-6 text-[0.92rem]" style={css(`border-color: ${plan.popular ? 'var(--line-dark)' : 'var(--line)'};`)}>
                      {plan.features[lang].map((feature) => (
                        <li className="flex items-start gap-2.5">
                          <svg className="mt-1.5 h-3 w-3 flex-none text-accent-ctx" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                            <path d="M2 7.5 5.5 11 12 3" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <p className={clsx(['mt-6 border-t pt-5 text-[0.85rem] leading-relaxed', plan.popular ? 'text-mute-dark' : 'text-mute'])} style={css(`border-color: ${plan.popular ? 'var(--line-dark)' : 'var(--line)'};`)}>
                      <span className="font-semibold">{t('page.pricing.fit')}:</span> {plan.fit[lang]}
                    </p>

                    {/* Anker statt Seitenwechsel: Das Anfrageformular steht am
                        Fuss dieser Seite (ContactCta). data-paket waehlt dort das
                        passende Paket vor. */}
                    {/* Paketname im zugaenglichen Namen — sonst stehen in der
                        Linkliste drei identische Eintraege (WCAG 2.4.4). */}
                    <a href="#anfrage" data-paket={plan.id} aria-label={`${t('pricing.cta')} — ${plan.name[lang]}`} className={clsx(['btn mt-7', plan.popular ? 'btn-primary' : 'btn-ghost'])}>
                      {t('pricing.cta')}
                    </a>
                  </article>
                  {plan.popular && (
                    <span className="price-badge absolute -top-3 right-8 rounded-full bg-accent-600 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
                      {t('pricing.popular')}
                    </span>
                  )}
                </div>
              ))
            }
          </div>
          <p className="mt-6 text-sm text-mute">{t('common.netHint')}</p>
        </div>
      </section>

      {/* ------------------------------------------------ In jedem Paket enthalten */}
      <section style={css("padding-block: var(--spacing-section-sm);")}>
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="grid gap-10 rounded-2xl border p-8 md:grid-cols-[1fr_1.6fr] md:p-12" style={css("border-color: var(--line); background: var(--color-paper-2);")} data-reveal="">
            <div>
              <h2 className="h2 h2-sm">{t('page.pricing.includedTitle')}</h2>
              <p className="mt-4 text-[0.95rem] leading-relaxed text-mute">{t('pricing.sub')}</p>
            </div>
            <ul className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
              {
                alwaysIncluded[lang].map((item) => (
                  <li className="flex items-start gap-2.5 text-[0.95rem] leading-relaxed">
                    <svg className="mt-1.5 h-3.5 w-3.5 flex-none text-accent-600" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                      <path d="M2 7.5 5.5 11 12 3" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {item}
                  </li>
                ))
              }
            </ul>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------- Wartung */}
      <section className="dark-section grain" style={css("padding-block: var(--spacing-section);")}>
        <div className="relative mx-auto max-w-7xl px-5 md:px-8">
          <p className="eyebrow text-mute-dark" data-reveal="">{t('services.3.badge')}</p>
          <h2 className="h2 h2-sm mt-5 max-w-2xl" data-reveal="">{t('page.pricing.careTitle')}</h2>
          <p className="lead mt-5 max-w-2xl text-mute-dark" data-reveal="" style={css("--reveal-delay: 0.08s;")}>{t('page.pricing.careSub')}</p>

          <div className="price-grid mt-12 grid gap-5 lg:grid-cols-3">
            {
              careCards.map(({ plan, monthly }, i) => (
                <div className="price-cell" style={css(`--reveal-delay: calc(${i} * var(--stagger));`)} data-reveal="">
                  <article className={clsx([
                      'price-card flex h-full flex-col rounded-2xl border p-8',
                      plan.popular && 'price-card--marked',
                    ])} style={css(`border-color: ${plan.popular ? 'var(--color-accent-400)' : 'var(--line-dark)'}; background: var(--color-ink-2);`)}>
                    <h3 className="h3">{plan.name[lang]}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-mute-dark">{plan.desc[lang]}</p>
                    <p className="mt-6">
                      {plan.from && <span className="mr-2 text-sm font-medium text-mute-dark">{t('common.from')}</span>}{' '}
                      <span className="font-display text-4xl font-bold tracking-tight">{plan.price[lang]}</span>{' '}
                      {monthly && <span className="ml-2 text-sm text-mute-dark">/ {t('common.perMonth')}</span>}
                    </p>
                    <p className="mt-2 text-sm text-mute-dark">{plan.timeline[lang]}</p>
                    <ul className="mt-7 flex-1 space-y-2.5 border-t pt-6 text-[0.92rem]" style={css("border-color: var(--line-dark);")}>
                      {plan.features[lang].map((feature) => (
                        <li className="flex items-start gap-2.5">
                          <svg className="mt-1.5 h-3 w-3 flex-none text-accent-ctx" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                            <path d="M2 7.5 5.5 11 12 3" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <p className="mt-6 border-t pt-5 text-[0.85rem] leading-relaxed text-mute-dark" style={css("border-color: var(--line-dark);")}>
                      <span className="font-semibold text-paper">{t('page.pricing.fit')}:</span> {plan.fit[lang]}
                    </p>
                  </article>
                  {plan.popular && (
                    <span className="price-badge absolute -top-3 right-8 rounded-full bg-accent-400 px-3 py-1 text-xs font-bold uppercase tracking-wider text-ink">
                      {t('pricing.popular')}
                    </span>
                  )}
                </div>
              ))
            }
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------ Zusatzleistungen */}
      <section style={css("padding-block: var(--spacing-section);")}>
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <h2 className="h2 h2-sm" data-reveal="">{t('page.pricing.addonsTitle')}</h2>
          <p className="lead mt-5 max-w-2xl text-mute" data-reveal="" style={css("--reveal-delay: 0.08s;")}>{t('page.pricing.addonsSub')}</p>

          <ul className="mt-12">
            {
              addOns.map((addon, i) => (
                <li className="grid gap-2 border-t py-7 md:grid-cols-[1fr_1.6fr_10rem] md:items-baseline md:gap-8" style={css(`border-color: var(--line); --reveal-delay: calc(${(i % 3)} * var(--stagger));`)} data-reveal="">
                  <p className="font-display text-lg font-bold tracking-tight">{addon.name[lang]}</p>
                  <p className="text-[0.93rem] leading-relaxed text-mute">{addon.desc[lang]}</p>
                  <p className="font-display text-lg font-bold tracking-tight md:text-right">{addon.price[lang]}</p>
                </li>
              ))
            }
          </ul>
          <div className="border-t" style={css("border-color: var(--line);")}></div>
        </div>
      </section>

      {/* -------------------------------------- Preisfaktoren + Zahlungsplan */}
      <section className="border-t" style={css("border-color: var(--line); background: var(--color-paper-2); padding-block: var(--spacing-section);")}>
        <div className="mx-auto grid max-w-7xl gap-14 px-5 md:px-8 lg:grid-cols-[1.5fr_1fr] lg:gap-20">
          <div>
            <h2 className="h2 h2-sm" data-reveal="">{t('page.pricing.factorsTitle')}</h2>
            <p className="lead mt-5 max-w-xl text-mute" data-reveal="" style={css("--reveal-delay: 0.08s;")}>{t('page.pricing.factorsSub')}</p>
            <dl className="mt-10 grid gap-7 sm:grid-cols-2">
              {
                priceFactors.map((factor) => (
                  <div className="border-l-2 pl-5" style={css("border-color: var(--color-accent-400);")}>
                    <dt className="font-display text-base font-bold tracking-tight">{factor.title[lang]}</dt>
                    <dd className="mt-2 text-[0.92rem] leading-relaxed text-mute">{factor.desc[lang]}</dd>
                  </div>
                ))
              }
            </dl>
          </div>

          <div data-reveal="" style={css("--reveal-delay: 0.12s;")}>
            <h2 className="h3">{t('page.pricing.paymentTitle')}</h2>
            <ol className="mt-8 space-y-6">
              {
                paymentTerms[lang].map((term, i) => (
                  <li className="flex gap-5">
                    <span className="font-display flex h-9 w-9 flex-none items-center justify-center rounded-full border text-sm font-bold" style={css("border-color: var(--line);")}>
                      {i + 1}
                    </span>
                    <div>
                      <p className="font-display text-base font-bold tracking-tight">{term.step}</p>
                      <p className="mt-1.5 text-[0.92rem] leading-relaxed text-mute">{term.desc}</p>
                    </div>
                  </li>
                ))
              }
            </ol>
            <a href={path(lang, 'configurator')} className="btn btn-ghost mt-9">
              {t('work.pending.cta')}
              <svg className="btn-arrow h-4 w-4" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M1 8h13M9 3l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
              </svg>
            </a>
          </div>
        </div>
      </section>

      <ContactCta lang={lang} />
    </Base>
  );
}

