import { path } from '../../i18n/utils';
import { scoped } from '../../lib/scoped';
import { css } from '../../lib/css';
import type { LangProp } from '../../lib/props';

const servicesContent = {
  de: { eyebrow: 'Leistungen', title: 'Drei Dinge. Richtig gut.', sub: 'Keine Bauchladen-Agentur: Wir konzentrieren uns auf das, was Ihre Website erfolgreich macht — und liefern es in höchster Qualität.', all: 'Alle Leistungen', items: [['01', 'Webdesign', 'Individuelles, conversion-orientiertes Design — kein Template, kein Baukasten. Ein Auftritt, der im Kopf bleibt und Anfragen bringt.', 'webdesign'], ['02', 'Webentwicklung', 'Saubere, performante Umsetzung: Ladezeiten unter einer Sekunde, Top-Rankings und ein CMS, das Sie selbst pflegen.', 'entwicklung'], ['03', 'Wartung', 'Updates, Backups, Monitoring und Support im monatlichen Paket — Ihre Website bleibt sicher, aktuell und schnell.', 'wartung']] },
  tr: { eyebrow: 'Hizmetler', title: 'Üç iş. Hakkıyla.', sub: 'Her işi yapan bir ajans değiliz: Web sitenizi başarılı kılan şeye odaklanır ve onu en yüksek kalitede teslim ederiz.', all: 'Tüm hizmetler', items: [['01', 'Web tasarım', 'Özel, dönüşüme odaklı tasarım — şablon yok, hazır kurgu yok. Akılda kalan ve talep getiren bir görünüm.', 'web-tasarim'], ['02', 'Web geliştirme', 'Temiz ve hızlı uygulama: bir saniyenin altında yüklenme, üst sıralarda görünürlük ve kendiniz yönetebileceğiniz bir içerik sistemi.', 'web-gelistirme'], ['03', 'Bakım', 'Güncellemeler, yedekler, izleme ve destek tek bir aylık pakette — siteniz güvenli, güncel ve hızlı kalır.', 'bakim']] },
  en: { eyebrow: 'Services', title: 'Three things. Done right.', sub: 'No jack-of-all-trades agency: we focus on what makes your website successful — and deliver it at the highest quality.', all: 'All services', items: [['01', 'Web Design', 'Custom, conversion-driven design — no templates, no site builders. A presence people remember, built to generate inquiries.', 'web-design'], ['02', 'Web Development', 'Clean, high-performance builds: sub-second load times, top rankings and a CMS you can maintain yourself.', 'web-development'], ['03', 'Maintenance', 'Updates, backups, monitoring and support in one monthly plan — your website stays secure, current and fast.', 'maintenance']] },
} as const;

/**
 * Leistungen auf der Startseite — Teaser, nicht Vollbild.
 *
 * Seit die Leistungen eigene Unterseiten haben, ist diese Sektion nur noch
 * das Inhaltsverzeichnis: vier Zeilen, jede ein Link. Der Text kommt aus
 * demselben Katalog wie die Detailseiten (src/data/services.ts), damit
 * Startseite und Unterseite nicht auseinanderlaufen.
 */
export default function Services({ lang }: LangProp) {
  const copy = servicesContent[lang];

  return scoped(
    'data-c-services',
    <>
      {/* overflow-x: clip sichert den seitlichen Ueberstand der Hover-Flaeche ab
     (siehe global.css, Flaechen-Hover) — `clip` statt `hidden`, damit hier
     kein Scroll-Container entsteht. */}
      <section
        id="services"
        className="scroll-mt-24"
        style={css('padding-block: var(--spacing-section); overflow-x: clip;')}
      >
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="eyebrow text-mute" data-reveal="">
                {copy.eyebrow}
              </p>
              <h2 className="h2 reveal-mask mt-5 max-w-3xl" data-reveal="">
                <span className="reveal-line">{copy.title}</span>
              </h2>
            </div>
            <a
              href={path(lang, 'services')}
              className="link-slide font-semibold"
              data-reveal=""
              style={css('--reveal-delay: 0.08s;')}
            >
              {copy.all} <span aria-hidden="true">→</span>
            </a>
          </div>
          <p className="lead mt-5 max-w-2xl text-mute" data-reveal="" style={css('--reveal-delay: 0.08s;')}>
            {copy.sub}
          </p>

          <ol className="mt-14">
            {copy.items.map(([index, title, tagline, slug], i) => {
              return (
                <li
                  className="service-row fx-fill group relative grid gap-3 border-t py-9 md:grid-cols-[6rem_1fr_1.4fr_3rem] md:items-baseline md:gap-8 md:py-11"
                  style={css(`border-color: var(--line); --reveal-delay: calc(${i} * var(--stagger));`)}
                  data-reveal=""
                  key={slug}
                >
                  <span className="service-index fx-dim font-display text-sm font-semibold tracking-widest text-mute">
                    {index}
                  </span>
                  <h3>
                    <a
                      href={path(lang, 'services', slug)}
                      className="row-link service-title font-display text-3xl font-bold tracking-tight md:text-4xl"
                    >
                      {title}
                    </a>
                  </h3>
                  <p className="leading-relaxed text-mute">{tagline}</p>
                  <svg
                    className="row-arrow hidden h-4 w-4 text-mute md:block md:justify-self-end"
                    viewBox="0 0 16 16"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M1 8h13M9 3l5 5-5 5"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </li>
              );
            })}
          </ol>
          <div className="border-t" style={css('border-color: var(--line);')}></div>
        </div>
      </section>
    </>
  );
}
