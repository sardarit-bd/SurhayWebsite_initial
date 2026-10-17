import HomePage from '@/components/home/HomePage';

/**
 * Startseite — Einstieg, nicht Gesamtinhalt.
 *
 * Seit dem Umbau auf mehrere Seiten hat die Startseite eine andere Aufgabe:
 * Sie muss in einem Durchlauf zeigen, worum es geht, und dann in die richtige
 * Unterseite abgeben. Jede Sektion ist deshalb ein Teaser mit genau einem
 * weiterfuehrenden Weg — der ausfuehrliche Inhalt steht unter /leistungen,
 * /projekte, /prozess, /preise, /agentur und /kontakt.
 *
 * Reihenfolge als Argumentationskette: wofuer (Hero) → warum glaubwuerdig
 * (Vertrauenszeile) → was (Leistungen) → Beweis (Projekte) → wie (Prozess) →
 * wer (Studio) → was kostet es (Preise) → Kompetenzbeleg (Insights) →
 * Einwaende (FAQ) → naechster Schritt (Anfrage-Sektion).
 */
export default function Page() {
  const lang = 'de' as const;

  return (
    <HomePage lang={lang} />
  );
}
