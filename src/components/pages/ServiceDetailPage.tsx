import { scoped } from '../../lib/scoped';
import { css } from '../../lib/css';
import type { LangProp, PfadProp } from '../../lib/props';
import Base from '../../layouts/Base';
import PageHeader from '../PageHeader';
import ContactCta from '../ContactCta';
import ServiceIcon from '../ServiceIcon';
import { SITE } from '../../config';
import { services, serviceSlugs, type Service } from '../../data/services';
import { useTranslations, path, altPaths } from '../../i18n/utils';
import TechStack from '../sections/TechStack';
import FactsGrid from '../sections/FactsGrid';
import FaqAccordion from '../FaqAccordion';
import FaqItem from '../FaqItem';

/**
 * Detailseite einer Leistung.
 *
 * Aufbau als Antwortkette auf die Fragen, die ein Entscheider in dieser
 * Reihenfolge stellt: Was ist das? Was bekomme ich? Wie laeuft es? Womit
 * arbeitet ihr? Bin ich gemeint? Und die drei Fragen, die immer kommen.
 *
 * Das Service-Schema am Ende gibt Google die gleiche Struktur maschinenlesbar.
 */
interface Props extends LangProp, PfadProp {
  service: Service;
}
export default function ServiceDetailPage({ service, lang, pathname }: Props) {
  const t = useTranslations(lang);
  const copy = service[lang];
  const others = services.filter((s) => s.id !== service.id);

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: copy.title,
    serviceType: copy.title,
    description: copy.metaDescription,
    provider: { '@type': 'ProfessionalService', name: SITE.name, url: SITE.domain },
    areaServed: ['DE', 'AT', 'CH'],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: copy.title,
      itemListElement: copy.deliverables.map((d) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: d.title, description: d.desc },
      })),
    },
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: copy.faq.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  };

  return scoped(
    'data-c-service-detail-page',
    <Base pathname={pathname} lang={lang} title={copy.metaTitle} description={copy.metaDescription} alternates={altPaths('services', serviceSlugs(service))} head={<>
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
        </>}>
      <PageHeader lang={lang} eyebrow={`${service.index} · ${t('services.eyebrow')}`} title={copy.title} lead={copy.intro} crumbs={[{ label: t('nav.services'), href: path(lang, 'services') }, { label: copy.title }]} meta={[
          { label: t('pricing.eyebrow'), value: copy.priceHint },
          { label: t('process.eyebrow'), value: copy.duration },
        ]} />

      {/* ------------------------------------------------------ Lieferumfang */}
      <section style={css("padding-block: var(--spacing-section-sm);")}>
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          {/* Sektionsmarke: das Icon der eigenen Leistung, nie ein anderes. Es steht
              nur hier — die uebrigen H2 dieser Seite tragen bereits ein Eyebrow
              als Marke, und "Weitere Leistungen" handelt von den anderen drei. */}
          <div className="section-mark" data-reveal="">
            <ServiceIcon service={service.id} size={24} className="text-accent-600" />
            <h2 className="h2 h2-sm">{t('common.included')}</h2>
          </div>

          <ul className="mt-10 grid gap-px overflow-hidden rounded-2xl border md:grid-cols-2 lg:grid-cols-3" style={css("border-color: var(--line); background: var(--line);")}>
            {
              copy.deliverables.map((item, i) => (
                <li className="bg-paper p-7" data-reveal="" style={css(`--reveal-delay: calc(${(i % 3)} * var(--stagger));`)}>
                  <p className="font-display text-base font-bold tracking-tight">{item.title}</p>
                  <p className="mt-2.5 text-[0.92rem] leading-relaxed text-mute">{item.desc}</p>
                </li>
              ))
            }
          </ul>
        </div>
      </section>

      {/* ------------------------------------------------------- Vorgehen */}
      <section className="dark-section grain" style={css("padding-block: var(--spacing-section);")}>
        <div className="relative mx-auto max-w-7xl px-5 md:px-8">
          <p className="eyebrow text-mute-dark" data-reveal="">{t('process.eyebrow')}</p>
          <h2 className="h2 h2-sm mt-5 max-w-2xl" data-reveal="">{t('process.title')}</h2>

          <ol className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {
              copy.steps.map((step, i) => (
                <li className="border-t-2 pt-6" style={css(`border-color: var(--line-dark); --reveal-delay: calc(${i} * var(--stagger));`)} data-reveal="">
                  <span className="font-display text-sm font-semibold tracking-widest text-accent-ctx">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="font-display mt-3 text-xl font-bold tracking-tight">{step.title}</h3>
                  <p className="mt-3 text-[0.92rem] leading-relaxed text-mute-dark">{step.desc}</p>
                </li>
              ))
            }
          </ol>
        </div>
      </section>

      {/* ------------------------------------------ Werkzeuge bzw. Zielwerte
          Unmittelbar unter dem Vorgehen, auf jeder der vier Leistungen mit
          eigenem Inhalt. Die Plattformfrage stellt sich nur bei der Entwicklung;
          beim Design geht es um das Entwurfswerkzeug, bei SEO und Wartung um
          Zahlen. Vier Leistungen, vier verschiedene Textkoerper — dieselbe
          Sektion auf allen vieren waere fuer Google viermal derselbe Block. */}
      {service.id === 'webentwicklung' && <TechStack lang={lang} set="platforms" />}
      {service.id === 'webdesign' && <TechStack lang={lang} set="design" />}
      {service.id === 'seo-performance' && <FactsGrid lang={lang} set="seo" />}
      {service.id === 'wartung' && <FactsGrid lang={lang} set="care" />}

      {/* ------------------------------------------------------------- FAQ */}
      <section style={css("padding-block: var(--spacing-section);")}>
        <div className="mx-auto grid max-w-7xl gap-12 px-5 md:px-8 lg:grid-cols-[2fr_3fr]">
          <div>
            <p className="eyebrow text-mute" data-reveal="">{t('faq.eyebrow')}</p>
            <h2 className="h2 h2-sm mt-5" data-reveal="">{t('faq.title')}</h2>
            <a href={path(lang, 'faq')} className="link-slide mt-6 inline-block font-semibold" data-reveal="">
              {t('service.allQuestions')} <span aria-hidden="true">→</span>
            </a>
          </div>
          {/* ="true" und nicht "": an einem Custom Element gab Astro wertlose
                    Attribute mit dem Wert "true" aus (handleBooleanAttribute in
                    astro/runtime/server). Das CSS prueft nur das Vorhandensein
                    ([data-faq-rows]), der Wert bleibt trotzdem derselbe. */}
                <FaqAccordion data-faq-rows="true" data-reveal="true">
            {
              copy.faq.map((item, i) => (
                <FaqItem question={item.q} id={`faq-service-${i}`} index={i} numbered answerClass="max-w-2xl pb-7 pr-14 leading-relaxed text-mute">
                  <p>{item.a}</p>
                </FaqItem>
              ))
            }
            <div className="border-t" style={css("border-color: var(--line);")}></div>
          </FaqAccordion>
        </div>
      </section>

      {/* ------------------------------------------------- Weitere Leistungen */}
      <section className="border-t" style={css("border-color: var(--line); background: var(--color-paper-2); padding-block: var(--spacing-section-sm);")}>
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 className="h2 h2-sm" data-reveal="">{t('service.others')}</h2>
            <a href={path(lang, 'services')} className="link-slide font-semibold" data-reveal="">
              {t('common.overview')} <span aria-hidden="true">→</span>
            </a>
          </div>
          <ul className="mt-10 grid gap-5 md:grid-cols-3">
            {
              others.map((other, i) => (
                <li data-reveal="" style={css(`--reveal-delay: calc(${i} * var(--stagger));`)}>
                  <a href={path(lang, 'services', other[lang].slug)} className="other-card fx-fill fx-card flex h-full flex-col rounded-2xl border bg-paper p-7" style={css("border-color: var(--line);")}>
                    <span className="flex items-center justify-between gap-4">
                      <span className="fx-dim font-display text-sm font-semibold tracking-widest text-mute">{other.index}</span>
                      <ServiceIcon service={other.id} size={24} className="text-accent-600" />
                    </span>
                    <span className="font-display mt-4 text-xl font-bold tracking-tight">{other[lang].title}</span>
                    <span className="mt-3 flex-1 text-[0.9rem] leading-relaxed text-mute">{other[lang].tagline}</span>
                  </a>
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

