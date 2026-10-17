import type { Lang } from '../../i18n/ui';
import { factSets } from '../../data/facts';
import { scoped } from '../../lib/scoped';
import { css } from '../../lib/css';

/**
 * Kennzahl-Sektion — Zielwerte und Leistungsumfang als Kacheln.
 *
 * Sie sitzt auf "SEO & Performance" und "Wartung" an derselben Stelle, an
 * der die Entwicklungsseite ihre Technologie-Sektion zeigt: unmittelbar unter
 * dem Vorgehen. Werkzeug-Logos beantworten dort nicht die Frage des Kunden —
 * wer Sichtbarkeit kauft, will Zielwerte sehen, wer Betreuung kauft den
 * Umfang. Deshalb Zahlen statt Marken, aber dieselbe Kachel: Karten-, Raster-
 * und Abstandsregeln kommen aus `.tile-section` / `.tile-grid` / `.tile` in
 * global.css, geteilt mit `TechStack.tsx`.
 *
 * VORLESBARKEIT
 * Zahl und Einheit stehen in EINEM Absatz und damit in einem zusammenhaengenden
 * Textknoten: ein Screenreader liest "2,5 Sekunden", nicht eine nackte Ziffer.
 * Direkt danach folgt die Beschriftung als Ueberschrift, sodass die Reihenfolge
 * beim Vorlesen "2,5 Sekunden — Ladezeit bis zum Hauptinhalt" ergibt.
 *
 * Die Werte selbst stehen in `data/facts.ts`, samt Herkunft und Hinweis, welche
 * davon aus `data/pricing.ts` uebernommen sind.
 */
interface Props {
  lang: Lang;
  set: keyof typeof factSets;
}

export default function FactsGrid({ lang, set }: Props) {
  const copy = factSets[set][lang];

  /* Gleiche Regel wie in TechStack: zwei und vier Kacheln laufen zweispaltig,
     alles darueber dreispaltig ab 1200 px. */
  const count = copy.facts.length;
  const colsLg = count === 2 || count === 4 ? 2 : Math.min(3, count);
  const colsMd = Math.min(2, count);
  const gridStyle = `--tile-cols-md: ${colsMd}; --tile-cols-lg: ${colsLg};${colsLg === 2 ? ' --tile-max: 47rem;' : ''}`;

  return scoped(
    'data-c-facts-grid',
    <section className="tile-section">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <p className="eyebrow text-mute" data-reveal="">
          {copy.eyebrow}
        </p>
        <h2 className="h2 h2-sm mt-5 max-w-2xl" data-reveal="">
          {copy.title}
        </h2>
        <p className="lead mt-5 max-w-2xl text-mute" data-reveal="" style={css('--reveal-delay: 0.06s;')}>
          {copy.lead}
        </p>

        <ul className="tile-grid mt-12" style={css(gridStyle)}>
          {copy.facts.map((fact, i) => (
            <li
              className="tile bg-paper"
              data-reveal=""
              style={css(`--reveal-delay: calc(${i % 3} * var(--stagger));`)}
              key={fact.title}
            >
              <p className="fact-value">
                {fact.value} <span className="fact-unit">{fact.unit}</span>
              </p>
              <h3 className="tile-title fact-title">{fact.title}</h3>
              <p className="tile-text text-mute">{fact.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
