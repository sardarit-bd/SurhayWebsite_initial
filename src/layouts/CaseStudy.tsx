import { css } from '../lib/css';
import type { LangProp, PfadProp } from '../lib/props';
import { renderEntry, type Entry } from '../lib/content';
import Base from './Base';
import ContactCta from '../components/ContactCta';
import { useTranslations, localePath, path, routes, splitId, withBase, altPaths } from '../i18n/utils';
import { localeMeta } from '../i18n/ui';
import type { CaseStudyData } from '../content.config';

interface Props extends LangProp, PfadProp {
  entry: Entry<CaseStudyData>;
  next: Entry<CaseStudyData> | null;
}
export default async function CaseStudy({ entry, next, lang, pathname }: Props) {
  const t = useTranslations(lang);
  /* Siehe BlogPost: HTML statt Komponente, gesetzt auf das vorhandene
     .prose-<div>. */
  const inhaltHtml = await renderEntry(entry);
  const { slug } = splitId(entry.id);

  /* Der Dateiname ist in allen Sprachordnern derselbe — der Slug taugt damit
     fuer alle Sprachfassungen. */
  const alternates = altPaths('work', slug);
  const backHref = path(lang, 'work');
  const nextHref = next ? localePath(lang, `/${routes[lang].work}/${splitId(next.id).slug}`) : null;
  const numberFormat = localeMeta[lang].intl;

  return (
    <Base pathname={pathname} lang={lang} title={`${entry.data.title} — ${entry.data.client} | Surhay Design`} description={entry.data.excerpt} alternates={alternates} ogImage={withBase(entry.data.cover)} ogType="article">
      <article>
        <header className="mx-auto max-w-7xl px-5 pt-36 md:px-8">
          <a href={backHref} className="link-slide inline-flex items-center gap-2 text-sm font-semibold text-mute">
            <svg className="h-3.5 w-3.5 rotate-180" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M1 8h13M9 3l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
            </svg>
            {t('work.back')}
          </a>

          <h1 className="display intro-rise mt-8 max-w-4xl" style={css("font-size: clamp(2.4rem, 6.5vw, 5rem); --intro-delay: 0.05s;")}>
            {entry.data.title}
          </h1>

          <dl className="intro-rise mt-10 flex flex-wrap gap-x-12 gap-y-4 border-t pt-6" style={css("border-color: var(--line); --intro-delay: 0.2s;")}>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wider text-mute">{t('work.client')}</dt>
              <dd className="mt-1 font-semibold">{entry.data.client}</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wider text-mute">{t('work.industry')}</dt>
              <dd className="mt-1 font-semibold">{entry.data.industry}</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wider text-mute">{t('work.year')}</dt>
              <dd className="mt-1 font-semibold">{entry.data.date.getFullYear()}</dd>
            </div>
          </dl>
        </header>

        <div className="mx-auto mt-12 max-w-7xl px-5 md:px-8">
          <img src={withBase(entry.data.cover)} alt={entry.data.coverAlt} width="1600" height="1200" className="intro-rise aspect-[16/9] w-full rounded-2xl border object-cover" style={css("border-color: var(--line); --intro-delay: 0.35s;")} fetchPriority="high" decoding="async" />
        </div>

        {/* Ausgangslage & Lösung */}
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-20 md:grid-cols-2 md:gap-16 md:px-8">
          <section data-reveal="">
            <h2 className="eyebrow text-mute">{t('work.situation')}</h2>
            <p className="lead mt-5">{entry.data.situation}</p>
          </section>
          <section data-reveal="" style={css("--reveal-delay: 0.12s;")}>
            <h2 className="eyebrow text-mute">{t('work.solution')}</h2>
            <p className="lead mt-5">{entry.data.solution}</p>
          </section>
        </div>

        {/* Ergebnis-Kennzahlen */}
        <section className="dark-section grain" style={css("padding-block: clamp(3.5rem, 8vw, 6rem);")}>
          <div className="relative mx-auto max-w-7xl px-5 md:px-8">
            <h2 className="eyebrow text-mute-dark" data-reveal="">{t('work.results')}</h2>
            <div className="mt-10 grid gap-10 sm:grid-cols-3">
              {
                entry.data.results.map((result, i) => (
                  <div className="border-l-2 border-accent-ctx pl-5" data-reveal="" style={css(`--reveal-delay: calc(${i} * var(--stagger));`)}>
                    <p className="font-display text-5xl font-bold tracking-tight text-accent-ctx md:text-6xl">
                      {Number.isInteger(result.value) ? (
                        <span data-count={result.value} data-prefix={result.prefix ?? ''} data-suffix={result.suffix ?? ''}>
                          {result.prefix ?? ''}0{result.suffix ?? ''}
                        </span>
                      ) : (
                        <span>
                          {result.prefix ?? ''}
                          {result.value.toLocaleString(numberFormat)}
                          {result.suffix ?? ''}
                        </span>
                      )}
                    </p>
                    <p className="mt-2 text-mute-dark">{result.label}</p>
                  </div>
                ))
              }
            </div>
          </div>
        </section>

        {/* Ausführlicher Bericht */}
        <div className="mx-auto max-w-7xl px-5 py-20 md:px-8">
          <div className="prose" data-reveal="" dangerouslySetInnerHTML={{ __html: inhaltHtml }}>
          </div>

          {
            entry.data.gallery.length > 0 && (
              <div className="mt-16 grid gap-5 md:grid-cols-2">
                {entry.data.gallery.map((item, i) => {
                  const src = typeof item === 'string' ? item : item.src;
                  const alt = typeof item === 'string' ? '' : item.alt;
                  if (typeof item === 'string') {
                    console.warn(
                      `[Case Study] ${entry.id}: Galeriebild "${item}" ohne alt-Text — als dekorativ behandelt. ` +
                        `Fuer einen Screenshot der Arbeit stattdessen { src, alt } schreiben (WCAG 1.1.1).`
                    );
                  }
                  return (
                  <img src={withBase(src)} alt={alt} width="1200" height="800" loading="lazy" decoding="async" className="w-full rounded-2xl border object-cover" style={css(`border-color: var(--line); --reveal-delay: calc(${i} * var(--stagger));`)} data-reveal="" />
                  );
                })}
              </div>
            )
          }
        </div>

        {/* Nächste Case Study */}
        {
          nextHref && next && (
            <a href={nextHref} className="group block border-t" style={css("border-color: var(--line); background: var(--color-paper-2);")}>
              <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-6 px-5 py-14 md:px-8">
                <div>
                  <p className="eyebrow text-mute">{t('work.nextCase')}</p>
                  <p className="h2 mt-3 transition-transform duration-500 group-hover:translate-x-2" style={css("transition-timing-function: var(--ease-out);")}>
                    {next.data.title}
                  </p>
                  <p className="mt-2 text-mute">{next.data.client}</p>
                </div>
                <svg className="h-10 w-10 transition-transform duration-500 group-hover:translate-x-3" style={css("transition-timing-function: var(--ease-out);")} viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M1 8h13M9 3l5 5-5 5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </a>
          )
        }
      </article>

      {/* Nach dem Beweis die Anfrage: Wer eine Case Study zu Ende liest, ist am
          naechsten dran. Sie steht unter dem Verweis auf die naechste Studie —
          wer weiterlesen will, tut das; wer genug gesehen hat, schreibt hier. */}
      <ContactCta lang={lang} />
    </Base>
  );
}

