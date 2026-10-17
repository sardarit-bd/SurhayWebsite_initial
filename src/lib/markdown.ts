import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkSmartypants from 'remark-smartypants';
import remarkRehype from 'remark-rehype';
import rehypeSlug from 'rehype-slug';
import rehypeStringify from 'rehype-stringify';

/* ---------------------------------------------------------------------------
   Markdown-Pipeline — nachgebaut, was Astro von selbst mitbrachte.

   Astro hatte fuer Markdown eine fertige Kette eingebaut; Next hat keine. Die
   vier Bausteine, die in der Ausgabe messbar waren, stehen deshalb hier
   ausgeschrieben — in derselben Reihenfolge, mit demselben Ergebnis:

     remark-gfm          Tabellen, Durchstreichung, Aufgabenlisten
     remark-smartypants  typografische Anfuehrungszeichen und Gedankenstriche
     rehype-slug         id-Attribute an den Ueberschriften (github-slugger),
                         gemessen an <h2 id="woran-sie-ein-faires-angebot-erkennen">
     rehypeTabellenScroll  das eigene Plugin von unten, unveraendert

   `allowDangerousHtml` steht auf beiden Seiten, weil Astro rohes HTML im
   Markdown durchliess. Derzeit enthaelt keine der 120 Dateien welches — die
   Einstellung haelt die Kette fuer den Fall offen, dass eine kuenftige es tut.
--------------------------------------------------------------------------- */

/* ---------------------------------------------------------------------------
   Tabellen aus Markdown in einen Scroll-Behaelter legen

   Eine Tabelle laesst sich nicht umbrechen — sie braucht ihre zwei Dimensionen,
   und WCAG 1.4.10 nimmt sie davon ausdruecklich aus. Was das Kriterium nicht
   erlaubt, ist, dass sie die GANZE SEITE waagerecht aufschiebt: Gemessen lief
   die Kostentabelle im Blogbeitrag bei 320 px 54 px aus dem Fenster, und
   `overflow-x: clip` am Body schnitt sie dann ab.

   Der Behaelter ist derselbe, den die Cookie-Seite von Hand setzt
   (.table-scroll in global.css): scrollbar, per Tastatur erreichbar
   (tabindex="0" — ein Scrollbereich, den nur die Maus erreicht, ist keiner)
   und benannt, damit die Region nicht namenlos bleibt.

   Als Plugin statt von Hand im Markdown, damit auch jede kuenftige Tabelle
   ihn bekommt. Ohne zusaetzliches Paket: der Baum ist ein einfaches Objekt.
--------------------------------------------------------------------------- */
const TABELLE_LABEL: Record<string, string> = { de: 'Tabelle', en: 'Table', tr: 'Tablo' };

/* eslint-disable @typescript-eslint/no-explicit-any */
const sammleText = (knoten: any): string =>
  knoten.type === 'text' ? knoten.value : (knoten.children ?? []).map(sammleText).join('');

function rehypeTabellenScroll() {
  return (tree: any, file: any) => {
    const pfad = String(file?.path ?? '');
    const treffer = pfad.match(/\/content\/[^/]+\/(de|en|tr)\//);
    const label = TABELLE_LABEL[treffer?.[1] ?? 'de'];

    const gehe = (knoten: any) => {
      if (!knoten.children) return;
      knoten.children = knoten.children.map((kind: any) => {
        gehe(kind);
        if (kind.type !== 'element' || kind.tagName !== 'table') return kind;
        /* Traegt die Tabelle eine Beschriftung, benennt sie den Bereich —
           sonst der Gattungsbegriff. */
        const caption = kind.children?.find((c: any) => c.tagName === 'caption');
        const text = caption ? sammleText(caption).trim() : '';
        return {
          type: 'element',
          tagName: 'div',
          properties: { className: ['table-scroll'], role: 'region', tabIndex: 0, 'aria-label': text || label },
          children: [kind],
        };
      });
    };

    gehe(tree);
  };
}

const prozessor = unified()
  .use(remarkParse)
  .use(remarkGfm)
  .use(remarkSmartypants)
  .use(remarkRehype, { allowDangerousHtml: true })
  .use(rehypeSlug)
  .use(rehypeTabellenScroll)
  .use(rehypeStringify, { allowDangerousHtml: true });

/**
 * Markdown-Rumpf zu HTML. `path` ist der Dateipfad — das Tabellen-Plugin
 * liest daraus die Sprache fuer das aria-label, genau wie unter Astro.
 */
export async function renderMarkdown(body: string, path: string): Promise<string> {
  const datei = await prozessor.process({ value: body, path });
  return String(datei);
}
