import { scoped } from '../../lib/scoped';
import { css } from '../../lib/css';
import type { LangProp } from '../../lib/props';
import { getCollection } from '../../lib/content';
import { SITE, ownerName } from '../../config';
import { path, splitId, withBase } from '../../i18n/utils';
import type { TestimonialData } from '../../content.config';

const studioContent = {
  de: { eyebrow: 'Studio', title: 'Wer an Ihrer Website arbeitet.', sub: 'Kein Account-Management, keine Weiterreichung an wechselnde Freelancer: Sie sprechen mit der Person, die entwirft, entwickelt und später wartet. Deshalb dauern Entscheidungen hier Stunden statt Wochen.', role: 'Webdesign & Entwicklung', photoAlt: 'Bildmarke von Surhay Design', readMore: 'Mehr erfahren', about: 'Agentur', cta: 'Erstgespräch buchen', newTab: 'öffnet in neuem Tab', facts: [['Eine Ansprechperson', 'Vom Erstgespräch bis nach dem Launch dieselbe — ohne Übergabeverluste.'], ['Handwerk statt Baukasten', 'Struktur, Typografie, Ladezeit und Barrierefreiheit werden hier einzeln entschieden.'], ['Auch nach dem Launch da', 'Updates, Sicherheit und Support im monatlichen Paket — monatlich kündbar.']] },
  tr: { eyebrow: 'Stüdyo', title: 'Sitenizde kim çalışıyor.', sub: 'Müşteri temsilcisi yok, değişen serbest çalışanlara devir yok: tasarlayan, geliştiren ve sonradan bakımını yapan kişiyle konuşursunuz. Kararlar bu yüzden haftalar değil saatler alır.', role: 'Web tasarım & geliştirme', photoAlt: 'Surhay Design marka işareti', readMore: 'Daha fazla bilgi', about: 'Stüdyo', cta: 'Ön görüşme ayarlayın', newTab: 'yeni sekmede açılır', facts: [['Tek muhatap', 'Ön görüşmeden yayın sonrasına kadar aynı kişi — devir kaybı olmadan.'], ['Hazır kurgu değil, zanaat', 'Yapı, tipografi, yüklenme süresi ve erişilebilirlik burada tek tek kararlaştırılır.'], ['Yayından sonra da buradayız', 'Güncellemeler, güvenlik ve destek tek bir aylık pakette — aylık iptal edilebilir.']] },
  en: { eyebrow: 'Studio', title: 'Who actually builds your website.', sub: 'No account management, no handing off to rotating freelancers: you talk to the person who designs, develops and later maintains it. That is why decisions here take hours instead of weeks.', role: 'Web design & development', photoAlt: 'Surhay Design brand mark', readMore: 'Learn more', about: 'Studio', cta: 'Book a first call', newTab: 'opens in new tab', facts: [['One point of contact', 'The same one from the first call until after launch — nothing lost in handover.'], ['Craft, not a site builder', 'Structure, typography, load time and accessibility are each decided deliberately.'], ['Still here after launch', 'Updates, security and support in one monthly plan — cancel monthly.']] },
} as const;

/**
 * Studio — wer die Website tatsächlich baut.
 *
 * Steht bewusst VOR der Preissektion: Wer 2.900 bis 5.900 € ausgibt, will
 * vorher wissen, mit wem er es zu tun hat. Bei einem Ein-Personen-Studio ist
 * genau das der Vorteil gegenüber einer Agentur — er muss nur benannt werden.
 *
 * NAME UND FOTO
 * Der Name kommt aus LEGAL.owner. Solange dort der Platzhalter steht, zeigt
 * der Block den Studionamen statt „[Vor- und Nachname eintragen]“ — sobald
 * LEGAL.owner gefüllt ist, erscheint er hier automatisch.
 * Das Porträt unter /images/surhay-portrait.webp ist derzeit eine
 * Platzhaltergrafik. Ein echtes Foto an dieser Stelle ist das stärkste
 * Vertrauenssignal der ganzen Seite — austauschen, sobald vorhanden.
 *
 * KUNDENSTIMMEN
 * Werden nur gerendert, wenn sie in der Sammlung `real: true` tragen. Erfundene
 * Zitate mit Namen und Foto sind nach § 5 UWG irreführende Werbung — die Lücke
 * bleibt lieber leer, bis eine echte Stimme vorliegt.
 */

export default async function Studio({ lang }: LangProp) {
  const copy = studioContent[lang];

  const all = await getCollection<TestimonialData>('testimonials', ({ id, data }) => splitId(id).lang === lang && data.real);
  const voices = all.sort((a, b) => a.data.order - b.data.order).slice(0, 2);

  const facts = copy.facts;

  return scoped(
    'data-c-studio',
    <section id="studio" className="dark-section grain scroll-mt-24" style={css("padding-block: var(--spacing-section);")}>
      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid gap-14 lg:grid-cols-[2fr_3fr] lg:gap-20">
          {/* Porträt */}
          <div data-reveal="">
            <div className="portrait overflow-hidden rounded-2xl border" style={css("border-color: var(--line-dark);")}>
              <img src={withBase('/images/surhay-portrait.webp')} alt={copy.photoAlt} width="960" height="1120" loading="lazy" decoding="async" className="aspect-[4/5] w-full object-cover" />
            </div>
            <p className="mt-5 font-display text-lg font-bold tracking-tight">{ownerName ?? SITE.name}</p>
            <p className="mt-1 text-sm text-mute-dark">{copy.role} · {SITE.city}</p>
          </div>

          {/* Text */}
          <div>
            <p className="eyebrow text-mute-dark" data-reveal="">{copy.eyebrow}</p>
            <h2 className="h2 reveal-mask mt-5" data-reveal="">
              <span className="reveal-line">{copy.title}</span>
            </h2>
            <p className="lead mt-5 max-w-xl text-mute-dark" data-reveal="" style={css("--reveal-delay: 0.08s;")}>{copy.sub}</p>

            <dl className="mt-10 grid gap-8 sm:grid-cols-3" data-reveal="" style={css("--reveal-delay: 0.16s;")}>
              {
                facts.map(([title, desc]) => (
                  <div key={title}>
                    <dt className="font-display text-base font-bold tracking-tight">{title}</dt>
                    <dd className="mt-2 text-[0.92rem] leading-relaxed text-mute-dark">{desc}</dd>
                  </div>
                ))
              }
            </dl>

            <div className="mt-10 flex flex-wrap items-center gap-4" data-reveal="" style={css("--reveal-delay: 0.24s;")}>
              {/* „Mehr erfahren" allein sagt nicht, worueber — aus einer
                  Linkliste heraus ist das nicht zu beantworten (WCAG 2.4.4).
                  Der sichtbare Text bleibt im Namen enthalten (WCAG 2.5.3). */}
              <a href={path(lang, 'about')} className="btn btn-primary" aria-label={`${copy.readMore}: ${copy.about}`}>
                {copy.readMore}
                <svg className="btn-arrow h-4 w-4" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M1 8h13M9 3l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
              </a>
              <a href={SITE.calendarUrl} className="btn btn-ghost" rel="noopener noreferrer" target="_blank">
                {/* Die beiden {' '} sind gemessen, nicht geraten: Astros Ausgabe hatte
                    hier drei Kindknoten — " Erstgespräch buchen", das sr-only-<span>
                    und einen reinen Leerzeichen-Knoten. In einem Flex-Container
                    (.btn hat gap) bildet der letzte ein eigenes Element und damit
                    einen zweiten Abstand: die Schaltflaeche ist dadurch 9,6 px
                    breiter. Ohne die Einfuegungen ist sie schmaler als vorher. */}
                {' '}
                {copy.cta}<span className="sr-only"> ({copy.newTab})</span>{' '}
              </a>
              <a href={`mailto:${SITE.email}`} className="link-slide font-semibold">{SITE.email}</a>
            </div>

            {/* Kundenstimmen — nur echte, sonst gar keine. */}
            {
              voices.length > 0 && (
                <ul className="mt-14 grid gap-6 sm:grid-cols-2">
                  {voices.map((voice, i) => (
                    <li className="rounded-2xl border p-7" style={css(`border-color: var(--line-dark); background: var(--color-ink-2); --reveal-delay: calc(${i} * var(--stagger));`)} data-reveal="">
                      <blockquote className="text-[0.98rem] leading-relaxed">„{voice.data.quote}“</blockquote>
                      <div className="mt-6 flex items-center gap-3">
                        <img src={withBase(voice.data.photo)} alt="" width="640" height="640" loading="lazy" decoding="async" className="h-11 w-11 flex-none rounded-full object-cover" />
                        <p className="text-sm">
                          <span className="font-semibold">{voice.data.name}</span>
                          <br />
                          <span className="text-mute-dark">{voice.data.company}</span>
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              )
            }
          </div>
        </div>
      </div>
    </section>
  );
}

