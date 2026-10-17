import { css } from '../../lib/css';
import type { LangProp } from '../../lib/props';
import { getCollection, renderEntry } from '../../lib/content';
import FaqAccordion from '../FaqAccordion';
import FaqItem from '../FaqItem';
import { path, splitId } from '../../i18n/utils';
import type { FaqData } from '../../content.config';

const faqContent = {
  de: { eyebrow: 'FAQ', title: 'Häufige Fragen, ehrliche Antworten.', allLink: 'Alle Fragen ansehen' },
  tr: { eyebrow: 'SSS', title: 'Sık sorulan sorular, dürüst yanıtlar.', allLink: 'Tüm soruları görün' },
  en: { eyebrow: 'FAQ', title: 'Common questions, honest answers.', allLink: 'See all questions' },
} as const;

export default async function Faq({ lang }: LangProp) {
  const copy = faqContent[lang];

  const all = await getCollection<FaqData>('faq', ({ id }) => splitId(id).lang === lang);
  /* Nur die fuenf haeufigsten; die vollstaendige Liste steht auf /faq.
     Eine Startseite, die zwoelf Einwaende durchgeht, verliert den Faden. */
  const faqs = await Promise.all(
    all
      .sort((a, b) => a.data.order - b.data.order)
      .slice(0, 5)
      .map(async (entry) => ({ question: entry.data.question, html: await renderEntry(entry) }))
  );

  return (
    <section id="faq" className="scroll-mt-24" style={css("padding-block: var(--spacing-section);")}>
      <div className="mx-auto grid max-w-7xl gap-12 px-5 md:px-8 lg:grid-cols-[2fr_3fr]">
        <div>
          <p className="eyebrow text-mute" data-reveal="">{copy.eyebrow}</p>
          <h2 className="h2 reveal-mask mt-5" data-reveal="">
            <span className="reveal-line">{copy.title}</span>
          </h2>
          <a href={path(lang, 'faq')} className="link-slide mt-7 inline-block font-semibold" data-reveal="" style={css("--reveal-delay: 0.08s;")}>
            {copy.allLink} <span aria-hidden="true">→</span>
          </a>
        </div>

        {/* ="true" und nicht "": an einem Custom Element gab Astro wertlose
                    Attribute mit dem Wert "true" aus (handleBooleanAttribute in
                    astro/runtime/server). Das CSS prueft nur das Vorhandensein
                    ([data-faq-rows]), der Wert bleibt trotzdem derselbe. */}
                <FaqAccordion data-faq-rows="true" data-reveal="true">
          {
            faqs.map(({ question, html }, i) => (
              <FaqItem question={question} id={`faq-home-${i}`} index={i} numbered answerHtml={html} key={question} />
            ))
          }
          <div className="border-t" style={css("border-color: var(--line);")}></div>
        </FaqAccordion>

      </div>
    </section>
  );
}

