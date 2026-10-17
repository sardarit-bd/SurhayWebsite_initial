import { altPaths, path, useTranslations } from '@/i18n/utils';
import { SITE } from '@/config';
import Legal from '@/layouts/Legal';
import { astroPathname } from '@/lib/props';

/**
 * Cookie-Seite (DE) — die verbindliche Fassung.
 *
 * WARUM HIER KEIN EINSTELLUNGSDIALOG STEHT
 * Ein Einstellungsdialog setzt voraus, dass es etwas einzustellen gibt.
 * Diese Website laedt keine Ressource, die eine Einwilligung braucht:
 * keine Analyse, kein Tracking, keine Einbettungen, keine externen
 * Schriften, kein eigener Client-Speicher. Schalter, die nichts schalten,
 * waeren eine Behauptung — und eine Einwilligung, die nichts betrifft,
 * ist keine.
 *
 * WANN DAS HIER UMGEBAUT WERDEN MUSS
 * Sobald irgendetwas davon dazukommt — Analysewerkzeug, Karte, Video,
 * eingebettetes Buchungs-Widget, Schriften von einem fremden Server —,
 * braucht diese Seite einen echten Einwilligungsdialog, der die Ressource
 * bis zur Zustimmung blockiert, und der Fusszeilen-Link muss dann diesen
 * Dialog oeffnen statt hierher zu fuehren. Die Tabelle unten ist die
 * Bestandsaufnahme, gegen die man das prueft.
 */
export default function Page() {
  const lang = 'de' as const;
  const t = useTranslations(lang);

  return (
    <Legal title={t('legal.cookies.title')} description={t('legal.cookies.desc')} kind="cookies" alternates={altPaths('cookies')}  lang={lang}
      pathname={astroPathname('/cookie-settings')}
    >
      <p>
        Kurz gesagt: Diese Website setzt keine Cookies und speichert nichts auf Ihrem Endgerät. Deshalb gibt es hier
        nichts einzustellen — und deshalb sehen Sie beim ersten Besuch auch kein Einwilligungsfenster. Auf dieser Seite
        steht, was das technisch bedeutet und was Sie tun können, falls sich das einmal ändert.
      </p>

      <h2>Warum es hier kein Cookie-Banner gibt</h2>
      <p>
        Diese Website speichert keine Cookies auf Ihrem Endgerät und nutzt weder Local Storage noch Session Storage. Es
        kommen keine Analyse-, Reichweitenmess- oder Marketing-Werkzeuge zum Einsatz. Es besteht damit keine
        einwilligungspflichtige Speicherung nach § 25 TDDDG — und ohne einwilligungspflichtige Speicherung wäre ein
        Banner nur ein Klick, den Sie ohne Anlass wegdrücken müssten.
      </p>

      <h2>Was diese Website auf Ihrem Gerät speichert</h2>
      <p>
        Die folgende Aufstellung ist vollständig. Sie bildet den technischen Stand der Website ab, nicht eine Absicht.
      </p>

      <div className="table-scroll" role="region" aria-labelledby="speicher-tabelle" tabIndex={0}>
        <table>
          <caption id="speicher-tabelle">Speicherung und Datenübertragung im Überblick</caption>
          <thead>
            <tr>
              <th scope="col">Bereich</th>
              <th scope="col">Was auf Ihrem Gerät gespeichert wird</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Cookies</th>
              <td>
                <strong>Keine.</strong> Weder eigene noch solche von Drittanbietern — auch keine technisch notwendigen.
              </td>
            </tr>
            <tr>
              <th scope="row">Local Storage, Session Storage</th>
              <td><strong>Nichts.</strong> Die Website beschreibt beide Speicher an keiner Stelle.</td>
            </tr>
            <tr>
              <th scope="row">Sprachwahl</th>
              <td>
                <strong>Nichts.</strong> Die gewählte Sprache steht in der Adresse der Seite (<code>/</code>,{' '}
                <code>/tr/</code>, <code>/en/</code>) und muss deshalb nicht gespeichert werden.
              </td>
            </tr>
            <tr>
              <th scope="row">Schriftarten</th>
              <td>
                <strong>Nur der normale Browser-Cache.</strong> Inter und Bricolage Grotesque liegen auf unserem eigenen
                Server. Es besteht keine Verbindung zu Google Fonts oder einem anderen Font-Anbieter.
              </td>
            </tr>
            <tr>
              <th scope="row">Analyse, Statistik, Werbung</th>
              <td>
                <strong>Nichts.</strong> Es ist kein Analyse- oder Tracking-Werkzeug eingebunden, kein Pixel und kein
                Werbenetzwerk.
              </td>
            </tr>
            <tr>
              <th scope="row">Eingebettete Inhalte</th>
              <td>
                <strong>Nichts.</strong> Es sind keine Karten, Videos, Schaltflächen sozialer Netzwerke oder sonstigen
                Inhalte fremder Server eingebettet.
              </td>
            </tr>
            <tr>
              <th scope="row">Terminbuchung</th>
              <td>
                <strong>Nichts.</strong> Auf Cal.com führt ein gewöhnlicher Link. Erst wenn Sie ihn anklicken, verlassen
                Sie diese Website; vorher wird nichts an den Anbieter übertragen.
              </td>
            </tr>
            <tr>
              <th scope="row">Anfrageformular und Konfigurator</th>
              <td>
                <strong>Nichts.</strong> Ihre Eingaben stehen nur im Formular selbst und verschwinden, wenn Sie die Seite
                verlassen, ohne abzusenden.
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>Was trotzdem verarbeitet wird</h2>
      <p>
        Ohne Speicherung auf Ihrem Gerät ist die Verarbeitung nicht bei null: Beim Aufruf jeder Website überträgt Ihr
        Browser technisch notwendige Angaben an den Server, und wenn Sie uns schreiben, verarbeiten wir, was Sie
        eintragen. Beides — Server-Logfiles und Anfrageformular — steht mit Zweck, Rechtsgrundlage und Speicherdauer in
        der <a href={path('de', 'privacy')}>Datenschutzerklärung</a>.
      </p>

      <h2>Wenn sich daran etwas ändert</h2>
      <p>
        Sollten wir künftig etwas einbinden, das eine Einwilligung braucht, bekommt diese Website vorher ein
        Einwilligungsfenster, das die betreffende Ressource bis zu Ihrer Zustimmung blockiert — und der Link
        „Cookie-Einstellungen“ in der Fußzeile öffnet dann dieses Fenster, damit Sie Ihre Entscheidung jederzeit ändern
        können. Bis dahin bleibt es bei dem, was oben steht.
      </p>
      <p>
        Fragen dazu beantworten wir gern unter <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
      </p>
    </Legal>
  );
}
