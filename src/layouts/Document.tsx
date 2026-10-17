import type { ReactNode } from 'react';
import '@fontsource-variable/inter';
import '@fontsource-variable/bricolage-grotesque';
import '../styles/global.css';
import '../styles/components.css';
import { localeMeta, type Lang } from '../i18n/ui';

/* ---------------------------------------------------------------------------
   Dokumenthuelle — <html lang> … <body>.

   Unter Astro stand das in Base.astro. In Next darf nur ein Wurzel-Layout
   diese drei Elemente rendern, und weil <html lang> je Sprache anders lautet,
   gibt es drei Wurzel-Layouts: src/app/(de|en|tr)/layout.tsx. Alle drei rufen
   diese Huelle auf, damit es weiter EINE Stelle gibt, an der sie definiert ist.

   Deutsch laeuft ohne Praefix (/), Tuerkisch unter /tr/, Englisch unter /en/;
   die Route Groups (de)/(tr)/(en) aendern die URL nicht, sie trennen nur, welches
   Wurzel-Layout gilt. Bewusst KEINE Weiterleitung anhand von Accept-Language:
   eine automatische Umleitung verhindert das Teilen von Links, ueberrascht
   Nutzer und verwaessert die Indexierung. Die Sprache waehlt ausschliesslich
   der Umschalter im Kopfbereich.

   `charset` und `viewport` fehlen hier absichtlich: Next gibt beide von selbst
   aus, mit denselben Werten, die Base.astro setzte. Zweimal waere doppelt.
--------------------------------------------------------------------------- */

/** Woertlich der is:inline-Block aus Base.astro. Reines JavaScript, keine Typen. */
const NO_JS = [
  "document.documentElement.classList.remove('no-js');",
  "document.documentElement.classList.add('js');",
].join('\n');

export default function Document({ lang, children }: { lang: Lang; children: ReactNode }) {
  return (
    <html lang={localeMeta[lang].hreflang} className="no-js">
      <head>
        {/* Reveal-Startzustände greifen nur mit aktivem JS — vor dem ersten Paint
            umschalten. Steht im <head>, weil React ein Inline-Skript ohne src
            nicht selbst dorthin hebt. */}
        <script dangerouslySetInnerHTML={{ __html: NO_JS }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
