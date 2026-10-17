/**
 * UI-Texte für alle drei Sprachen. Deutsch ist die Quelle der Wahrheit,
 * Türkisch und Englisch sind Übersetzungen. CMS-Inhalte (Case Studies, Blog,
 * FAQ, Testimonials) liegen separat in src/content/<collection>/<lang>/.
 *
 * Fehlt ein Schlüssel in tr oder en, bricht der Build (siehe `_vollstaendig`
 * am Dateiende) — und zur Laufzeit greift zusätzlich der Rückfall auf
 * Deutsch in `useTranslations`. Ein roher Schlüssel oder ein leerer String
 * kann damit nie im Frontend landen.
 */

export const languages = { de: 'Deutsch', tr: 'Türkçe', en: 'English' } as const;
export type Lang = keyof typeof languages;
export const defaultLang: Lang = 'de';

/** Reihenfolge im Sprachumschalter — Standardsprache zuerst. */
export const locales = ['de', 'tr', 'en'] as const satisfies readonly Lang[];

export interface LocaleMeta {
  /** Kurzform im Umschalter („DE“). */
  short: string;
  /** Sprachname in der Zielsprache — „Türkçe“, nicht „Türkisch“. */
  native: string;
  /** Wert für <html lang>, hreflang und das lang-Attribut der Sprachlinks. */
  hreflang: string;
  /** Wert für og:locale. */
  ogLocale: string;
  /** Kennung für Intl.DateTimeFormat / Intl.NumberFormat. */
  intl: string;
  /**
   * Flaggen-SVG unter /flags/ mit dem Seitenverhältnis des Originals.
   * Alle drei werden auf dieselbe Höhe skaliert, die Breite folgt daraus —
   * gestaucht oder quadratisch gepresst wird keine.
   */
  flag: { file: string; ratio: number };
}

export const localeMeta: Record<Lang, LocaleMeta> = {
  de: { short: 'DE', native: 'Deutsch', hreflang: 'de', ogLocale: 'de_DE', intl: 'de-DE', flag: { file: 'de.svg', ratio: 5 / 3 } },
  tr: { short: 'TR', native: 'Türkçe', hreflang: 'tr', ogLocale: 'tr_TR', intl: 'tr-TR', flag: { file: 'tr.svg', ratio: 3 / 2 } },
  /* Britische Flagge, nicht die US-amerikanische: Das Publikum dieser Seite
     sitzt in Europa. Entsprechend auch en_GB / en-GB in den Formaten. */
  en: { short: 'EN', native: 'English', hreflang: 'en', ogLocale: 'en_GB', intl: 'en-GB', flag: { file: 'gb.svg', ratio: 5 / 3 } },
};

export const ui = {
  de: {
    'meta.title': 'Surhay Design — Websites, die verkaufen | Webdesign & Entwicklung Berlin',
    'meta.description':
      'Maßgeschneiderte, performante Websites für KMU, Selbstständige und Startups im DACH-Raum. Webdesign, Entwicklung und Wartung aus Berlin — messbar besser.',

    'nav.services': 'Leistungen',
    'nav.work': 'Projekte',
    'nav.process': 'Prozess',
    'nav.pricing': 'Preise',
    'nav.faq': 'FAQ',
    'nav.blog': 'Blog',
    'nav.contact': 'Kontakt',
    'nav.cta': 'Erstgespräch',
    'nav.menuOpen': 'Menü öffnen',
    'nav.menuClose': 'Menü schließen',
    'nav.home': 'Zur Startseite',
    'nav.langSwitch': 'Sprache wählen',
    'nav.langCurrent': 'Aktuelle Sprache',
    'nav.skip': 'Zum Inhalt springen',
    /* Zwei Navigationen, zwei Namen: Screenreader zaehlen Landmarks auf,
       und zweimal "Navigation" hilft dabei niemandem (WCAG 1.3.1). */
    'nav.mainLabel': 'Hauptnavigation',
    'nav.menuLabel': 'Menü',
    'nav.newTab': 'öffnet in neuem Tab',
    /* Statusmeldung nach dem Filtern (WCAG 4.1.3). {n} = Anzahl. */
    'work.filterCount': '{n} Projekte werden angezeigt',
    'blog.filterCount': '{n} Beiträge werden angezeigt',

    'hero.eyebrow': 'Webdesign · Entwicklung · Wartung — Berlin',
    /* Beschriftung des Anhalten-Knopfes im Hero (WCAG 2.2.2). */
    'hero.pauseLabel': 'Wortwechsel anhalten',
    'hero.playLabel': 'Wortwechsel fortsetzen',
    /* Headline als ein Satz ueber mehrere Zeilen; `marked` traegt den Marker. */
    'hero.title.pre': 'Websites, die',
    'hero.title.marked': 'verkaufen',
    /* Zeile 2 der Headline; danach folgt der Branchen-Wechsler. */
    'hero.title.built': 'gebaut für',
    'hero.sub':
      'Maßgeschneidertes Design, saubere Entwicklung, verlässliche Wartung — für KMU, Selbstständige und Startups im DACH-Raum.',
    'hero.cta': 'Kostenloses Erstgespräch',
    'hero.ctaSecondary': 'Preise ansehen',

    /* Vertrauenszeile unter dem Hero — vier ueberpruefbare Zusagen. Sie
       ersetzen das fruehere Wort-Laufband, das an dieser Stelle nichts sagte. */
    'trust.label': 'Was Sie erwarten können',
    'trust.1.title': 'Antwort in 24 Stunden',
    'trust.1.desc': 'Auf jede Anfrage — werktags meist deutlich schneller.',
    'trust.2.title': 'Festpreis vor Projektstart',
    'trust.2.desc': 'Nach dem Erstgespräch schriftlich fixiert. Kein Nachschlag, keine Stundenzettel.',
    'trust.3.title': 'Individueller Code',
    'trust.3.desc': 'Kein Baukasten, kein gekauftes Theme. Ladezeit unter einer Sekunde.',
    'trust.4.title': 'Berlin, DACH-weit',
    'trust.4.desc': 'Zusammenarbeit remote auf Deutsch und Englisch, Termine vor Ort in Berlin.',

    'services.eyebrow': 'Leistungen',
    'services.title': 'Drei Dinge. Richtig gut.',
    'services.sub':
      'Keine Bauchladen-Agentur: Wir konzentrieren uns auf das, was Ihre Website erfolgreich macht — und liefern es in höchster Qualität.',
    'services.1.title': 'Webdesign',
    'services.1.desc':
      'Individuelles, conversion-orientiertes Design — kein Template, kein Baukasten. Ein Auftritt, der im Kopf bleibt und Anfragen bringt.',
    'services.2.title': 'Webentwicklung',
    'services.2.desc':
      'Saubere, performante Umsetzung: Ladezeiten unter einer Sekunde, Top-Rankings und ein CMS, das Sie selbst pflegen.',
    'services.3.title': 'Wartung',
    'services.3.desc':
      'Updates, Backups, Monitoring und Support im monatlichen Paket — Ihre Website bleibt sicher, aktuell und schnell.',
    'services.3.badge': 'Monatliche Pakete',

    'work.eyebrow': 'Ausgewählte Projekte',
    'work.title': 'Ergebnisse statt Referenzen.',
    'work.sub': 'Jedes Projekt mit messbarem Resultat — von der Ausgangslage bis zur Kennzahl.',
    'work.filter.all': 'Alle',
    'work.viewCase': 'Case Study ansehen',
    'work.empty': 'Keine Projekte in dieser Kategorie.',
    'work.back': 'Alle Projekte',
    'work.client': 'Kunde',
    'work.industry': 'Branche',
    'work.year': 'Jahr',
    'work.situation': 'Ausgangslage',
    'work.solution': 'Lösung',
    'work.results': 'Ergebnis',
    'work.nextCase': 'Nächste Case Study',
    /* Zwischenstand, solange keine Case Study `real: true` traegt. Bewusst
       kein Lueckenbuesser: Preistransparenz und eine ehrliche Absage sind
       fuer einen KMU-Entscheider ueberpruefbarer als jede Referenz. */
    'work.pending.title': 'Referenzen zeigen wir erst, wenn sie echt sind.',
    'work.pending.sub':
      'Dieses Studio startet neu. Statt fremder Screenshots und ausgedachter Prozentzahlen finden Sie hier, was sich heute schon überprüfen lässt: feste Preise, ein klarer Ablauf — und ein Erstgespräch, in dem wir Ihnen auch sagen, wenn wir nicht die Richtigen sind.',
    'work.pending.cta': 'Kosten berechnen',
    'work.pending.ctaSecondary': 'Preise ansehen',
    'work.pending.1.title': 'Diese Website ist die Arbeitsprobe',
    'work.pending.1.desc':
      'Typografie, Ladezeit, Barrierefreiheit, Zweisprachigkeit — alles hier ist von Hand gebaut. Prüfen Sie es mit Lighthouse.',
    'work.pending.2.title': 'Klickbarer Entwurf vor dem Code',
    'work.pending.2.desc':
      'Sie sehen Ihre Website als bedienbaren Entwurf, bevor eine Zeile Code entsteht — und können sie an dieser Stelle noch ablehnen.',
    'work.pending.3.title': 'Ehrliche Absage inklusive',
    'work.pending.3.desc':
      'Passt Ihr Vorhaben nicht zu uns, sagen wir das im Erstgespräch. Das kostet Sie nichts außer 30 Minuten.',

    'process.eyebrow': 'Prozess',
    'process.title': 'Vom ersten Gespräch zum Launch — in vier Schritten.',
    'process.sub': 'Transparent, planbar und ohne Agentur-Theater. Sie wissen jederzeit, wo Ihr Projekt steht.',
    'process.1.title': 'Erstgespräch',
    'process.1.desc':
      'Wir sprechen über Ihre Ziele, Zielgruppe und Ihr Budget. Kostenlos, unverbindlich — und ehrlich: Wenn wir nicht passen, sagen wir es Ihnen.',
    'process.1.duration': '30–45 Min.',
    'process.2.title': 'Konzept & Design',
    'process.2.desc':
      'Struktur, Inhalte und Design entstehen auf Basis Ihrer Ziele. Sie sehen früh einen klickbaren Entwurf und geben Feedback, bevor eine Zeile Code geschrieben wird.',
    'process.2.duration': '1–2 Wochen',
    'process.3.title': 'Entwicklung',
    'process.3.desc':
      'Das freigegebene Design wird sauber und performant umgesetzt. Inklusive CMS, damit Sie Inhalte später selbst pflegen können.',
    'process.3.duration': '2–4 Wochen',
    'process.4.title': 'Launch & Wartung',
    'process.4.desc':
      'Nach Tests auf allen Geräten geht Ihre Website live. Auf Wunsch übernehmen wir danach Updates, Sicherheit und Support — monatlich kündbar.',
    'process.4.duration': 'fortlaufend',

    'pricing.eyebrow': 'Preise',
    'pricing.title': 'Klare Pakete. Keine Überraschungen.',
    'pricing.sub':
      'Jedes Projekt ist individuell — diese Pakete geben Ihnen einen ehrlichen Rahmen. Den Festpreis erhalten Sie nach dem Erstgespräch.',
    'pricing.from': 'ab',
    'pricing.popular': 'Beliebt',
    'pricing.cta': 'Projekt anfragen',
    'pricing.p1.name': 'Starter',
    'pricing.p1.price': '2.900 €',
    'pricing.p1.desc': 'Der professionelle Einstieg: ein starker OnePager, der Ihr Angebot auf den Punkt bringt.',
    'pricing.p1.features': 'OnePager (bis 6 Sektionen)|Individuelles Design|Kontaktformular|SEO-Grundsetup|Launch in 3–4 Wochen',
    'pricing.p2.name': 'Business',
    'pricing.p2.price': '5.900 €',
    'pricing.p2.desc': 'Für Unternehmen, die wachsen: mehrseitige Website mit CMS und Conversion-Fokus.',
    'pricing.p2.features': 'Bis 8 Unterseiten|CMS zur eigenen Pflege|Blog & Case Studies|Zweisprachig (DE/EN)|Performance-Garantie 95+|Launch in 5–7 Wochen',
    'pricing.p3.name': 'Individuell',
    'pricing.p3.price': 'auf Anfrage',
    'pricing.p3.desc': 'Komplexe Anforderungen, Integrationen oder E-Commerce? Wir finden die passende Lösung.',
    'pricing.p3.features': 'Individueller Umfang|Schnittstellen & Integrationen|Workshops & Strategie|Persönliche Beratung',

    'faq.eyebrow': 'FAQ',
    'faq.title': 'Häufige Fragen, ehrliche Antworten.',
    'faq.allLink': 'Alle Fragen ansehen',

    'blog.eyebrow': 'Insights',
    'blog.readMore': 'Weiterlesen',
    'blog.back': 'Alle Artikel',
    'blog.minRead': 'Min. Lesezeit',
    'blog.by': 'Von',
    'blog.indexTitle': 'Blog & Insights',
    'blog.indexDesc':
      'Praxiswissen zu Webdesign, Performance und Online-Marketing — direkt anwendbar für KMU, Selbstständige und Startups.',

    /* Studio — steht VOR der Preissektion: wer 2.900 bis 5.900 EUR ausgibt,
       will vorher wissen, mit wem er es zu tun hat. */
    'studio.eyebrow': 'Studio',
    'studio.title': 'Wer an Ihrer Website arbeitet.',
    'studio.sub':
      'Kein Account-Management, keine Weiterreichung an wechselnde Freelancer: Sie sprechen mit der Person, die entwirft, entwickelt und später wartet. Deshalb dauern Entscheidungen hier Stunden statt Wochen.',
    'studio.role': 'Webdesign & Entwicklung',
    'studio.photoAlt': 'Bildmarke von Surhay Design',
    'studio.1.title': 'Eine Ansprechperson',
    'studio.1.desc': 'Vom Erstgespräch bis nach dem Launch dieselbe — ohne Übergabeverluste.',
    'studio.2.title': 'Handwerk statt Baukasten',
    'studio.2.desc': 'Struktur, Typografie, Ladezeit und Barrierefreiheit werden hier einzeln entschieden.',
    'studio.3.title': 'Auch nach dem Launch da',
    'studio.3.desc': 'Updates, Sicherheit und Support im monatlichen Paket — monatlich kündbar.',
    'studio.cta': 'Erstgespräch buchen',

    /* Insights — Fachtexte als Kompetenzbeleg, fuer den niemand buergen muss. */
    'insights.eyebrow': 'Insights',
    'insights.title': 'Wissen, das Sie auch ohne uns anwenden können.',
    'insights.all': 'Alle Artikel',

    'contact.eyebrow': 'Kontakt',
    'contact.title': 'Lassen Sie uns über Ihr Projekt sprechen.',
    'contact.sub':
      'Erzählen Sie kurz, worum es geht — Sie erhalten innerhalb von 24 Stunden eine ehrliche Einschätzung. Oder stellen Sie sich Ihre Wunsch-Website direkt im Konfigurator zusammen.',
    'contact.name': 'Name',
    'contact.email': 'E-Mail',
    'contact.message': 'Ihr Projekt in 2–3 Sätzen',
    'contact.submit': 'Anfrage senden',
    'contact.or': 'oder',
    'contact.configurator': 'Zum Konfigurator',
    'contact.privacyNote': 'Mit dem Absenden stimmen Sie der Verarbeitung Ihrer Daten zu — Details in unserer',
    'contact.privacyLink': 'Datenschutzerklärung',
    'contact.success': 'Danke! Ihre Nachricht ist angekommen — Sie hören innerhalb von 24 Stunden von uns.',
    'contact.error': 'Das hat leider nicht geklappt. Schreiben Sie uns direkt an',
    'contact.direct': 'Direkt',
    /* Ersatz fuer das Formular, solange keine Formspree-ID hinterlegt ist. */
    'contact.route1.step': 'Weg 1',
    'contact.route1.title': 'Kurz schreiben',
    'contact.route1.desc':
      'Zwei, drei Sätze zum Vorhaben genügen. Sie bekommen innerhalb von 24 Stunden eine ehrliche Einschätzung — inklusive grober Preisspanne.',
    'contact.route1.subject': 'Projektanfrage über surhay.design',
    'contact.route1.cta': 'E-Mail schreiben',
    'contact.route2.step': 'Weg 2',
    'contact.route2.title': 'Direkt einen Termin nehmen',
    'contact.route2.desc':
      '30 bis 45 Minuten, kostenlos und unverbindlich. Oder Sie stellen vorab im Konfigurator zusammen, was Sie brauchen.',
    'contact.route2.cta': 'Termin wählen',

    'footer.tagline': 'Websites, die verkaufen — aus Berlin.',
    'footer.nav': 'Navigation',
    'footer.legal': 'Rechtliches',
    'footer.social': 'Social',
    'footer.imprint': 'Impressum',
    'footer.privacy': 'Datenschutz',
    'footer.cookies': 'Cookie-Einstellungen',
    'footer.rights': 'Alle Rechte vorbehalten.',
    'footer.madeIn': 'Entworfen & entwickelt in Berlin',

    /* ------------------------------------------------------- Multipage */
    'nav.about': 'Agentur',
    'nav.allServices': 'Alle Leistungen',
    'nav.servicesHint': 'Vier Leistungen, die aufeinander aufbauen — von der Struktur bis zum laufenden Betrieb.',
    'nav.more': 'Mehr',

    'breadcrumb.home': 'Start',
    'breadcrumb.label': 'Sie sind hier',

    'common.readMore': 'Mehr erfahren',
    'common.overview': 'Zur Übersicht',
    'common.included': 'Enthalten',
    'common.from': 'ab',
    'common.perMonth': 'pro Monat',
    'common.netHint': 'Alle Preise netto zzgl. gesetzlicher Umsatzsteuer.',
    'common.country': 'Deutschland',

    'cta.title': 'Reden wir über Ihr Projekt.',
    'cta.sub': 'Ein Erstgespräch dauert 30 bis 45 Minuten, kostet nichts und endet entweder mit einem Angebot oder mit einer ehrlichen Empfehlung, wohin Sie sonst gehen sollten.',
    'cta.primary': 'Erstgespräch anfragen',
    'cta.secondary': 'Kosten selbst berechnen',

    /* Globale Anfrage-Sektion (ContactCta.astro) — Standardtexte. Headline
       und Subline lassen sich pro Seite ueberschreiben, alles andere nicht:
       Formularbeschriftungen und Fehlermeldungen duerfen ueber die Seiten
       hinweg nicht auseinanderdriften. */
    'ctaForm.eyebrow': 'Anfrage',
    'ctaForm.title': 'Bereit für eine Website, die etwas bringt?',
    'ctaForm.sub': 'Schreiben Sie kurz, worum es geht — Antwort innerhalb von 24 Stunden.',
    'ctaForm.direct': 'Lieber direkt schreiben?',

    'page.services.title': 'Leistungen',
    'page.services.metaTitle': 'Leistungen — Webdesign, Entwicklung, SEO und Wartung | Surhay Design',
    'page.services.metaDesc': 'Vier Leistungen aus einer Hand: individuelles Webdesign, saubere Entwicklung, technisches SEO und laufende Wartung. Für KMU, Selbstständige und Startups im DACH-Raum.',
    'page.services.lead': 'Vier Leistungen, die aufeinander aufbauen. Sie können einzeln beauftragt werden — zusammen ergeben sie eine Website, die entworfen, gebaut, gefunden und gepflegt wird.',
    'page.services.combineTitle': 'Wie die vier zusammenspielen',
    'page.services.combineText': 'In den meisten Projekten laufen Design und Entwicklung als ein Auftrag, SEO als Grundsetup mit und Wartung ab dem Launch. Sie können aber auch nur eine Leistung buchen — etwa eine Analyse Ihrer bestehenden Seite oder die Übernahme der Wartung.',

    'page.work.metaTitle': 'Projekte & Case Studies | Surhay Design',
    'page.work.metaDesc': 'Ausgewählte Projekte mit Ausgangslage, Lösung und messbarem Ergebnis — Webdesign und Entwicklung für KMU, Selbstständige und Startups.',
    'page.work.lead': 'Jedes Projekt mit Ausgangslage, Entscheidung und messbarem Ergebnis — nicht als Bildergalerie, sondern als nachvollziehbarer Fall.',

    'page.process.metaTitle': 'Ablauf eines Projekts — vom Erstgespräch bis zum Betrieb | Surhay Design',
    'page.process.metaDesc': 'Wie ein Webprojekt bei uns abläuft: sechs Phasen mit Dauer, Ergebnissen und dem, was wir von Ihnen brauchen. Festpreis, klickbarer Entwurf, planbarer Launch.',
    'page.process.lead': 'Sechs Phasen, in jeder Phase drei Dinge: was wir tun, was Sie danach in der Hand haben und was wir dafür von Ihnen brauchen.',
    'page.process.work': 'Was passiert',
    'page.process.output': 'Was Sie bekommen',
    'page.process.yourPart': 'Was wir von Ihnen brauchen',
    'page.process.rulesTitle': 'Vier Regeln, die die Zusammenarbeit tragen',
    'page.process.rulesSub': 'Sie stehen hier, weil ein Projekt selten an der Technik scheitert — sondern an Erwartungen, über die vorher niemand gesprochen hat.',

    'page.pricing.metaTitle': 'Preise — Festpreise für Website, Wartung und Zusatzleistungen | Surhay Design',
    'page.pricing.metaDesc': 'Was eine Website bei uns kostet: Projektpakete ab 2.900 €, Wartung ab 49 €/Monat, Zusatzleistungen mit Preisen und die Faktoren, die den Preis bewegen.',
    'page.pricing.lead': 'Hier stehen Zahlen, damit Sie nicht erst ein Gespräch führen müssen, um zu erfahren, ob wir in Ihr Budget passen. Der Festpreis entsteht nach dem Erstgespräch.',
    'page.pricing.projectsTitle': 'Projektpakete',
    'page.pricing.careTitle': 'Wartung & Betreuung',
    'page.pricing.careSub': 'Monatlich kündbar, ohne Mindestlaufzeit. Kein Paket ist Voraussetzung für ein Projekt.',
    'page.pricing.addonsTitle': 'Zusatzleistungen',
    'page.pricing.addonsSub': 'Einzeln buchbar, auch ohne laufendes Projekt.',
    'page.pricing.factorsTitle': 'Was den Preis bewegt',
    'page.pricing.factorsSub': 'Fünf Faktoren entscheiden, ob ein Projekt am unteren oder oberen Rand der Spanne landet.',
    'page.pricing.includedTitle': 'In jedem Paket enthalten',
    'page.pricing.paymentTitle': 'Zahlung in drei Schritten',
    'page.pricing.fit': 'Passt für',

    'page.about.metaTitle': 'Agentur — wer hinter Surhay Design steckt | Webdesign Berlin',
    'page.about.metaDesc': 'Ein Studio für Webdesign und Entwicklung in Berlin: wie wir arbeiten, womit wir arbeiten, und was wir bewusst nicht machen.',
    'page.about.lead': 'Ein Studio in Berlin, eine Ansprechperson, kein Account-Management. Was das für Ihr Projekt praktisch bedeutet, steht hier.',
    'page.about.principlesTitle': 'Wie wir arbeiten',
    'page.about.stackTitle': 'Womit wir arbeiten',
    'page.about.stackSub': 'Offen benannt, damit Ihre IT weiß, worauf sie sich einlässt.',
    'page.about.noTitle': 'Was wir nicht machen',
    'page.about.noSub': 'Weil eine Absage im Erstgespräch billiger ist als ein Projekt, das niemandem passt.',

    'page.faq.metaTitle': 'Häufige Fragen zu Webdesign, Preisen und Ablauf | Surhay Design',
    'page.faq.metaDesc': 'Alle Fragen zu Kosten, Ablauf, Technik, Pflege, Relaunch und Recht — nach Themen sortiert und durchsuchbar.',
    'page.faq.lead': 'Alle Fragen aus Erstgesprächen, Angeboten und laufenden Projekten — nach Themen sortiert und durchsuchbar. Was hier fehlt, beantworten wir innerhalb von 24 Stunden.',
    'page.faq.searchLabel': 'Frage suchen',
    'page.faq.searchPlaceholder': 'Stichwort, z. B. Preis oder Hosting',
    'page.faq.topics': 'Themen',
    'page.faq.questionsWord': 'Fragen',
    'page.faq.empty': 'Zu diesem Stichwort steht hier nichts. Schreiben Sie uns die Frage direkt — Sie bekommen innerhalb von 24 Stunden eine Antwort.',
    'page.faq.stillOpen': 'Frage nicht dabei?',
    'page.faq.stillOpenSub': 'Schreiben Sie sie uns — Sie bekommen innerhalb von 24 Stunden eine Antwort, auch wenn sie „nein“ lautet.',

    'page.contact.metaTitle': 'Kontakt — Erstgespräch anfragen | Surhay Design Berlin',
    'page.contact.metaDesc':
      'Projektanfrage an Surhay Design: Formular in unter zwei Minuten, alternativ Termin oder Konfigurator. Antwort innerhalb von 24 Stunden — mit einer ehrlichen Einschätzung.',
    'page.contact.lead':
      'Erzählen Sie kurz, worum es geht. Das Formular ist in unter zwei Minuten ausgefüllt, und Sie bekommen innerhalb von 24 Stunden eine ehrliche Einschätzung.',
    /* Nebenwege in der Seitenspalte — fuer alle, die lieber sprechen oder
       ihren Umfang schon kennen. */
    'page.contact.expect': 'Was danach passiert',
    'page.contact.expect1': 'Antwort innerhalb von 24 Stunden — auch wenn sie „nein“ lautet.',
    'page.contact.expect2': 'Passt es, folgt ein kostenloses Gespräch von 30 bis 45 Minuten.',
    'page.contact.expect3': 'Danach ein schriftliches Angebot mit Festpreis, Umfang und Terminen.',

    'blog.filterAll': 'Alle Themen',
    'blog.empty': 'Zu diesem Thema gibt es noch keinen Beitrag.',
    'blog.latest': 'Neuester Beitrag',
    'blog.related': 'Weitere Beiträge',
    'blog.metaTitle': 'Blog — Praxiswissen zu Webdesign, Performance und SEO | Surhay Design',

    'footer.servicesCol': 'Leistungen',
    'footer.company': 'Studio',
    'footer.resources': 'Mehr',
    'footer.contactCol': 'Kontakt',

    'legal.imprint.title': 'Impressum',
    'legal.imprint.desc':
      'Impressum und Anbieterkennzeichnung nach § 5 DDG für Surhay Design — Anschrift, Kontakt und Verantwortlicher.',
    'legal.privacy.title': 'Datenschutzerklärung',
    'legal.privacy.desc':
      'Datenschutzerklärung von Surhay Design: welche Daten beim Besuch dieser Website verarbeitet werden, auf welcher Rechtsgrundlage und welche Rechte Sie haben.',
    'legal.cookies.title': 'Cookie-Einstellungen',
    'legal.cookies.desc':
      'Diese Website setzt keine Cookies und speichert nichts auf Ihrem Gerät. Was das technisch bedeutet und warum es deshalb kein Cookie-Banner gibt.',
    'legal.backHome': 'Zurück zur Startseite',
    'legal.updated': 'Stand',
    /* Hinweis auf die verbindliche Fassung — steht nur auf den
       uebersetzten Rechtstexten, nicht auf der deutschen. */
    'legal.binding.title': 'Verbindlich ist die deutsche Fassung',
    'legal.binding.text':
      'Diese Übersetzung dient allein der Verständlichkeit. Rechtlich verbindlich ist ausschließlich die deutsche Fassung; im Zweifelsfall gilt der deutsche Text.',
    'legal.binding.link': 'Zur deutschen Fassung',

    'service.allQuestions': 'Alle Fragen',
    'service.others': 'Weitere Leistungen',

    '404.title': 'Seite nicht gefunden',
    '404.text': 'Diese Seite existiert nicht (mehr). Aber die Startseite ist nur einen Klick entfernt.',
    '404.cta': 'Zur Startseite',
  },
  tr: {
    'meta.title': 'Surhay Design — satış getiren web siteleri | Web tasarım & geliştirme, Berlin',
    'meta.description':
      'KOBİ’ler, serbest çalışanlar ve girişimler için özel tasarlanmış, hızlı web siteleri. Berlin’den web tasarım, geliştirme ve bakım — ölçülebilir biçimde daha iyi.',

    'nav.services': 'Hizmetler',
    'nav.work': 'Projeler',
    'nav.process': 'Süreç',
    'nav.pricing': 'Fiyatlar',
    'nav.faq': 'SSS',
    'nav.blog': 'Blog',
    'nav.contact': 'İletişim',
    'nav.cta': 'Ön görüşme',
    'nav.menuOpen': 'Menüyü aç',
    'nav.menuClose': 'Menüyü kapat',
    'nav.home': 'Ana sayfaya git',
    'nav.langSwitch': 'Dil seçin',
    'nav.langCurrent': 'Geçerli dil',
    'nav.skip': 'İçeriğe geç',
    'nav.mainLabel': 'Ana gezinme',
    'nav.menuLabel': 'Menü',
    'nav.newTab': 'yeni sekmede açılır',
    'work.filterCount': '{n} proje gösteriliyor',
    'blog.filterCount': '{n} yazı gösteriliyor',

    'hero.eyebrow': 'Web tasarım · Geliştirme · Bakım — Berlin',
    'hero.pauseLabel': 'Değişen kelimeyi durdur',
    'hero.playLabel': 'Değişen kelimeyi sürdür',
    'hero.title.pre': 'Satış getiren',
    'hero.title.marked': 'web siteleri',
    'hero.title.built': 'şunlar için:',
    'hero.sub':
      'Özel tasarım, temiz kod, güvenilir bakım — Almanca konuşulan pazardaki KOBİ’ler, serbest çalışanlar ve girişimler için.',
    'hero.cta': 'Ücretsiz ön görüşme',
    'hero.ctaSecondary': 'Fiyatlara bakın',

    'trust.label': 'Bizden bekleyebilecekleriniz',
    'trust.1.title': '24 saat içinde yanıt',
    'trust.1.desc': 'Her talebe — hafta içi çoğu zaman çok daha hızlı.',
    'trust.2.title': 'Başlamadan önce sabit fiyat',
    'trust.2.desc': 'Ön görüşmeden sonra yazılı olarak sabitlenir. Ek fatura yok, saat çizelgesi yok.',
    'trust.3.title': 'Elle yazılmış kod',
    'trust.3.desc': 'Hazır kurgu yok, satın alınmış tema yok. Bir saniyenin altında yüklenme süresi.',
    'trust.4.title': 'Berlin merkezli, tüm bölgeye',
    'trust.4.desc': 'Almanca ve İngilizce uzaktan çalışma, Berlin’de yüz yüze görüşme.',

    'services.eyebrow': 'Hizmetler',
    'services.title': 'Üç iş. Hakkıyla.',
    'services.sub':
      'Her işi yapan bir ajans değiliz: Web sitenizi başarılı kılan şeye odaklanır ve onu en yüksek kalitede teslim ederiz.',
    'services.1.title': 'Web tasarım',
    'services.1.desc':
      'Özel, dönüşüme odaklı tasarım — şablon yok, hazır kurgu yok. Akılda kalan ve talep getiren bir görünüm.',
    'services.2.title': 'Web geliştirme',
    'services.2.desc':
      'Temiz ve hızlı uygulama: bir saniyenin altında yüklenme, üst sıralarda görünürlük ve kendiniz yönetebileceğiniz bir içerik sistemi.',
    'services.3.title': 'Bakım',
    'services.3.desc':
      'Güncellemeler, yedekler, izleme ve destek tek bir aylık pakette — siteniz güvenli, güncel ve hızlı kalır.',
    'services.3.badge': 'Aylık paketler',

    'work.eyebrow': 'Seçilmiş projeler',
    'work.title': 'Referans değil, sonuç.',
    'work.sub': 'Her proje ölçülebilir bir sonuçla — başlangıç durumundan rakama kadar.',
    'work.filter.all': 'Tümü',
    'work.viewCase': 'Vaka çalışmasını görün',
    'work.empty': 'Bu kategoride proje yok.',
    'work.back': 'Tüm projeler',
    'work.client': 'Müşteri',
    'work.industry': 'Sektör',
    'work.year': 'Yıl',
    'work.situation': 'Başlangıç durumu',
    'work.solution': 'Çözüm',
    'work.results': 'Sonuç',
    'work.nextCase': 'Sonraki vaka çalışması',
    'work.pending.title': 'Referansları ancak gerçek olduklarında gösteririz.',
    'work.pending.sub':
      'Bu stüdyo yeni başlıyor. Ödünç alınmış ekran görüntüleri ve uydurma yüzdeler yerine burada bugün doğrulayabileceğiniz şeyler var: sabit fiyatlar, net bir süreç — ve size uygun olmadığımızı da söylediğimiz bir ön görüşme.',
    'work.pending.cta': 'Maliyeti hesaplayın',
    'work.pending.ctaSecondary': 'Fiyatlara bakın',
    'work.pending.1.title': 'Bu web sitesi bizzat çalışma örneğidir',
    'work.pending.1.desc':
      'Tipografi, yüklenme süresi, erişilebilirlik, çok dillilik — buradaki her şey elle yapıldı. Lighthouse ile ölçün.',
    'work.pending.2.title': 'Koddan önce tıklanabilir taslak',
    'work.pending.2.desc':
      'Tek satır kod yazılmadan sitenizi kullanılabilir bir taslak olarak görürsünüz — ve tam o noktada vazgeçebilirsiniz.',
    'work.pending.3.title': 'Gerekirse dürüst bir “hayır”',
    'work.pending.3.desc':
      'Projeniz bize uymuyorsa bunu ön görüşmede söyleriz. Size 30 dakikadan başka hiçbir şeye mal olmaz.',

    'process.eyebrow': 'Süreç',
    'process.title': 'İlk görüşmeden yayına — dört adımda.',
    'process.sub': 'Şeffaf, planlanabilir ve ajans tiyatrosu olmadan. Projenizin nerede olduğunu her an bilirsiniz.',
    'process.1.title': 'Ön görüşme',
    'process.1.desc':
      'Hedeflerinizi, hedef kitlenizi ve bütçenizi konuşuruz. Ücretsiz, bağlayıcı değil — ve dürüst: uymuyorsak bunu size söyleriz.',
    'process.1.duration': '30–45 dk.',
    'process.2.title': 'Konsept & tasarım',
    'process.2.desc':
      'Yapı, içerik ve tasarım hedeflerinize göre şekillenir. Tek satır kod yazılmadan tıklanabilir bir taslak görür ve geri bildirim verirsiniz.',
    'process.2.duration': '1–2 hafta',
    'process.3.title': 'Geliştirme',
    'process.3.desc':
      'Onaylanan tasarım temiz ve hızlı biçimde hayata geçer. İçeriği sonradan kendiniz yönetebilmeniz için içerik sistemi dahil.',
    'process.3.duration': '2–4 hafta',
    'process.4.title': 'Yayın & bakım',
    'process.4.desc':
      'Tüm cihazlarda testlerden sonra siteniz yayına girer. İsterseniz güncellemeleri, güvenliği ve desteği biz üstleniriz — aylık iptal edilebilir.',
    'process.4.duration': 'süregelen',

    'pricing.eyebrow': 'Fiyatlar',
    'pricing.title': 'Net paketler. Sürpriz yok.',
    'pricing.sub':
      'Her proje kendine özgüdür — bu paketler size dürüst bir çerçeve verir. Sabit fiyatı ön görüşmeden sonra alırsınız.',
    'pricing.from': 'başlangıç',
    'pricing.popular': 'Popüler',
    'pricing.cta': 'Proje talebi gönderin',
    'pricing.p1.name': 'Starter',
    'pricing.p1.price': '2.900 €',
    'pricing.p1.desc': 'Profesyonel giriş: teklifinizi net biçimde anlatan güçlü bir tek sayfa.',
    'pricing.p1.features': 'Tek sayfa (6 bölüme kadar)|Özel tasarım|İletişim formu|Temel SEO kurulumu|3–4 haftada yayın',
    'pricing.p2.name': 'Business',
    'pricing.p2.price': '5.900 €',
    'pricing.p2.desc': 'Büyüyen şirketler için: içerik sistemi ve dönüşüm odağıyla çok sayfalı web sitesi.',
    'pricing.p2.features': '8 alt sayfaya kadar|Kendi yönetiminiz için içerik sistemi|Blog & vaka çalışmaları|İki dilli (DE/EN)|Performans garantisi 95+|5–7 haftada yayın',
    'pricing.p3.name': 'Özel',
    'pricing.p3.price': 'talep üzerine',
    'pricing.p3.desc': 'Karmaşık gereksinimler, entegrasyonlar veya e-ticaret mi? Uygun çözümü birlikte buluruz.',
    'pricing.p3.features': 'Özel kapsam|Arayüzler & entegrasyonlar|Atölye & strateji|Birebir danışmanlık',

    'faq.eyebrow': 'SSS',
    'faq.title': 'Sık sorulan sorular, dürüst yanıtlar.',
    'faq.allLink': 'Tüm soruları görün',

    'blog.eyebrow': 'Insights',
    'blog.readMore': 'Devamını okuyun',
    'blog.back': 'Tüm yazılar',
    'blog.minRead': 'dk. okuma',
    'blog.by': 'Yazan',
    'blog.indexTitle': 'Blog & Insights',
    'blog.indexDesc':
      'Web tasarım, performans ve online pazarlama üzerine uygulanabilir bilgi — KOBİ’ler, serbest çalışanlar ve girişimler için.',

    'studio.eyebrow': 'Stüdyo',
    'studio.title': 'Sitenizde kim çalışıyor.',
    'studio.sub':
      'Müşteri temsilcisi yok, değişen serbest çalışanlara devir yok: tasarlayan, geliştiren ve sonradan bakımını yapan kişiyle konuşursunuz. Kararlar bu yüzden haftalar değil saatler alır.',
    'studio.role': 'Web tasarım & geliştirme',
    'studio.photoAlt': 'Surhay Design marka işareti',
    'studio.1.title': 'Tek muhatap',
    'studio.1.desc': 'Ön görüşmeden yayın sonrasına kadar aynı kişi — devir kaybı olmadan.',
    'studio.2.title': 'Hazır kurgu değil, zanaat',
    'studio.2.desc': 'Yapı, tipografi, yüklenme süresi ve erişilebilirlik burada tek tek kararlaştırılır.',
    'studio.3.title': 'Yayından sonra da buradayız',
    'studio.3.desc': 'Güncellemeler, güvenlik ve destek tek bir aylık pakette — aylık iptal edilebilir.',
    'studio.cta': 'Ön görüşme ayarlayın',

    'insights.eyebrow': 'Insights',
    'insights.title': 'Bizsiz de uygulayabileceğiniz bilgiler.',
    'insights.all': 'Tüm yazılar',

    'contact.eyebrow': 'İletişim',
    'contact.title': 'Projenizi konuşalım.',
    'contact.sub':
      'Kısaca neyle ilgili olduğunu anlatın — 24 saat içinde dürüst bir değerlendirme alırsınız. Ya da hayalinizdeki siteyi doğrudan yapılandırıcıda oluşturun.',
    'contact.name': 'Ad Soyad',
    'contact.email': 'E-posta',
    'contact.message': 'Projeniz 2–3 cümleyle',
    'contact.submit': 'Talebi gönder',
    'contact.or': 'veya',
    'contact.configurator': 'Yapılandırıcıya git',
    'contact.privacyNote': 'Göndererek verilerinizin işlenmesini kabul etmiş olursunuz — ayrıntılar',
    'contact.privacyLink': 'gizlilik metnimizde',
    'contact.success': 'Teşekkürler! Mesajınız bize ulaştı — 24 saat içinde sizden haber alacaksınız.',
    'contact.error': 'Maalesef bu işe yaramadı. Bize doğrudan şuradan yazın:',
    'contact.direct': 'Doğrudan',
    'contact.route1.step': '1. yol',
    'contact.route1.title': 'Kısaca yazın',
    'contact.route1.desc':
      'Projeyle ilgili iki üç cümle yeter. 24 saat içinde dürüst bir değerlendirme alırsınız — kaba bir fiyat aralığıyla birlikte.',
    'contact.route1.subject': 'surhay.design üzerinden proje talebi',
    'contact.route1.cta': 'E-posta yazın',
    'contact.route2.step': '2. yol',
    'contact.route2.title': 'Doğrudan randevu alın',
    'contact.route2.desc':
      '30–45 dakika, ücretsiz ve bağlayıcı değil. Ya da önce yapılandırıcıda neye ihtiyacınız olduğunu belirleyin.',
    'contact.route2.cta': 'Saat seçin',

    'footer.tagline': 'Satış getiren web siteleri — Berlin’den.',
    'footer.nav': 'Gezinme',
    'footer.legal': 'Hukuki',
    'footer.social': 'Sosyal',
    'footer.imprint': 'Künye',
    'footer.privacy': 'Gizlilik',
    'footer.cookies': 'Çerez ayarları',
    'footer.rights': 'Tüm hakları saklıdır.',
    'footer.madeIn': 'Berlin’de tasarlandı ve geliştirildi',

    /* ------------------------------------------------------- Multipage */
    'nav.about': 'Stüdyo',
    'nav.allServices': 'Tüm hizmetler',
    'nav.servicesHint': 'Birbirini tamamlayan dört hizmet — yapıdan işletmeye kadar.',
    'nav.more': 'Daha fazla',

    'breadcrumb.home': 'Başlangıç',
    'breadcrumb.label': 'Buradasınız',

    'common.readMore': 'Daha fazla bilgi',
    'common.overview': 'Genel bakışa dön',
    'common.included': 'Dahil',
    'common.from': 'başlangıç',
    'common.perMonth': 'aylık',
    'common.netHint': 'Tüm fiyatlar net, yasal KDV hariçtir.',
    'common.country': 'Almanya',

    'cta.title': 'Projenizi konuşalım.',
    'cta.sub': 'Ön görüşme 30–45 dakika sürer, hiçbir ücreti yoktur ve ya bir teklifle ya da başka nereye gitmeniz gerektiğine dair dürüst bir tavsiyeyle biter.',
    'cta.primary': 'Ön görüşme talep edin',
    'cta.secondary': 'Maliyeti kendiniz hesaplayın',

    'ctaForm.eyebrow': 'Talep',
    'ctaForm.title': 'İşe yarayan bir web sitesine hazır mısınız?',
    'ctaForm.sub': 'Kısaca neyle ilgili olduğunu yazın — 24 saat içinde yanıt.',
    'ctaForm.direct': 'Doğrudan yazmayı mı tercih edersiniz?',

    'page.services.title': 'Hizmetler',
    'page.services.metaTitle': 'Hizmetler — web tasarım, geliştirme, SEO ve bakım | Surhay Design',
    'page.services.metaDesc': 'Tek elden dört hizmet: özel web tasarım, temiz geliştirme, teknik SEO ve sürekli bakım. Almanca konuşulan pazardaki KOBİ’ler, serbest çalışanlar ve girişimler için.',
    'page.services.lead': 'Birbirini tamamlayan dört hizmet. Tek tek de sipariş edilebilirler — birlikte ise tasarlanan, inşa edilen, bulunan ve bakımı yapılan bir web sitesi çıkar.',
    'page.services.combineTitle': 'Dördü nasıl birlikte çalışır',
    'page.services.combineText': 'Çoğu projede tasarım ve geliştirme tek bir iş olarak yürür, SEO temel kurulum olarak eşlik eder, bakım da yayınla başlar. Yalnızca tek bir hizmet de alabilirsiniz — örneğin mevcut sitenizin analizi ya da bakımın devralınması.',

    'page.work.metaTitle': 'Projeler & vaka çalışmaları | Surhay Design',
    'page.work.metaDesc': 'Başlangıç durumu, çözüm ve ölçülebilir sonuçla seçilmiş projeler — KOBİ’ler, serbest çalışanlar ve girişimler için web tasarım ve geliştirme.',
    'page.work.lead': 'Her proje başlangıç durumu, alınan kararlar ve ölçülebilir sonucuyla — bir resim galerisi olarak değil, izlenebilir bir vaka olarak.',

    'page.process.metaTitle': 'Bir proje nasıl ilerler — ön görüşmeden işletmeye | Surhay Design',
    'page.process.metaDesc': 'Bir web projesi bizde nasıl ilerler: süresi, çıktıları ve sizden beklediklerimizle altı aşama. Sabit fiyat, tıklanabilir taslak, planlanabilir yayın.',
    'page.process.lead': 'Altı aşama, her aşamada üç şey: ne yaptığımız, sonunda elinizde ne olduğu ve bunun için sizden neye ihtiyacımız olduğu.',
    'page.process.work': 'Ne oluyor',
    'page.process.output': 'Ne alıyorsunuz',
    'page.process.yourPart': 'Sizden ne gerekiyor',
    'page.process.rulesTitle': 'İş birliğini taşıyan dört kural',
    'page.process.rulesSub': 'Buradalar, çünkü bir proje nadiren teknikte tökezler — çoğunlukla önceden konuşulmamış beklentilerde tökezler.',

    'page.pricing.metaTitle': 'Fiyatlar — web sitesi, bakım ve ek hizmetler için sabit fiyatlar | Surhay Design',
    'page.pricing.metaDesc': 'Bizde bir web sitesinin maliyeti: 2.900 €’dan başlayan proje paketleri, aylık 49 €’dan başlayan bakım, fiyatlı ek hizmetler ve fiyatı hareket ettiren etkenler.',
    'page.pricing.lead': 'Buradaki rakamlar, bütçenize uyup uymadığımızı öğrenmek için önce görüşme yapmak zorunda kalmayın diyedir. Sabit fiyat ön görüşmeden sonra oluşur.',
    'page.pricing.projectsTitle': 'Proje paketleri',
    'page.pricing.careTitle': 'Bakım & destek',
    'page.pricing.careSub': 'Aylık iptal edilebilir, asgari süre yok. Hiçbir paket proje için ön koşul değildir.',
    'page.pricing.addonsTitle': 'Ek hizmetler',
    'page.pricing.addonsSub': 'Devam eden bir proje olmadan da tek tek alınabilir.',
    'page.pricing.factorsTitle': 'Fiyatı ne hareket ettirir',
    'page.pricing.factorsSub': 'Beş etken, projenin aralığın alt ucunda mı üst ucunda mı biteceğini belirler.',
    'page.pricing.includedTitle': 'Her pakete dahil',
    'page.pricing.paymentTitle': 'Üç adımda ödeme',
    'page.pricing.fit': 'Şunlara uygun',

    'page.about.metaTitle': 'Stüdyo — Surhay Design’ın arkasında kim var | Web tasarım Berlin',
    'page.about.metaDesc': 'Berlin’de bir web tasarım ve geliştirme stüdyosu: nasıl çalışıyoruz, neyle çalışıyoruz ve bilerek neyi yapmıyoruz.',
    'page.about.lead': 'Berlin’de bir stüdyo, tek muhatap, müşteri temsilcisi yok. Bunun projeniz için pratikte ne anlama geldiği burada yazıyor.',
    'page.about.principlesTitle': 'Nasıl çalışıyoruz',
    'page.about.stackTitle': 'Neyle çalışıyoruz',
    'page.about.stackSub': 'Açıkça adlandırıldı, böylece BT ekibiniz neyle karşılaşacağını bilir.',
    'page.about.noTitle': 'Neyi yapmıyoruz',
    'page.about.noSub': 'Çünkü ön görüşmedeki bir “hayır”, kimseye uymayan bir projeden daha ucuzdur.',

    'page.faq.metaTitle': 'Web tasarım, fiyat ve süreç hakkında sık sorulan sorular | Surhay Design',
    'page.faq.metaDesc': 'Maliyet, süreç, teknik, bakım, yenileme ve hukuk hakkındaki tüm sorular — konuya göre sıralanmış ve aranabilir.',
    'page.faq.lead': 'Ön görüşmelerden, tekliflerden ve devam eden projelerden gelen tüm sorular — konuya göre sıralanmış ve aranabilir. Burada eksik olanı 24 saat içinde yanıtlarız.',
    'page.faq.searchLabel': 'Soru arayın',
    'page.faq.searchPlaceholder': 'Anahtar kelime, örn. fiyat veya hosting',
    'page.faq.topics': 'Konular',
    'page.faq.questionsWord': 'soru',
    'page.faq.empty': 'Bu anahtar kelimeyle burada bir şey yok. Soruyu bize doğrudan yazın — 24 saat içinde yanıt alırsınız.',
    'page.faq.stillOpen': 'Sorunuz burada yok mu?',
    'page.faq.stillOpenSub': 'Bize yazın — yanıt “hayır” olsa bile 24 saat içinde yanıt alırsınız.',

    'page.contact.metaTitle': 'İletişim — ön görüşme talep edin | Surhay Design Berlin',
    'page.contact.metaDesc':
      'Surhay Design’a proje talebi: form iki dakikadan kısa sürer, alternatif olarak randevu ya da yapılandırıcı. 24 saat içinde yanıt — dürüst bir değerlendirmeyle.',
    'page.contact.lead':
      'Kısaca neyle ilgili olduğunu anlatın. Form iki dakikadan kısa sürer ve 24 saat içinde dürüst bir değerlendirme alırsınız.',
    'page.contact.expect': 'Sonrasında ne oluyor',
    'page.contact.expect1': '24 saat içinde yanıt — „hayır“ olsa bile.',
    'page.contact.expect2': 'Uyuyorsa 30–45 dakikalık ücretsiz bir görüşme gelir.',
    'page.contact.expect3': 'Ardından sabit fiyat, kapsam ve tarihleri içeren yazılı bir teklif.',

    'blog.filterAll': 'Tüm konular',
    'blog.empty': 'Bu konuda henüz yazı yok.',
    'blog.latest': 'En yeni yazı',
    'blog.related': 'Diğer yazılar',
    'blog.metaTitle': 'Blog — web tasarım, performans ve SEO üzerine uygulanabilir bilgi | Surhay Design',

    'footer.servicesCol': 'Hizmetler',
    'footer.company': 'Stüdyo',
    'footer.resources': 'Daha fazla',
    'footer.contactCol': 'İletişim',

    'legal.imprint.title': 'Künye',
    'legal.imprint.desc':
      'Surhay Design için § 5 DDG uyarınca künye ve sağlayıcı bilgileri — adres, iletişim ve sorumlu kişi.',
    'legal.privacy.title': 'Gizlilik metni',
    'legal.privacy.desc':
      'Surhay Design gizlilik metni: bu siteyi ziyaret ettiğinizde hangi veriler hangi hukuki dayanakla işlenir ve hangi haklara sahipsiniz.',
    'legal.cookies.title': 'Çerez ayarları',
    'legal.cookies.desc':
      'Bu web sitesi çerez yerleştirmez ve cihazınızda hiçbir şey saklamaz. Bunun teknik olarak ne anlama geldiği ve neden çerez bandı bulunmadığı.',
    'legal.backHome': 'Ana sayfaya dön',
    'legal.updated': 'Güncelleme',
    'legal.binding.title': 'Bağlayıcı metin Almancadır',
    'legal.binding.text':
      'Bu çeviri yalnızca kolaylık sağlamak içindir. Hukuki olarak yalnızca Almanca sürüm geçerlidir; tereddüt hâlinde Almanca metin esas alınır.',
    'legal.binding.link': 'Almanca sürüme gidin',

    'service.allQuestions': 'Tüm sorular',
    'service.others': 'Diğer hizmetler',

    '404.title': 'Sayfa bulunamadı',
    '404.text': 'Bu sayfa (artık) yok. Ama ana sayfa yalnızca bir tık uzakta.',
    '404.cta': 'Ana sayfaya git',
  },
  en: {
    'meta.title': 'Surhay Design — Websites that sell | Web design & development Berlin',
    'meta.description':
      'Custom, high-performance websites for SMEs, freelancers and startups in the DACH region. Web design, development and maintenance from Berlin — measurably better.',

    'nav.services': 'Services',
    'nav.work': 'Work',
    'nav.process': 'Process',
    'nav.pricing': 'Pricing',
    'nav.faq': 'FAQ',
    'nav.blog': 'Blog',
    'nav.contact': 'Contact',
    'nav.cta': 'Free consultation',
    'nav.menuOpen': 'Open menu',
    'nav.menuClose': 'Close menu',
    'nav.home': 'Back to homepage',
    'nav.langSwitch': 'Choose language',
    'nav.langCurrent': 'Current language',
    'nav.skip': 'Skip to content',
    'nav.mainLabel': 'Main navigation',
    'nav.menuLabel': 'Menu',
    'nav.newTab': 'opens in a new tab',
    'work.filterCount': '{n} projects shown',
    'blog.filterCount': '{n} articles shown',

    'hero.eyebrow': 'Web design · Development · Maintenance — Berlin',
    'hero.pauseLabel': 'Pause the rotating word',
    'hero.playLabel': 'Resume the rotating word',
    'hero.title.pre': 'Websites that',
    'hero.title.marked': 'sell',
    'hero.title.built': 'built for',
    'hero.sub':
      'Custom design, clean development, reliable maintenance — for SMEs, freelancers and startups across the DACH region.',
    'hero.cta': 'Free consultation',
    'hero.ctaSecondary': 'View pricing',

    'trust.label': 'What to expect',
    'trust.1.title': 'Reply within 24 hours',
    'trust.1.desc': 'To every enquiry — usually much faster on working days.',
    'trust.2.title': 'Fixed price before we start',
    'trust.2.desc': 'Agreed in writing after the first call. No top-ups, no timesheets.',
    'trust.3.title': 'Hand-written code',
    'trust.3.desc': 'No site builder, no bought theme. Sub-second load times.',
    'trust.4.title': 'Berlin, serving DACH',
    'trust.4.desc': 'Remote collaboration in German and English, on-site meetings in Berlin.',

    'services.eyebrow': 'Services',
    'services.title': 'Three things. Done right.',
    'services.sub':
      'No jack-of-all-trades agency: we focus on what makes your website successful — and deliver it at the highest quality.',
    'services.1.title': 'Web Design',
    'services.1.desc':
      'Custom, conversion-driven design — no templates, no site builders. A presence people remember, built to generate inquiries.',
    'services.2.title': 'Web Development',
    'services.2.desc':
      'Clean, high-performance builds: sub-second load times, top rankings and a CMS you can maintain yourself.',
    'services.3.title': 'Maintenance',
    'services.3.desc':
      'Updates, backups, monitoring and support in one monthly plan — your website stays secure, current and fast.',
    'services.3.badge': 'Monthly plans',

    'work.eyebrow': 'Selected work',
    'work.title': 'Results, not references.',
    'work.sub': 'Every project with a measurable outcome — from starting point to KPI.',
    'work.filter.all': 'All',
    'work.viewCase': 'View case study',
    'work.empty': 'No projects in this category.',
    'work.back': 'All projects',
    'work.client': 'Client',
    'work.industry': 'Industry',
    'work.year': 'Year',
    'work.situation': 'Starting point',
    'work.solution': 'Solution',
    'work.results': 'Results',
    'work.nextCase': 'Next case study',
    'work.pending.title': 'We show case studies once they are real.',
    'work.pending.sub':
      'This studio is starting out. Instead of borrowed screenshots and invented percentages, you get what can be verified today: fixed prices, a clear process — and a first call in which we will also tell you if we are not the right fit.',
    'work.pending.cta': 'Estimate the cost',
    'work.pending.ctaSecondary': 'View pricing',
    'work.pending.1.title': 'This website is the work sample',
    'work.pending.1.desc':
      'Typography, load time, accessibility, bilingual setup — all of it hand-built. Run Lighthouse on it.',
    'work.pending.2.title': 'A clickable draft before any code',
    'work.pending.2.desc':
      'You see your website as a working draft before a single line of code exists — and can still turn it down at that point.',
    'work.pending.3.title': 'An honest no, if it comes to that',
    'work.pending.3.desc':
      'If your project is not a fit, we say so in the first call. It costs you nothing but 30 minutes.',

    'process.eyebrow': 'Process',
    'process.title': 'From first call to launch — in four steps.',
    'process.sub': 'Transparent, predictable and free of agency theatrics. You always know where your project stands.',
    'process.1.title': 'Consultation',
    'process.1.desc':
      'We talk about your goals, audience and budget. Free, no strings attached — and honest: if we are not the right fit, we will tell you.',
    'process.1.duration': '30–45 min',
    'process.2.title': 'Concept & Design',
    'process.2.desc':
      'Structure, content and design take shape based on your goals. You see a clickable draft early and give feedback before a single line of code is written.',
    'process.2.duration': '1–2 weeks',
    'process.3.title': 'Development',
    'process.3.desc':
      'The approved design is built cleanly and fast. Including a CMS, so you can maintain content yourself later on.',
    'process.3.duration': '2–4 weeks',
    'process.4.title': 'Launch & Maintenance',
    'process.4.desc':
      'After testing on all devices, your website goes live. If you like, we handle updates, security and support afterwards — cancel monthly.',
    'process.4.duration': 'ongoing',

    'pricing.eyebrow': 'Pricing',
    'pricing.title': 'Clear packages. No surprises.',
    'pricing.sub':
      'Every project is unique — these packages give you an honest frame. You receive a fixed quote after the initial consultation.',
    'pricing.from': 'from',
    'pricing.popular': 'Popular',
    'pricing.cta': 'Request project',
    'pricing.p1.name': 'Starter',
    'pricing.p1.price': '€2,900',
    'pricing.p1.desc': 'The professional entry point: a strong one-pager that gets your offer across.',
    'pricing.p1.features': 'One-pager (up to 6 sections)|Custom design|Contact form|SEO base setup|Launch in 3–4 weeks',
    'pricing.p2.name': 'Business',
    'pricing.p2.price': '€5,900',
    'pricing.p2.desc': 'For growing companies: a multi-page website with CMS and conversion focus.',
    'pricing.p2.features': 'Up to 8 subpages|CMS for self-service editing|Blog & case studies|Bilingual (DE/EN)|Performance guarantee 95+|Launch in 5–7 weeks',
    'pricing.p3.name': 'Custom',
    'pricing.p3.price': 'on request',
    'pricing.p3.desc': 'Complex requirements, integrations or e-commerce? We will find the right solution.',
    'pricing.p3.features': 'Custom scope|APIs & integrations|Workshops & strategy|Personal consulting',

    'faq.eyebrow': 'FAQ',
    'faq.title': 'Common questions, honest answers.',
    'faq.allLink': 'See all questions',

    'blog.eyebrow': 'Insights',
    'blog.readMore': 'Read more',
    'blog.back': 'All articles',
    'blog.minRead': 'min read',
    'blog.by': 'By',
    'blog.indexTitle': 'Blog & Insights',
    'blog.indexDesc':
      'Practical knowledge on web design, performance and online marketing — directly applicable for SMEs, freelancers and startups.',

    'studio.eyebrow': 'Studio',
    'studio.title': 'Who actually builds your website.',
    'studio.sub':
      'No account management, no handing off to rotating freelancers: you talk to the person who designs, develops and later maintains it. That is why decisions here take hours instead of weeks.',
    'studio.role': 'Web design & development',
    'studio.photoAlt': 'Surhay Design brand mark',
    'studio.1.title': 'One point of contact',
    'studio.1.desc': 'The same one from the first call until after launch — nothing lost in handover.',
    'studio.2.title': 'Craft, not a site builder',
    'studio.2.desc': 'Structure, typography, load time and accessibility are each decided deliberately.',
    'studio.3.title': 'Still here after launch',
    'studio.3.desc': 'Updates, security and support in one monthly plan — cancel monthly.',
    'studio.cta': 'Book a first call',

    'insights.eyebrow': 'Insights',
    'insights.title': 'Knowledge you can apply without hiring us.',
    'insights.all': 'All articles',

    'contact.eyebrow': 'Contact',
    'contact.title': 'Let’s talk about your project.',
    'contact.sub':
      'Tell us briefly what it is about — you will get an honest assessment within 24 hours. Or configure your ideal website right away.',
    'contact.name': 'Name',
    'contact.email': 'Email',
    'contact.message': 'Your project in 2–3 sentences',
    'contact.submit': 'Send inquiry',
    'contact.or': 'or',
    'contact.configurator': 'To the configurator',
    'contact.privacyNote': 'By submitting, you agree to the processing of your data — details in our',
    'contact.privacyLink': 'privacy policy',
    'contact.success': 'Thank you! Your message has arrived — you will hear from us within 24 hours.',
    'contact.error': 'That did not work, unfortunately. Email us directly at',
    'contact.direct': 'Direct',
    'contact.route1.step': 'Option 1',
    'contact.route1.title': 'Send a short message',
    'contact.route1.desc':
      'Two or three sentences about the project are enough. You get an honest assessment within 24 hours — including a rough price range.',
    'contact.route1.subject': 'Project enquiry via surhay.design',
    'contact.route1.cta': 'Write an email',
    'contact.route2.step': 'Option 2',
    'contact.route2.title': 'Book a slot directly',
    'contact.route2.desc':
      '30 to 45 minutes, free and without obligation. Or put together what you need in the configurator first.',
    'contact.route2.cta': 'Pick a time',

    'footer.tagline': 'Websites that sell — from Berlin.',
    'footer.nav': 'Navigation',
    'footer.legal': 'Legal',
    'footer.social': 'Social',
    'footer.imprint': 'Imprint',
    'footer.privacy': 'Privacy',
    'footer.cookies': 'Cookie settings',
    'footer.rights': 'All rights reserved.',
    'footer.madeIn': 'Designed & built in Berlin',

    /* ------------------------------------------------------- Multipage */
    'nav.about': 'Studio',
    'nav.allServices': 'All services',
    'nav.servicesHint': 'Four services that build on each other — from structure to ongoing operation.',
    'nav.more': 'More',

    'breadcrumb.home': 'Home',
    'breadcrumb.label': 'You are here',

    'common.readMore': 'Learn more',
    'common.overview': 'Back to overview',
    'common.included': 'Included',
    'common.from': 'from',
    'common.perMonth': 'per month',
    'common.netHint': 'All prices net, plus VAT where applicable.',
    'common.country': 'Germany',

    'cta.title': 'Let us talk about your project.',
    'cta.sub': 'A first call takes 30 to 45 minutes, costs nothing, and ends either with a proposal or with an honest recommendation of where else to go.',
    'cta.primary': 'Request a first call',
    'cta.secondary': 'Estimate the cost yourself',

    'ctaForm.eyebrow': 'Enquiry',
    'ctaForm.title': 'Ready for a website that pulls its weight?',
    'ctaForm.sub': 'Tell us briefly what this is about — a reply within 24 hours.',
    'ctaForm.direct': 'Prefer to write directly?',

    'page.services.title': 'Services',
    'page.services.metaTitle': 'Services — web design, development, SEO and care | Surhay Design',
    'page.services.metaDesc': 'Four services from one studio: custom web design, clean development, technical SEO and ongoing care. For SMEs, freelancers and startups across the DACH region.',
    'page.services.lead': 'Four services that build on each other. Each can be commissioned on its own — together they make a website that is designed, built, found and maintained.',
    'page.services.combineTitle': 'How the four fit together',
    'page.services.combineText': 'In most projects design and development run as one commission, SEO comes along as a base setup, and care starts at launch. You can also book a single service — an audit of your existing site, for instance, or taking over maintenance.',

    'page.work.metaTitle': 'Work & case studies | Surhay Design',
    'page.work.metaDesc': 'Selected projects with starting point, solution and measurable outcome — web design and development for SMEs, freelancers and startups.',
    'page.work.lead': 'Every project with its starting point, the decisions made and a measurable outcome — not a picture gallery, but a case you can follow.',

    'page.process.metaTitle': 'How a project runs — from first call to operation | Surhay Design',
    'page.process.metaDesc': 'How a web project runs with us: six phases with duration, deliverables and what we need from you. Fixed price, clickable draft, a launch you can plan around.',
    'page.process.lead': 'Six phases, and three things in each: what we do, what you hold afterwards, and what we need from you to get there.',
    'page.process.work': 'What happens',
    'page.process.output': 'What you get',
    'page.process.yourPart': 'What we need from you',
    'page.process.rulesTitle': 'Four rules that carry the collaboration',
    'page.process.rulesSub': 'They are here because projects rarely fail on technology — they fail on expectations nobody talked about beforehand.',

    'page.pricing.metaTitle': 'Pricing — fixed prices for websites, care and add-ons | Surhay Design',
    'page.pricing.metaDesc': 'What a website costs with us: project packages from €2,900, care from €49/month, add-ons with prices, and the factors that move the price.',
    'page.pricing.lead': 'Numbers are here so you do not have to book a call just to find out whether we fit your budget. The fixed price follows the first conversation.',
    'page.pricing.projectsTitle': 'Project packages',
    'page.pricing.careTitle': 'Care & support',
    'page.pricing.careSub': 'Cancel monthly, no minimum term. No plan is a precondition for a project.',
    'page.pricing.addonsTitle': 'Add-ons',
    'page.pricing.addonsSub': 'Bookable individually, even without a running project.',
    'page.pricing.factorsTitle': 'What moves the price',
    'page.pricing.factorsSub': 'Five factors decide whether a project lands at the lower or upper end of the range.',
    'page.pricing.includedTitle': 'Included in every package',
    'page.pricing.paymentTitle': 'Payment in three steps',
    'page.pricing.fit': 'Fits',

    'page.about.metaTitle': 'Studio — who is behind Surhay Design | Web design Berlin',
    'page.about.metaDesc': 'A web design and development studio in Berlin: how we work, what we work with, and what we deliberately do not do.',
    'page.about.lead': 'One studio in Berlin, one contact, no account management. What that means for your project in practice is set out here.',
    'page.about.principlesTitle': 'How we work',
    'page.about.stackTitle': 'What we work with',
    'page.about.stackSub': 'Named openly, so your IT team knows what it is dealing with.',
    'page.about.noTitle': 'What we do not do',
    'page.about.noSub': 'Because a no in the first call is cheaper than a project that suits nobody.',

    'page.faq.metaTitle': 'Frequently asked questions on web design, pricing and process | Surhay Design',
    'page.faq.metaDesc': 'Every question on cost, process, technology, maintenance, relaunch and legal duties — sorted by topic and searchable.',
    'page.faq.lead': 'Every question from first calls, quotes and running projects — sorted by topic and searchable. Anything missing gets an answer within 24 hours.',
    'page.faq.searchLabel': 'Search the questions',
    'page.faq.searchPlaceholder': 'Keyword, e.g. price or hosting',
    'page.faq.topics': 'Topics',
    'page.faq.questionsWord': 'questions',
    'page.faq.empty': 'Nothing here matches that keyword. Send us the question directly — you get an answer within 24 hours.',
    'page.faq.stillOpen': 'Question not covered?',
    'page.faq.stillOpenSub': 'Send it over — you get an answer within 24 hours, even when the answer is no.',

    'page.contact.metaTitle': 'Contact — request a first call | Surhay Design Berlin',
    'page.contact.metaDesc':
      'Send a project enquiry to Surhay Design: the form takes under two minutes, or book a slot or use the configurator. Reply within 24 hours — with an honest assessment.',
    'page.contact.lead':
      'Tell us briefly what this is about. The form takes under two minutes, and you get an honest assessment within 24 hours.',
    'page.contact.expect': 'What happens next',
    'page.contact.expect1': 'A reply within 24 hours — even when it is a no.',
    'page.contact.expect2': 'If it fits, a free call of 30 to 45 minutes follows.',
    'page.contact.expect3': 'Then a written proposal with fixed price, scope and dates.',

    'blog.filterAll': 'All topics',
    'blog.empty': 'No article on this topic yet.',
    'blog.latest': 'Latest article',
    'blog.related': 'More articles',
    'blog.metaTitle': 'Blog — practical knowledge on web design, performance and SEO | Surhay Design',

    'footer.servicesCol': 'Services',
    'footer.company': 'Studio',
    'footer.resources': 'More',
    'footer.contactCol': 'Contact',

    'legal.imprint.title': 'Imprint',
    'legal.imprint.desc':
      'Imprint and provider identification pursuant to § 5 DDG for Surhay Design — address, contact and responsible person.',
    'legal.privacy.title': 'Privacy Policy',
    'legal.privacy.desc':
      'Privacy policy of Surhay Design: which data is processed when you visit this website, on what legal basis, and what rights you have.',
    'legal.cookies.title': 'Cookie settings',
    'legal.cookies.desc':
      'This website sets no cookies and stores nothing on your device. What that means technically, and why there is no cookie banner.',
    'legal.backHome': 'Back to homepage',
    'legal.updated': 'Last updated',
    'legal.binding.title': 'The German version is the binding one',
    'legal.binding.text':
      'This translation is provided for convenience only. Legally binding is exclusively the German version; in case of doubt, the German text applies.',
    'legal.binding.link': 'Go to the German version',

    'service.allQuestions': 'All questions',
    'service.others': 'Other services',

    '404.title': 'Page not found',
    '404.text': 'This page does not exist (anymore). But the homepage is just one click away.',
    '404.cta': 'Go to homepage',
  },
} as const;

/** Schlüssel der Referenzsprache — Grundlage der Übersetzungsfunktion. */
export type UiKey = keyof (typeof ui)['de'];

/**
 * Vollständigkeitsprüfung zur Bauzeit: Fehlt in `tr` oder `en` ein Schlüssel,
 * schlägt hier die Zuweisung fehl und der Build bricht ab — statt die Lücke
 * erst auf der Seite sichtbar werden zu lassen.
 */
const _vollstaendig: Record<Lang, Record<UiKey, string>> = ui;
void _vollstaendig;
