import { localeMeta, type Lang } from './i18n/ui';

/**
 * Zentrale Site-Konfiguration.
 * Platzhalter (Formspree-ID, Kalender-Link, Social-Profile) hier pflegen —
 * sie werden überall auf der Website referenziert.
 */
export const SITE = {
  name: 'Surhay Design',
  domain: 'https://surhay.design',
  email: 'hallo@surhay.design',
  city: 'Berlin',
  /**
   * Ziel des Anfrageformulars — der bevorzugte Weg.
   *
   * Leer lassen heisst: es gilt die Formspree-ID unten. Sobald hier etwas
   * steht, gewinnt dieser Wert. Gedacht ist er fuer einen Empfangsdienst mit
   * Serverstandort EU — '/contact.php' (eigener Endpunkt auf dem Hoster,
   * liegt in public/) oder ein Anbieter wie Formspark oder Basin. Vor der
   * Entscheidung pruefen, wo die Daten liegen und ob ein
   * Auftragsverarbeitungsvertrag angeboten wird; den AVV abschliessen und
   * ablegen. Der Abschnitt "Kontaktformular" der Datenschutzerklaerung nennt
   * den Dienst beim Namen und muss mitgepflegt werden.
   */
  formEndpoint: '',
  /** Formspree-Form-ID — unter https://formspree.io anlegen und hier eintragen. */
  formspreeId: 'DEINE_FORM_ID',
  /** Kalender-Link für das Erstgespräch (z. B. cal.com oder Calendly). */
  calendarUrl: 'https://cal.com/surhay/erstgespraech',
  social: {
    linkedin: 'https://www.linkedin.com/company/surhay-design',
    instagram: 'https://www.instagram.com/surhay.design',
    github: 'https://github.com/surhay',
  },
};

/**
 * ⚠️ RECHTLICHE PFLICHTANGABEN — die einzige Stelle, die gepflegt werden muss.
 *
 * Impressum (§ 5 DDG) und Datenschutzerklärung ziehen ihre Daten ausschließlich
 * von hier — DE und EN gleichzeitig. Alles, was unten noch in eckigen Klammern
 * steht, ist ein Platzhalter und MUSS vor dem Live-Gang ersetzt werden:
 * ein Impressum mit unvollständigen Angaben ist abmahnfähig.
 */
export const LEGAL = {
  /** Vor- und Nachname des Diensteanbieters (Pflicht, § 5 Abs. 1 Nr. 1 DDG). */
  owner: '[Vor- und Nachname eintragen]',
  /** Ladungsfähige Anschrift — kein Postfach (Pflicht). */
  street: '[Straße und Hausnummer]',
  zip: '[PLZ]',
  city: 'Berlin',
  /* Laendername je Sprache — die Anschrift selbst bleibt unveraendert. */
  country: 'Deutschland',
  countryTr: 'Almanya',
  countryEn: 'Germany',
  /**
   * Telefonnummer (Pflicht: mind. ein schneller elektronischer Kontaktweg
   * neben der E-Mail).
   *
   * `phone` ist die sichtbare Schreibweise in deutscher Konvention
   * („030 12345678“), `phoneE164` dieselbe Nummer international und ohne
   * Trennzeichen fuer den tel:-Link („+493012345678“). Beide muessen
   * gepflegt sein, sonst zeigt die Kontaktseite gar keine Nummer — siehe
   * `phoneNumber` unten.
   */
  phone: '[Telefonnummer]',
  phoneE164: '',
  /**
   * Umsatzsteuer:
   *   kleinunternehmer: true  → Hinweis nach § 19 UStG, keine USt-IdNr.
   *   kleinunternehmer: false → vatId ausfüllen (§ 27a UStG).
   */
  kleinunternehmer: true,
  vatId: '',
  /** Zuständige Datenschutz-Aufsichtsbehörde (nach Sitz). */
  authority: 'Berliner Beauftragte für Datenschutz und Informationsfreiheit',
  authorityUrl: 'https://www.datenschutz-berlin.de',
  /** Hoster — erscheint im Datenschutz-Abschnitt „Hosting“. */
  host: 'Hostinger International Ltd., 61 Lordou Vironos Street, 6023 Larnaca, Zypern',
  /** Stand der Rechtstexte (ISO-Datum) — bei inhaltlichen Änderungen hochsetzen. */
  updated: '2026-07-26',
};

/** Laendername in der jeweiligen Sprache. */
function country(lang: Lang): string {
  return { de: LEGAL.country, tr: LEGAL.countryTr, en: LEGAL.countryEn }[lang];
}

/** Anschrift als Zeilen-Array — für <br />-getrennte Ausgabe in allen Sprachen. */
export function legalAddress(lang: Lang): string[] {
  return [SITE.name, LEGAL.owner, LEGAL.street, `${LEGAL.zip} ${LEGAL.city}`, country(lang)];
}

/** Einzeilige Anschrift, z. B. für den Verantwortlichen im Datenschutztext. */
export function legalAddressInline(lang: Lang): string {
  return `${SITE.name}, ${LEGAL.owner}, ${LEGAL.street}, ${LEGAL.zip} ${LEGAL.city}, ${country(lang)}`;
}

/** Stand-Datum lokalisiert, z. B. „26. Juli 2026“. */
export function legalUpdated(lang: Lang): string {
  return new Intl.DateTimeFormat(localeMeta[lang].intl, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(`${LEGAL.updated}T00:00:00Z`));
}

/* ---------------------------------------------------------------------------
   Platzhalter-Erkennung
   Die Auslieferung enthaelt bewusst Platzhalter (Formspree-ID, Impressum).
   Solange sie nicht ersetzt sind, darf die Startseite sie nicht zeigen: ein
   Formular, das ins Leere sendet, kostet echte Anfragen, und „[Vor- und
   Nachname eintragen]“ auf der Startseite kostet Glaubwuerdigkeit. Die
   betroffenen Sektionen fragen hier nach und weichen auf einen ehrlichen
   Ersatz aus, statt einen Platzhalter zu rendern.
--------------------------------------------------------------------------- */

/** Formspree-URL — null, solange die Auslieferungs-ID drinsteht. */
export const formspreeAction: string | null =
  SITE.formspreeId !== 'DEINE_FORM_ID' ? `https://formspree.io/f/${SITE.formspreeId}` : null;

/**
 * Ziel des Anfrageformulars auf der Kontaktseite — null, solange keins
 * gepflegt ist. Ein eigener Endpunkt sticht Formspree; das ist die Stelle, an
 * der der Wechsel auf einen EU-Dienst stattfindet, ohne ein Bauteil
 * anzufassen.
 *
 * NUR DIE KONTAKTSEITE
 * Der Konfigurator sendet eine voellig andere Feldstruktur (Typ, Extras,
 * Wartung) und wird von `public/contact.php` folgerichtig abgewiesen. Er
 * bleibt deshalb an `formspreeAction`. Wer beides ueber den eigenen Endpunkt
 * fahren will, muss contact.php um diese Felder erweitern.
 */
const customEndpoint: string = SITE.formEndpoint;
export const formAction: string | null = customEndpoint ? customEndpoint : formspreeAction;

/** false, solange das Anfrageformular kein Ziel hat. */
export const formEnabled: boolean = formAction !== null;

/** Name des Inhabers — null, solange der Platzhalter aus LEGAL.owner steht. */
export const ownerName: string | null = LEGAL.owner.startsWith('[') ? null : LEGAL.owner;

/**
 * Telefonnummer fuer sichtbare Ausgabe und tel:-Link — null, solange der
 * Platzhalter steht oder die internationale Fassung fehlt.
 *
 * Dieselbe Regel wie bei `ownerName`: Lieber gar keine Nummer als eine
 * erfundene oder ein „[Telefonnummer]“ auf der Kontaktseite. Sobald beide
 * Felder in LEGAL gepflegt sind, erscheint die Zeile von selbst.
 */
export const phoneNumber: { display: string; href: string } | null =
  !LEGAL.phone.startsWith('[') && LEGAL.phoneE164
    ? { display: LEGAL.phone, href: `tel:${LEGAL.phoneE164.replace(/[^\d+]/g, '')}` }
    : null;
