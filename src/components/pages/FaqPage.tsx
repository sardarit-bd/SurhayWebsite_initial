import { scoped } from '../../lib/scoped';
import { css } from '../../lib/css';
import type { LangProp, PfadProp } from '../../lib/props';
import { getCollection, renderEntry } from '../../lib/content';
import Base from '../../layouts/Base';
import PageHeader from '../PageHeader';
import FaqAccordion from '../FaqAccordion';
import FaqItem from '../FaqItem';
import ContactCta from '../ContactCta';
import { SITE } from '../../config';
import { services } from '../../data/services';
import { faqCategories } from '../../data/faq-categories';
import { useTranslations, path, altPaths, splitId } from '../../i18n/utils';
import type { FaqData } from '../../content.config';
import { InlineScript } from '../../lib/inline-once';

/**
 * FAQ-Seite (/faq, /en/faq) — alle Fragen, nach Themen gruppiert.
 *
 * AUFBAU
 * Links eine Sprungnavigation mit Suchfeld, rechts die Gruppen. Zwei
 * Quellen fliessen in dieselbe Darstellung:
 *   1. die Content-Sammlung `faq` — jede Frage traegt eine `category`
 *      aus src/data/faq-categories.ts,
 *   2. der Leistungskatalog — die Fragen, die nur zu einer Leistung
 *      gehoeren, bilden je Leistung eine eigene Gruppe.
 * Dadurch steht jede Frage der Seite genau einmal in genau einer Gruppe.
 *
 * WARUM SUCHE STATT REINER FILTER-CHIPS
 * Bei ueber vierzig Fragen ist die schnellste Bedienung ein Stichwort, nicht
 * eine Reihe von Schaltflaechen. Die Suche laeuft rein clientseitig ueber den
 * bereits gerenderten Text; ohne JavaScript bleibt die Seite vollstaendig
 * lesbar — dann sind eben alle Gruppen sichtbar.
 *
 * Beide Quellen zusammen gehen als FAQPage-Schema an Google.
 */

export default async function FaqPage({ lang, pathname }: LangProp & PfadProp) {
  const t = useTranslations(lang);

  /* ------------------------------------------------ 1. Fragen der Sammlung */
  const entries = await getCollection<FaqData>('faq', ({ id }) => splitId(id).lang === lang);
  const rendered = await Promise.all(
    entries
      .sort((a, b) => a.data.order - b.data.order)
      .map(async (entry) => ({
        question: entry.data.question,
        category: entry.data.category,
        body: entry.body ?? '',
        html: await renderEntry(entry),
      }))
  );

  /* Leere Kategorien fallen raus — eine Ueberschrift ohne Frage darunter ist
     ein Fehler, den man nicht sichtbar machen muss. */
  const topicGroups = faqCategories
    .map((category) => ({
      id: category.id,
      label: category.label[lang],
      desc: category.desc[lang],
      href: null as string | null,
      items: rendered.filter((item) => item.category === category.id),
    }))
    .filter((group) => group.items.length > 0);

  /* -------------------------------------------- 2. Fragen je Leistung */
  const serviceGroups = services.map((service) => ({
    id: `service-${service.id}`,
    label: service[lang].title,
    desc: service[lang].tagline,
    href: path(lang, 'services', service[lang].slug),
    items: service[lang].faq.map((item) => ({ question: item.q, body: item.a, html: null })),
  }));

  const groups = [...topicGroups, ...serviceGroups];
  const total = groups.reduce((sum, group) => sum + group.items.length, 0);

  /* --------------------------------------------------- 3. Schema fuer Google
     Der Markdown-Body wird grob von Auszeichnung befreit — Google will Text,
     keine Sternchen. */
  const plain = (md: string) =>
    md
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
      .replace(/[*_`#>]/g, '')
      .replace(/\s+/g, ' ')
      .trim();

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: groups.flatMap((group) =>
      group.items.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: { '@type': 'Answer', text: plain(item.body) },
      }))
    ),
  };

  return (
    <>
      {scoped(
        'data-c-faq-page',
        <Base pathname={pathname} lang={lang} title={t('page.faq.metaTitle')} description={t('page.faq.metaDesc')} alternates={altPaths('faq')} head={<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />}>
          <PageHeader lang={lang} eyebrow={t('faq.eyebrow')} title={t('faq.title')} lead={t('page.faq.lead')} crumbs={[{ label: t('nav.faq') }]} />

          <section style={css("padding-bottom: var(--spacing-section);")}>
            <div className="mx-auto grid max-w-7xl gap-12 px-5 md:px-8 lg:grid-cols-[17rem_1fr] lg:gap-16">
              {/* ------------------------------------- Suche und Sprungnavigation */}
              <aside className="lg:sticky lg:top-28 lg:self-start" data-reveal="">
                {/* Die Suchregion bekommt einen Namen: In der Landmark-Liste eines
                    Screenreaders stand sonst nur „Suche" ohne Angabe, worin. */}
                <form className="faq-search" role="search" aria-label={t('page.faq.searchLabel')}>
                  <label htmlFor="faq-search" className="text-xs font-semibold uppercase tracking-wider text-mute">
                    {t('page.faq.searchLabel')}
                  </label>
                  <div className="relative mt-2.5">
                    <input id="faq-search" type="search" autoComplete="off" placeholder={t('page.faq.searchPlaceholder')} className="faq-search-input w-full rounded-full border bg-white py-3 pl-11 pr-4 text-[0.95rem] transition-colors" style={css("border-color: var(--line-control);")} />
                    <svg className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-mute" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                      <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.6" />
                      <path d="m11 11 4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                    </svg>
                  </div>
                  <p id="faq-count" className="mt-3 text-sm text-mute" aria-live="polite">
                    {total} {t('page.faq.questionsWord')}
                  </p>
                </form>
                {/* ------------------------------------------------------------------
                    onsubmit="return false;" — das Attribut, das React nicht ausgeben kann.
            
                    Die Astro-Fassung hatte es am <form>. Es verhindert, dass die
                    Eingabetaste im Suchfeld das Formular abschickt und damit die Seite
                    neu laedt — das Feld ist ein reiner Filter, es gibt kein Ziel.
            
                    React verwirft jede Eigenschaft, die mit "on" beginnt und kein
                    bekannter Handler ist; gemessen mit renderToStaticMarkup faellt
                    onsubmit ersatzlos weg. Es gibt keinen Weg, es aus JSX auszugeben.
            
                    Also setzt es diese Zeile — vor jeder plausiblen Eingabe. Ohne
                    JavaScript filtert das Feld ohnehin nicht, dort ist der Unterschied
                    ein Seitenneuaufbau statt gar keiner Reaktion. Siehe MIGRATION-NOTES.md.
                ------------------------------------------------------------------ */}
                <script
                  type="module"
                  dangerouslySetInnerHTML={{
                    __html: "document.querySelector('.faq-search')?.setAttribute('onsubmit','return false;');",
                  }}
                />

                <nav className="mt-8 border-t pt-6" style={css("border-color: var(--line);")} aria-label={t('page.faq.topics')}>
                  <p className="text-xs font-semibold uppercase tracking-wider text-mute">{t('page.faq.topics')}</p>
                  <ul className="mt-4 flex flex-wrap gap-2 lg:block lg:space-y-1">
                    {
                      groups.map((group) => (
                        <li data-jump={group.id}>
                          <a href={`#${group.id}`} className="jump-link">
                            <span>{group.label}</span>
                            <span className="jump-count">{group.items.length}</span>
                          </a>
                        </li>
                      ))
                    }
                  </ul>
                </nav>
              </aside>

              {/* -------------------------------------------------- Alle Gruppen */}
              <div id="faq-groups">
                {/* Eine Klammer um alle Gruppen: Es ist immer hoechstens ein Panel
                    offen — auch ueber Gruppengrenzen hinweg. */}
                <FaqAccordion>
                  {
                    groups.map((group) => (
                      <section id={group.id} data-group={group.id} className="faq-group scroll-mt-28">
                        <div data-reveal="">
                          <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2">
                            <h2 className="h3">{group.label}</h2>
                            {/* Vier gleichlautende „Mehr erfahren" mit vier
                                verschiedenen Zielen sind aus einer Linkliste heraus
                                nicht auseinanderzuhalten (WCAG 2.4.4). Der Gruppenname
                                im zugaenglichen Namen loest das; der sichtbare Text
                                bleibt Teil davon (WCAG 2.5.3). */}
                            {group.href && (
                              <a href={group.href} className="link-slide text-sm font-semibold" aria-label={`${t('common.readMore')}: ${group.label}`}>
                                {t('common.readMore')} <span aria-hidden="true">→</span>
                              </a>
                            )}
                          </div>
                          <p className="mt-3 max-w-2xl text-mute">{group.desc}</p>
                        </div>

                        <div className="mt-7" data-faq-rows="" data-reveal="">
                          {group.items.map((item, i) => (
                            <FaqItem
                              question={item.question}
                              id={`faq-${group.id}-${i}`}
                              index={i}
                              size="sm"
                              answerHtml={item.html ?? undefined}
                              key={item.question}
                            >
                              {item.html ? null : <p>{item.body}</p>}
                            </FaqItem>
                          ))}
                          <div className="border-t" style={css("border-color: var(--line);")} />
                        </div>
                      </section>
                    ))
                  }
                </FaqAccordion>

                <p id="faq-empty" className="hidden py-10 text-mute">{t('page.faq.empty')}</p>

                <div className="mt-16 rounded-2xl border p-8 md:p-10" style={css("border-color: var(--line); background: var(--color-paper-2);")} data-reveal="">
                  <h2 className="h3">{t('page.faq.stillOpen')}</h2>
                  <p className="mt-3 max-w-xl text-mute">{t('page.faq.stillOpenSub')}</p>
                  <div className="mt-6 flex flex-wrap items-center gap-4">
                    <a href={path(lang, 'contact')} className="btn btn-primary">{t('cta.primary')}</a>
                    <a href={`mailto:${SITE.email}`} className="link-slide font-semibold">{SITE.email}</a>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <ContactCta lang={lang} />
        </Base>
      )}
      <InlineScript name="faq-page" />
    </>
  );
}
