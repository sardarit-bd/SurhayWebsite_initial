import { scoped } from '../../lib/scoped';
import { css } from '../../lib/css';
import type { LangProp } from '../../lib/props';

const processContent = {
  de: { eyebrow: 'Prozess', title: 'Vom ersten Gespräch zum Launch — in vier Schritten.', sub: 'Transparent, planbar und ohne Agentur-Theater. Sie wissen jederzeit, wo Ihr Projekt steht.', steps: [['Erstgespräch', 'Wir sprechen über Ihre Ziele, Zielgruppe und Ihr Budget. Kostenlos, unverbindlich — und ehrlich: Wenn wir nicht passen, sagen wir es Ihnen.', '30–45 Min.'], ['Konzept & Design', 'Struktur, Inhalte und Design entstehen auf Basis Ihrer Ziele. Sie sehen früh einen klickbaren Entwurf und geben Feedback, bevor eine Zeile Code geschrieben wird.', '1–2 Wochen'], ['Entwicklung', 'Das freigegebene Design wird sauber und performant umgesetzt. Inklusive CMS, damit Sie Inhalte später selbst pflegen können.', '2–4 Wochen'], ['Launch & Wartung', 'Nach Tests auf allen Geräten geht Ihre Website live. Auf Wunsch übernehmen wir danach Updates, Sicherheit und Support — monatlich kündbar.', 'fortlaufend']] },
  tr: { eyebrow: 'Süreç', title: 'İlk görüşmeden yayına — dört adımda.', sub: 'Şeffaf, planlanabilir ve ajans tiyatrosu olmadan. Projenizin nerede olduğunu her an bilirsiniz.', steps: [['Ön görüşme', 'Hedeflerinizi, hedef kitlenizi ve bütçenizi konuşuruz. Ücretsiz, bağlayıcı değil — ve dürüst: uymuyorsak bunu size söyleriz.', '30–45 dk.'], ['Konsept & tasarım', 'Yapı, içerik ve tasarım hedeflerinize göre şekillenir. Tek satır kod yazılmadan tıklanabilir bir taslak görür ve geri bildirim verirsiniz.', '1–2 hafta'], ['Geliştirme', 'Onaylanan tasarım temiz ve hızlı biçimde hayata geçer. İçeriği sonradan kendiniz yönetebilmeniz için içerik sistemi dahil.', '2–4 hafta'], ['Yayın & bakım', 'Tüm cihazlarda testlerden sonra siteniz yayına girer. İsterseniz güncellemeleri, güvenliği ve desteği biz üstleniriz — aylık iptal edilebilir.', 'süregelen']] },
  en: { eyebrow: 'Process', title: 'From first call to launch — in four steps.', sub: 'Transparent, predictable and free of agency theatrics. You always know where your project stands.', steps: [['Consultation', 'We talk about your goals, audience and budget. Free, no strings attached — and honest: if we are not the right fit, we will tell you.', '30–45 min'], ['Concept & Design', 'Structure, content and design take shape based on your goals. You see a clickable draft early and give feedback before a single line of code is written.', '1–2 weeks'], ['Development', 'The approved design is built cleanly and fast. Including a CMS, so you can maintain content yourself later on.', '2–4 weeks'], ['Launch & Maintenance', 'After testing on all devices, your website goes live. If you like, we handle updates, security and support afterwards — cancel monthly.', 'ongoing']] },
} as const;

export default function Process({ lang }: LangProp) {
  const copy = processContent[lang];

  return scoped(
    'data-c-process',
    <section id="process" className="scroll-mt-24" style={css('padding-block: var(--spacing-section);')}>
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

        <ol className="mt-16 grid gap-0 md:grid-cols-2 lg:grid-cols-4">
          {copy.steps.map(([title, desc, duration], i) => (
            <li
              className="relative border-t py-8 pr-8 md:border-t-2 md:py-10"
              style={css(`border-color: var(--line); --reveal-delay: calc(${i} * var(--stagger));`)}
              data-reveal=""
              data-step-mark=""
              key={title}
            >
              {/* Fortschrittspunkt auf der Linie */}
              <span className="absolute -top-[5px] left-0 hidden h-2 w-2 rounded-full bg-ink md:block" aria-hidden="true" />
              <span className="step-number font-display text-5xl font-bold tracking-tight md:text-6xl">0{i + 1}</span>
              <h3 className="h3 mt-5">{title}</h3>
              <p className="mt-3 text-[0.95rem] leading-relaxed text-mute">{desc}</p>
              <p className="eyebrow mt-5 !text-[0.7rem] text-mute">{duration}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
