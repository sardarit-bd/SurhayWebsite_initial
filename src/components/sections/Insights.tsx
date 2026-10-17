import { getCollection } from '../../lib/content';
import type { BlogData } from '../../content.config';
import { localePath, routes, splitId, formatDate } from '../../i18n/utils';
import { scoped } from '../../lib/scoped';
import { css } from '../../lib/css';
import type { LangProp } from '../../lib/props';

const insightsContent = {
  de: { eyebrow: 'Insights', title: 'Wissen, das Sie auch ohne uns anwenden können.', all: 'Alle Artikel', readMore: 'Weiterlesen' },
  tr: { eyebrow: 'Insights', title: 'Bizsiz de uygulayabileceğiniz bilgiler.', all: 'Tüm yazılar', readMore: 'Devamını okuyun' },
  en: { eyebrow: 'Insights', title: 'Knowledge you can apply without hiring us.', all: 'All articles', readMore: 'Read more' },
} as const;

/**
 * Insights — die drei jüngsten Artikel als Teaser.
 *
 * Die Artikel lagen fertig im Repo, waren von der Startseite aus aber nur
 * über den Navigationspunkt „Blog“ erreichbar. Fachtexte sind bei einem
 * Ein-Personen-Studio das billigste ehrliche Kompetenzsignal, das es gibt:
 * Sie belegen Urteilsvermögen, ohne dass ein Kunde dafür bürgen muss.
 *
 * Sekundäre Sektion — deshalb der kleinere vertikale Rhythmus.
 */
export default async function Insights({ lang }: LangProp) {
  const copy = insightsContent[lang];

  const all = await getCollection<BlogData>('blog', ({ id }) => splitId(id).lang === lang);
  const posts = all.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf()).slice(0, 3);
  const blogHref = localePath(lang, `/${routes[lang].blog}`);

  return scoped(
    'data-c-insights',
    posts.length > 0 && (
      <section id="insights" className="scroll-mt-24" style={css('padding-block: var(--spacing-section-sm);')}>
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="eyebrow text-mute" data-reveal="">
                {copy.eyebrow}
              </p>
              <h2 className="h2 h2-sm mt-5 max-w-xl" data-reveal="">
                {copy.title}
              </h2>
            </div>
            <a href={blogHref} className="link-slide font-semibold" data-reveal="" style={css('--reveal-delay: 0.08s;')}>
              {/* KEIN Leerzeichen vor dem Pfeil: die Astro-Fassung gab hier keins
                  aus. Ihre Vorlage steht komplett in einem Ausdrucksblock
                  ({posts.length > 0 && (…)}), und darin wandte Astro
                  JSX-Whitespace-Regeln an. Gemessen am gebauten HTML:
                  `>Alle Artikel<span …>→</span>`, ohne Leerzeichen. Die
                  Leistungs-Sektion daneben steht auf oberster Ebene und hat
                  eins — dort bleibt es. */}
              {copy.all}<span aria-hidden="true">→</span>
            </a>
          </div>

          <ul
            className="mt-12 grid gap-px overflow-hidden rounded-2xl border md:grid-cols-3"
            style={css('border-color: var(--line); background: var(--line);')}
          >
            {posts.map((post, i) => {
              const { slug } = splitId(post.id);
              return (
                <li
                  className="bg-paper"
                  data-reveal=""
                  style={css(`--reveal-delay: calc(${i} * var(--stagger));`)}
                  key={post.id}
                >
                  <a
                    href={localePath(lang, `/${routes[lang].blog}/${slug}`)}
                    className="post card-link flex h-full flex-col p-8"
                    aria-label={post.data.title}
                  >
                    <p className="text-xs font-semibold uppercase tracking-wider text-mute">
                      {post.data.category} · {formatDate(post.data.date, lang)}
                    </p>
                    <h3 className="mt-4 font-display text-xl font-bold leading-snug tracking-tight">
                      {post.data.title}
                    </h3>
                    <p className="mt-3 flex-1 text-[0.92rem] leading-relaxed text-mute">{post.data.metaDescription}</p>
                    <p className="mt-6 text-sm font-semibold">
                      <span className="read-more">
                        {copy.readMore}
                        <svg className="read-more-arrow h-3.5 w-3.5" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                          <path
                            d="M1 8h13M9 3l5 5-5 5"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                    </p>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    )
  );
}
