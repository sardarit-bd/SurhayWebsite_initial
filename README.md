# Surhay Design — Website

Statisch generierte Agentur-Website: **Next.js + React + Tailwind CSS 4**, Inhalte über **Decap CMS** (`cms/`, derzeit nicht veröffentlicht — siehe unten), Deployment per **GitHub Actions → FTP → Hostinger**, dreisprachig (**DE** unter `/`, **TR** unter `/tr/`, **EN** unter `/en/`).

## Schnellstart

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # Produktions-Build nach out/ (statischer Export)
npm run check    # Typprüfung (tsc --noEmit); der Build prüft nicht, siehe MIGRATION-NOTES.md
```

## Projektstruktur

```
src/
  config.ts               → zentrale Platzhalter: E-Mail, Formular-Endpunkt, Kalender-Link, Social Links
  content.config.ts       → Schema der Content Collections (gespiegelt in public/admin/config.yml)
  content/
    case-studies/{de,tr,en}/ → Case Studies (je Sprache eine Datei pro Projekt, gleicher Dateiname!)
    testimonials/{de,tr,en}/
    blog/{de,tr,en}/
    faq/{de,tr,en}/
  i18n/ui.ts              → alle UI-Texte DE/TR/EN + Sprach-Metadaten (Flagge, hreflang, og:locale)
  i18n/utils.ts           → Spracherkennung, lokalisierte Slugs (`routes`), hreflang-Alternates
  app/                    → die Routen, je Sprache in einer Route Group: (de), (tr), (en)
  layouts/                → Document (html/body), Base (SEO/Schema), CaseStudy, BlogPost, BlogIndex, Legal
  inline/*.script.ts      → die Inline-Skripte, wörtlich aus der Astro-Fassung übernommen
  lib/                    → Content-Layer, Markdown-Pipeline, Style-Scoping, Hilfsfunktionen
  components/sections/    → die OnePager-Sektionen von Hero bis Contact
  components/ServiceIcon.tsx → das Icon einer Leistung; einzige Stelle fuer Groesse und Strichstaerke
  data/services.ts        → Leistungskatalog DE/EN inkl. der vier Leistungs-Icons
  styles/global.css       → Designsystem: Farben, Typografie, Motion als CSS Custom Properties
  styles/components/      → die Bauteil-Styles, die unter Astro in <style>-Blöcken standen
public/
  contact.php             → optionaler PHP-Mailer statt Formspree (EU, ohne Drittanbieter)
                            Achtung: laeuft nur auf einem PHP-Server. GitHub Pages
                            liefert die Datei als lesbaren Quelltext aus, der
                            Pages-Workflow entfernt sie deshalb vor dem Upload.
  .htaccess               → Sicherheits-Header fuer das Apache-Ziel (Hostinger).
                            Auf GitHub Pages wirkungslos und ebenfalls entfernt.
cms/                      → Decap CMS (index.html + config.yml) — bewusst AUSSERHALB
                            von public/, wird also nicht mitgebaut. Grund und
                            Wiederinbetriebnahme: Abschnitt "CMS einrichten".
scripts/                  → Build-Schritte (Inline-Skripte, Case-Study-Routen, Postbuild)
                            und die Vergleichswerkzeuge der Migration
.github/workflows/deploy.yml → Build & FTP-Deploy zu Hostinger
.github/workflows/pages.yml  → Build & Deploy zu GitHub Pages
```


## Sprachen

Deutsch ist Standardsprache und läuft ohne Präfix (`/leistungen`), Türkisch unter
`/tr/hizmetler`, Englisch unter `/en/services`. Die Slugs sind **vollständig
übersetzt**; die einzige Zuordnungstabelle steht in `src/i18n/utils.ts` (`routes`).
Navigation, Footer, Breadcrumbs, hreflang-Alternates und der Sprachumschalter
ziehen alle daraus — ein Eintrag dort genügt, um eine Seite in allen Sprachen
korrekt zu verlinken.

Eine **automatische Weiterleitung anhand von `Accept-Language` gibt es bewusst
nicht**: Sie zerlegt geteilte Links, überrascht Nutzer und verwässert die
Indexierung. Die Sprache wählt ausschließlich der Umschalter im Kopfbereich
(Flagge **und** Sprachname, Flaggen unter `public/flags/`).

Eine neue Sprache ergänzen:

1. `src/i18n/ui.ts` → `languages`, `locales`, `localeMeta` und einen vollständigen
   `ui`-Block. Fehlt ein Schlüssel, bricht der Build (`_vollstaendig`).
2. `src/i18n/utils.ts` → `routes.<lang>` mit allen Slugs.
3. Eine eigene Route Group anlegen: `src/app/(<lang>)/layout.tsx` (Spiegel von
   `src/app/(tr)/layout.tsx`) — sie setzt `<html lang>` für diese Sprache.
4. `src/data/*.ts` und die Wörterbücher in `Configurator.tsx`, `ContactForm.tsx`
   und `TechStack.tsx` um den Sprachschlüssel ergänzen.
5. `src/app/(<lang>)/<lang>/…` anlegen (Spiegel von `src/app/(tr)/tr/`).
6. `src/content/<collection>/<lang>/` mit denselben Dateinamen wie in `de/`.
7. Flagge als SVG unter `public/flags/` ablegen.
8. `cms/config.yml` → `i18n.locales`.

**Rechtstexte bleiben auf Deutsch verbindlich.** Impressum und Datenschutz-
erklärung gibt es zusätzlich auf Türkisch und Englisch; diese Fassungen tragen
über dem Text einen Hinweis, dass im Zweifelsfall die deutsche Fassung gilt
(`src/layouts/Legal.tsx`).

## Vor dem Launch: Checkliste

1. **`src/config.ts`** ausfüllen: E-Mail, Formular-Endpunkt (`formEndpoint` oder `formspreeId`, siehe unten), Kalender-Link, Social-Profile.
2. **Domain**: `SITE_URL` (Vorgabe in `next.config.mjs`, gesetzt in den Workflows) und die URLs in `public/robots.txt` + `cms/config.yml` prüfen (aktuell `https://surhay.design` — die Domain existiert noch nicht, live ist derzeit nur GitHub Pages).
3. **Impressum & Datenschutz**: Platzhalter in `src/app/(de)/impressum/page.tsx`, `(de)/datenschutz/page.tsx`, `(en)/en/imprint/page.tsx`, `(en)/en/privacy/page.tsx` ersetzen (Name, Adresse, USt-ID, finale Datenschutztexte).
4. **Über-mich-Foto**: `public/images/surhay-portrait.webp` durch ein echtes Porträt ersetzen (Format ~6:7, als WebP).
5. **Beispiel-Inhalte** in `src/content/` durch echte Cases/Testimonials ersetzen oder im CMS pflegen.

## Deployment (GitHub → Hostinger)

1. Repo zu GitHub pushen (`git init`, `git add .`, `git commit`, Remote setzen).
2. In den Repo-Einstellungen → *Secrets and variables* → *Actions* drei Secrets anlegen:
   - `FTP_SERVER` — z. B. `ftp.deinedomain.de` (aus dem Hostinger-Panel → FTP-Zugänge)
   - `FTP_USERNAME`
   - `FTP_PASSWORD`
3. Bei jedem Push auf `main` baut die Action die Seite und lädt `out/` nach `public_html/` (Pfad ggf. in `.github/workflows/deploy.yml` anpassen).

## CMS einrichten (Decap)

**Derzeit nicht veröffentlicht.** Die Dateien liegen unter `cms/` statt unter
`public/admin/` und werden deshalb nicht mitgebaut. Der Grund ist ein
Datenschutzbefund, nicht ein Versehen:

- `index.html` lud `decap-cms.js` von **unpkg.com**. Der Aufruf von `/admin/`
  übertrug damit die IP-Adresse an einen Drittanbieter — ohne Einwilligung und
  ohne Nennung in der Datenschutzerklärung. Es war der **einzige**
  Drittanbieter-Request der gesamten Website.
- Decap legt zusätzlich ungefragt `localStorage` (`decap-cms.entries.viewStyle`)
  und eine IndexedDB (`localforage`) an — Speicherzugriff nach § 25 TDDDG.
- Der Login funktionierte ohnehin nicht: `repo:` und `base_url` stehen noch auf
  Platzhaltern.

Vor dem Wiederaktivieren:

1. `decap-cms.js` **selbst hosten** statt vom CDN laden. Ohne diesen Schritt
   nicht veröffentlichen — sonst ist der Befund zurück.
2. Ordner nach `public/admin/` zurückschieben und das Skript-Tag in
   `cms/index.html` wieder einkommentieren.
3. In `cms/config.yml` das Feld `repo:` auf `owner/repo-name` setzen.
2. **OAuth-Provider** einrichten (GitHub-Login für das CMS). Da Hostinger-Static-Hosting den OAuth-Handshake nicht übernimmt, braucht es einen kleinen Vermittler — zwei bewährte Optionen:
   - **Cloudflare Worker** (kostenlos): z. B. [decap-proxy](https://github.com/sterlingwes/decap-proxy) deployen, GitHub-OAuth-App anlegen (Callback = Worker-URL), dann in `config.yml` `base_url` auf die Worker-URL setzen.
   - **PHP-Proxy auf Hostinger**: ein OAuth-Skript wie [netlify-cms-oauth-provider-php](https://github.com/DGtheDev/netlify-cms-oauth-provider-php) ins Hosting legen und `base_url` darauf zeigen.
3. GitHub-OAuth-App: *Settings → Developer settings → OAuth Apps* → Client-ID/Secret in den Provider eintragen.

Danach: `https://deinedomain.de/admin` öffnen → mit GitHub anmelden → Inhalte pflegen. Neue Einträge **immer in allen drei Sprachen** ausfüllen (das CMS zeigt DE/TR/EN nebeneinander an).

## Kontaktformular

Das Anfrageformular der Kontaktseite liegt in `src/components/ContactForm.tsx` — zwei Blöcke (Ihre Kontaktdaten, Worum es geht), Pflichtfelder Name, E-Mail, Nachricht, Leistung und Einwilligung. Mehr wird bewusst nicht abgefragt: kein Budget, kein Zeitrahmen, keine bestehende Website — dafür ist der Konfigurator da. Die Startseiten-Sektion (`sections/Contact.tsx`) bleibt die kurze Fassung.

**Empfänger einstellen — eine Stelle, zwei Wege:**

| `src/config.ts` | Wirkung |
| --- | --- |
| `formEndpoint: '/contact.php'` | eigener PHP-Mailer beim Hoster, kein Drittanbieter, Daten bleiben in der EU. In `public/contact.php` die Empfängeradresse prüfen. |
| `formspreeId: '…'` | Formspree (USA). Greift nur, solange `formEndpoint` leer ist. |

Ist keins von beidem gesetzt, warnt der Build, das Formular wird trotzdem gebaut, und ein Absendeversuch endet sichtbar im Fehlschlag mit der E-Mail-Adresse daneben — es geht keine Anfrage stillschweigend verloren.

`formEndpoint` gilt **nur für das Anfrageformular der Kontaktseite**. Der Konfigurator (`/konfigurator`) sendet eine andere Feldstruktur und bleibt an Formspree; wer auch ihn über den eigenen Endpunkt fahren will, muss `public/contact.php` um dessen Felder erweitern.

**Spamschutz:** Honeypot plus Zeitfalle (unter drei Sekunden nach dem Laden), beides im Browser und in `contact.php` noch einmal serverseitig. Kein Google reCAPTCHA — es überträgt Daten in die USA und wäre ohne vorherige Einwilligung angreifbar.

**Ohne JavaScript** bleibt das Formular ein gewöhnlicher POST mit Browser-Validierung; erst mit JS übernehmen eigene Fehlermeldungen und der Versand per `fetch`.

**Vor dem Livegang:** Auftragsverarbeitungsvertrag mit dem gewählten Dienst abschließen und ablegen, und den Abschnitt „Kontaktformular“ in `src/app/(de)/datenschutz/page.tsx`, `src/app/(tr)/tr/gizlilik/page.tsx` und `src/app/(en)/en/privacy/page.tsx` auf den tatsächlich eingesetzten Dienst anpassen (Checkliste steht als Kommentar über dem Abschnitt).

## Designsystem

Alle Tokens liegen in `src/styles/global.css`:

- **Farben**: `--color-ink` (Fast-Schwarz), `--color-paper` (warmes Off-White), `--color-acid` (Akzent-Limette), abgestufte Grautöne. Akzentfarbe nur als Fläche/Grafik einsetzen, nie als Textfarbe auf hellem Grund (Kontrast!).
- **Typografie**: Bricolage Grotesque Variable (Display), Inter Variable (Text) — beide lokal gehostet, kein Google-Fonts-Request.
- **Motion**: Scroll-Reveals über `data-reveal` (IntersectionObserver in `src/inline/base.script.ts`), Zähler über `data-count`. `prefers-reduced-motion` wird überall respektiert.

### Icons

Ein Icon ist auf dieser Seite kein Schmuck, sondern das Erkennungszeichen einer
Leistung. Jede der vier Leistungen hat genau ein Icon, und dieses Icon ist auf
jeder Unterseite und in jeder Größe dasselbe.

- **Wo Icons stehen** — und nur dort: große Leistungs-Karten (28 px), Karten
  „Weitere Leistungen" (24 px), Sektionsmarke neben „Enthalten" (24 px),
  Aufklappmenü „Leistungen" inkl. Burger-Menü (20 px).
- **Wo bewusst keine stehen**: Leistungs-Zeilen der Startseite, Prozess-Zeitstrahl,
  Raster „Enthalten", Blog-, Preis- und Prinzipien-Karten, FAQ. Sobald Icons
  überall stehen, zeigen sie nichts mehr an. Die Haken in Preis-Karten und
  Rastern sind Listenzeichen, keine Icons.
- **Zeichenstil**: nur Outline, Raster 24 × 24, runde Enden, `fill="none"`,
  `stroke="currentColor"` — keine festen Farbwerte im SVG, keine Kreise oder
  Badges darum, keine eigene Animation. Alle Icons sind dekorativ und deshalb
  `aria-hidden`.
- **Strichstärke skaliert nicht mit**: 1,5 px gelten bei 24 px; jede andere Größe
  rechnet zurück (`1,5 × 24 / Größe`), damit alle Icons wie mit demselben Stift
  gezeichnet wirken. `ServiceIcon.tsx` erledigt das — Größe und Strichstärke
  kommen nie aus dem Aufrufer.
- **Neue Leistung**: Icon aus derselben Bibliothek, auf 20 px neben den
  bestehenden vier eindeutig unterscheidbar, und keine Metapher wiederholen,
  die schon belegt ist (kein zweites Werkzeug, kein zweites Messgerät).

**Lizenzen**: Die Leistungs-Icons stammen aus [Lucide](https://lucide.dev)
(ISC-Lizenz, kommerziell frei, keine Namensnennung nötig), die Branchen-Symbole
der Hero-Textur aus [Tabler Icons](https://tabler.io/icons) (MIT-Lizenz). Beide
Pakete liegen bewusst nicht als Dependency im Projekt: die benötigten Pfade sind
in `src/data/services.ts` bzw. `src/assets/branchen-icons.ts` abgelegt.

## Hinweise

- **Kein Cookie-Banner nötig**: Die Seite setzt kein Tracking ein. Wird später ein Analytics-Tool ergänzt, DSGVO-konformen Consent-Banner nachrüsten (oder ein cookiefreies Tool wie Plausible selbst hosten und den Datenschutztext ergänzen).
- **SEO**: Meta-Tags pro Seite, `sitemap-index.xml` (automatisch), `robots.txt`, LocalBusiness/ProfessionalService-Schema (JSON-LD in `Base.tsx`), hreflang-Alternates DE/EN.
- **Das Artefakt enthält kein Framework-JavaScript.** Die gesamte Interaktivität
  steckt in Inline-Skripten; Nexts Client-Laufzeit wird vom Build entfernt, weil
  ihre Hydration die Skript-Wirkungen zerstören würde. Warum und wie: Abschnitt
  3.2 in `MIGRATION-NOTES.md`.
- **Die Migration von Astro auf Next.js** ist in `MIGRATION-NOTES.md`
  dokumentiert: was geprüft wurde, was sich zwangsläufig geändert hat und welche
  Befunde absichtlich nicht behoben wurden.
