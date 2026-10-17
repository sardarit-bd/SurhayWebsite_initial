import { scoped } from '../../lib/scoped';
import { css } from '../../lib/css';
import { withBase } from '../../i18n/utils';
import type { Lang } from '../../i18n/ui';
import { techEntries, techSets, type TechId } from '../../data/tech';

/**
 * Technologie-Sektion — Werkzeuge und Plattformen als Kacheln.
 *
 * KONFIGURIERBAR STATT KOPIERT
 * Welche Eintraege erscheinen, sagt die Seite; die Texte selbst stehen in
 * `data/tech.ts`. Zwei Belegungen sind dort vorbereitet:
 *   platforms  worauf die Website spaeter laeuft (Entwicklung, sechs Zeichen)
 *   design     womit der Entwurf entsteht        (Design, zwei Zeichen)
 * `items`, `eyebrow`, `title` und `lead` ueberschreiben die Belegung einzeln,
 * falls eine Seite nur eine Ueberschrift anders braucht.
 *
 * MARKENZEICHEN
 * Die vier Marken liegen als <img> vor, nicht inline. Damit koennen sich IDs
 * von Verlaeufen und Clip-Pfaden zwischen den Dateien gar nicht erst
 * ueberschreiben — jede ist ihr eigenes Dokument. Herkunft und Farbfassung
 * jeder Datei stehen im Kopf von `data/tech.ts`.
 *
 * Karten-, Raster- und Abstandsregeln teilt die Sektion sich mit
 * `FactsGrid.astro` (`.tile-section`, `.tile-grid`, `.tile` in global.css) —
 * beide sitzen am selben Platz auf ihren Leistungsseiten und muessen deshalb
 * gleich aussehen.
 */
interface Props {
  lang: Lang;
  /** Vorbereitete Belegung aus `techSets`. Standard: die Plattformfrage. */
  set?: keyof typeof techSets;
  /** Einzelne Auswahl — schlaegt die Belegung. */
  items?: TechId[];
  eyebrow?: string;
  title?: string;
  lead?: string;
}
export default function TechStack({ lang, set = 'platforms', items, eyebrow, title, lead }: Props) {
  const preset = techSets[set];
  const ids = items ?? preset.items;
  const copy = preset.copy[lang];
  const heading = { eyebrow: eyebrow ?? copy.eyebrow, title: title ?? copy.title, lead: lead ?? copy.lead };

  /* Zwei und vier Kacheln laufen zweispaltig — sonst stuende eine leere dritte
     Spalte da. Bei so wenigen Kacheln wird das Raster zusaetzlich gedeckelt,
     damit die einzelne Karte nicht auf halbe Containerbreite auseinanderlaeuft. */
  const colsLg = ids.length === 2 || ids.length === 4 ? 2 : Math.min(3, ids.length);
  const colsMd = Math.min(2, ids.length);
  const gridStyle = `--tile-cols-md: ${colsMd}; --tile-cols-lg: ${colsLg};${colsLg === 2 ? ' --tile-max: 47rem;' : ''}`;

  return scoped(
    'data-c-tech-stack',
    <section className="tile-section">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <p className="eyebrow text-mute" data-reveal="">{heading.eyebrow}</p>
        <h2 className="h2 h2-sm mt-5 max-w-2xl" data-reveal="">{heading.title}</h2>
        <p className="lead mt-5 max-w-2xl text-mute" data-reveal="" style={css("--reveal-delay: 0.06s;")}>{heading.lead}</p>

        <ul className="tile-grid mt-12" style={css(gridStyle)}>
          {
            ids.map((id, i) => {
              const tech = techEntries[id];
              return (
                <li className="tile bg-paper" data-reveal="" style={css(`--logo-scale: ${tech.scale}; --reveal-delay: calc(${i % 3} * var(--stagger));`)}>
                  {/* Kein `loading="lazy"`: die fuenf Dateien wiegen zusammen rund 8 kB.
                      Nachladen spart hier nichts und zeigt nur die Marke verspaetet. */}
                  <span className="tech-mark" aria-hidden="true">
                    {
                      'file' in tech.mark ? (
                        <img src={withBase(tech.mark.file)} alt="" width="48" height="48" decoding="async" />
                      ) : tech.mark.draw === 'code' ? (
                        /* Chevron-Paar mit Schrägstrich — </> */
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" focusable="false">
                          <path d="M8.5 6 3 12l5.5 6" />
                          <path d="M15.5 6 21 12l-5.5 6" />
                          <path d="M13.8 3.6 10.2 20.4" />
                        </svg>
                      ) : (
                        /* Gestapelte Inhaltsblöcke — Kopfbereich, Block, Textzeilen */
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" focusable="false">
                          <rect x="2.5" y="3.5" width="19" height="7" rx="1.75" />
                          <rect x="2.5" y="14" width="8" height="6.5" rx="1.75" />
                          <path d="M14 15.5h7.5" />
                          <path d="M14 19h5.5" />
                        </svg>
                      )
                    }
                  </span>
                  <h3 className="tile-title tech-name">{tech.name}</h3>
                  <p className="tile-text text-mute">{preset.texts?.[id]?.[lang] ?? tech.text[lang]}</p>
                </li>
              );
            })
          }
        </ul>
      </div>
    </section>
  );
}

