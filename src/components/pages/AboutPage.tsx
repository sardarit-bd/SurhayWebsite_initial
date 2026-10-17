import { css } from '../../lib/css';
import type { LangProp, PfadProp } from '../../lib/props';
import Base from '../../layouts/Base';
import PageHeader from '../PageHeader';
import ContactCta from '../ContactCta';
import { SITE, ownerName } from '../../config';
import { story, principles, stackGroups, notOurThing, facts } from '../../data/studio';
import { useTranslations, path, altPaths, withBase } from '../../i18n/utils';

/**
 * Agenturseite (/agentur, /en/about).
 *
 * Zweck: die Frage „mit wem habe ich es zu tun?“ ausfuehrlich beantworten,
 * bevor jemand einen vierstelligen Betrag freigibt. Der Block „Was wir nicht
 * machen“ steht bewusst mit drauf — eine Absage vorab spart beiden Seiten
 * ein Erstgespraech, das ohnehin nicht passt.
 */

export default function AboutPage({ lang, pathname }: LangProp & PfadProp) {
  const t = useTranslations(lang);

  return (
    <Base pathname={pathname} lang={lang} title={t('page.about.metaTitle')} description={t('page.about.metaDesc')} alternates={altPaths('about')}>
      <PageHeader lang={lang} eyebrow={t('studio.eyebrow')} title={t('studio.title')} lead={t('page.about.lead')} crumbs={[{ label: t('nav.about') }]} />

      {/* ------------------------------------------------ Text + Portraet */}
      <section style={css("padding-bottom: var(--spacing-section);")}>
        <div className="mx-auto grid max-w-7xl gap-14 px-5 md:px-8 lg:grid-cols-[3fr_2fr] lg:gap-20">
          <div className="prose max-w-none" data-reveal="">
            {story[lang].map((paragraph) => <p>{paragraph}</p>)}
          </div>

          <aside className="lg:pt-2" data-reveal="" style={css("--reveal-delay: 0.1s;")}>
            <div className="overflow-hidden rounded-2xl border" style={css("border-color: var(--line); box-shadow: 0 0 0 1px var(--color-accent-600);")}>
              <img src={withBase('/images/surhay-portrait.webp')} alt={t('studio.photoAlt')} width="960" height="1120" loading="lazy" decoding="async" className="aspect-[4/5] w-full object-cover" />
            </div>
            <p className="mt-5 font-display text-lg font-bold tracking-tight">{ownerName ?? SITE.name}</p>
            <p className="mt-1 text-sm text-mute">{t('studio.role')} · {SITE.city}</p>
            <a href={`mailto:${SITE.email}`} className="link-slide mt-5 inline-block font-semibold">{SITE.email}</a>

            <dl className="mt-9 grid gap-6 border-t pt-8 sm:grid-cols-2 lg:grid-cols-1" style={css("border-color: var(--line);")}>
              {
                facts.map((fact) => (
                  <div className="flex items-baseline gap-4">
                    <dt className="font-display text-2xl font-bold tracking-tight text-accent-600">{fact.value[lang]}</dt>
                    <dd className="text-[0.9rem] leading-snug text-mute">{fact.label[lang]}</dd>
                  </div>
                ))
              }
            </dl>
          </aside>
        </div>
      </section>

      {/* ------------------------------------------------------- Prinzipien */}
      <section className="dark-section grain" style={css("padding-block: var(--spacing-section);")}>
        <div className="relative mx-auto max-w-7xl px-5 md:px-8">
          <h2 className="h2 h2-sm max-w-2xl" data-reveal="">{t('page.about.principlesTitle')}</h2>

          <ol className="mt-12 grid gap-px overflow-hidden rounded-2xl border md:grid-cols-2 lg:grid-cols-3" style={css("border-color: var(--line-dark); background: var(--line-dark);")}>
            {
              principles.map((principle, i) => (
                <li className="quiet-cell p-8" style={css(`background: var(--color-ink-2); --reveal-delay: calc(${(i % 3)} * var(--stagger));`)} data-reveal="">
                  <span className="quiet-num font-display text-sm font-semibold tracking-widest text-accent-ctx">{String(i + 1).padStart(2, '0')}</span>
                  <p className="font-display mt-4 text-lg font-bold tracking-tight">{principle.title[lang]}</p>
                  <p className="mt-3 text-[0.93rem] leading-relaxed text-mute-dark">{principle.desc[lang]}</p>
                </li>
              ))
            }
          </ol>
        </div>
      </section>

      {/* ------------------------------------------------------------ Stack */}
      <section style={css("padding-block: var(--spacing-section);")}>
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <h2 className="h2 h2-sm" data-reveal="">{t('page.about.stackTitle')}</h2>
              <p className="mt-4 max-w-xl text-mute" data-reveal="" style={css("--reveal-delay: 0.08s;")}>{t('page.about.stackSub')}</p>
            </div>
            <a href={path(lang, 'services')} className="link-slide font-semibold" data-reveal="">
              {t('nav.services')} <span aria-hidden="true">→</span>
            </a>
          </div>

          <dl className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
            {
              stackGroups.map((group, i) => (
                <div className="border-t-2 pt-5" style={css(`border-color: var(--line); --reveal-delay: calc(${i} * var(--stagger));`)} data-reveal="">
                  <dt className="eyebrow text-mute">{group.label[lang]}</dt>
                  <dd>
                    <ul className="mt-4 space-y-2 text-[0.93rem]">
                      {group.items.map((item) => <li>{item}</li>)}
                    </ul>
                  </dd>
                </div>
              ))
            }
          </dl>
        </div>
      </section>

      {/* ------------------------------------------------ Was wir nicht machen */}
      <section className="border-t" style={css("border-color: var(--line); background: var(--color-paper-2); padding-block: var(--spacing-section-sm);")}>
        <div className="mx-auto grid max-w-7xl gap-12 px-5 md:px-8 lg:grid-cols-[2fr_3fr]">
          <div>
            <h2 className="h2 h2-sm" data-reveal="">{t('page.about.noTitle')}</h2>
            <p className="mt-4 max-w-md text-mute" data-reveal="" style={css("--reveal-delay: 0.08s;")}>{t('page.about.noSub')}</p>
          </div>
          <ul className="space-y-4" data-reveal="" style={css("--reveal-delay: 0.12s;")}>
            {
              notOurThing[lang].map((item) => (
                <li className="flex items-start gap-3.5 border-b pb-4 text-[0.98rem] leading-relaxed" style={css("border-color: var(--line);")}>
                  <svg className="mt-1 h-4 w-4 flex-none text-mute" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  </svg>
                  {item}
                </li>
              ))
            }
          </ul>
        </div>
      </section>

      <ContactCta lang={lang} />
    </Base>
  );
}

