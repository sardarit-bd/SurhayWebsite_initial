import { scoped } from '../lib/scoped';
import { css } from '../lib/css';
import type { LangProp } from '../lib/props';
import ContactForm from './ContactForm';
import { SITE } from '../config';

/**
 * Globale Anfrage-Sektion — steht am Ende jeder Inhaltsseite.
 *
 * WARUM SIE DAS ABSCHLUSSBAND ABLOEST
 * Vorher endete jede Unterseite mit einem Band, das zur Kontaktseite
 * verlinkte. Wer auf der Preisseite ueberzeugt war, musste erst navigieren,
 * bevor er handeln konnte — und jeder zusaetzliche Klick kostet Anfragen.
 * Hier steht das Formular an genau der Stelle, an der die Entscheidung
 * faellt.
 *
 * EIN ORT DER WAHRHEIT
 * Das Formular ist nicht nachgebaut, sondern dasselbe Bauteil wie auf der
 * Kontaktseite (ContactForm.astro): dieselben Felder, dieselbe Pruefung,
 * dieselben Fehlermeldungen, derselbe Spamschutz, derselbe Endpunkt aus
 * src/config.ts. Wer ein Feld aendern will, aendert es dort — und es gilt an
 * beiden Stellen. Diese Datei liefert nur die Umrahmung.
 *
 * NICHT AUF JEDER SEITE
 * Kontaktseite: dort steht das Formular bereits im Hauptbereich. Eine zweite
 * Anfrage-Sektion darunter wuerde wirken, als haette das erste Absenden nicht
 * funktioniert — und zwei Formulare auf einer Seite haetten doppelte IDs.
 * Rechtstexte: eine Anfrage-Aufforderung ist dort sachfremd.
 *
 * NUR HEADLINE UND SUBLINE SIND UEBERSCHREIBBAR
 * Damit auf der Projekte-Seite „Gefaellt Ihnen, was Sie sehen?" stehen kann,
 * ohne die Sektion zu duplizieren. Feldbeschriftungen, Fehlermeldungen und
 * Buttontext bleiben fest — sonst driften die Formulierungen ueber die Seiten
 * auseinander.
 */
interface Props extends LangProp {
  /** Ersetzt die Standard-Headline. Leer lassen heisst: Standardtext. */
  title?: string;
  /** Ersetzt die Standard-Subline. */
  sub?: string;
}

const ctaContent = {
  de: { eyebrow: 'Anfrage', title: 'Bereit für eine Website, die arbeitet?', sub: 'Kürze? Schreiben Sie kurz, worum es geht — Antwort innerhalb von 24 Stunden.', direct: 'Direkt schreiben?' },
  tr: { eyebrow: 'Talep', title: 'İşe yarayan bir web sitesine hazır mısınız?', sub: 'Kısaca neyle ilgili olduğunu yazın — 24 saat içinde yanıt.', direct: 'Doğrudan yazmayı mı tercih edersiniz?' },
  en: { eyebrow: 'Enquiry', title: 'Ready for a website that pulls its weight?', sub: 'Tell us briefly what this is about — a reply within 24 hours.', direct: 'Prefer to write directly?' },
} as const;
export default function ContactCta({ title: titleProp, sub: subProp, lang }: Props) {
  const copy = ctaContent[lang];
  /* Unter Astro standen diese Vorgaben in der Zerlegung von Astro.props.
     Als Parameter-Vorgabe geht das in React nicht: `t` entsteht erst im
     Rumpf, die Vorgaben werden aber davor ausgewertet. Derselbe Wert,
     eine Zeile spaeter. */
  const title = titleProp ?? copy.title;
  const sub = subProp ?? copy.sub;

  return scoped(
    'data-c-contact-cta',
    <section className="cta-form">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="cta-form-card">
          <div className="cta-form-col">
            <p className="eyebrow text-mute" data-reveal="">{copy.eyebrow}</p>

            <h2 className="h2 h2-sm cta-form-title mt-5" data-reveal="" style={css("--reveal-delay: 0.06s;")}>
              {title}
            </h2>

            <p className="lead mt-5 text-mute" data-reveal="" style={css("--reveal-delay: 0.12s;")}>{sub}</p>

            {/* Ersetzt die Direkt-Karte der Kontaktseite in einer Zeile: Wer lieber
                eine Mail schreibt, findet die Adresse, ohne dass die Sektion um
                einen ganzen Block waechst. */}
            <p className="cta-form-direct" data-reveal="" style={css("--reveal-delay: 0.18s;")}>
              {copy.direct}{' '}
              <a href={`mailto:${SITE.email}`} className="link-slide font-semibold">{SITE.email}</a>
            </p>

            {/* showHomeLink: Der Rücksprung zur Startseite entfaellt hier — die
                Person steht nach dem Absenden bereits auf der Seite, die sie
                ueberzeugt hat. */}
            <div className="cta-form-body" data-reveal="" style={css("--reveal-delay: 0.24s;")}>
              <ContactForm lang={lang} showHomeLink={false} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

