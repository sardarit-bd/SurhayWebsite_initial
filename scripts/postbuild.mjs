/* ---------------------------------------------------------------------------
   Nacharbeit am Export — Parität mit dem Astro-Artefakt herstellen.

   Next legt Dateien ab, die Astro nicht hatte. Sie sind harmlos, aber sie
   gehoeren nicht ins Artefakt:

   1. RSC-Nutzlasten (__next.*.txt, index.txt). Sie bedienen die
      Client-Navigation des App Routers. Diese Seite navigiert ausschliesslich
      mit gewoehnlichen <a href> — genau wie unter Astro —, also fragt sie
      niemand ab.

   2. out/_not-found/. Eine zusaetzliche, erreichbare URL, die es unter Astro
      nicht gab. Ausgeliefert wird bei unbekanntem Pfad 404.html; das Verzeichnis
      ist nur ein Nebenprodukt.

  3. out/not-found/index.html. Das ist die ECHTE 404-Seite. Sie ist eine
    gewoehnliche Route, damit das deutsche Wurzel-Layout greift und
    <html lang="de" class="no-js"> im Dokument steht. Sie wandert nach
    out/404.html — die eine Datei, die auch Astro ablegte — und ihr
    Verzeichnis verschwindet.

   4. Nexts Client-Laufzeit. Der wichtigste Punkt, und kein Feinschliff:

      Die Seite hat KEINE Client-Komponente, keinen Hook, keinen
      Event-Handler in React — die gesamte Interaktivitaet steckt in den
      Inline-Skripten, die woertlich aus der Astro-Fassung uebernommen sind.
      React haette im Browser also nichts zu tun. Es tut aber etwas: es
      hydriert.

      Und dabei zerstoert es die Seite. Die Inline-Skripte laufen als
      deferred Modul-Skripte VOR der Hydration und veraendern das DOM: das
      Basis-Skript nimmt `no-js` von <html> und setzt `js`, es baut fuer
      jede .fx-fill-Zeile Maske, Kreis und Inhaltskopie, der Zaehler
      schreibt Zahlen in Textknoten, der Sprachumschalter schreibt hrefs um.
      React findet danach ein anderes DOM als das servergerenderte, meldet
      Fehler #418 (Hydration-Mismatch) und baut den Baum komplett neu auf —
      alle Skript-Wirkungen sind weg.

      GEMESSEN im ersten Anlauf, Startseite im Browser:
        document.documentElement.className  →  "no-js"   (statt "js")
        document.querySelectorAll('.fx-clip').length  →  0  (statt 4)
        Konsole: "Minified React error #418"
      Damit waren Einblend-Animationen, Flaechen-Hover und alle
      `html.js`-Regeln aus global.css tot.

      Deshalb fliegen Nexts Skript-Tags und ihr Bootstrap aus dem Artefakt,
      und die .js-Dateien aus _next/. Das ist keine Sparmassnahme, sondern
      die Bedingung dafuer, dass die Seite funktioniert. Nebenbei stellt es
      genau die Eigenschaft wieder her, die die Astro-Fassung hatte: null
      Framework-JavaScript, gemessen 0 .js-Dateien in dist/.

      Das CSS bleibt. Die Bild-Vorladehinweise, die React fuer
      loading="eager"-Bilder erzeugt, bleiben auch — sie sind nur Hinweise.

   5. Zwei Reste, die dieselbe Ursache haben: React rendert Dinge an Stellen,
      an denen Astro sie nicht hatte.

      a) <div hidden=""><!--$--><!--/$--></div> am Anfang des Rumpfs — der
         Platzhalter der Suspense-Grenze, die Next selbst um die Seite legt.
         Geprueft ueber alle 70 Seiten: immer genau einer, immer leer.

      b) Das JSON-LD stand unter Astro im <head>. React hebt <script> nicht
         selbst dorthin (nur <title>, <meta> und <link>), es bliebe also im
         Rumpf. Google liest JSON-LD an jeder Stelle — aber es an seinen
         alten Platz zu schieben kostet drei Zeilen und macht den <head>
         wieder deckungsgleich.

   Was NICHT angefasst wird: public/ (contact.php und .htaccess gehoeren zum
   Hostinger-Ziel und werden erst im Pages-Workflow entfernt, so wie vorher).
--------------------------------------------------------------------------- */
import { readdir, readFile, rm, stat, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const OUT = 'out';

async function weg(pfad, was) {
  try {
    await rm(pfad, { recursive: true, force: true });
    entfernt.push(was);
  } catch {
    /* nicht vorhanden — dann ist nichts zu tun */
  }
}

const entfernt = [];

/** Alle RSC-Nutzlasten rekursiv entfernen. */
async function nutzlasten(ordner) {
  let n = 0;
  for (const e of await readdir(ordner, { withFileTypes: true })) {
    const p = join(ordner, e.name);
    if (e.isDirectory()) {
      if (e.name === '_next') continue;
      n += await nutzlasten(p);
    } else if (e.name.startsWith('__next.') && e.name.endsWith('.txt')) {
      await rm(p);
      n++;
    } else if (e.name === 'index.txt') {
      await rm(p);
      n++;
    }
  }
  return n;
}

try {
  await stat(OUT);
} catch {
  console.error('postbuild: out/ fehlt — erst bauen.');
  process.exit(1);
}

const anzahl = await nutzlasten(OUT);
if (anzahl) entfernt.push(`${anzahl} RSC-Nutzlasten (*.txt)`);
await weg(join(OUT, '_not-found'), 'out/_not-found/');
/* Nexts eigene Standard-404 als Verzeichnis — eine zweite, erreichbare URL,
   die Astro nicht hatte. out/404.html bleibt (siehe unten). */
await weg(join(OUT, '404'), 'out/404/');

/* Die echte 404-Seite an ihren Platz — sie ueberschreibt die Standardseite,
   die Next unter out/404.html ablegt. */
const echte = join(OUT, 'not-found', 'index.html');
try {
  const html = await readFile(echte, 'utf8');
  await writeFile(join(OUT, '404.html'), html);
  await rm(join(OUT, 'seite-nicht-gefunden'), { recursive: true, force: true });
  entfernt.push('404: not-found/index.html -> 404.html');
} catch (e) {
  console.error('postbuild: 404-Seite nicht gefunden — ' + e.message);
  process.exit(1);
}

/* ---------------------------------------------------------------------------
   Client-Laufzeit aus dem HTML nehmen
--------------------------------------------------------------------------- */
/** JSON-LD aus dem Rumpf in den <head> schieben — in unveraenderter Reihenfolge. */
function jsonldInDenKopf(html) {
  const bloecke = [];
  const rumpfBeginn = html.indexOf('<body');
  if (rumpfBeginn === -1) return html;
  const kopf = html.slice(0, rumpfBeginn);
  let rumpf = rumpfBeginn === -1 ? '' : html.slice(rumpfBeginn);
  rumpf = rumpf.replace(/<script type="application\/ld\+json"[^>]*>[\s\S]*?<\/script>/g, (treffer) => {
    bloecke.push(treffer);
    return '';
  });
  if (!bloecke.length) return html;
  const eingesetzt = kopf.replace('</head>', bloecke.join('') + '</head>');
  return eingesetzt + rumpf;
}

const MUSTER = [
  // <script src="/…/_next/static/…"> — die Framework-Buendel
  [/<script[^>]*\ssrc="[^"]*\/_next\/static\/[^"]*"[^>]*><\/script>/g, 'Framework-Buendel'],
  // <script>self.__next_f.push(…)</script> — der RSC-Strom fuer den Client
  [/<script>\s*\(?self\.__next_f[\s\S]*?<\/script>/g, 'RSC-Bootstrap'],
  // Vorladehinweise auf genau diese Buendel
  [/<link[^>]*\srel="preload"[^>]*\sas="script"[^>]*>/g, 'Skript-Vorladehinweise'],
  // preconnect auf die eigene Herkunft — galt den Buendeln, die jetzt fehlen
  [/<link[^>]*\srel="preconnect"[^>]*>/g, 'preconnect'],
  // Platzhalter der Suspense-Grenze, immer leer
  [/<div hidden=""><!--\$--><!--\/\$--><\/div>/g, 'Suspense-Platzhalter'],
];

async function htmlDateien(ordner) {
  const raus = [];
  for (const e of await readdir(ordner, { withFileTypes: true })) {
    const p = join(ordner, e.name);
    if (e.isDirectory()) raus.push(...(await htmlDateien(p)));
    else if (e.name.endsWith('.html')) raus.push(p);
  }
  return raus;
}

const dateien = await htmlDateien(OUT);
const treffer = Object.create(null);
for (const datei of dateien) {
  let html = await readFile(datei, 'utf8');
  const vorher = html;
  for (const [muster, name] of MUSTER) {
    const n = (html.match(muster) ?? []).length;
    if (n) treffer[name] = (treffer[name] ?? 0) + n;
    html = html.replace(muster, '');
  }
  const mitKopf = jsonldInDenKopf(html);
  if (mitKopf !== html) {
    treffer['JSON-LD in den Kopf'] = (treffer['JSON-LD in den Kopf'] ?? 0) + 1;
    html = mitKopf;
  }
  if (html !== vorher) await writeFile(datei, html);
}
for (const [name, n] of Object.entries(treffer)) entfernt.push(`${n}x ${name}`);

/* Kein Muster getroffen heisst: Next liefert seine Laufzeit anders aus als
   bei der Migration gemessen. Dann lieber abbrechen als eine Seite
   ausliefern, deren Skripte von der Hydration ueberschrieben werden. */
if (!treffer['Framework-Buendel']) {
  console.error(
    'postbuild: keine Framework-Buendel im HTML gefunden.\n' +
    'Entweder hat sich Nexts Ausgabe geaendert oder es gibt jetzt eine\n' +
    'Client-Komponente. Beides muss geprueft werden — siehe Punkt 4 im\n' +
    'Kopfkommentar. Abbruch, damit keine kaputte Seite hochgeht.'
  );
  process.exit(1);
}

/* Die .js-Dateien selbst — niemand verweist mehr auf sie. Das CSS bleibt. */
let js = 0;
async function jsWeg(ordner) {
  for (const e of await readdir(ordner, { withFileTypes: true })) {
    const p = join(ordner, e.name);
    if (e.isDirectory()) await jsWeg(p);
    else if (e.name.endsWith('.js')) { await rm(p); js++; }
  }
}
try { await jsWeg(join(OUT, '_next')); } catch {}
if (js) entfernt.push(`${js} .js-Dateien aus _next/`);

console.log('postbuild: ' + (entfernt.length ? entfernt.join(', ') : 'nichts zu tun'));
