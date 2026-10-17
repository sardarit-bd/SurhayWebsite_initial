import { inlineScripts, type InlineScriptName } from '../inline/generated';

/* ---------------------------------------------------------------------------
   Ein Inline-Skript ausgeben.

   Astro sammelte die <script>-Bloecke aller Bauteile einer Seite ein und
   lieferte jeden GENAU EINMAL aus, unabhaengig davon, wie oft das Bauteil
   vorkam ("Das Script buendelt Astro einmal pro Seite, unabhaengig von der
   Zahl der Instanzen" — FaqAccordion.astro).

   ERSTER VERSUCH, VERWORFEN: React `cache()`
   Naheliegend war, sich pro Renderdurchlauf zu merken, was schon ausgegeben
   wurde. Das ist falsch: Next rendert eine Seite in zwei Durchlaeufen (erst
   den RSC-Strom, dann das HTML), und `cache()` ueberdauert die Grenze. Der
   erste Durchlauf "verbrauchte" die Namen, im HTML fehlten sie dann —
   gemessen: die Skripte fuer base, header und language-switcher standen auf
   KEINER der 70 Seiten, Mobilmenue, Sprachumschalter und das gesamte
   Animationssystem waren tot. Der Fehler faellt nur auf, wenn man das
   gebaute HTML prueft; der Build lief durch.

   JETZT: ohne Gedaechtnis, jedes Bauteil gibt sein Skript selbst aus.
   Damit ist es immer da. Die Doppelung, gegen die das Gedaechtnis half,
   tritt nicht auf: kein Bauteil mit Skript kommt zweimal auf einer Seite vor
   (geprueft ueber alle 70 Seiten der Referenz, und die Struktur gibt es
   nicht her — es gibt einen Header, einen Hero, ein Kontaktformular). Kaeme
   je ein zweites hinzu, waere das bei <faq-accordion> ein harter Fehler
   (customElements.define wirft beim zweiten Aufruf) — dann muss das Skript
   auf die Seitenebene wandern, nicht in ein Gedaechtnis.
--------------------------------------------------------------------------- */
export function InlineScript({ name }: { name: InlineScriptName }) {
  return <script type="module" dangerouslySetInnerHTML={{ __html: inlineScripts[name] }} />;
}
