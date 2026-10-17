import type { HTMLAttributes, ReactNode } from 'react';
import { InlineScript } from '../lib/inline-once';

/**
 * Klammer um eine Reihe von <FaqItem>.
 *
 * Sie leistet zwei Dinge:
 *   1. Sie fuehrt den Zustandsautomaten fuer alle Panels darin.
 *   2. Sie haelt die geklickte Frage waehrend der Bewegung an ihrer Stelle.
 *
 * MEHRERE PANELS DUERFEN OFFEN STEHEN. Ein exklusives Accordion muesste beim
 * Wechsel den Eintrag oberhalb zuklappen, und dann bleibt nur die Wahl
 * zwischen zwei schlechten Ausgaengen: Entweder wandert die eben angeklickte
 * Frage um die Hoehe des zuklappenden Panels nach oben weg, oder die Seite
 * scrollt genau diese Strecke mit, damit die Frage steht — auf den
 * Leistungsseiten sind das 100 bis 200 px, bei denen der halbe Bildschirm
 * verrutscht. Wenn nur nach unten hin Hoehe dazukommt, stellt sich die Frage
 * nicht: Ueber der geklickten Zeile aendert sich nichts, sie steht von selbst.
 * Zwei offene Antworten sind der guenstigere Preis.
 *
 * Das Script wird einmal pro Seite ausgeliefert, unabhaengig von der Zahl der
 * Instanzen — dafuer sorgt <InlineScript> (src/lib/inline-once.tsx), so wie
 * es vorher Astros Bundler tat. Die Suche auf /faq greift ueber `setOpen()`
 * von aussen zu.
 */
interface Props extends HTMLAttributes<HTMLElement> {
  /** Hiess unter Astro <slot />. */
  children?: ReactNode;
}

export default function FaqAccordion({ children, ...rest }: Props) {
  return (
    <>
      <faq-accordion {...rest}>{children}</faq-accordion>
      <InlineScript name="faq-accordion" />
    </>
  );
}
