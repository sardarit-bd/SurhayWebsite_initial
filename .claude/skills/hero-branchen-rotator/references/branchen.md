# Branchen — Datenmodell und Inhalte

## Schema

Eine Datei, ein Export, keine Duplikate an anderer Stelle:

```ts
export type Branche = {
  id: string          // kleingeschrieben, ohne Umlaute, dient als Dateiname-Suffix
  label: string       // erscheint in der Headline nach "gebaut für", Plural
  proof: string       // eine Zeile unter dem Bild, konkretes Ergebnis statt Adjektiv
  screenshot: string  // /hero/branche-<id>.webp, 16:10
  alt: string         // beschreibt die gezeigte Website, nicht die Branche
  icons: string[]     // genau 6 Namen aus assets/branchen-icons
  tint?: string       // optionaler Farbwert für den Schleier hinter dem Bild
}
```

## Startdatensatz

| id | label | proof |
|---|---|---|
| `arzt` | Ärzte | Terminanfragen ohne zusätzliches Telefonaufkommen |
| `zahnarzt` | Zahnärzte | Prophylaxe-Termine direkt online buchbar |
| `anwalt` | Anwälte | Qualifizierte Mandatsanfragen statt Rückrufbitten |
| `steuer` | Steuerberater | Mandanten-Onboarding ohne Papier |
| `handwerk` | Handwerksbetriebe | Anfragen mit vollständigen Angaben zum Objekt |
| `architekt` | Architekten | Referenzen, die höhere Honorare rechtfertigen |

Reihenfolge im Array ist die Reihenfolge der Rotation. Sie beginnt bewusst mit `arzt`:
das erste Bild ist das LCP-Element und wird eager geladen, deshalb gehört dorthin der
stärkste vorhandene Screenshot.

## Regeln für neue Branchen

**Label immer im Plural und mit "für" grammatikalisch korrekt.** "gebaut für Ärzte"
funktioniert, "gebaut für Arztpraxis" nicht. Bei Branchen ohne natürlichen Plural den
Betriebsbegriff wählen: "Pflegedienste", "Sanitärbetriebe", "Immobilienbüros".

**Label maximal 18 Zeichen.** Längeres bricht auf kleinen Viewports in die nächste
Zeile und zerstört die Höhenkonstanz der Headline. "Handwerksbetriebe" mit 17 Zeichen
ist die Obergrenze im Startdatensatz — daran kalibrieren.

**Proof-Zeile beschreibt ein Ergebnis, keine Eigenschaft.** "Modernes Design für
Zahnärzte" sagt nichts. "Prophylaxe-Termine direkt online buchbar" beschreibt, was der
Kunde danach hat. Die Zeile ist der einzige Ort im Hero, an dem branchenspezifischer
Nutzen steht — sie trägt entsprechend viel.

**Maximal acht Branchen.** Bei 2 Sekunden pro Branche dauert ein voller Durchlauf
schon bei sechs Einträgen zwölf Sekunden. Wer länger als einen Durchlauf braucht, um
seine eigene Branche zu finden, hat die Seite längst verlassen.

**Nur Branchen aufnehmen, für die es Substanz gibt.** Wer "Anwälte" liest und unter
Projekte keine Kanzlei findet, misstraut dem Rest der Seite. Solange kein Referenzfall
existiert, die Branche weglassen oder den Screenshot ehrlich als Konzeptarbeit
kennzeichnen.

## Icons pro Branche

Sechs Icons je Branche, Outline-Stil, aus dem Tabler-Set. Die Pfade werden **einmalig
in eine lokale Sprite-Datei kopiert** (`assets/branchen-icons.tsx` oder gleichwertig),
das Paket selbst wird nicht als Dependency installiert.

| Branche | Icons |
|---|---|
| `arzt` | `stethoscope`, `heartbeat`, `calendar-check`, `pill`, `first-aid-kit`, `clipboard-heart` |
| `zahnarzt` | `dental`, `mood-smile`, `calendar-check`, `first-aid-kit`, `sparkles`, `shield-check` |
| `anwalt` | `scale`, `gavel`, `book`, `file-certificate`, `briefcase`, `shield-check` |
| `steuer` | `calculator`, `receipt`, `report-money`, `folders`, `chart-line`, `file-check` |
| `handwerk` | `hammer`, `tool`, `ruler-measure`, `home`, `bulb`, `truck` |
| `architekt` | `ruler`, `pencil`, `building-arch`, `layout-grid`, `stairs`, `compass` |

Fehlt ein Name im verwendeten Set, das inhaltlich nächstliegende Icon nehmen und die
Ersetzung als Kommentar in der Sprite-Datei vermerken — nicht ersatzlos streichen, die
Anzahl von sechs ist Teil der Komposition.

**Icons müssen unmittelbar lesbar sein.** Ein Stethoskop erkennt jeder, ein
abstraktes Diagramm-Symbol steht für nichts. Im Zweifel das konkretere Objekt wählen.
Keine Icons, die auf Software verweisen (Monitor, Cursor, Browser) — die Branche soll
sich wiedererkennen, nicht die Agentur.

## Screenshots

Ablage `/public/hero/branche-<id>.webp`, Seitenverhältnis 16:10, maximal 1600 px
breit, WebP.

Fehlt eine Datei, rendert die Komponente den neutralen Platzhalter aus
`umsetzung.md` — eine sehr helle Fläche in der Flächenfarbe des Seitenhintergrunds mit
1 px Rahmen und kleiner, zentrierter Beschriftung. **Nicht** die Akzentfarbe als
Vollfläche verwenden: eine bildschirmfüllende Türkisfläche zieht mehr Aufmerksamkeit
auf sich als jeder echte Screenshot und lässt die Seite unfertig wirken.
