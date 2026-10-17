import { cloneElement, isValidElement, Fragment, type ReactNode, type ReactElement } from 'react';

/* ---------------------------------------------------------------------------
   Bereichskennung an die eigenen Elemente haengen — Astros Style-Scoping.

   Astro gab jeder Komponente mit <style>-Block eine Kennung
   (data-astro-cid-xxxxxxxx) und setzte sie an JEDES Element der EIGENEN
   Vorlage. Entscheidend ist die AUTORSCHAFT, nicht die Verschachtelung zur
   Laufzeit: Astro markiert beim Kompilieren, welche Datei das Element
   hinschreibt.

   WARUM DAS WICHTIG IST — der Fehler, den es gekostet hat
   Der erste Anlauf brach an jeder Komponentengrenze ab. Das ist falsch, denn
   die Seitenbauteile geben ihr ganzes Markup als `children` an <Base> weiter:

       return scoped('data-c-process-page', <Base …>…mein Markup…</Base>);

   `<Base>` ist eine Funktion, keine Zeichenkette — der Walker blieb stehen und
   markierte NICHTS. Gemessen an /prozess/: 0 markierte Elemente statt 223,
   und damit griff kein einziger scoped Stil. Sichtbar war das an den
   Phasennummern, die transparent mit Konturschrift stehen sollten und
   stattdessen schwarz gefuellt waren.

   ALSO: in die Element-Eigenschaften einer Kindkomponente hineinlaufen.
   Was dort steckt (children, head), hat DIESE Komponente geschrieben. Was die
   Kindkomponente selbst rendert, steht zu diesem Zeitpunkt noch nicht im
   Baum — es kann also gar nicht versehentlich markiert werden.

   DURCHGEREICHTER INHALT
   Umgekehrt darf eine Komponente den Inhalt NICHT markieren, den sie selbst
   als `children` bekommen hat: den hat die aufrufende Seite geschrieben.
   Solcher Inhalt laeuft durch <Fremd>, und dort bricht der Walker ab. Das
   betrifft genau ein Bauteil mit eigenen Styles: Legal.

   WARUM ALS WALKER UND NICHT VON HAND
   Es sind 840 Elemente in 26 Bauteilen. Jedes vergessene Attribut waere eine
   still nicht mehr greifende Style-Regel — ein Fehler, den kein Typcheck und
   kein Build findet, sondern nur ein Vergleich der berechneten Stile.
--------------------------------------------------------------------------- */

/** Grenze fuer durchgereichten Inhalt. Rendert nichts Eigenes. */
export function Fremd({ children }: { children?: ReactNode }) {
  return <>{children}</>;
}

/** Enthaelt dieser Wert React-Elemente? Dann wurde er hier geschrieben. */
function traegtElemente(wert: unknown): boolean {
  if (isValidElement(wert)) return true;
  if (Array.isArray(wert)) return wert.some(traegtElemente);
  return false;
}

function gehe(node: ReactNode, attr: string): ReactNode {
  if (Array.isArray(node)) return node.map((k) => gehe(k, attr));
  if (!isValidElement(node)) return node;

  const el = node as ReactElement<Record<string, unknown>>;

  /* Fragmente erzeugen kein Element — durchlaufen, nichts markieren. */
  if (el.type === Fragment) {
    const kinder = gehe(el.props.children as ReactNode, attr);
    return cloneElement(el, undefined, kinder);
  }

  /* Kindkomponente: sie bekommt keine Kennung (sie hat ihre eigene), aber die
     Elemente in ihren Eigenschaften stammen von hier. <Fremd> ist die
     Ausnahme — dort steht Inhalt der aufrufenden Seite. */
  if (typeof el.type !== 'string') {
    if (el.type === Fremd) return el;
    const neu: Record<string, unknown> = {};
    let geaendert = false;
    for (const [name, wert] of Object.entries(el.props ?? {})) {
      if (!traegtElemente(wert)) continue;
      neu[name] = gehe(wert as ReactNode, attr);
      geaendert = true;
    }
    return geaendert ? cloneElement(el, neu) : el;
  }

  /* <script> und <style> bleiben unmarkiert. Astro machte das genauso —
     gemessen an der Referenz: kein einziges script- oder style-Tag traegt eine
     data-astro-cid. Eine Kennung dort waere nicht bloss ueberfluessig: sie
     laesst das Tag durch jedes Muster fallen, das `<script type="…">` ohne
     weitere Attribute erwartet, und genau daran war das BlogPosting-Schema
     der sechs Blogseiten schon einmal aus dem <head> gefallen. */
  if (el.type === 'script' || el.type === 'style') {
    const kinder = el.props?.children;
    return kinder === undefined ? el : cloneElement(el, undefined, gehe(kinder as ReactNode, attr));
  }

  const hatKinder = el.props != null && 'children' in el.props && el.props.children !== undefined;
  if (!hatKinder) return cloneElement(el, { [attr]: '' });
  return cloneElement(el, { [attr]: '' }, gehe(el.props.children as ReactNode, attr));
}

/**
 * `scoped('data-c-hero', <section>…</section>)` — haengt die Kennung an jedes
 * eigene Element. Aufruf am Ende der Komponente, um die ganze Vorlage.
 */
export function scoped(attr: string, baum: ReactNode): ReactNode {
  return gehe(baum, attr);
}
