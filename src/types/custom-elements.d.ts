import type { DetailedHTMLProps, HTMLAttributes } from 'react';

/* `<faq-accordion>` ist ein Custom Element; registriert wird es vom
   Bauteil-Skript (customElements.define). Astro brauchte dafuer keine Angabe,
   TypeScript kennt in JSX nur die Standard-Elemente und muss es erfahren. */
declare global {
  namespace React {
    namespace JSX {
      interface IntrinsicElements {
        'faq-accordion': DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>;
      }
    }
  }
}
