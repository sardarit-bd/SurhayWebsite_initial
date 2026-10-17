import clsx from 'clsx';
import { path } from '../../i18n/utils';
import { css } from '../../lib/css';
import type { LangProp } from '../../lib/props';

const pricingContent = {
  de: { eyebrow: 'Preise', title: 'Klare Pakete. Keine Überraschungen.', sub: 'Jedes Projekt ist individuell — diese Pakete geben Ihnen einen ehrlichen Rahmen. Den Festpreis erhalten Sie nach dem Erstgespräch.', from: 'ab', popular: 'Beliebt', cta: 'Projekt anfragen', link: 'Zusatzleistungen, Wartung & Zahlungsplan', plans: [['Starter', '2.900 €', 'Der professionelle Einstieg: ein starker OnePager, der Ihr Angebot auf den Punkt bringt.', ['OnePager (bis 6 Sektionen)', 'Individuelles Design', 'Kontaktformular', 'SEO-Grundsetup', 'Launch in 3–4 Wochen'], false, true, 'starter'], ['Business', '5.900 €', 'Für Unternehmen, die wachsen: mehrseitige Website mit CMS und Conversion-Fokus.', ['Bis 8 Unterseiten', 'CMS zur eigenen Pflege', 'Blog & Case Studies', 'Zweisprachig (DE/EN)', 'Performance-Garantie 95+', 'Launch in 5–7 Wochen'], true, true, 'business'], ['Individuell', 'auf Anfrage', 'Komplexe Anforderungen, Integrationen oder E-Commerce? Wir finden die passende Lösung.', ['Individueller Umfang', 'Schnittstellen & Integrationen', 'Workshops & Strategie', 'Persönliche Beratung'], false, false, 'individuell']] },
  tr: { eyebrow: 'Fiyatlar', title: 'Net paketler. Sürpriz yok.', sub: 'Her proje kendine özgüdür — bu paketler size dürüst bir çerçeve verir. Sabit fiyatı ön görüşmeden sonra alırsınız.', from: 'başlangıç', popular: 'Popüler', cta: 'Proje talebi gönderin', link: 'Ek hizmetler, bakım & ödeme planı', plans: [['Starter', '2.900 €', 'Profesyonel giriş: teklifinizi net biçimde anlatan güçlü bir tek sayfa.', ['Tek sayfa (6 bölüme kadar)', 'Özel tasarım', 'İletişim formu', 'Temel SEO kurulumu', '3–4 haftada yayın'], false, true, 'starter'], ['Business', '5.900 €', 'Büyüyen şirketler için: içerik sistemi ve dönüşüm odağıyla çok sayfalı web sitesi.', ['8 alt sayfaya kadar', 'Kendi yönetiminiz için içerik sistemi', 'Blog & vaka çalışmaları', 'İki dilli (DE/EN)', 'Performans garantisi 95+', '5–7 haftada yayın'], true, true, 'business'], ['Özel', 'talep üzerine', 'Karmaşık gereksinimler, entegrasyonlar veya e-ticaret mi? Uygun çözümü birlikte buluruz.', ['Özel kapsam', 'Arayüzler & entegrasyonlar', 'Atölye & strateji', 'Birebir danışmanlık'], false, false, 'individuell']] },
  en: { eyebrow: 'Pricing', title: 'Clear packages. No surprises.', sub: 'Every project is unique — these packages give you an honest frame. You receive a fixed quote after the initial consultation.', from: 'from', popular: 'Popular', cta: 'Request project', link: 'Add-ons, care & payment plan', plans: [['Starter', '€2,900', 'The professional entry point: a strong one-pager that gets your offer across.', ['One-pager (up to 6 sections)', 'Custom design', 'Contact form', 'SEO base setup', 'Launch in 3–4 weeks'], false, true, 'starter'], ['Business', '€5,900', 'For growing companies: a multi-page website with CMS and conversion focus.', ['Up to 8 subpages', 'CMS for self-service editing', 'Blog & case studies', 'Bilingual (DE/EN)', 'Performance guarantee 95+', 'Launch in 5–7 weeks'], true, true, 'business'], ['Custom', 'on request', 'Complex requirements, integrations or e-commerce? We will find the right solution.', ['Custom scope', 'APIs & integrations', 'Workshops & strategy', 'Personal consulting'], false, false, 'individuell']] },
} as const;

export default function Pricing({ lang }: LangProp) {
  const copy = pricingContent[lang];

  /* Die id ist der Wert, den die Karte an das Anfrageformular weiterreicht
     (data-paket) — sie muss zu den ids in src/data/pricing.ts passen, aus
     denen das Formular seine Kacheln baut. */
  const projectPlans = copy.plans.map(([name, price, desc, features, popular, fromPrefix, id]) => ({ name, price, desc, features, popular, fromPrefix, id }));

  return (
    <section id="pricing" className="scroll-mt-24 bg-paper-2/60" style={css('padding-block: var(--spacing-section);')}>
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <p className="eyebrow text-mute" data-reveal="">
          {copy.eyebrow}
        </p>
        <h2 className="h2 reveal-mask mt-5 max-w-3xl" data-reveal="">
          <span className="reveal-line">{copy.title}</span>
        </h2>
        <p className="lead mt-5 max-w-2xl text-mute" data-reveal="" style={css('--reveal-delay: 0.08s;')}>
          {copy.sub}
        </p>
        <a
          href={path(lang, 'pricing')}
          className="link-slide mt-7 inline-block font-semibold"
          data-reveal=""
          style={css('--reveal-delay: 0.12s;')}
        >
          {copy.link}{' '}
          <span aria-hidden="true">&#8594;</span>
        </a>

        <div className="price-grid mt-14 grid gap-5 lg:grid-cols-3">
          {projectPlans.map((plan, i) => (
            <div
              className={clsx(['price-cell', plan.popular && 'price-cell--ink'])}
              style={css(`--reveal-delay: calc(${i} * var(--stagger));`)}
              data-reveal=""
              key={plan.id}
            >
              <article
                className={clsx([
                  'price-card flex h-full flex-col rounded-2xl border p-8 md:p-9',
                  plan.popular ? 'dark-section' : 'price-card--light',
                ])}
                style={css(`border-color: ${plan.popular ? 'transparent' : 'var(--line)'};`)}
              >
                {/* h3, nicht h4: darueber steht die h2 der Sektion, und eine
                  uebersprungene Ebene bricht die Gliederung (WCAG 1.3.1).
                  Die Klasse `.h3` gibt weiterhin das Aussehen vor. */}
                <h3 className="h3">{plan.name}</h3>
                <p className={clsx(['mt-2 text-sm', plan.popular ? 'text-mute-dark' : 'text-mute'])}>{plan.desc}</p>
                <p className="mt-6">
                  {plan.fromPrefix && (
                    <span className={clsx(['mr-2 text-sm font-medium', plan.popular ? 'text-mute-dark' : 'text-mute'])}>
                      {copy.from}
                    </span>
                  )}{' '}
                  <span className="font-display text-4xl font-bold tracking-tight">{plan.price}</span>
                </p>
                <ul
                  className="mt-7 flex-1 space-y-2.5 border-t pt-6 text-[0.92rem]"
                  style={css(`border-color: ${plan.popular ? 'var(--line-dark)' : 'var(--line)'};`)}
                >
                  {plan.features.map((feature) => (
                    <li className="flex items-start gap-2.5" key={feature}>
                      <svg
                        className="mt-1 h-3.5 w-3.5 flex-none text-accent-ctx"
                        viewBox="0 0 14 14"
                        fill="none"
                        aria-hidden="true"
                      >
                        <path
                          d="M2 7.5 5.5 11 12 3"
                          stroke="currentColor"
                          strokeWidth="2.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                {/* Dreimal derselbe Linktext, drei verschiedene Pakete: aus der
                  Linkliste eines Screenreaders heraus waere nicht zu
                  unterscheiden, welcher welchen meint (WCAG 2.4.4). Der
                  Paketname im zugaenglichen Namen loest das; der sichtbare
                  Text bleibt Teil davon (WCAG 2.5.3). */}
                <a
                  href="#anfrage"
                  data-paket={plan.id}
                  aria-label={`${copy.cta} — ${plan.name}`}
                  className={clsx(['btn mt-8', plan.popular ? 'btn-primary' : 'btn-ghost'])}
                >
                  {copy.cta}
                </a>
              </article>
              {plan.popular && (
                <span className="price-badge absolute -top-3 right-8 rounded-full bg-accent-600 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
                  {copy.popular}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
