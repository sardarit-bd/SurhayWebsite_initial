import { scoped } from '../../lib/scoped';
import { css } from '../../lib/css';
import type { LangProp } from '../../lib/props';
import { getCollection } from '../../lib/content';
import { localePath, path, routes, splitId, withBase, formatNumber } from '../../i18n/utils';
import type { CaseStudyData } from '../../content.config';
import { InlineScript } from '../../lib/inline-once';

const workContent = {
  de: { eyebrow: 'Ausgewählte Projekte', title: 'Ergebnisse statt Referenzen.', sub: 'Jedes Projekt mit messbarem Resultat — von der Ausgangslage bis zur Kennzahl.', all: 'Alle Projekte', filterAll: 'Alle', filterCount: '{n} Projekte werden angezeigt', viewCase: 'Case Study ansehen', empty: 'Keine Projekte in dieser Kategorie.', pendingTitle: 'Referenzen zeigen wir erst, wenn sie echt sind.', pendingSub: 'Dieses Studio startet neu. Statt fremder Screenshots und ausgedachter Prozentzahlen finden Sie hier, was sich heute schon überprüfen lässt: feste Preise, ein klarer Ablauf — und ein Erstgespräch, in dem wir Ihnen auch sagen, wenn wir nicht die Richtigen sind.', pendingCta: 'Kosten berechnen', pendingSecondary: 'Preise ansehen', points: [['Diese Website ist die Arbeitsprobe', 'Typografie, Ladezeit, Barrierefreiheit, Zweisprachigkeit — alles hier ist von Hand gebaut. Prüfen Sie es mit Lighthouse.'], ['Klickbarer Entwurf vor dem Code', 'Sie sehen Ihre Website als bedienbaren Entwurf, bevor eine Zeile Code entsteht — und können sie an dieser Stelle noch ablehnen.'], ['Ehrliche Absage inklusive', 'Passt Ihr Vorhaben nicht zu uns, sagen wir das im Erstgespräch. Das kostet Sie nichts außer 30 Minuten.']] },
  tr: { eyebrow: 'Seçilmiş projeler', title: 'Referans değil, sonuç.', sub: 'Her proje ölçülebilir bir sonuçla — başlangıç durumundan rakama kadar.', all: 'Tüm projeler', filterAll: 'Tümü', filterCount: '{n} proje gösteriliyor', viewCase: 'Vaka çalışmasını görün', empty: 'Bu kategoride proje yok.', pendingTitle: 'Referansları ancak gerçek olduklarında gösteririz.', pendingSub: 'Bu stüdyo yeni başlıyor. Ödünç alınmış ekran görüntüleri ve uydurma yüzdeler yerine burada bugün doğrulayabileceğiniz şeyler var: sabit fiyatlar, net bir süreç — ve size uygun olmadığımızı da söylediğimiz bir ön görüşme.', pendingCta: 'Maliyeti hesaplayın', pendingSecondary: 'Fiyatlara bakın', points: [['Bu web sitesi bizzat çalışma örneğidir', 'Tipografi, yüklenme süresi, erişilebilirlik, çok dillilik — buradaki her şey elle yapıldı. Lighthouse ile ölçün.'], ['Koddan önce tıklanabilir taslak', 'Tek satır kod yazılmadan sitenizi kullanılabilir bir taslak olarak görürsünüz — ve tam o noktada vazgeçebilirsiniz.'], ['Gerekirse dürüst bir “hayır”', 'Projeniz bize uymuyorsa bunu ön görüşmede söyleriz. Size 30 dakikadan başka hiçbir şeye mal olmaz.']] },
  en: { eyebrow: 'Selected work', title: 'Results, not references.', sub: 'Every project with a measurable outcome — from starting point to KPI.', all: 'All projects', filterAll: 'All', filterCount: '{n} projects shown', viewCase: 'View case study', empty: 'No projects in this category.', pendingTitle: 'We show case studies once they are real.', pendingSub: 'This studio is starting out. Instead of borrowed screenshots and invented percentages, you get what can be verified today: fixed prices, a clear process — and a first call in which we will also tell you if we are not the right fit.', pendingCta: 'Estimate the cost', pendingSecondary: 'View pricing', points: [['This website is the work sample', 'Typography, load time, accessibility, bilingual setup — all of it hand-built. Run Lighthouse on it.'], ['A clickable draft before any code', 'You see your website as a working draft before a single line of code exists — and can still turn it down at that point.'], ['An honest no, if it comes to that', 'If your project is not a fit, we say so in the first call. It costs you nothing but 30 minutes.']] },
} as const;

/**
 * Projekte — zeigt ausschließlich Case Studies mit `real: true`.
 *
 * WARUM GEFILTERT WIRD
 * Im Repo liegen Case Studies mit Kundennamen, namentlichen Zitaten und harten
 * Kennzahlen (+142 % Umsatz), zu denen es weder Projekte noch Belege gibt. Auf
 * einer Verkaufsseite ist das nach § 5 UWG irreführende Werbung und abmahnfähig
 * — und es ist das erste, was auffliegt, wenn ein Interessent nachfragt.
 *
 * Solange keine Case Study `real: true` trägt, rendert die Sektion einen
 * ehrlichen Zwischenstand statt eines leeren Rasters. Der Zwischenstand ist
 * kein Lückenbüßer: Preistransparenz und ein kostenloses Erstgespräch sind für
 * einen KMU-Entscheider ein stärkeres Argument als eine Referenz, die er
 * ohnehin nicht überprüft.
 *
 * Sobald ein echtes Projekt live ist: in der Markdown-Datei `real: true`
 * setzen — Raster, Filter und Kennzahlen erscheinen dann automatisch.
 */

export default async function Work({ lang }: LangProp) {
  const copy = workContent[lang];
  const home = localePath(lang, '/');

  const all = await getCollection<CaseStudyData>('case-studies', ({ id, data }) => splitId(id).lang === lang && data.real);
  const cases = all.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
  const industries = [...new Set(cases.map((c) => c.data.industry))];

  /* Belegpunkte des Zwischenstands. Bewusst hier und nicht im Template: der
     Astro-Parser liest `Parameters<typeof t>[0]` innerhalb von JSX als Tag. */
  const pendingPoints = copy.points;

  return (
    <>
      {scoped(
        'data-c-work',
        <section id="work" className="dark-section grain scroll-mt-24" style={css("padding-block: var(--spacing-section);")}>
          <div className="relative mx-auto max-w-7xl px-5 md:px-8">
            {
              cases.length > 0 ? (
                <>
                  <p className="eyebrow text-mute-dark" data-reveal="">
                    {copy.eyebrow}
                  </p>
                  <h2 className="h2 reveal-mask mt-5 max-w-3xl" data-reveal="">
                    <span className="reveal-line">{copy.title}</span>
                  </h2>
                  <p className="lead mt-5 max-w-2xl text-mute-dark" data-reveal="" style={css("--reveal-delay: 0.08s;")}>
                    {copy.sub}
                  </p>
                  <a href={path(lang, 'work')} className="link-slide mt-7 inline-block font-semibold" data-reveal="" style={css("--reveal-delay: 0.12s;")}>
                    {copy.all} <span aria-hidden="true">→</span>
                  </a>

                  {/* Branchen-Filter — nur sinnvoll ab zwei Branchen. */}
                  {industries.length > 1 && (
                    <div className="mt-10 flex flex-wrap gap-2.5" role="group" aria-label="Filter" data-reveal="">
                      <button className="filter-btn is-active rounded-full border px-5 py-2.5 text-sm font-semibold transition-colors" data-filter="all" aria-pressed="true">
                        {copy.filterAll}
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
                    <p id="case-count" className="sr-only" role="status" data-count-template={copy.filterCount}></p>
                  <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3" id="case-grid">
                    {cases.map((entry, i) => {
                      const { slug } = splitId(entry.id);
                      const href = localePath(lang, `/${routes[lang].work}/${slug}`);
                      const kpi = entry.data.results[0];
                      return (
                        <a href={href} className="case-card group flex flex-col overflow-hidden rounded-2xl border" style={css(`border-color: var(--line-dark); background: var(--color-ink-2); --reveal-delay: calc(${(i % 3)} * var(--stagger));`)} data-industry={entry.data.industry} data-reveal="">
                          <div className="overflow-hidden">
                            <img src={withBase(entry.data.cover)} alt={entry.data.coverAlt} width="800" height="600" loading="lazy" decoding="async" className="case-image aspect-[4/3] w-full object-cover group-hover:scale-[1.04]" />
                          </div>
                          <div className="flex flex-1 flex-col p-6">
                            <p className="text-xs font-semibold uppercase tracking-wider text-mute-dark">
                              {entry.data.client} · {entry.data.industry}
                            </p>
                            <h3 className="mt-3 flex items-start justify-between gap-4 font-display text-xl font-bold tracking-tight">
                              {entry.data.title}
                              <svg className="case-arrow mt-1.5 h-3.5 w-3.5 flex-none group-hover:translate-x-1" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                                <path d="M1 8h13M9 3l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            </h3>
                            {kpi && (
                              <p className="mt-4 text-sm text-mute-dark">
                                <span className="font-display text-lg font-bold text-accent-ctx">
                                  {kpi.prefix ?? ''}
                                  {formatNumber(kpi.value, lang)}
                                  {kpi.suffix ?? ''}
                                </span>{' '}
                                {kpi.label}
                              </p>
                            )}
                            <span className="sr-only">{copy.viewCase}</span>
                          </div>
                        </a>
                      );
                    })}
                  </div>

                  <p id="case-empty" className="mt-10 hidden text-mute-dark">{copy.empty}</p>
                </>
              ) : (
                /* Ehrlicher Zwischenstand, solange keine Referenz freigegeben ist. */
                <div className="grid gap-14 lg:grid-cols-[3fr_2fr] lg:gap-20">
                  <div>
                    <p className="eyebrow text-mute-dark" data-reveal="">
                      {copy.eyebrow}
                    </p>
                    <h2 className="h2 reveal-mask mt-5 max-w-2xl" data-reveal="">
                      <span className="reveal-line">{copy.pendingTitle}</span>
                    </h2>
                    <p className="lead mt-5 max-w-xl text-mute-dark" data-reveal="" style={css("--reveal-delay: 0.08s;")}>
                      {copy.pendingSub}
                    </p>
                    <div className="mt-10 flex flex-wrap items-center gap-4" data-reveal="" style={css("--reveal-delay: 0.16s;")}>
                      <a href={localePath(lang, `/${routes[lang].configurator}`)} className="btn btn-primary">
                        {copy.pendingCta}
                        <svg className="btn-arrow h-4 w-4" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                          <path d="M1 8h13M9 3l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </a>
                      <a href={path(lang, 'pricing')} className="btn btn-ghost">{copy.pendingSecondary}</a>
                    </div>
                  </div>

                  {/* Was stattdessen belegbar ist. */}
                  <ul className="space-y-px self-start overflow-hidden rounded-2xl border" style={css("border-color: var(--line-dark); background: var(--line-dark); --reveal-delay: 0.24s;")} data-reveal="">
                    {
                      pendingPoints.map(([title, desc]) => (
                        <li className="p-6" style={css("background: var(--color-ink-2);")} key={title}>
                          <p className="font-display text-base font-bold tracking-tight">{title}</p>
                          <p className="mt-2 text-[0.92rem] leading-relaxed text-mute-dark">{desc}</p>
                        </li>
                      ))
                    }
                  </ul>
                </div>
              )
            }
          </div>
        </section>
      )}
      <InlineScript name="work" />
    </>
  );
}
