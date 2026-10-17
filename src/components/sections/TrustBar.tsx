import { scoped } from '../../lib/scoped';
import { css } from '../../lib/css';
import type { LangProp } from '../../lib/props';

const trustContent = {
  de: { label: 'Was Sie erwarten können', facts: [['Antwort in 24 Stunden', 'Auf jede Anfrage — werktags meist deutlich schneller.'], ['Festpreis vor Projektstart', 'Nach dem Erstgespräch schriftlich fixiert. Kein Nachschlag, keine Stundenzettel.'], ['Individueller Code', 'Kein Baukasten, kein gekauftes Theme. Ladezeit unter einer Sekunde.'], ['Berlin, DACH-weit', 'Zusammenarbeit remote auf Deutsch und Englisch, Termine vor Ort in Berlin.']] },
  tr: { label: 'Bizden bekleyebilecekleriniz', facts: [['24 saat içinde yanıt', 'Her talebe — hafta içi çoğu zaman çok daha hızlı.'], ['Başlamadan önce sabit fiyat', 'Ön görüşmeden sonra yazılı olarak sabitlenir. Ek fatura yok, saat çizelgesi yok.'], ['Elle yazılmış kod', 'Hazır kurgu yok, satın alınmış tema yok. Bir saniyenin altında yüklenme süresi.'], ['Berlin merkezli, tüm bölgeye', 'Almanca ve İngilizce uzaktan çalışma, Berlin’de yüz yüze görüşme.']] },
  en: { label: 'What to expect', facts: [['Reply within 24 hours', 'To every enquiry — usually much faster on working days.'], ['Fixed price before we start', 'Agreed in writing after the first call. No top-ups, no timesheets.'], ['Hand-written code', 'No site builder, no bought theme. Sub-second load times.'], ['Berlin, serving DACH', 'Remote collaboration in German and English, on-site meetings in Berlin.']] },
} as const;

/**
 * Vertrauenszeile — ersetzt das frühere Wort-Laufband.
 *
 * An dieser Stelle, direkt unter dem Hero, entscheidet sich, ob jemand
 * weiterliest. Ein Laufband mit „Strategie · Webdesign · Performance“ sagt
 * dort nichts, was nicht ohnehin jede Agentur behauptet. Hier stehen
 * stattdessen vier Zusagen, die überprüfbar sind und die der Rest der Seite
 * einlöst: Antwortzeit, Festpreis, Bauweise, Zusammenarbeit.
 *
 * Bewusst ohne eigene Fläche und ohne Animation — die Zeile ist Beleg,
 * nicht Blickfang.
 */
export default function TrustBar({ lang }: LangProp) {
  const copy = trustContent[lang];

  return scoped(
    'data-c-trust-bar',
    <section aria-label={copy.label} style={css('padding-block: var(--spacing-section-sm);')}>
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <ul
          className="grid gap-x-8 gap-y-9 border-y py-10 sm:grid-cols-2 lg:grid-cols-4"
          style={css('border-color: var(--line);')}
          data-reveal=""
        >
          {copy.facts.map(([title, desc]) => (
            <li className="fact" key={title}>
              <p className="font-display text-lg font-bold tracking-tight">{title}</p>
              <p className="mt-2 text-[0.92rem] leading-relaxed text-mute">{desc}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
