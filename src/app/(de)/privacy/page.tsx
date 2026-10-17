import { altPaths, useTranslations } from '@/i18n/utils';
import { LEGAL, SITE, legalAddressInline } from '@/config';
import Legal from '@/layouts/Legal';
import { astroPathname } from '@/lib/props';

export default function Page() {
  const lang = 'de' as const;
  const t = useTranslations(lang);

  return (
    <Legal title={t('legal.privacy.title')} description={t('legal.privacy.desc')} kind="privacy" alternates={altPaths('privacy')}  lang={lang}
      pathname={astroPathname('/privacy')}
    >
      <p>
        Der Schutz Ihrer personenbezogenen Daten ist uns wichtig. Diese Website ist statisch aufgebaut: Sie setzt keine
        Cookies, bindet keine Tracking- oder Analysedienste ein und verwendet keine Werbenetzwerke. Nachfolgend
        erläutern wir, welche Daten trotzdem verarbeitet werden — und warum.
      </p>

      <h2>1. Verantwortlicher</h2>
      <p>
        Verantwortlich für die Datenverarbeitung auf dieser Website im Sinne der DSGVO ist:<br />
        {legalAddressInline('de')}<br />
        E-Mail: <a href={`mailto:${SITE.email}`}>{SITE.email}</a><br />
        Telefon: {LEGAL.phone}
      </p>
      <p>
        Ein Datenschutzbeauftragter ist gesetzlich nicht bestellt; für alle Anliegen rund um den Datenschutz erreichen
        Sie uns unter den oben genannten Kontaktdaten.
      </p>

      <h2>2. Keine Cookies, kein Tracking</h2>
      <p>
        Diese Website speichert keine Cookies auf Ihrem Endgerät und nutzt weder Local Storage noch Session Storage. Es
        kommen keine Analyse-, Reichweitenmess- oder Marketing-Werkzeuge zum Einsatz. Aus diesem Grund gibt es hier auch
        kein Cookie-Banner: Es besteht keine einwilligungspflichtige Speicherung nach § 25 TDDDG.
      </p>

      <h2>3. Hosting und Server-Logfiles</h2>
      <p>
        Diese Website wird gehostet bei {LEGAL.host}. Beim Aufruf der Website übermittelt Ihr Browser technisch
        notwendige Daten, die der Hoster in Server-Logfiles speichert:
      </p>
      <ul>
        <li>IP-Adresse des anfragenden Geräts</li>
        <li>Datum und Uhrzeit des Zugriffs</li>
        <li>Name und URL der abgerufenen Datei</li>
        <li>übertragene Datenmenge und Meldung über den Abruferfolg</li>
        <li>Browsertyp, Browserversion und Betriebssystem</li>
        <li>Referrer-URL (die zuvor besuchte Seite)</li>
      </ul>
      <p>
        Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO. Unser berechtigtes Interesse liegt in der technisch
        fehlerfreien Auslieferung, der Stabilität und der Sicherheit der Website. Eine Zusammenführung dieser Daten mit
        anderen Datenquellen oder eine Auswertung zu Marketingzwecken findet nicht statt. Die Logfiles werden nach
        spätestens 30 Tagen gelöscht. Mit dem Hoster besteht ein Vertrag über Auftragsverarbeitung nach Art. 28 DSGVO.
      </p>

      {/*
        ⚠️ VOR DEM LIVEGANG PRUEFEN
        1. Der Absatz unten nennt Formspree (USA) als Empfangsdienst. Wird in
           src/config.ts stattdessen SITE.formEndpoint gesetzt — etwa auf den
           eigenen Endpunkt /contact.php beim Hoster in der EU oder auf Formspark
           bzw. Basin —, MUSS dieser Absatz den tatsaechlichen Dienst nennen.
        2. Der zugesagte Auftragsverarbeitungsvertrag nach Art. 28 DSGVO muss
           tatsaechlich abgeschlossen und abgelegt sein. Die Zusage steht hier
           schwarz auf weiss; ohne Vertrag ist sie falsch.
        3. Diesen Abschnitt gegen eRecht24 oder den Generator von Dr. Schwenke
           abgleichen — und den identischen Abschnitt in en/privacy.astro
           mitziehen.
      */}
      <h2>4. Kontaktformular</h2>
      <p>
        Über das Anfrageformular auf der Kontaktseite verarbeiten wir ausschließlich die Angaben, die Sie dort selbst
        eintragen:
      </p>
      <ul>
        <li>Pflichtangaben: Name, E-Mail-Adresse, Ihre Nachricht und die ausgewählte Leistung</li>
        <li>Freiwillige Angaben: Telefonnummer und Unternehmen</li>
        <li>
          Ein technischer Zeitstempel des Seitenaufrufs sowie ein für Sie unsichtbares Kontrollfeld — beides dient
          ausschließlich der Abwehr automatisierter Spam-Einsendungen und wird nicht ausgewertet
        </li>
      </ul>
      <p>
        Eine IP-Adresse speichern wir dabei nicht. Die Übertragung erfolgt ausschließlich verschlüsselt über HTTPS. Ein
        Weiterreichen Ihrer Eingaben an Analyse- oder Marketingdienste findet nicht statt. Zur Spam-Abwehr setzen wir
        bewusst kein Google reCAPTCHA und keinen vergleichbaren Dienst ein, der Daten in die USA überträgt.
      </p>
      <p>
        Rechtsgrundlage der Verarbeitung ist Ihre Einwilligung nach Art. 6 Abs. 1 lit. a DSGVO, die Sie vor dem Absenden
        ausdrücklich erteilen und jederzeit mit Wirkung für die Zukunft widerrufen können, sowie Art. 6 Abs. 1 lit. b
        DSGVO (Durchführung vorvertraglicher Maßnahmen auf Ihre Anfrage hin). Der Widerruf berührt die Rechtmäßigkeit
        der bis dahin erfolgten Verarbeitung nicht.
      </p>
      <p>
        Für die Zustellung des Formulars nutzen wir den Dienst Formspree der Formspree, Inc., 1007 N Orange St,
        Wilmington, DE 19801, USA. Formspree leitet die Nachricht an unser E-Mail-Postfach weiter. Die Übermittlung in
        die USA erfolgt auf Grundlage der EU-Standardvertragsklauseln nach Art. 46 Abs. 2 lit. c DSGVO; zusätzlich ist
        Formspree unter dem EU-U.S. Data Privacy Framework zertifiziert. Wir weisen darauf hin, dass in den USA ein
        Zugriff staatlicher Stellen auf die Daten nicht vollständig ausgeschlossen werden kann. Mit dem Dienstleister
        besteht ein Vertrag über Auftragsverarbeitung nach Art. 28 DSGVO.
      </p>
      <p>
        Ihre Anfrage und die zugehörigen Daten speichern wir, bis der Zweck der Speicherung entfällt — also bis Ihr
        Anliegen abschließend bearbeitet ist —, längstens jedoch bis zum Ablauf gesetzlicher Aufbewahrungsfristen.
        Alternativ können Sie uns jederzeit formlos per E-Mail unter <a href={`mailto:${SITE.email}`}>{SITE.email}</a>{' '}
        kontaktieren; in diesem Fall wird kein Drittanbieter eingebunden.
      </p>

      <h2>5. Konfigurator</h2>
      <p>
        Der Website-Konfigurator läuft vollständig in Ihrem Browser. Ihre Auswahl wird weder gespeichert noch an uns
        oder an Dritte übertragen. Erst wenn Sie am Ende bewusst eine Anfrage absenden, gelten die Angaben aus Ziffer 4.
      </p>

      <h2>6. Terminbuchung</h2>
      <p>
        Für Erstgespräche verlinken wir auf den externen Dienst <a href={SITE.calendarUrl} rel="noopener noreferrer" target="_blank">Cal.com<span className="sr-only"> (öffnet in neuem Tab)</span></a>.
        Es handelt sich um einen einfachen Link — beim Aufruf dieser Website werden keine Daten an Cal.com übertragen.
        Erst wenn Sie den Link anklicken, verlassen Sie unsere Website; ab diesem Zeitpunkt gilt die Datenschutzerklärung
        des Anbieters.
      </p>

      <h2>7. Schriftarten und externe Inhalte</h2>
      <p>
        Alle verwendeten Schriftarten sind lokal auf unserem Server eingebunden. Es besteht keine Verbindung zu Google
        Fonts oder anderen Font-Anbietern. Ebenso werden keine externen Skripte, Karten, Videos oder Social-Media-Plugins
        von Drittservern nachgeladen. Ihre IP-Adresse wird dadurch an keinen Drittanbieter übermittelt.
      </p>

      <h2>8. SSL-/TLS-Verschlüsselung</h2>
      <p>
        Diese Website nutzt aus Sicherheitsgründen und zum Schutz der Übertragung vertraulicher Inhalte eine
        SSL-/TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie daran, dass die Adresszeile des Browsers
        von „http://“ auf „https://“ wechselt.
      </p>

      <h2>9. Ihre Rechte</h2>
      <p>Ihnen stehen gegenüber uns jederzeit folgende Rechte zu:</p>
      <ul>
        <li>Auskunft über die zu Ihrer Person verarbeiteten Daten (Art. 15 DSGVO)</li>
        <li>Berichtigung unrichtiger Daten (Art. 16 DSGVO)</li>
        <li>Löschung Ihrer Daten (Art. 17 DSGVO)</li>
        <li>Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
        <li>Datenübertragbarkeit (Art. 20 DSGVO)</li>
        <li>Widerspruch gegen die Verarbeitung (Art. 21 DSGVO)</li>
        <li>Widerruf einer erteilten Einwilligung mit Wirkung für die Zukunft (Art. 7 Abs. 3 DSGVO)</li>
      </ul>
      <p>
        Zur Ausübung genügt eine formlose Nachricht an <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
      </p>

      <h2>10. Widerspruchsrecht</h2>
      <p>
        Soweit wir Daten auf Grundlage eines berechtigten Interesses nach Art. 6 Abs. 1 lit. f DSGVO verarbeiten, haben
        Sie das Recht, aus Gründen, die sich aus Ihrer besonderen Situation ergeben, jederzeit Widerspruch gegen diese
        Verarbeitung einzulegen. Wir verarbeiten die betroffenen Daten dann nicht mehr, es sei denn, wir können
        zwingende schutzwürdige Gründe nachweisen, die Ihre Interessen, Rechte und Freiheiten überwiegen, oder die
        Verarbeitung dient der Geltendmachung, Ausübung oder Verteidigung von Rechtsansprüchen.
      </p>

      <h2>11. Beschwerderecht bei der Aufsichtsbehörde</h2>
      <p>
        Unbeschadet anderweitiger Rechtsbehelfe haben Sie das Recht, sich bei einer Datenschutz-Aufsichtsbehörde zu
        beschweren — insbesondere in dem Mitgliedstaat Ihres Aufenthaltsorts, Ihres Arbeitsplatzes oder des Orts des
        mutmaßlichen Verstoßes. Für uns zuständig ist die {LEGAL.authority} ({' '}
        <a href={LEGAL.authorityUrl} rel="noopener noreferrer" target="_blank">{LEGAL.authorityUrl.replace('https://', '')}<span className="sr-only"> (öffnet in neuem Tab)</span></a>).
      </p>

      <h2>12. Änderungen dieser Datenschutzerklärung</h2>
      <p>
        Wir passen diese Datenschutzerklärung an, sobald sich die Rechtslage oder unsere Verarbeitungstätigkeiten
        ändern. Für Ihren erneuten Besuch gilt jeweils die dann aktuelle Fassung. Den Stand finden Sie am Ende dieser
        Seite.
      </p>
    </Legal>
  );
}
