import type { Lang } from '../i18n/ui';

/**
 * Kennzahlen-Sektionen fuer "SEO & Performance" und "Wartung".
 *
 * WARUM HIER KEINE LOGOS STEHEN
 * Auf diesen beiden Leistungen ist die Werkzeugfrage nicht die Frage des
 * Kunden. Wer Sichtbarkeit kauft, will Zielwerte sehen; wer Betreuung kauft,
 * will den Umfang schwarz auf weiss. Beide Sektionen tragen deshalb dieselbe
 * Kartenoptik wie die Technologie-Sektion, aber Zahlen statt Marken.
 *
 * VERBINDLICHKEIT
 * Was hier steht, ist gegenueber Kunden eine Zusage. Die Werte der
 * Wartungs-Sektion sind bewusst aus `data/pricing.ts` uebernommen, damit
 * Leistungsseite und Preisseite nicht auseinanderlaufen:
 *   30 Tage Backup, Antwort in 1 Werktag, 2 Stunden Inhaltspflege im Paket
 *   Pflege, Quartalsbericht — alles bereits dort zugesagt.
 * Neu hinzugekommen und vor der Veroeffentlichung zu pruefen sind nur der
 * Update-Rhythmus (12 Laeufe im Jahr) und der Pruefabstand der
 * Verfuegbarkeitspruefung (im Minutentakt).
 *
 * Die drei Ladezeit-Werte der SEO-Sektion (2,5 s LCP, 200 ms INP, 0,1 CLS)
 * sind die oeffentlich dokumentierten "gut"-Schwellen der Core Web Vitals,
 * keine eigene Erfindung.
 */

export interface Fact {
  /** Grosse Zahl. Steht mit `unit` in EINEM Textknoten — siehe FactsGrid. */
  value: string;
  /** Einheit oder Bezugsgroesse, direkt hinter der Zahl gelesen. */
  unit: string;
  title: string;
  text: string;
}

export interface FactSet {
  eyebrow: string;
  title: string;
  lead: string;
  facts: Fact[];
}

export const factSets: Record<'seo' | 'care', Record<Lang, FactSet>> = {
  seo: {
    de: {
      eyebrow: 'Zielwerte',
      title: 'Woran Sie uns messen können',
      lead: 'Diese Werte stehen vor dem Projekt fest und werden nach dem Launch nachgemessen. Sie bekommen die Messung selbst, nicht die Zusammenfassung einer Messung.',
      facts: [
        {
          value: '2,5',
          unit: 'Sekunden',
          title: 'Ladezeit bis zum Hauptinhalt',
          text: 'Der größte sichtbare Bereich Ihrer Seite steht spätestens nach 2,5 Sekunden. Das ist die Schwelle, ab der Google eine Seite als schnell einstuft — gemessen im Mobilfunknetz, nicht im Büro-WLAN.',
        },
        {
          value: '200',
          unit: 'Millisekunden',
          title: 'Reaktion auf Klicks',
          text: 'So lange darf es höchstens dauern, bis die Seite sichtbar auf eine Eingabe antwortet. Darüber fühlt sich eine Website zäh an, auch wenn sie schnell geladen hat.',
        },
        {
          value: '90',
          unit: 'Punkte und mehr',
          title: 'Lighthouse, mobil gemessen',
          text: 'In allen vier Kategorien: Performance, Barrierefreiheit, Best Practices und SEO. Den vollständigen Bericht bekommen Sie vor der Abnahme, ungekürzt.',
        },
        {
          value: '100',
          unit: 'Prozent der Seiten',
          title: 'Technisch vollständig',
          text: 'Keine Unterseite ohne eigenen Titel, eigene Beschreibung, saubere Überschriftenfolge und Eintrag in der Sitemap. Geprüft wird die ganze Website, nicht die Startseite.',
        },
        {
          value: '3',
          unit: 'Verzeichnisse',
          title: 'Vor Ort auffindbar',
          text: 'Google-Unternehmensprofil, Apple Business Connect und Bing Places — überall mit identischem Namen, identischer Adresse, identischer Telefonnummer. Abweichungen sind der häufigste Grund, warum Betriebe in der Umgebung nicht gefunden werden.',
        },
        {
          value: '4',
          unit: 'Wochen',
          title: 'Erste Auswertung',
          text: 'Vier Wochen nach dem Launch sehen wir gemeinsam in die Zahlen: welche Seiten Besucher bringen, welche zu Anfragen führen und wo der Weg abbricht.',
        },
      ],
    },
    tr: {
      eyebrow: 'Hedef değerler',
      title: 'Bizi neyle ölçebilirsiniz',
      lead: 'Bu değerler proje başlamadan belirlenir ve yayına alındıktan sonra yeniden ölçülür. Ölçümün özetini değil, ölçümün kendisini alırsınız.',
      facts: [
        {
          value: '2,5',
          unit: 'saniye',
          title: 'Ana içeriğin yüklenmesi',
          text: 'Sayfanızın en büyük görünür alanı en geç 2,5 saniyede yerinde olur. Google’ın bir sayfayı hızlı saydığı eşik budur — ofis Wi-Fi’ında değil, mobil şebekede ölçülür.',
        },
        {
          value: '200',
          unit: 'milisaniye',
          title: 'Tıklamaya yanıt',
          text: 'Sayfanın bir girdiye görünür şekilde yanıt vermesi en fazla bu kadar sürebilir. Üstünde bir site, hızlı yüklense bile ağır hissettirir.',
        },
        {
          value: '90',
          unit: 'puan ve üzeri',
          title: 'Lighthouse, mobil ölçüm',
          text: 'Dört kategorinin hepsinde: performans, erişilebilirlik, en iyi uygulamalar ve SEO. Tam raporu teslimden önce, kısaltılmadan alırsınız.',
        },
        {
          value: '100',
          unit: 'yüzde sayfa',
          title: 'Teknik olarak eksiksiz',
          text: 'Kendi başlığı, kendi açıklaması, düzgün başlık sıralaması ve site haritasında kaydı olmayan alt sayfa kalmaz. Ana sayfa değil, sitenin tamamı denetlenir.',
        },
        {
          value: '3',
          unit: 'dizin',
          title: 'Yerelde bulunabilir',
          text: 'Google İşletme Profili, Apple Business Connect ve Bing Places — her yerde aynı ad, aynı adres, aynı telefon. Tutarsızlıklar, yerel işletmelerin bulunamamasının en sık nedenidir.',
        },
        {
          value: '4',
          unit: 'hafta',
          title: 'İlk değerlendirme',
          text: 'Yayına alındıktan dört hafta sonra sayılara birlikte bakarız: hangi sayfalar ziyaretçi getiriyor, hangileri talebe dönüyor ve yol nerede kopuyor.',
        },
      ],
    },
    en: {
      eyebrow: 'Target values',
      title: 'What you can hold us to',
      lead: 'These values are fixed before the project starts and measured again after launch. You get the measurement itself, not a summary of one.',
      facts: [
        {
          value: '2.5',
          unit: 'seconds',
          title: 'Time to main content',
          text: 'The largest visible area of your page is in place within 2.5 seconds at the latest. That is the threshold at which Google rates a page as fast — measured on mobile data, not on office Wi-Fi.',
        },
        {
          value: '200',
          unit: 'milliseconds',
          title: 'Response to a click',
          text: 'That is the most it may take for the page to answer an input visibly. Above it a website feels sluggish, even when it loaded quickly.',
        },
        {
          value: '90',
          unit: 'points and up',
          title: 'Lighthouse, measured on mobile',
          text: 'Across all four categories: performance, accessibility, best practices and SEO. You get the full report before sign-off, unabridged.',
        },
        {
          value: '100',
          unit: 'per cent of pages',
          title: 'Technically complete',
          text: 'No subpage without its own title, its own description, a clean heading order and an entry in the sitemap. The whole site is checked, not the homepage.',
        },
        {
          value: '3',
          unit: 'directories',
          title: 'Findable locally',
          text: 'Google Business Profile, Apple Business Connect and Bing Places — the same name, the same address, the same phone number everywhere. Inconsistencies are the most common reason local businesses go unfound.',
        },
        {
          value: '4',
          unit: 'weeks',
          title: 'First review',
          text: 'Four weeks after launch we look at the numbers together: which pages bring visitors, which lead to enquiries, and where the path breaks off.',
        },
      ],
    },
  },

  care: {
    de: {
      eyebrow: 'Leistungsumfang',
      title: 'Was Betreuung bei uns konkret heißt',
      lead: 'Wartung wird gern in Adjektiven verkauft. Hier stehen die Zahlen, auf die Sie sich berufen können — sie gelten ab dem Tag, an dem der Vertrag läuft.',
      facts: [
        {
          value: '1',
          unit: 'Werktag',
          title: 'Antwort auf Ihre Meldung',
          text: 'Sie schreiben an eine Adresse, nicht an ein Ticketsystem. Steht die Seite still, reagieren wir sofort statt am nächsten Morgen.',
        },
        {
          value: '30',
          unit: 'Tage',
          title: 'Backup-Historie',
          text: 'Jede Nacht eine vollständige Sicherung von Dateien und Datenbank. Einmal im Quartal spielen wir eine davon testweise zurück — ein Backup, das nie geprüft wurde, ist keins.',
        },
        {
          value: '60',
          unit: 'Prüfungen pro Stunde',
          title: 'Verfügbarkeit',
          text: 'Ihre Seite wird im Minutentakt von außen aufgerufen, dazu läuft die Überwachung des SSL-Zertifikats. Einen Ausfall bemerken wir vor Ihrem ersten Kunden.',
        },
        {
          value: '12',
          unit: 'Update-Läufe im Jahr',
          title: 'Updates & Sicherheit',
          text: 'Einmal im Monat werden System und Abhängigkeiten aktualisiert und die Seite danach durchgeklickt. Sicherheitskritische Lücken schließen wir sofort, nicht zum nächsten Termin.',
        },
        {
          value: '2',
          unit: 'Stunden im Monat',
          title: 'Inhalte ändern lassen',
          text: 'Ab dem Paket Pflege enthalten: Texte tauschen, Bilder ersetzen, Öffnungszeiten anpassen. Sie schreiben eine E-Mail, wir machen es. Größeres schätzen wir vorher.',
        },
        {
          value: '4',
          unit: 'Berichte im Jahr',
          title: 'Quartalsbericht',
          text: 'Zwei Absätze statt vierzig Seiten: was aktualisiert wurde, wie die Ladezeiten stehen, ob es Ausfälle gab. Ab dem Paket Pflege zusätzlich eine monatliche Ladezeit-Messung.',
        },
      ],
    },
    tr: {
      eyebrow: 'Hizmet kapsamı',
      title: 'Bakım bizde somut olarak ne demek',
      lead: 'Bakım genelde sıfatlarla satılır. Burada dayanabileceğiniz sayılar var — sözleşmenin yürürlüğe girdiği günden itibaren geçerlidir.',
      facts: [
        {
          value: '1',
          unit: 'iş günü',
          title: 'Bildiriminize yanıt',
          text: 'Bir bilet sistemine değil, bir adrese yazarsınız. Site durursa ertesi sabahı beklemeden hemen müdahale ederiz.',
        },
        {
          value: '30',
          unit: 'gün',
          title: 'Yedek geçmişi',
          text: 'Her gece dosyaların ve veritabanının tam yedeği. Üç ayda bir birini deneme amaçlı geri yükleriz — hiç denenmemiş bir yedek, yedek değildir.',
        },
        {
          value: '60',
          unit: 'kontrol / saat',
          title: 'Erişilebilirlik',
          text: 'Siteniz dakikada bir dışarıdan çağrılır, ayrıca SSL sertifikası izlenir. Bir kesintiyi ilk müşterinizden önce fark ederiz.',
        },
        {
          value: '12',
          unit: 'güncelleme turu / yıl',
          title: 'Güncellemeler & güvenlik',
          text: 'Ayda bir kez sistem ve bağımlılıklar güncellenir, ardından site baştan sona tıklanarak denetlenir. Güvenlik açıklarını bir sonraki randevuyu beklemeden kapatırız.',
        },
        {
          value: '2',
          unit: 'saat / ay',
          title: 'İçerik değişiklikleri',
          text: 'Bakım paketinden itibaren dahil: metin değiştirme, görsel yenileme, çalışma saatlerini güncelleme. Siz e-posta yazarsınız, biz yaparız. Daha büyüğünü önceden fiyatlandırırız.',
        },
        {
          value: '4',
          unit: 'rapor / yıl',
          title: 'Üç aylık rapor',
          text: 'Kırk sayfa yerine iki paragraf: neler güncellendi, yüklenme süreleri nerede, kesinti oldu mu. Bakım paketinden itibaren ayrıca aylık yüklenme süresi ölçümü.',
        },
      ],
    },
    en: {
      eyebrow: 'Scope of service',
      title: 'What care actually means here',
      lead: 'Maintenance is usually sold in adjectives. Here are the numbers you can hold us to — they apply from the day the contract starts.',
      facts: [
        {
          value: '1',
          unit: 'working day',
          title: 'Reply to your report',
          text: 'You write to an address, not to a ticket system. If the site goes down we react immediately, not the next morning.',
        },
        {
          value: '30',
          unit: 'days',
          title: 'Backup history',
          text: 'A full backup of files and database every night. Once a quarter we restore one as a test — a backup that has never been checked is not a backup.',
        },
        {
          value: '60',
          unit: 'checks per hour',
          title: 'Uptime',
          text: 'Your site is called from outside every minute, and the SSL certificate is monitored alongside it. We notice an outage before your first customer does.',
        },
        {
          value: '12',
          unit: 'update runs a year',
          title: 'Updates & security',
          text: 'Once a month the system and its dependencies are updated and the site is clicked through afterwards. Security-critical gaps get closed straight away, not at the next appointment.',
        },
        {
          value: '2',
          unit: 'hours a month',
          title: 'Content changes done for you',
          text: 'Included from the Care plan up: swapping copy, replacing images, adjusting opening hours. You send an email, we do it. Anything larger we quote first.',
        },
        {
          value: '4',
          unit: 'reports a year',
          title: 'Quarterly report',
          text: 'Two paragraphs instead of forty pages: what was updated, where load times stand, whether there were outages. From the Care plan up, a monthly load-time measurement as well.',
        },
      ],
    },
  },
};
