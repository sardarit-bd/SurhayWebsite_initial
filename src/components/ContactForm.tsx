import { scoped } from '../lib/scoped';
import type { LangProp } from '../lib/props';
import ServiceIcon from './ServiceIcon';
import { projectPlans } from '../data/pricing';
import { SITE, formAction } from '../config';
import { path, localePath } from '../i18n/utils';
import { InlineScript } from '../lib/inline-once';

/**
 * Anfrageformular — der eine Ort der Wahrheit.
 *
 * ZWEI EINBAUORTE, EIN BAUTEIL
 * Die Kontaktseite stellt es in ihre Hauptspalte, die globale
 * Anfrage-Sektion (ContactCta.astro) in ihre Karte am Seitenende. Felder,
 * Reihenfolge, Pruefung, Fehlermeldungen, Spamschutz und Endpunkt kommen in
 * beiden Faellen aus dieser Datei — geaendert wird hier, gueltig ist es
 * ueberall. Die Sektion unterscheidet sich nur in ihrer Umrahmung und im
 * fehlenden Rücksprunglink, s. `showHomeLink`.
 *
 * PRO SEITE NUR EINMAL
 * Das Skript unten spricht feste IDs an (cf-form, cf-success ...). Zwei
 * Instanzen auf derselben Seite haetten doppelte IDs — deshalb steht die
 * Sektion ausdruecklich nicht auf der Kontaktseite.
 *
 * ABGRENZUNG ZUM KONFIGURATOR
 * Das hier ist der einfache Weg: kurz, menschlich, in unter zwei Minuten
 * ausgefuellt — fuer Leute, die schreiben wollen statt klicken. Der
 * Konfigurator bleibt der detaillierte Weg fuer alle, die ihren Umfang schon
 * kennen. Das Formular verlinkt ihn (Seitenspalte), es baut ihn nicht nach:
 * kein Preisrechner, keine Extras-Matrix, kein Wizard.
 *
 * WAS ABGEFRAGT WIRD — UND WARUM NICHT MEHR
 * Genau so viel, dass innerhalb von 24 Stunden eine belastbare Einschaetzung
 * moeglich ist: Name, E-Mail, die Nachricht und die Leistung. Jedes weitere
 * Feld kostet Anfragen und muss datenschutzrechtlich zusaetzlich
 * gerechtfertigt werden — deshalb keine Anrede, keine Adresse, keine Branche,
 * kein Budget, kein Zeitrahmen, kein "Wie sind Sie auf uns aufmerksam
 * geworden".
 *
 * ZWEI BLOECKE, KEIN WIZARD
 * Erst die Kontaktdaten, dann das Anliegen. Name und E-Mail sind in Sekunden
 * getippt; wer sie schon eingetragen hat, bricht seltener ab als jemand, den
 * zuerst ein leeres Textfeld anschaut. Ein mehrstufiger Wizard erhoeht hier
 * nur Bauaufwand und Abbruchquote.
 *
 * TEXTE LOKAL STATT IN ui.ts
 * Wie beim Konfigurator: rund vierzig Zeichenketten, die ausschliesslich
 * dieses Bauteil braucht. In ui.ts waeren sie zwischen Navigations- und
 * Sektionstexten verstreut; hier stehen Beschriftung, Hilfstext und
 * Fehlermeldung eines Feldes nebeneinander.
 *
 * OHNE JAVASCRIPT
 * Das Formular ist ein gewoehnlicher POST mit `required` an den Pflichtfeldern
 * — der Browser validiert dann selbst. Erst JS schaltet `novalidate` ein und
 * uebernimmt Pruefung, Fehlermeldungen und Versand per fetch.
 */
interface Props extends LangProp {
  /**
   * „Zurueck zur Startseite" unter dem Erfolgstext. Auf der Kontaktseite
   * sinnvoll — sie ist eine Sackgasse, aus der jemand wieder herausfinden
   * muss. In der globalen Sektion nicht: Wer dort abschickt, steht bereits
   * auf der Seite, die ihn ueberzeugt hat. Ein Link, der ihn davon
   * wegschickt, waere der falsche naechste Schritt.
   */
  showHomeLink?: boolean;
}
export default function ContactForm({ showHomeLink = true, lang }: Props) {
  const privacyHref = path(lang, 'privacy');
  const configuratorHref = path(lang, 'configurator');
  const homeHref = localePath(lang, '/');

  const dict = {
    de: {
      requiredNote: '* Pflichtfeld',

      nameLabel: 'Name',
      namePlaceholder: 'Vor- und Nachname',
      emailLabel: 'E-Mail',
      emailPlaceholder: 'name@unternehmen.de',
      phoneLabel: 'Telefon',
      phoneHint: 'Nur, wenn Ihnen ein Rückruf lieber ist.',
      companyLabel: 'Unternehmen',

      paketLabel: 'Welches Paket interessiert Sie?',
      paketHint: 'Eine Angabe zur Einschätzung — festgelegt ist damit nichts.',
      fromPrefix: 'ab',
      paketPlaceholder: 'Bitte auswählen',
      paketUnsureLabel: 'Ich bin mir noch nicht sicher – bitte beraten Sie mich',
      paketUnsureValue: 'Noch unsicher',
      messageLabel: 'Erzählen Sie kurz, worum es geht',
      messagePlaceholder:
        'Zwei, drei Sätze genügen. Was haben Sie vor, und was stört Sie an der jetzigen Lösung?',
      servicesLabel: 'Welche Leistungen kommen infrage?',
      servicesHint: 'Mehrfachauswahl, optional.',
      services: [
        { id: 'webdesign' as const, label: 'Webdesign' },
        { id: 'webentwicklung' as const, label: 'Webentwicklung' },
        { id: 'seo-performance' as const, label: 'SEO & Performance' },
        { id: 'wartung' as const, label: 'Wartung & Support' },
      ],
      unsure: 'Noch unklar',

      consentBefore:
        'Ich willige ein, dass meine Angaben zur Bearbeitung meiner Anfrage gespeichert werden. Widerruf jederzeit möglich — ',
      consentLink: 'Datenschutzerklärung',
      consentAfter: '.',

      submit: 'Anfrage senden',
      sending: 'Wird gesendet …',
      submitNote: 'Antwort innerhalb von 24 Stunden. Auch dann, wenn wir nicht passen.',

      altLead: 'Lieber direkt sprechen?',
      altCalendar: 'Termin wählen',
      altConfigurator: 'Umfang selbst zusammenstellen',

      errName: 'Bitte tragen Sie Ihren Namen ein.',
      errEmailEmpty: 'Bitte tragen Sie Ihre E-Mail-Adresse ein.',
      errEmailInvalid: 'Diese E-Mail-Adresse sieht nicht vollständig aus.',
      errPaket: 'Bitte wählen Sie ein Paket aus.',
      errMessage: 'Ein, zwei Sätze reichen — aber ganz leer geht nicht.',
      /* Die Pruefung verlangt 20 Zeichen. Vorher stand auch bei „Hallo" die
         Meldung „ganz leer geht nicht" — das benennt den Fehler falsch und
         sagt nicht, was zu tun ist (WCAG 3.3.1 und 3.3.3). */
      errMessageShort: 'Das ist noch sehr knapp — bitte mindestens einen ganzen Satz (etwa 20 Zeichen).',
      errConsent: 'Ohne Ihre Einwilligung dürfen wir die Anfrage nicht bearbeiten.',

      successTitle: 'Angekommen. Danke.',
      successBefore:
        'Ihre Anfrage ist da. Sie bekommen innerhalb von 24 Stunden eine Antwort von mir persönlich — mit einer ehrlichen Einschätzung. Falls in der Zwischenzeit etwas dazukommt, schreiben Sie einfach an ',
      successHome: 'Zurück zur Startseite',

      failBefore:
        'Das Senden hat gerade nicht geklappt. Bitte versuchen Sie es noch einmal — oder schreiben Sie direkt an ',

      newTab: 'öffnet in neuem Tab',
      formLabel: 'Anfrageformular',
      honeypot: 'Dieses Feld bitte leer lassen',
      subject: 'Neue Projektanfrage über surhay.design',
    },
    tr: {
      requiredNote: '* Zorunlu alan',

      nameLabel: 'Ad Soyad',
      namePlaceholder: 'Adınız ve soyadınız',
      emailLabel: 'E-posta',
      emailPlaceholder: 'ad@sirket.com',
      phoneLabel: 'Telefon',
      phoneHint: 'Yalnızca geri aranmayı tercih ediyorsanız.',
      companyLabel: 'Şirket',

      paketLabel: 'Hangi paket ilginizi çekiyor?',
      paketHint: 'Değerlendirme için bir bilgi — bağlayıcı değildir.',
      fromPrefix: 'başlangıç',
      paketPlaceholder: 'Lütfen seçin',
      paketUnsureLabel: 'Henüz emin değilim – lütfen bana danışmanlık verin',
      paketUnsureValue: 'Henüz belirsiz',
      messageLabel: 'Kısaca neyle ilgili olduğunu anlatın',
      messagePlaceholder:
        'İki üç cümle yeter. Ne yapmak istiyorsunuz ve mevcut çözümde sizi ne rahatsız ediyor?',
      servicesLabel: 'Hangi hizmetler söz konusu olabilir?',
      servicesHint: 'Çoklu seçim, isteğe bağlı.',
      services: [
        { id: 'webdesign' as const, label: 'Web tasarım' },
        { id: 'webentwicklung' as const, label: 'Web geliştirme' },
        { id: 'seo-performance' as const, label: 'SEO & performans' },
        { id: 'wartung' as const, label: 'Bakım & destek' },
      ],
      unsure: 'Henüz belirsiz',

      consentBefore:
        'Talebimin işlenmesi için bilgilerimin saklanmasına izin veriyorum. İstediğim zaman geri alabilirim — ',
      consentLink: 'gizlilik metni',
      consentAfter: '.',

      submit: 'Talebi gönder',
      sending: 'Gönderiliyor …',
      submitNote: 'Yanıt 24 saat içinde. Size uygun olmasak bile.',

      altLead: 'Doğrudan konuşmayı mı tercih edersiniz?',
      altCalendar: 'Randevu seçin',
      altConfigurator: 'Kapsamı kendiniz belirleyin',

      errName: 'Lütfen adınızı yazın.',
      errEmailEmpty: 'Lütfen e-posta adresinizi yazın.',
      errEmailInvalid: 'Bu e-posta adresi eksik görünüyor.',
      errPaket: 'Lütfen bir paket seçin.',
      errMessage: 'Bir iki cümle yeterli — ama tamamen boş olmaz.',
      errMessageShort: 'Bu henüz çok kısa — lütfen en az tam bir cümle yazın (yaklaşık 20 karakter).',
      errConsent: 'İzniniz olmadan talebi işleyemeyiz.',

      successTitle: 'Ulaştı. Teşekkürler.',
      successBefore:
        'Talebiniz bize ulaştı. 24 saat içinde şahsen benden bir yanıt alacaksınız — dürüst bir değerlendirmeyle. Bu arada aklınıza bir şey gelirse şuraya yazmanız yeterli: ',
      successHome: 'Ana sayfaya dön',

      failBefore:
        'Gönderme şu an işe yaramadı. Lütfen tekrar deneyin — ya da doğrudan şuraya yazın: ',

      newTab: 'yeni sekmede açılır',
      formLabel: 'Talep formu',
      honeypot: 'Lütfen bu alanı boş bırakın',
      subject: 'surhay.design üzerinden yeni proje talebi',
    },
    en: {
      requiredNote: '* Required field',

      nameLabel: 'Name',
      namePlaceholder: 'First and last name',
      emailLabel: 'Email',
      emailPlaceholder: 'name@company.com',
      phoneLabel: 'Phone',
      phoneHint: 'Only if you would rather have a call back.',
      companyLabel: 'Company',

      paketLabel: 'Which package are you interested in?',
      paketHint: 'One answer, so we can estimate — it commits you to nothing.',
      fromPrefix: 'from',
      paketPlaceholder: 'Please select',
      paketUnsureLabel: 'I am not sure yet – please advise me',
      /* Nicht 'Not sure yet': So heisst schon die Unsicher-Option bei den
         Leistungen. In der Mail staenden sonst zwei verschiedene Fragen mit
         derselben Antwort untereinander. */
      paketUnsureValue: 'Undecided',
      messageLabel: 'Tell us briefly what this is about',
      messagePlaceholder:
        'Two or three sentences are enough. What are you planning, and what bothers you about the current solution?',
      servicesLabel: 'Which services might be relevant?',
      servicesHint: 'Multiple choice, optional.',
      services: [
        { id: 'webdesign' as const, label: 'Web design' },
        { id: 'webentwicklung' as const, label: 'Web development' },
        { id: 'seo-performance' as const, label: 'SEO & performance' },
        { id: 'wartung' as const, label: 'Maintenance & support' },
      ],
      unsure: 'Not sure yet',

      consentBefore:
        'I consent to my details being stored to process my enquiry. Withdrawable at any time — ',
      consentLink: 'privacy policy',
      consentAfter: '.',

      submit: 'Send enquiry',
      sending: 'Sending …',
      submitNote: 'A reply within 24 hours. Including when we are not the right fit.',

      altLead: 'Prefer to talk directly?',
      altCalendar: 'Pick a time',
      altConfigurator: 'Put your scope together yourself',

      errName: 'Please enter your name.',
      errEmailEmpty: 'Please enter your email address.',
      errEmailInvalid: 'This email address does not look complete.',
      errPaket: 'Please select a package.',
      errMessage: 'One or two sentences will do — but completely empty does not.',
      errMessageShort: 'That is still very short — please write at least one full sentence (around 20 characters).',
      errConsent: 'Without your consent we are not allowed to process the enquiry.',

      successTitle: 'Received. Thank you.',
      successBefore:
        'Your enquiry has arrived. You will get a reply from me personally within 24 hours — with an honest assessment. If anything comes up in the meantime, simply write to ',
      successHome: 'Back to the homepage',

      failBefore:
        'Sending did not work just now. Please try again — or write directly to ',

      newTab: 'opens in a new tab',
      formLabel: 'Enquiry form',
      honeypot: 'Please leave this field empty',
      subject: 'New project enquiry via surhay.design',
    },
  }[lang];

  /* --------------------------------------------------------------- Pakete
     Namen, Reihenfolge und Preise kommen aus derselben Quelle wie die
     Preisseite (src/data/pricing.ts) — so koennen Karte und Formular nicht
     auseinanderlaufen, wenn dort ein Preis steigt.

     Nur die Projektpakete: Die Wartungspakete werden nach dem Launch gebucht
     und sind keine Antwort auf „Was soll gebaut werden?". Wer nur Wartung
     sucht, kreuzt das unten unter „Worum geht es?" an.

     Der Wert, der in der Mail landet, ist der Paketname — nicht die id. Eine
     Anfrage mit „Leistung: individuell" waere in der Mail nicht sofort
     lesbar. */
  const packageOptions = [
    ...projectPlans.map((plan) => ({
      id: plan.id,
      value: plan.name[lang],
      /* Name und Preis in einer Zeile — eine Option hat keine zweite. „ab“ nur
         dort, wo es einen Startpreis gibt: „Individuell“ traegt statt einer
         Zahl „auf Anfrage“ und braucht das Wort davor nicht. */
      label: `${plan.name[lang]} — ${plan.from ? `${dict.fromPrefix} ` : ''}${plan.price[lang]}`,
    })),
    {
      id: 'unsicher',
      value: dict.paketUnsureValue,
      label: dict.paketUnsureLabel,
    },
  ];

  /* Ohne hinterlegten Endpunkt gibt es kein Ziel. Das Formular wird trotzdem
     gebaut — es ist der Hauptweg dieser Seite —, aber der Versand endet dann
     sichtbar im Fehlschlag mit der E-Mail-Adresse daneben, statt eine Anfrage
     stillschweigend zu verschlucken. */
  if (!formAction) {
    console.warn(
      '[Kontakt] Kein Formular-Endpunkt gesetzt — SITE.formEndpoint oder SITE.formspreeId in src/config.ts pflegen.'
    );
  }

  return (
    <>
      {scoped(
        'data-c-contact-form',
        <>
        {/* id: Sprungziel der Paket-CTAs aus der Preis-Sektion (href="#anfrage"). */}
        <div className="cf-wrap" id="anfrage">
          {/* Technischer Fehlschlag — steht ueber dem Formular, damit die Meldung
              nicht unter dem Button verschwindet. Eingaben bleiben unberuehrt. */}
          <p id="cf-fail" className="cf-fail" role="alert" hidden>
            <svg className="cf-fail-icon" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M8 1.6 15.2 14H.8L8 1.6Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"></path>
              <path d="M8 6v3.4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"></path>
              <circle cx="8" cy="11.8" r="0.85" fill="currentColor"></circle>
            </svg>
            <span>
              {dict.failBefore}<a href={`mailto:${SITE.email}`} className="link-slide font-semibold">{SITE.email}</a>.
            </span>
          </p>

          {/* Benanntes Formular: Ohne Namen taucht die Formular-Landmarke in der
              Uebersicht eines Screenreaders als namenloser Eintrag auf. */}
          <form id="cf-form" className="cf-form" aria-label={dict.formLabel} action={formAction ?? undefined} method="POST" data-err-name={dict.errName} data-err-email-empty={dict.errEmailEmpty} data-err-email-invalid={dict.errEmailInvalid} data-err-paket={dict.errPaket} data-err-message={dict.errMessage} data-err-message-short={dict.errMessageShort} data-err-consent={dict.errConsent}>
            <input type="hidden" name="_subject" defaultValue={dict.subject} />
            {/* Zeitfalle: JS traegt den Ladezeitpunkt ein. Leer heisst "kein JS" —
                dann greift nur der Honeypot, statt Menschen ohne JS auszusperren. */}
            <input type="hidden" name="zeitstempel" id="cf-ts" defaultValue="" />

            {/* Honeypot. Bewusst NICHT display:none — das erkennen Bots. Aus dem
                Sichtfeld geschoben, aus der Tab-Reihenfolge genommen, fuer
                Screenreader ausgeblendet. */}
            {/* `inert` kommt zu aria-hidden dazu: aria-hidden allein nimmt das Feld
                aus dem Screenreader, laesst es aber fokussierbar — ein fokussierbares
                Element in einem aria-hidden-Bereich ist ein Widerspruch, den
                Pruefwerkzeuge zu Recht anstreichen. inert nimmt Fokus und
                Zeigerereignisse; abgeschickt wird der Wert weiterhin, die Falle
                bleibt also intakt. */}
            <div className="cf-hp" aria-hidden="true" inert>
              <label htmlFor="cf-gotcha">{dict.honeypot}</label>{' '}
              <input id="cf-gotcha" name="_gotcha" type="text" tabIndex={-1} autoComplete="off" />
            </div>

            <p className="cf-required-note">{dict.requiredNote}</p>

            {/* --------------------------------------------- Block 1 — Kontaktdaten
                Die persoenlichen Daten stehen bewusst zuerst: Name und E-Mail sind in
                Sekunden getippt, und wer sie schon eingetragen hat, bricht seltener ab
                als jemand, den zuerst ein leeres Textfeld anschaut. */}
            <div className="cf-block">
              <div className="cf-two">
                <div className="cf-field" data-field="name">
                  <label className="cf-label" htmlFor="cf-name">
                    {dict.nameLabel}<span className="cf-req" aria-hidden="true">*</span>
                  </label>
                  <input id="cf-name" className="cf-input" name="name" type="text" required aria-required="true" aria-describedby="cf-name-error" autoComplete="name" placeholder={dict.namePlaceholder} />
                  <p className="cf-error" id="cf-name-error" role="alert" hidden>
                    <svg className="cf-error-icon" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                      <path d="M8 1.6 15.2 14H.8L8 1.6Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"></path>
                      <path d="M8 6v3.4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"></path>
                      <circle cx="8" cy="11.8" r="0.85" fill="currentColor"></circle>
                    </svg>
                    <span className="cf-error-text"></span>
                  </p>
                </div>

                <div className="cf-field" data-field="email">
                  <label className="cf-label" htmlFor="cf-email">
                    {dict.emailLabel}<span className="cf-req" aria-hidden="true">*</span>
                  </label>
                  <input id="cf-email" className="cf-input" name="email" type="email" required aria-required="true" aria-describedby="cf-email-error" autoComplete="email" inputMode="email" spellCheck="false" placeholder={dict.emailPlaceholder} />
                  <p className="cf-error" id="cf-email-error" role="alert" hidden>
                    <svg className="cf-error-icon" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                      <path d="M8 1.6 15.2 14H.8L8 1.6Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"></path>
                      <path d="M8 6v3.4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"></path>
                      <circle cx="8" cy="11.8" r="0.85" fill="currentColor"></circle>
                    </svg>
                    <span className="cf-error-text"></span>
                  </p>
                </div>

                <div className="cf-field" data-field="phone">
                  <label className="cf-label" htmlFor="cf-phone">{dict.phoneLabel}</label>
                  <p className="cf-hint" id="cf-phone-hint">{dict.phoneHint}</p>
                  <input id="cf-phone" className="cf-input" name="telefon" type="tel" autoComplete="tel" inputMode="tel" aria-describedby="cf-phone-hint" />
                </div>

                <div className="cf-field" data-field="company">
                  <label className="cf-label" htmlFor="cf-company">{dict.companyLabel}</label>
                  <input id="cf-company" className="cf-input" name="unternehmen" type="text" autoComplete="organization" />
                </div>
              </div>
            </div>

            {/* --------------------------------------------- Block 2 — Worum es geht
                Ohne Zwischenueberschrift: bei sechs Feldern traegt der Weissraum die
                Gliederung, und zwei Eyebrow-Zeilen im Formular konkurrierten mit den
                Feldbeschriftungen um dieselbe Rolle. */}
            <div className="cf-block">
              {/* ---------------------------------------------------- Paketwahl
                  Steht vor dem Nachrichtenfeld: Wer ueber eine Paketkarte der
                  Preisseite hierher kommt, sieht seine Wahl sofort bestaetigt, statt
                  sie unter einem Textfeld zu suchen.

                  EIN NATIVES <select>, KEIN NACHBAU
                  Vorher standen hier vier Kacheln — vier Zeilen fuer eine Angabe, die
                  das Formular nur einordnet. Preis und Name stehen jetzt zusammen in
                  der Beschriftung der Option, die Auswahl kostet eine Zeile.
                  Bewusst das Element des Browsers und kein Aufklappmenue aus divs:
                  Tastaturbedienung, Suche per Tippen und der Auswahldialog des
                  Betriebssystems auf dem Handy sind darin schon enthalten und muessten
                  sonst muehsam nachgebaut werden — meist unvollstaendig.

                  KEINE VORAUSWAHL
                  Die erste Option traegt value="" und ist `disabled`: Ein
                  vorausgewaehltes Paket waere geraten, nicht gewaehlt, und stuende
                  hinterher trotzdem in der Mail. Weil sie leer ist, greift `required`
                  von selbst. */}
              <div className="cf-field" data-field="paket">
                <label className="cf-label" htmlFor="cf-paket">
                  {dict.paketLabel}<span className="cf-req" aria-hidden="true">*</span>
                </label>
                <p className="cf-hint" id="cf-paket-hint">{dict.paketHint}</p>

                <div className="cf-select-wrap">
                  {/* `defaultValue=""` statt `selected` an der <option>: React verbietet
     `selected` am Kind und will die Vorauswahl am <select>. Ausgegeben
     wird dasselbe HTML — <option value="" disabled selected>. */}
                  <select
                    id="cf-paket"
                    className="cf-input cf-select"
                    name="paket"
                    required
                    aria-required="true"
                    aria-describedby="cf-paket-hint cf-paket-error"
                    defaultValue=""
                  >
                    <option value="" disabled>{dict.paketPlaceholder}</option>
                    {
                      packageOptions.map((option) => (
                        <option value={option.value} data-plan={option.id} key={option.id}>
                          {option.label}
                        </option>
                      ))
                    }
                  </select>
                  {/* Der Haken des Browsers ist mit `appearance: none` weg; dieser
                      hier traegt currentColor aus der Regel und liegt fuer den Zeiger
                      durchlaessig darueber. */}
                  <svg className="cf-select-caret" viewBox="0 0 10 6" fill="none" aria-hidden="true">
                    <path d="M1 1.5 5 5l4-3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>

                <p className="cf-error" id="cf-paket-error" role="alert" hidden>
                  <svg className="cf-error-icon" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M8 1.6 15.2 14H.8L8 1.6Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"></path>
                    <path d="M8 6v3.4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"></path>
                    <circle cx="8" cy="11.8" r="0.85" fill="currentColor"></circle>
                  </svg>
                  <span className="cf-error-text"></span>
                </p>
              </div>

              <div className="cf-field" data-field="services">
                {/* Der Hilfstext gehoert an die Gruppe, sonst steht er zwar sichtbar
                    da, wird aber beim Betreten der Gruppe nicht vorgelesen. */}
                <fieldset className="cf-group" aria-describedby="cf-services-hint">
                  <legend className="cf-label">{dict.servicesLabel}</legend>
                  <p className="cf-hint" id="cf-services-hint">{dict.servicesHint}</p>

                  {/* Der Feldname endet auf [] — nur so kommen beim eigenen
                      PHP-Endpunkt alle Haken an statt nur des letzten. */}
                  <div className="pick-grid">
                    {
                      dict.services.map((service) => (
                        <label className="pick-tile">
                          <input className="sr-only" type="checkbox" name="leistung[]" defaultValue={service.label} />
                          <ServiceIcon service={service.id} size={20} className="pick-tile-icon" />
                          <span className="pick-tile-label">{service.label}</span>
                          <svg className="pick-check" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                            <path d="M2 7.5 5.5 11 12 3" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </label>
                      ))
                    }
                    {/* Ohne diese Option bricht genau die Zielgruppe ab, die noch nicht
                        weiss, ob sie Design, Entwicklung oder Wartung braucht. Kein
                        Icon: sie steht fuer keine Leistung. */}
                    <label className="pick-tile pick-tile-plain">
                      <input className="sr-only" type="checkbox" name="leistung[]" defaultValue={dict.unsure} data-unsure="" />
                      <span className="pick-tile-label">{dict.unsure}</span>
                      <svg className="pick-check" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                        <path d="M2 7.5 5.5 11 12 3" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"></path>
                      </svg>
                    </label>
                  </div>
                </fieldset>

              </div>
              {/* Erst eingrenzen, dann erzaehlen: Paket und Leistungen sortieren die
                  Anfrage, das Freitextfeld darunter fuellt sie. Umgekehrt stand
                  „Erzaehlen Sie kurz, worum es geht" direkt ueber „Worum geht es?" —
                  zwei fast gleich klingende Beschriftungen untereinander. */}
              <div className="cf-field" data-field="message">
                <label className="cf-label" htmlFor="cf-message">
                  {dict.messageLabel}<span className="cf-req" aria-hidden="true">*</span>
                </label>
                <textarea id="cf-message" className="cf-input cf-textarea" name="nachricht" rows={5} required aria-required="true" aria-describedby="cf-message-error" placeholder={dict.messagePlaceholder}></textarea>
                <p className="cf-error" id="cf-message-error" role="alert" hidden>
                  <svg className="cf-error-icon" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M8 1.6 15.2 14H.8L8 1.6Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"></path>
                    <path d="M8 6v3.4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"></path>
                    <circle cx="8" cy="11.8" r="0.85" fill="currentColor"></circle>
                  </svg>
                  <span className="cf-error-text"></span>
                </p>
              </div>
            </div>

            {/* ------------------------------------------ Einwilligung und Absenden */}
            <div className="cf-field cf-consent-field" data-field="consent">
              <label className="cf-consent">
                <input id="cf-consent" className="cf-consent-box" type="checkbox" name="einwilligung" defaultValue="ja" required aria-required="true" aria-describedby="cf-consent-error" />
                {/* Bewusst ohne Zeilenumbrueche zwischen Text, Link und Satzzeichen:
                    jeder Umbruch im Markup wird zu einem Leerzeichen, und der Punkt
                    nach der Datenschutzerklaerung landete dadurch allein am Anfang
                    der naechsten Zeile. */}
                <span className="cf-consent-text">{dict.consentBefore}<a href={privacyHref} className="link-slide font-semibold" rel="noopener noreferrer" target="_blank">{dict.consentLink}<span className="sr-only"> ({dict.newTab})</span></a>{dict.consentAfter}</span>
              </label>
              <p className="cf-error" id="cf-consent-error" role="alert" hidden>
                <svg className="cf-error-icon" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M8 1.6 15.2 14H.8L8 1.6Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"></path>
                  <path d="M8 6v3.4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"></path>
                  <circle cx="8" cy="11.8" r="0.85" fill="currentColor"></circle>
                </svg>
                <span className="cf-error-text"></span>
              </p>
            </div>

            {/* Nie deaktiviert: ein ausgegrauter Button sagt nicht, was fehlt. Er
                validiert beim Klick und springt auf das erste fehlerhafte Feld. */}
            <button type="submit" id="cf-submit" className="btn btn-primary cf-submit" data-sending={dict.sending}>
              <span className="cf-spinner" aria-hidden="true"></span>
              <span className="cf-submit-label">{dict.submit}</span>
              <svg className="btn-arrow h-4 w-4" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M1 8h13M9 3l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
              </svg>
            </button>

            <p className="cf-submit-note">{dict.submitNote}</p>

            {/* Ohne Endpunkt UND ohne JavaScript: das Formular traegt dann kein
                action-Attribut, und ein natives POST landet beim Webserver dieser
                Website — auf GitHub Pages also mit Name, E-Mail und Nachricht bei
                GitHub und dessen CDN Fastly (gemessen am 5. September 2026:
                HTTP 405, der Rumpf geht trotzdem raus). Der Guard im Skript unten
                greift nur mit JavaScript; das hier ist der statische Riegel fuer
                alle anderen. Faellt von selbst weg, sobald ein Endpunkt in
                src/config.ts gepflegt ist. */}
            {!formAction && (
              <noscript>
                <style>{"#cf-submit { display: none; }"}</style>
                <p className="cf-fail">
                  <span>
                    {dict.failBefore}<a href={`mailto:${SITE.email}`} className="link-slide font-semibold">{SITE.email}</a>.
                  </span>
                </p>
              </noscript>
            )}

            {/* Die beiden Nebenwege. Sie standen auf der Kontaktseite als eigene
                Karte neben dem Formular und zogen dort Gewicht von der Hauptaktion
                ab. Als eine Zeile unter dem Button sind sie erreichbar, ohne mit ihm
                zu konkurrieren — und stehen jetzt auch in der globalen
                Anfrage-Sektion, wo sie vorher ganz fehlten. */}
            <p className="cf-alt">
              {dict.altLead}{' '}
              <a href={SITE.calendarUrl} className="link-slide font-semibold" rel="noopener noreferrer" target="_blank">
                {dict.altCalendar}<span className="sr-only"> ({dict.newTab})</span>
              </a>{' '}
              <span className="cf-alt-sep" aria-hidden="true">·</span>{' '}
              <a href={configuratorHref} className="link-slide font-semibold">{dict.altConfigurator}</a>
            </p>
          </form>

          {/* Ersetzt das Formular, statt es zu ergaenzen. Kein Konfetti, kein
              automatischer Redirect — die Bestaetigung ist die Nachricht. */}
          <div id="cf-success" className="cf-success" hidden>
            <h2 id="cf-success-title" className="h3" tabIndex={-1}>{dict.successTitle}</h2>
            <p className="cf-success-text">
              {dict.successBefore}<a href={`mailto:${SITE.email}`} className="link-slide font-semibold">{SITE.email}</a>.
            </p>
            {showHomeLink && <a href={homeHref} className="link-slide cf-success-home">{dict.successHome}</a>}
          </div>
        </div>
        </>
      )}
      <InlineScript name="contact-form" />
    </>
  );
}
