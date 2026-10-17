import { scoped } from '../lib/scoped';
import { css } from '../lib/css';
import { SITE_HREF } from '../base';
import type { LangProp, PfadProp } from '../lib/props';
import { getCollection, renderEntry, type Entry } from '../lib/content';
import Base from './Base';
import Breadcrumbs from '../components/Breadcrumbs';
import ContactCta from '../components/ContactCta';
import { SITE, ownerName } from '../config';
import { useTranslations, path, altPaths, splitId, formatDate, readingTime, withBase } from '../i18n/utils';
import { localeMeta } from '../i18n/ui';
import type { BlogData } from '../content.config';

/**
 * Blogbeitrag.
 *
 * Einspaltig: Brotkrumen, Metazeile, Titel, Vorspann und Fliesstext stehen
 * am selben linken Seitenrand; die Zeilenlaenge begrenzt `.prose`. Die
 * frueher rechts stehende Spalte — Inhaltsverzeichnis aus den
 * H2-Ueberschriften und Autorenkarte — ist entfallen. Die Autorenangabe
 * blieb erhalten, aber als schlichter Text in der Metazeile neben
 * Kategorie, Datum und Lesezeit.
 *
 * Weiterhin: Brotkrumen und Article-Schema (Google zeigt Autor und Datum
 * nur mit Auszeichnung an) sowie drei weiterfuehrende Beitraege am Ende,
 * damit ein Besuch nicht im Artikel endet.
 */
interface Props extends LangProp, PfadProp {
  entry: Entry<BlogData>;
}
export default async function BlogPost({ entry, lang, pathname }: Props) {
  const t = useTranslations(lang);
  /* Astros `render(entry)` gab eine Komponente zurueck; hier ist es HTML.
     Astros <Content /> fuegte kein Element hinzu — das HTML kommt deshalb
     auf das .prose-<div>, das es schon gab, und nicht in ein neues. */
  const inhaltHtml = await renderEntry(entry);
  const { slug } = splitId(entry.id);

  const backHref = path(lang, 'blog');
  const minutes = readingTime(entry.body ?? '');

  /* Weiterfuehrende Beitraege: gleiche Sprache, gleiche Kategorie zuerst. */
  const siblings = (await getCollection<BlogData>('blog', ({ id }) => splitId(id).lang === lang)).filter((p) => p.id !== entry.id);
  const related = siblings
    .sort((a, b) => {
      const sameA = a.data.category === entry.data.category ? 0 : 1;
      const sameB = b.data.category === entry.data.category ? 0 : 1;
      return sameA - sameB || b.data.date.valueOf() - a.data.date.valueOf();
    })
    .slice(0, 3);

  const siteBase = SITE_HREF;
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: entry.data.title,
    description: entry.data.metaDescription,
    datePublished: entry.data.date.toISOString().slice(0, 10),
    inLanguage: localeMeta[lang].intl,
    articleSection: entry.data.category,
    author: { '@type': ownerName ? 'Person' : 'Organization', name: ownerName ?? entry.data.author },
    publisher: { '@type': 'Organization', name: SITE.name, url: SITE.domain },
    mainEntityOfPage: new URL(pathname, siteBase).href,
    image: new URL(withBase(entry.data.ogImage ?? '/og-default.png'), siteBase).href,
  };

  return scoped(
    'data-c-blog-post',
    <Base pathname={pathname} lang={lang} title={entry.data.metaTitle ?? `${entry.data.title} | Surhay Design`} description={entry.data.metaDescription} alternates={altPaths('blog', slug)} ogImage={withBase(entry.data.ogImage ?? '/og-default.png')} ogType="article" head={<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />}>
      <article>
        <header className="mx-auto max-w-7xl px-5 md:px-8" style={css("padding-top: clamp(7.5rem, 12vw, 10rem);")}>
          <Breadcrumbs lang={lang} items={[{ label: t('nav.blog'), href: backHref }, { label: entry.data.title }]} />

          <div className="mt-8 flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-wider text-mute">
            <span className="rounded-full bg-accent-600 px-2.5 py-1 text-white">{entry.data.category}</span>
            <time dateTime={entry.data.date.toISOString().slice(0, 10)}>{formatDate(entry.data.date, lang)}</time>
            <span aria-hidden="true">·</span>
            <span>{minutes} {t('blog.minRead')}</span>
            <span aria-hidden="true">·</span>
            <span>{t('blog.by')} {ownerName ?? entry.data.author}</span>
          </div>

          <h1 className="display intro-rise mt-6 max-w-3xl" style={css("font-size: clamp(2.1rem, 5vw, 3.8rem); --intro-delay: 0.05s;")}>
            {entry.data.title}
          </h1>
          <p className="lead intro-rise mt-6 max-w-2xl text-mute" style={css("--intro-delay: 0.18s;")}>{entry.data.metaDescription}</p>
        </header>

        <div className="mx-auto max-w-7xl px-5 pb-20 pt-14 md:px-8">
          <div className="prose" dangerouslySetInnerHTML={{ __html: inhaltHtml }}>
          </div>
        </div>

        {/* -------------------------------------------- Weitere Beitraege */}
        {
          related.length > 0 && (
            <section className="border-t" style={css("border-color: var(--line); background: var(--color-paper-2); padding-block: var(--spacing-section-sm);")}>
              <div className="mx-auto max-w-7xl px-5 md:px-8">
                <div className="flex flex-wrap items-end justify-between gap-6">
                  <h2 className="h2 h2-sm" data-reveal="">
                    {t('blog.related')}
                  </h2>
                  <a href={backHref} className="link-slide font-semibold" data-reveal="">
                    {t('blog.back')} <span aria-hidden="true">→</span>
                  </a>
                </div>
                <ul className="related-list mt-10 grid gap-5 md:grid-cols-3">
                  {related.map((post, i) => (
                    <li data-reveal="" style={css(`--reveal-delay: calc(${i} * var(--stagger));`)}>
                      <a href={path(lang, 'blog', splitId(post.id).slug)} className="related-card flex h-full flex-col rounded-2xl border bg-paper p-7" style={css("border-color: var(--line);")}>
                        <span className="text-xs font-semibold uppercase tracking-wider text-mute">{post.data.category}</span>
                        <span className="font-display mt-4 text-lg font-bold leading-snug tracking-tight">{post.data.title}</span>
                        <span className="mt-3 flex-1 text-[0.9rem] leading-relaxed text-mute">{post.data.metaDescription}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          )
        }
      </article>

      <ContactCta lang={lang} />
    </Base>
  );
}

