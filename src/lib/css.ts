import type { CSSProperties } from 'react';

/* ---------------------------------------------------------------------------
   style="..." als Zeichenkette weiterverwenden.

   Astro nahm am Element eine CSS-Zeichenkette; React nimmt ein Objekt mit
   camelCase-Schluesseln. Beim Umschreiben von Hand waere das ueber rund
   hundert Fundstellen die wahrscheinlichste Fehlerquelle der ganzen
   Migration — ein vertippter Eigenschaftsname faellt weder dem Typcheck noch
   dem Build auf.

   Deshalb bleibt die Zeichenkette im Quelltext genau so stehen, wie sie in
   der Astro-Fassung stand, und wird hier zur Bauzeit zerlegt. Custom
   Properties (--reveal-delay) behalten ihren Namen; React gibt sie
   unveraendert aus.

   Das ausgegebene style-Attribut ist danach dasselbe Regelwerk, aber anders
   geschrieben: React setzt `padding-top:1rem`, Astro schrieb
   `padding-top: 1rem;`. Die angewandten Werte sind identisch, die
   Zeichenfolge nicht — siehe MIGRATION-NOTES.md.
--------------------------------------------------------------------------- */
export function css(text: string): CSSProperties {
  const out: Record<string, string> = {};
  /* An Semikola trennen, die nicht in Klammern stehen — url(a;b) und
     clamp(...) duerfen nicht zerfallen. */
  let tief = 0;
  let akt = '';
  const teile: string[] = [];
  for (const ch of text) {
    if (ch === '(') tief++;
    else if (ch === ')') tief--;
    if (ch === ';' && tief === 0) {
      teile.push(akt);
      akt = '';
      continue;
    }
    akt += ch;
  }
  teile.push(akt);

  for (const teil of teile) {
    const i = teil.indexOf(':');
    if (i === -1) continue;
    const name = teil.slice(0, i).trim();
    const wert = teil.slice(i + 1).trim();
    if (!name || !wert) continue;
    /* Custom Property unveraendert, alles andere nach camelCase. */
    out[name.startsWith('--') ? name : name.replace(/-([a-z])/g, (_, c: string) => c.toUpperCase())] = wert;
  }
  return out as CSSProperties;
}
