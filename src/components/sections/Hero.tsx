import { scoped } from '../../lib/scoped';
import { css } from '../../lib/css';
import type { LangProp } from '../../lib/props';
import { path } from '../../i18n/utils';
import { branchenIcons } from '../../assets/branchen-icons';
import { InlineScript } from '../../lib/inline-once';

const heroContent = {
  de: {
    eyebrow: 'Webdesign · Entwicklung · Wartung — Berlin', titlePre: 'Websites, die', titleMarked: 'verkaufen', titleBuilt: 'gebaut füuur',
    sub: 'Maßgeschneidertes Design, saubere Entwicklung, verlässliche Wartung — für KMU, Selbstständige und Startups im DACH-Raum.',
    cta: 'Kostenloses Erstgespräch', secondaryCta: 'Preise ansehen', pauseLabel: 'Wortwechsel anhalten', playLabel: 'Wortwechsel fortsetzen', conjunction: 'und',
    branches: [
      { label: 'Praxen', proof: 'Termine kommen online herein statt über das Telefon', icons: ['stethoscope', 'dental', 'calendar-check', 'heartbeat'] },
      { label: 'Kanzleien', proof: 'Anfragen, die bereits qualifiziert im Postfach liegen', icons: ['scale', 'gavel', 'file-certificate', 'calculator'] },
      { label: 'Handwerk & Bau', proof: 'Anfragen mit allen Angaben zum Objekt, ohne Rückfrage', icons: ['hammer', 'tool', 'ruler-measure', 'home'] },
    ],
  },
  tr: {
    eyebrow: 'Web tasarım · Geliştirme · Bakım — Berlin', titlePre: 'Satış getiren', titleMarked: 'web siteleri', titleBuilt: 'şunlar için:',
    sub: 'Özel tasarım, temiz kod, güvenilir bakım — Almanca konuşulan pazardaki KOBİ’ler, serbest çalışanlar ve girişimler için.',
    cta: 'Ücretsiz ön görüşme', secondaryCta: 'Fiyatlara bakın', pauseLabel: 'Değişen kelimeyi durdur', playLabel: 'Değişen kelimeyi sürdür', conjunction: 've',
    branches: [
      { label: 'muayenehaneler', proof: 'Randevular telefon yerine internet üzerinden geliyor', icons: ['stethoscope', 'dental', 'calendar-check', 'heartbeat'] },
      { label: 'hukuk büroları', proof: 'Gelen kutunuza hazır ve nitelikli düşen talepler', icons: ['scale', 'gavel', 'file-certificate', 'calculator'] },
      { label: 'zanaatkârlar', proof: 'Talepler, proje bilgileri eksiksiz geliyor — geri sormaya gerek kalmadan', icons: ['hammer', 'tool', 'ruler-measure', 'home'] },
    ],
  },
  en: {
    eyebrow: 'Web design · Development · Maintenance — Berlin', titlePre: 'Websites that', titleMarked: 'sell', titleBuilt: 'built for',
    sub: 'Custom design, clean development, reliable maintenance — for SMEs, freelancers and startups across the DACH region.',
    cta: 'Book a free first call', secondaryCta: 'View pricing', pauseLabel: 'Pause rotating word', playLabel: 'Resume rotating word', conjunction: 'and',
    branches: [
      { label: 'practices', proof: 'Appointments arrive online instead of over the phone', icons: ['stethoscope', 'dental', 'calendar-check', 'heartbeat'] },
      { label: 'firms', proof: 'Enquiries that land pre-qualified in your inbox', icons: ['scale', 'gavel', 'file-certificate', 'calculator'] },
      { label: 'trades & building', proof: 'Enquiries with every detail about the property, no follow-up needed', icons: ['hammer', 'tool', 'ruler-measure', 'home'] },
    ],
  },
} as const;

/**
 * Hero — zentrierte Achse, viel Weissraum, rein typografisch.
 *
 * Reihenfolge: Kicker, Headline, Subline, ein primaerer CTA mit textuellem
 * Sekundaerlink, darunter die Beleg-Zeile des aktiven Segments.
 *
 * KEIN BILD — BEWUSST
 * Vorher stand hier ein Stapel aus sechs Branchen-Screenshots. Die Dateien
 * existierten nie, also rendert die Seite an ihrer prominentesten Stelle
 * „Screenshot folgt“. Ein erfundener Screenshot waere die schlechtere Loesung:
 * eine Designagentur, die fremde Mockups als eigene Arbeit zeigt, verliert
 * genau das, was sie verkauft. Solange keine echte Arbeitsprobe vorliegt,
 * traegt der Hero typografisch — Rasterlinien und die Icon-Ebene geben ihm
 * Textur, ohne etwas zu behaupten.
 *
 * Bewegung: zwei Ebenen, mehr nicht. Die Bloecke faden mit je 60 ms Versatz
 * ein, und der Segment-Wechsler laeuft. Der Bild-Crossfade und der
 * Farbschleier sind ersatzlos entfallen.
 */

export default function Hero({ lang }: LangProp) {
  /* --------------------------------------------------------------- Konstanten
     Alle Zeitwerte und Icon-Parameter stehen hier, nicht verstreut in CSS.
     Ein Timing-Wunsch ist damit eine Einzeiler-Aenderung. */
  /* ZYKLUS_MS lag bei 2000 — ein Wortwechsel alle zwei Sekunden liest sich
     hektisch und zieht den Blick permanent von der Headline weg. 4500 ms geben
     dem Auge Zeit, den Satz einmal zu Ende zu lesen, bevor er sich aendert. */
  const ZYKLUS_MS = 4500; // Wortwechsel zu Wortwechsel, auf allen Breiten gleich
  const UEBERGANG_MS = 420; // Wort und Icons
  const UEBERGANG_MOBIL_MS = 340; // kuerzere Strecke auf schmalen Viewports
  const BELEG_VERZUG_MS = 140; // Beleg-Zeile zieht nach dem Wort nach
  const ICON_ANZAHL = 4; // vorher sechs — zwei Ebenen Bewegung reichen
  const ICON_DECKKRAFT = 0.13;
  const ICON_STAFFEL_MS = 50; // Versatz je Icon beim Segmentwechsel
  const SCHWEBE_VERZUG_S = 1.6; // Staffelung der Schwebe-Animation

  /* Feste Positionen in Prozent der Hero-Flaeche — zwei links, zwei rechts,
     ausserhalb der 900px-Textspalte. Bewusst keine Zufallswerte: die wuerden
     auf Server und Client abweichen und Hydration-Fehler erzeugen. */
  const POSITIONEN = [
    { x: 9, y: 26, groesse: 32, dauer: 13 },
    { x: 7, y: 71, groesse: 26, dauer: 10 },
    { x: 91, y: 22, groesse: 27, dauer: 15 },
    { x: 93, y: 66, groesse: 31, dauer: 11 },
  ];

  const copy = heroContent[lang];
  const items = copy.branches;

  /* Icon-Ebene: alle Segmente liegen uebereinander, nur das aktive ist
     sichtbar. Die Positionen sind ueber alle Segmente identisch — nur die
     Symbole darin tauschen, sonst flimmert es im peripheren Sehfeld. */
  const iconLayer = items.map((b) =>
    POSITIONEN.slice(0, ICON_ANZAHL).map((pos, k) => ({
      ...pos,
      markup: branchenIcons[b.icons[k]] ?? '',
      name: b.icons[k],
    }))
  );

  const labels = items.map((branch) => branch.label);
  const ariaHeadline = `${copy.titlePre} ${copy.titleMarked}. ${copy.titleBuilt.charAt(0).toUpperCase()}${copy.titleBuilt.slice(1)} ${labels.slice(0, -1).join(', ')} ${copy.conjunction} ${labels[labels.length - 1]}.`;

  return (
    <>
      {scoped(
        'data-c-hero',
        <section className="hero" style={css(`--uebergang-desktop: ${UEBERGANG_MS}ms; --uebergang-mobil: ${UEBERGANG_MOBIL_MS}ms; --icon-deckkraft: ${ICON_DECKKRAFT};`)}>
          {/* Rasterlinien als Textur. Rein dekorativ, deshalb aria-hidden. */}
          <div className="raster grid-bg" aria-hidden="true"></div>

          {/* Hintergrundebene. Dekorativ: aria-hidden, focusable=false, kein <title>. */}
          <div className="icons" aria-hidden="true">
            {
              iconLayer.map((set, bi) => (
                <span className="icon-set" data-icons="" data-on={bi === 0 ? '' : undefined}>
                  {set.map((ic, k) => (
                    <span className="icon-slot" style={css(`--x: ${ic.x}%; --y: ${ic.y}%; --s: ${ic.groesse}px; --dauer: ${ic.dauer}s; --verzug: ${(k * SCHWEBE_VERZUG_S).toFixed(2)}s; --staffel: ${k * ICON_STAFFEL_MS}ms;`)}>
                      <svg viewBox="0 0 24 24" focusable="false" dangerouslySetInnerHTML={{ __html: ic.markup }} />
                    </span>
                  ))}
                </span>
              ))
            }
          </div>

          <div className="col">
            <p className="kicker" data-fade="" style={css("--i: 0")}>{copy.eyebrow}</p>

            {/* Der Wechsler ist aria-hidden; das <h1> traegt den vollstaendigen Satz
                als Label, damit Screenreader ihn einmal und statisch lesen. */}
            <h1 className="headline" data-fade="" style={css("--i: 1")} aria-label={ariaHeadline}>
              <span className="h-line" aria-hidden="true">
                {copy.titlePre} <span className="marker">{copy.titleMarked}</span>.
              </span>
              <span className="h-line h-line-2" aria-hidden="true">
                <span className="built">{copy.titleBuilt}</span>
                <span className="rot">
                  {
                    items.map((b, i) => (
                      <span className="rot-word" data-word="" data-on={i === 0 ? '' : undefined}>
                        {b.label}
                      </span>
                    ))
                  }
                </span>
              </span>
            </h1>

            <p className="sub" data-fade="" style={css("--i: 2")}>{copy.sub}</p>

            <div className="actions" data-fade="" style={css("--i: 3")}>
              <a href={path(lang, 'contact')} className="btn btn-primary cta">{copy.cta}</a>
              <a href={path(lang, 'pricing')} className="secondary">
                {copy.secondaryCta}
                <span aria-hidden="true">→</span>
              </a>
            </div>

            {/* Beleg-Zeile — was das aktive Segment im Alltag davon hat. */}
            <p className="proof" data-fade="" style={css("--i: 4")} aria-hidden="true">
              {items.map((b, i) => <span className="proof-line" data-proof="" data-on={i === 0 ? '' : undefined}>{b.proof}</span>)}
            </p>

            {/* ------------------------------------------------------ Anhalten
                WCAG 2.2.2 (Pausieren, Beenden, Ausblenden): Der Wortwechsel startet
                von selbst, laeuft laenger als fuenf Sekunden und steht neben anderem
                Inhalt. Genau dafuer verlangt das Kriterium eine Bedienmoeglichkeit —
                und zwar eine echte, dauerhafte. Dass der Wechsel beim Ueberfahren
                oder beim Hineintabben stehenbleibt, ist keine: Wer die Maus wegnimmt,
                hat ihn wieder.

                Der Knopf haelt beides an, was sich hier von allein bewegt: den
                Wortwechsel und die schwebenden Icons im Hintergrund.

                `hidden` im Markup, JS blendet ihn ein — ohne JS bewegt sich nichts,
                und ein Knopf ohne Wirkung waere schlimmer als keiner. Bei
                `prefers-reduced-motion` bleibt er ebenfalls weg (siehe Skript):
                dort steht der Wechsler ohnehin still. */}
            <button id="hero-motion" type="button" className="motion-toggle" aria-pressed="false" aria-label={copy.pauseLabel} data-label-pause={copy.pauseLabel} data-label-play={copy.playLabel} hidden>
              <svg className="motion-icon motion-icon-pause" viewBox="0 0 16 16" aria-hidden="true">
                <rect x="4" y="3" width="3" height="10" rx="1" fill="currentColor"></rect>
                <rect x="9" y="3" width="3" height="10" rx="1" fill="currentColor"></rect>
              </svg>
              <svg className="motion-icon motion-icon-play" viewBox="0 0 16 16" aria-hidden="true">
                <path d="M5 3.5v9l8-4.5-8-4.5Z" fill="currentColor"></path>
              </svg>
            </button>
          </div>
        </section>
      )}
      <InlineScript name="hero" />
    </>
  );
}
