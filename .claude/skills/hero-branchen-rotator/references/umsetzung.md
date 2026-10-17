# Umsetzung — Timing, Icons, Barrierefreiheit, Abnahme

## Inhalt

1. Konstanten
2. Der Timer
3. Wortwechsler
4. Umgebung: Screenshot und Proof-Zeile
5. Schwebende Icons
6. Barrierefreiheit und SEO
7. Performance
8. Responsive
9. Abnahme-Checkliste

---

## 1. Konstanten

Am Dateianfang, benannt, nicht in CSS-Werten verstreut:

```ts
const ZYKLUS_MS      = 2000   // Wortwechsel zu Wortwechsel, auf allen Breiten gleich
const UEBERGANG_MS   = 380    // Wort und Icons (mobil 320)
const BILD_FADE_MS   = 600    // großer Screenshot, bewusst träger
const ICON_ANZAHL    = 6
const ICON_DECKKRAFT = 0.16   // Zielwert, siehe Abschnitt 5
```

`ZYKLUS_MS` ist eine Vorgabe, kein Richtwert. Nicht verändern, ohne dass es ausdrücklich
verlangt wurde.

Timing-Wünsche des Nutzers sind damit eine Einzeiler-Änderung. Wenn eine Anpassung
mehr als eine dieser Zeilen berührt, stimmt etwas an der Struktur nicht.

---

## 2. Der Timer

Genau ein `setInterval` bzw. eine `requestAnimationFrame`-Schleife in der
Hero-Komponente. Der Index wandert per Props oder Context nach unten, nicht per
eigenem Zähler in Kindkomponenten.

Startbedingung: erst nach dem `load`-Event. Vorher konkurriert die Animation mit dem
Laden des LCP-Bildes.

Pausieren bei:
- `:hover` oder `:focus-within` über der Hero-Sektion — wer liest, soll zu Ende lesen
- `document.hidden` — Hintergrundtabs verbrauchen sonst grundlos Rechenzeit
- Sichtbarkeit unter 50 Prozent, via `IntersectionObserver`

Der Index läuft zyklisch weiter (`(i + 1) % branches.length`). Kein Zurücksetzen auf 0
mit sichtbarem Rücksprung.

---

## 3. Wortwechsler

Der Wechsler steht am Ende der zweiten Headline-Zeile, hinter ihm folgt nichts. Damit
darf die Wortbreite variieren, ohne dass etwas umbricht.

Maske: Container mit `overflow: hidden`, Höhe exakt `1em × line-height` der Headline,
gesetzt über eine CSS-Variable — nicht per JavaScript gemessen, das erzeugt einen
Sprung beim ersten Rendern.

Bewegung: aktives Wort fährt auf `translateY(-100%)`, das nächste kommt gleichzeitig
von `translateY(100%)`. Ausschließlich `transform` und `opacity`, `will-change:
transform`, Dauer `UEBERGANG_MS`, `cubic-bezier(0.16, 1, 0.3, 1)`.

**Ober- und Unterlängen prüfen.** Die Maske ist knapp bemessen; „Zahnärzte" hat sowohl
Umlautpunkte als auch eine Unterlänge im `ä` benachbarten Schriftschnitt. Nach der
Umsetzung visuell mit dem längsten und dem umlautreichsten Label gegenprüfen und die
Maskenhöhe notfalls über `padding-block` erweitern, nicht über eine kleinere
Schriftgröße.

Farbe: `--accent-600`. Gleiche Größe und gleiches Gewicht wie der Rest der Headline —
das rotierende Wort ist Teil des Satzes, kein Badge.

---

## 4. Umgebung: Screenshot und Proof-Zeile

Beides wechselt mit demselben Index, versetzt um 120 ms nach dem Wort. Der Versatz
macht aus drei gleichzeitigen Wechseln eine Bewegung mit Richtung.

Screenshot: Crossfade über `BILD_FADE_MS`, nur `opacity`. Kein Scale, kein Slide, kein
Blur. Beide Bilder liegen absolut übereinander, der Container hat feste
`aspect-ratio`.

Proof-Zeile: 13 px, `uppercase`, `letter-spacing: 0.1em`, gedämpfte Textfarbe, davor
ein 6 px großer Punkt in `--accent-400`. Fester Zeilenraum für zwei Zeilen, damit
unterschiedlich lange Texte den Abstand darunter nicht verändern.

Farbschleier: optional, radialer Verlauf aus `tint`, maximal 6 Prozent Deckkraft,
800 ms Übergang. Wenn `tint` fehlt, entfällt der Schleier ersatzlos.

**Platzhalter bei fehlendem Bild:** Fläche in der Seitenhintergrundfarbe, 1 px Rahmen
in `--border`, 16 px Radius, mittig ein kleiner Text in gedämpfter Farbe. Keine
flächige Akzentfarbe.

---

## 5. Schwebende Icons

Die Icons sind der Grund, warum sich die Umgebung überhaupt nach Branche anfühlt. Sie
funktionieren nur, solange sie im Randbereich bleiben und kaum auffallen.

### Positionen

Feste Liste, keine Zufallswerte zur Laufzeit. Zufall beim Rendern erzeugt bei
serverseitigem Rendering unterschiedliche Werte auf Server und Client und damit
Hydration-Fehler.

Alle Werte in Prozent der Hero-Fläche. Die Textspalte liegt zentriert und maximal
900 px breit — die Icons leben ausschließlich in den Rändern links und rechts davon:

```ts
const POSITIONEN = [
  { x:  8, y: 22, groesse: 34, dauer: 11 },
  { x: 15, y: 58, groesse: 24, dauer: 14 },
  { x:  6, y: 76, groesse: 28, dauer:  9 },
  { x: 88, y: 18, groesse: 26, dauer: 13 },
  { x: 93, y: 52, groesse: 32, dauer: 10 },
  { x: 84, y: 79, groesse: 22, dauer: 12 },
]
```

Drei links, drei rechts, vertikal versetzt. Unterschiedliche Größen und Dauern sind
wichtig: bei gleichen Werten bewegen sich alle Icons im Takt und das Auge liest sie
als ein Muster statt als Atmosphäre.

### Schweben

Reine CSS-Keyframes, kein JavaScript pro Frame:

```css
@keyframes schweben {
  0%, 100% { transform: translate(0, 0) rotate(0deg); }
  33%      { transform: translate(4px, -9px) rotate(2.5deg); }
  66%      { transform: translate(-3px, 6px) rotate(-2deg); }
}
```

Dauer je Icon aus `POSITIONEN`, `animation-delay` gestaffelt in 1,3-Sekunden-Schritten,
`ease-in-out`, `infinite`. Auslenkung nie über 12 px — größere Wege lesen sich als
Bewegung im Vordergrund und ziehen den Blick von der Headline weg.

### Deckkraft

Zielwert 0.16 gegen den warmen Off-White-Hintergrund, Kontur in `--accent-600`, nur
`stroke`, keine Füllung, `stroke-width: 1.5`.

Der Wert ist ein Startpunkt, kein Dogma: prüfe das Ergebnis auf einem hellen Display
mit gedimmter Helligkeit. Die Icons sollen erkennbar sein, wenn man hinsieht, und
verschwinden, wenn man liest. Sind sie beim ersten Blick auf die Headline sichtbar,
0.02 abziehen.

### Wechsel

Beim Branchenwechsel faden die alten Icons aus (`opacity` auf 0, `scale(0.92)`,
`UEBERGANG_MS`), die neuen ein (`scale(0.95)` auf 1). Staffelung 40 ms pro Icon in der
Reihenfolge der Positionsliste. Die Schwebe-Animation läuft dabei durch — sie wird
nicht neu gestartet, sonst zuckt jedes Icon beim Wechsel.

Alle sechs Positionen bleiben über alle Branchen identisch. Nur die Symbole darin
tauschen. Wandernde Positionen erzeugen bei einem 2-Sekunden-Takt ein Flimmern im
peripheren Sehfeld.

---

## 6. Barrierefreiheit und SEO

Das `<h1>` trägt die vollständige, statische Fassung als `aria-label`:

> Websites, die verkaufen. Gebaut für Ärzte, Zahnärzte, Anwälte, Steuerberater,
> Handwerksbetriebe und Architekten.

Der animierte Wechsler bekommt `aria-hidden="true"`. Keine `aria-live`-Region — sonst
liest der Screenreader alle 2 Sekunden vor, was die Seite unbenutzbar macht.

Die Icons sind dekorativ: `aria-hidden="true"`, `focusable="false"`, kein `<title>` im
SVG.

Alle Branchen-Labels stehen als echter Text im serverseitig gerenderten HTML. Nicht
per JavaScript nachladen — sonst sieht ein Crawler nur eine Branche.

Screenshots bekommen ihren `alt`-Text aus dem Datenarray.

`@media (prefers-reduced-motion: reduce)`: kein Timer, keine Transitions, kein
Schweben. Es wird die erste Branche statisch angezeigt, die Icons stehen still an
ihren Positionen. Nicht ausblenden — die Komposition soll erhalten bleiben.

---

## 7. Performance

Das erste Bild: `eager`, `fetchpriority="high"`, explizite Maße. Es muss das
LCP-Element sein.

Alle weiteren Bilder: erst nach dem `load`-Event vorladen und dekodieren, damit der
erste Crossfade nicht auf ein noch nicht dekodiertes Bild trifft und hart umspringt.

Icons: inline aus der lokalen Sprite-Datei, keine zusätzliche Netzwerkanfrage, keine
Icon-Bibliothek im Bundle.

Animationen ausschließlich auf `transform` und `opacity` — beides läuft auf dem
Compositor und erzwingt kein Layout. Kein `top`, `left`, `width` oder `filter` in
Keyframes.

---

## 8. Responsive

**≥1280 px:** wie beschrieben, sechs Icons.

**900–1279 px:** vier Icons (Positionen 1, 3, 4, 6), Auslenkung auf 8 px reduziert.

**<900 px:** keine Icons. Die Textspalte füllt die Breite, es gibt keinen Rand mehr,
in dem die Icons stehen könnten, ohne den Text zu stören. Lieber ersatzlos weglassen
als verkleinert hinter den Text schieben.

**<768 px:** Zyklus bleibt bei 2000 ms, Übergang auf 320 ms verkürzt — die kürzere
Strecke auf schmalen Viewports wirkt sonst zäh. Die Standzeit steigt dadurch leicht,
der Takt bleibt exakt der gleiche wie auf dem Desktop. Prüfen, dass das längste Label
bei minimaler Headline-Größe nicht umbricht — falls doch, rutscht der Wechsler auf
eine eigene dritte Zeile, statt die Schriftgröße zu reduzieren.

---

## 9. Abnahme-Checkliste

Nach jeder Änderung durchgehen und das Ergebnis kurz berichten:

- [ ] Cumulative Layout Shift der Startseite ist 0
- [ ] Das erste Hero-Bild ist das LCP-Element
- [ ] Keine Hydration-Warnung in der Konsole
- [ ] Ein voller Durchlauf ohne sichtbaren Rücksprung am Ende
- [ ] Headline-Zeile behält bei jedem Label exakt dieselbe Höhe
- [ ] Kein Icon überlappt Text, auch nicht bei 1024 px und 1440 px Breite
- [ ] Timer pausiert bei Hover, im Hintergrundtab und außerhalb des Viewports
- [ ] `prefers-reduced-motion` zeigt eine ruhige, vollständige Seite
- [ ] Kontrast von Wechslerwort und Proof-Zeile mindestens 4,5:1
- [ ] Screenreader liest die Headline einmal vollständig, nicht wiederholt
- [ ] Build läuft fehlerfrei durch
