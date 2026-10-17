import { scoped } from '../lib/scoped';
import { css } from '../lib/css';
import type { LangProp, PfadProp } from '../lib/props';
import Base from './Base';
import PageHeader from '../components/PageHeader';
import ContactCta from '../components/ContactCta';
import { useTranslations, path, altPaths, splitId, formatDate, readingTime } from '../i18n/utils';
import type { BlogData } from '../content.config';
import type { Entry } from '../lib/content';
import { InlineScript } from '../lib/inline-once';

/**
 * Blog-Uebersicht.
 *
 * Drei Aenderungen gegenueber dem reinen Kartenraster:
 * 1. Der juengste Beitrag steht gross oben — sonst sieht ein Blog mit sechs
 *    Artikeln aus wie ein Archiv ohne Gegenwart.
 * 2. Themenfilter aus den Kategorien der Beitraege, rein clientseitig.
 * 3. Brotkrumen und Anfrage-Sektion wie auf jeder anderen Unterseite.
 */
interface Props extends LangProp, PfadProp {
  posts: Entry<BlogData>[];
}
export default function BlogIndex({ posts, lang, pathname }: Props) {
  const t = useTranslations(lang);

  const [featured, ...rest] = posts;
  const categories = [...new Set(posts.map((p) => p.data.category))].sort((a, b) => a.localeCompare(b, lang));

  return (
    <>
      {scoped(
        'data-c-blog-index',
        <Base pathname={pathname} lang={lang} title={t('blog.metaTitle')} description={t('blog.indexDesc')} alternates={altPaths('blog')}>
          <PageHeader lang={lang} eyebrow={t('blog.eyebrow')} title={t('blog.indexTitle')} lead={t('blog.indexDesc')} crumbs={[{ label: t('nav.blog') }]} />

          <section style={css("padding-bottom: var(--spacing-section);")}>
            <div className="mx-auto max-w-7xl px-5 md:px-8">
              {/* -------------------------------------------------- Aufmacher */}
              {
                featured && (
                  <a href={path(lang, 'blog', splitId(featured.id).slug)} className="feature-card card-link grid gap-8 rounded-2xl border bg-paper-2 p-8 md:grid-cols-[1.4fr_1fr] md:gap-14 md:p-12" style={css("border-color: var(--line);")} aria-label={featured.data.title} data-reveal="">
                    <div>
                      <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-wider text-mute">
                        <span className="rounded-full bg-accent-600 px-2.5 py-1 text-white">{t('blog.latest')}</span>
                        <span>{featured.data.category}</span>
                        <time dateTime={featured.data.date.toISOString().slice(0, 10)}>{formatDate(featured.data.date, lang)}</time>
                      </div>
                      <h2 className="h2 h2-sm mt-6 max-w-2xl">{featured.data.title}</h2>
                      <p className="lead mt-5 max-w-xl text-mute">{featured.data.metaDescription}</p>
                    </div>
                    <div className="flex flex-col justify-end gap-4 md:items-end">
                      <p className="text-sm text-mute">
                        {t('blog.by')} {featured.data.author}{' '}
                        <span className="mx-2" aria-hidden="true">·</span>{' '}
                        {readingTime(featured.body ?? '')} {t('blog.minRead')}
                      </p>
                      <p className="font-semibold">
                        <span className="read-more">
                          {t('blog.readMore')}
                          <svg className="read-more-arrow h-4 w-4" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                            <path d="M1 8h13M9 3l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </span>
                      </p>
                    </div>
                  </a>
                )
              }

              {/* ---------------------------------------------------- Themenfilter */}
              {
                categories.length > 1 && (
                  <div className="mt-14 flex flex-wrap gap-2.5" role="group" aria-label={t('blog.filterAll')} data-reveal="">
                    <button className="topic-btn is-active rounded-full border px-5 py-2.5 text-sm font-semibold transition-colors" data-topic="all" aria-pressed="true">
                      {t('blog.filterAll')}
                    </button>
                    {categories.map((category) => (
                      <button className="topic-btn rounded-full border px-5 py-2.5 text-sm font-semibold transition-colors" data-topic={category} aria-pressed="false">
                        {category}
                      </button>
                    ))}
                  </div>
                )
              }

                    {/* Ergebnisstand als Statusmeldung: Der Filter blendet Karten
                        aus, ohne dass sich Fokus oder Ueberschrift aendern — ohne
                        Ansage merkt jemand mit Screenreader nichts davon
                        (WCAG 4.1.3). role="status" meldet hoeflich, ohne den Fokus
                        zu verschieben. */}
                    <p id="post-count" className="sr-only" role="status" data-count-template={t('blog.filterCount')}></p>

              {/* ----------------------------------------------------- Alle Beitraege */}
              <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3" id="post-grid">
                {
                  rest.map((post, i) => {
                    const { slug } = splitId(post.id);
                    return (
                      <a href={path(lang, 'blog', slug)} className="blog-card card-link flex min-w-0 flex-col rounded-2xl border bg-white p-8" style={css(`border-color: var(--line); --reveal-delay: calc(${(i % 3)} * var(--stagger));`)} aria-label={post.data.title} data-topic={post.data.category} data-reveal="">
                        <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-wider text-mute">
                          <span className="rounded-full bg-accent-600 px-2.5 py-1 text-white">{post.data.category}</span>
                          <time dateTime={post.data.date.toISOString().slice(0, 10)}>{formatDate(post.data.date, lang)}</time>
                        </div>
                        <h2 className="h3 mt-5">{post.data.title}</h2>
                        <p className="mt-4 flex-1 text-[0.95rem] leading-relaxed text-mute">{post.data.metaDescription}</p>
                        <p className="mt-6 flex items-center justify-between border-t pt-5 text-sm font-semibold" style={css("border-color: var(--line);")}>
                          <span className="read-more">
                            {t('blog.readMore')}
                            <svg className="read-more-arrow h-3.5 w-3.5" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                              <path d="M1 8h13M9 3l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </span>
                          <span className="text-mute">
                            {readingTime(post.body ?? '')} {t('blog.minRead')}
                          </span>
                        </p>
                      </a>
                    );
                  })
                }
              </div>

              <p id="post-empty" className="mt-10 hidden text-mute">{t('blog.empty')}</p>
            </div>
          </section>

          <ContactCta lang={lang} />
        </Base>
      )}
      <InlineScript name="blog-index" />
    </>
  );
}
