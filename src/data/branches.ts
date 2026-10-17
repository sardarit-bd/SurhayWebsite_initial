import type { Lang } from '../i18n/ui';

/**
 * Segmente fuer den Wechsler in der Hero-Headline.
 *
 * Diese Datei ist die einzige Wahrheit: Reihenfolge, Beschriftung, Beleg-Zeile
 * und Symbole kommen ausschliesslich von hier. Wer ein Segment ergaenzt,
 * streicht oder umsortiert, aendert nur dieses Array — Headline, Icon-Ebene,
 * Beleg-Zeile und aria-label ziehen nach.
 *
 * DREI SEGMENTE, NICHT SECHS
 * Vorher rotierten hier sechs Einzelbranchen. Das stand im Widerspruch zur
 * Leistungssektion („keine Bauchladen-Agentur“) und las sich als „wir machen
 * alles fuer alle“. Drei Segmente buendeln dieselben Zielgruppen, wirken aber
 * wie eine Entscheidung statt wie eine Aufzaehlung.
 *
 * BELEG-ZEILE
 * `proof` beschreibt, was die Loesung im Alltag veraendert — keine Kennzahl.
 * Zahlen gehoeren erst auf die Seite, wenn ein echtes Projekt sie belegt.
 */
export interface Branch {
  id: string;
  label: string | Record<Lang, string>;
  proof: string | Record<Lang, string>;
  /** Genau sechs Namen aus src/assets/branchen-icons.ts. */
  icons: string[];
}

export const branches: Branch[] = [
  {
    id: 'praxen',
    label: { de: 'Praxen', tr: 'muayenehaneler', en: 'practices' },
    proof: {
      de: 'Termine kommen online herein statt über das Telefon',
      tr: 'Randevular telefon yerine internet üzerinden geliyor',
      en: 'Appointments arrive online instead of over the phone',
    },
    icons: ['stethoscope', 'dental', 'calendar-check', 'heartbeat', 'first-aid-kit', 'shield-check'],
  },
  {
    id: 'kanzleien',
    label: { de: 'Kanzleien', tr: 'hukuk büroları', en: 'firms' },
    proof: {
      de: 'Anfragen, die bereits qualifiziert im Postfach liegen',
      tr: 'Gelen kutunuza hazır ve nitelikli düşen talepler',
      en: 'Enquiries that land pre-qualified in your inbox',
    },
    icons: ['scale', 'gavel', 'file-certificate', 'calculator', 'folders', 'briefcase'],
  },
  {
    id: 'handwerk',
    /* Im Tuerkischen bewusst ein Wort statt „Handwerk & Bau“: Der Satz unter
       der Headline zaehlt die Segmente mit „ve“ auf — ein Label, das selbst
       ein „ve“ traegt, ergaebe dort ein doppeltes „ve“. */
    label: { de: 'Handwerk & Bau', tr: 'zanaatkârlar', en: 'trades & building' },
    proof: {
      de: 'Anfragen mit allen Angaben zum Objekt, ohne Rückfrage',
      tr: 'Talepler, proje bilgileri eksiksiz geliyor — geri sormaya gerek kalmadan',
      en: 'Enquiries with every detail about the property, no follow-up needed',
    },
    icons: ['hammer', 'tool', 'ruler-measure', 'home', 'building-arch', 'truck'],
  },
];

/** Liefert den Wert in der gewuenschten Sprache. */
export function pickBranch(value: string | Record<Lang, string>, lang: Lang): string {
  return typeof value === 'string' ? value : value[lang];
}

/**
 * Vollstaendiger, statischer Satz fuer das aria-label des <h1>. Er wird aus
 * denselben Daten gebaut wie der Wechsler, damit er nicht auseinanderlaeuft.
 */
export function headlineLabel(lang: Lang, lead: string, built: string): string {
  const labels = branches.map((b) => pickBranch(b.label, lang));
  const last = labels.pop() as string;
  const conjunction = { de: 'und', tr: 've', en: 'and' }[lang];
  const joined = `${labels.join(', ')} ${conjunction} ${last}`;
  /* `built` beginnt im Satzbild klein („gebaut fuer“), steht im Label aber
     nach einem Punkt — dort gross. */
  const sentence = built.charAt(0).toUpperCase() + built.slice(1);
  return `${lead} ${sentence} ${joined}.`;
}
