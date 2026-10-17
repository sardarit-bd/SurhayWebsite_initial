---
name: hero-branchen-rotator
description: Baut und pflegt den Branchen-Rotator im Hero der Surhay-Design-Landingpage — das rotierende Wort hinter "gebaut für", die synchron wechselnde Umgebung (Screenshot, Proof-Zeile) und die schwebenden Branchen-Icons im Hintergrund. Nutze diesen Skill immer, wenn es um den Hero der Startseite geht: Branchen hinzufügen, entfernen oder umbenennen, Icons ändern, Timing oder Animation anpassen, Screenshots einsetzen, oder wenn jemand sagt "das Wort wechselt zu schnell", "die Icons stören", "füg Branche X hinzu", "hero rotator", "gebaut für", "Wortwechsler" oder "Branchen-Karussell". Auch dann verwenden, wenn nur ein kleiner Teil davon geändert werden soll — die Regeln hier verhindern, dass Einzeländerungen das Zusammenspiel zerstören.
---

# Hero-Branchen-Rotator

Der Hero der Landingpage besteht aus einer zentrierten Textachse und einer Umgebung,
die sich alle 2 Sekunden auf eine andere Zielbranche umstellt. Alles, was auf dieser
Seite rotiert, wird von **einer einzigen Datenquelle** und **einem einzigen Timer**
gesteuert. Das ist der Kern: sobald zwei Timer laufen oder Daten an zwei Stellen
liegen, driftet die Seite auseinander und wirkt kaputt.

## Wenn dieser Skill greift

Lies zuerst `references/branchen.md` (Datenmodell und Branchen-Inhalte), danach
`references/umsetzung.md` (Timing, Icon-Mechanik, Barrierefreiheit, Abnahme).
Bei reinen Inhaltsänderungen — Branche hinzufügen, Proof-Zeile umformulieren —
reicht `references/branchen.md`.

## Die vier Regeln, die den Hero professionell halten

**1. Ein Timer, eine Datenquelle.** Der aktive Branchen-Index lebt an genau einer
Stelle. Wort, Screenshot, Proof-Zeile und Icons lesen ihn — sie zählen nicht selbst.
Ohne das laufen die Ebenen nach ein paar Minuten sichtbar auseinander.

**2. Nichts darf springen.** Die Headline-Zeile, die Bildfläche und der Textblock
behalten zu jedem Zeitpunkt ihre Höhe. Cumulative Layout Shift muss 0 bleiben — die
Seite verkauft Performance, ein springender Hero widerlegt das Versprechen auf dem
ersten Screen.

**3. Bewegung ist Hintergrund, nicht Inhalt.** Die Icons schweben unterhalb der
Aufmerksamkeitsschwelle: geringe Deckkraft, langsam, außerhalb der Textspalte. Wenn
jemand beim Lesen der Headline ein Icon bemerkt, ist es zu stark. Der Blick gehört
der Headline und dem CTA.

**4. Kein erfundener Inhalt.** Niemals Dashboards, Diagramme, Balken oder Wireframes
aus DOM-Elementen nachbauen, um eine Bildfläche zu füllen. Nachgebaute Screenshots
entlarven sich sofort und kosten mehr Glaubwürdigkeit, als eine leere Fläche je
kosten würde. Fehlt ein Bild, greift der neutrale Platzhalter aus
`references/umsetzung.md`.

## Ablauf bei jeder Änderung

1. **Datenquelle finden.** Suche im Repo nach der Datei mit dem `branches`-Array
   (üblicherweise `src/data/branchen.ts` oder gleichwertig). Existiert sie nicht,
   lege sie nach dem Schema in `references/branchen.md` an — nicht das Array in eine
   Komponente inlinen.

2. **Nur Daten ändern, wenn nur Daten gemeint sind.** Eine neue Branche ist ein neuer
   Array-Eintrag plus Icons plus Screenshot. Kein Eingriff in Komponenten, kein
   Sonderfall im Code. Wenn eine gewünschte Änderung sich nicht über die Daten
   abbilden lässt, ist das ein Hinweis darauf, dass das Datenmodell erweitert werden
   sollte — nicht darauf, dass eine Ausnahme in die Komponente gehört.

3. **Konstanten oben halten.** `ZYKLUS_MS`, `UEBERGANG_MS`, `ICON_ANZAHL` und
   `ICON_DECKKRAFT` stehen als benannte Konstanten am Dateianfang, nicht verstreut in
   CSS-Werten. Timing-Wünsche sind dann eine Einzeiler-Änderung.

4. **Abnahme durchlaufen.** Die Checkliste am Ende von `references/umsetzung.md`
   abarbeiten und das Ergebnis kurz berichten. Nicht stillschweigend übergehen —
   gerade CLS und die Hydration-Prüfung fallen sonst erst dem Nutzer auf.

## Timing

Ein voller Zyklus dauert **2000 ms**, gemessen von Wortwechsel zu Wortwechsel. Darin
liegen 380 ms Übergang und 1620 ms Standzeit. Dieser Takt gilt auf **allen**
Viewport-Breiten — auch mobil. Er ist vom Auftraggeber vorgegeben und wird nicht
eigenmächtig verlangsamt, auch nicht "zur Sicherheit" auf kleinen Geräten.

Der Takt hat eine Konsequenz, die beim Umsetzen sichtbar wird: der große Screenshot
wechselt ebenfalls alle 2 Sekunden. Damit das ruhig wirkt, muss der Bildwechsel eine
weiche Auflösung ohne jede zusätzliche Bewegung sein — reine Deckkraft, kein Scale,
kein Slide, kein Blur, und alle Bilder vorab dekodiert. Wirkt es trotzdem hektisch,
liegt der Fehler dort und wird dort behoben. Nicht über eine längere Standzeit
gegensteuern und nicht mit zusätzlichen Effekten kaschieren.

## Was niemals mitrotiert

Akzentfarben, Buttons, Navigation, Kicker-Zeile, Subline, Kennzahlen und Marquee
bleiben über alle Branchen identisch. Der Hero soll sich anpassen, nicht blinken.
Wechselnde Buttonfarben oder ein wechselnder Seitenhintergrund lassen die Seite
billig aussehen und zerstören die Wiedererkennbarkeit der Marke innerhalb weniger
Sekunden.

## Typische Fehler

- **Zufällige Icon-Positionen zur Laufzeit.** `Math.random()` beim Rendern erzeugt bei
  serverseitigem Rendering unterschiedliche Ergebnisse auf Server und Client und damit
  Hydration-Fehler. Positionen kommen aus der festen Liste in
  `references/umsetzung.md`.
- **Icons hinter dem Text.** Sie gehören in die äußeren Ränder, nicht unter die
  Headline. Ein Icon, das durch Text hindurchscheint, wirkt wie ein Renderfehler.
- **Eine Icon-Bibliothek als Dependency.** Die Pfade werden einmal in eine lokale
  Sprite-Datei kopiert. Sechs Branchen × sechs Icons rechtfertigen kein Paket im
  Bundle, das die LCP-Kette verlängert.
- **`aria-live` auf dem Wechsler.** Screenreader lesen sonst alle 2 Sekunden vor. Die
  vollständige Fassung steht stattdessen als `aria-label` am `<h1>`.
- **Emojis statt Icons.** Sie rendern auf jeder Plattform anders und sind nicht
  einfärbbar.
- **Zweiter Timer für die Icons.** Siehe Regel 1.
