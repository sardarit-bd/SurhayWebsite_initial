import type { Lang } from '../i18n/ui';

/**
 * Werkzeuge und Plattformen — Quelle der Technologie-Sektion.
 *
 * Ein Eintrag, ein Zeichen, ein Text pro Sprache. Welche Eintraege eine Seite
 * zeigt, entscheidet die Seite (siehe `techSets`) — die Texte selbst stehen
 * nur hier, damit sie nicht auf mehreren Leistungsseiten auseinanderlaufen.
 *
 * HERKUNFT DER MARKENZEICHEN
 * Figma, Webflow, Framer, WordPress und PostgreSQL sind eingetragene Marken.
 * Die Dateien in /public/images/logos/ stammen unveraendert von den offiziellen
 * Marken- bzw. Presseseiten der Anbieter — nichts ist nachgezeichnet oder
 * selbst eingefaerbt:
 *
 *   figma.svg       brand.figma.com → Brand-Kit, "Figma Icon (Full-color)"
 *                   offizielles Farbasset, fuenffarbig
 *   webflow.svg     brand.webflow.com/brand-assets → Mark/Mark_Logo_Blue.svg
 *                   offizielles Farbasset, Webflow-Blau #146EF5
 *   postgresql.svg  wiki.postgresql.org/wiki/Logo → "3-color elephant"
 *                   offizielles Farbasset, #336791 mit Schwarz und Weiss
 *   framer.svg      framer.com/brand → Icon, schwarze Fassung. Das offizielle
 *                   Brand-Kit enthaelt Icon und Wortmarke ausschliesslich in
 *                   Schwarz und Weiss — Schwarz IST hier die Markenfarbe.
 *   wordpress.svg   wordpress.org/about/logos → W-Mark aus der offiziellen
 *                   Illustrator-Datei. Auch WordPress bietet nur "BaseGray"
 *                   (#32373C) und Weiss an.
 *
 * "Code" und "CMS" sind keine Marken. Ihre Zeichen sind gezeichnet, im
 * Strichstil des uebrigen Icon-Sets (viewBox 24, currentColor).
 */

export type TechId = 'figma' | 'framer' | 'webflow' | 'wordpress' | 'code' | 'cms' | 'postgresql';

/** Bildmarke: entweder eine Datei aus /images/logos/ oder ein eigenes Zeichen. */
export type Mark = { file: string } | { draw: 'code' | 'cms' };

export interface TechEntry {
  name: string;
  mark: Mark;
  /**
   * Faktor auf die 48-px-Box. Gleicht Innenabstand und Formgewicht aus:
   * die Zeichen fuellen ihre Zeichenflaechen unterschiedlich weit aus, eine
   * feste Breite liesse sie verschieden gross wirken. Nachjustiert wurde am
   * Bildschirm, Ziel ist optische, nicht rechnerische Gleichheit.
   */
  scale: number;
  text: Record<Lang, string>;
}

export const techEntries: Record<TechId, TechEntry> = {
  figma: {
    name: 'Figma',
    mark: { file: '/images/logos/figma.svg' },
    // Die Marke belegt nur 39 % der Breite und 47 % der Hoehe ihrer
    // Zeichenflaeche — ohne Zuschlag bliebe sie halb so gross wie die anderen.
    scale: 1.78,
    text: {
      de: 'Hier entsteht Ihre Website als klickbarer Entwurf, bevor eine Zeile Code geschrieben wird. Sie sehen jede Seite auf Bildschirm und Handy und geben frei, was gebaut wird.',
      tr: 'Siteniz, tek satır kod yazılmadan önce burada tıklanabilir bir taslak olarak doğar. Her sayfayı ekranda ve telefonda görür, neyin inşa edileceğini siz onaylarsınız.',
      en: 'This is where your website becomes a clickable draft before a line of code is written. You see every page on desktop and phone, and you approve what gets built.',
    },
  },
  framer: {
    name: 'Framer',
    mark: { file: '/images/logos/framer.svg' },
    // Das Zeichen belegt nur 36 % der Breite und 54 % der Hoehe seiner
    // 140er Flaeche.
    scale: 1.52,
    text: {
      de: 'Für Bewegung und Übergänge, die sich im Entwurf schon anfühlen wie später im Browser. Aus demselben Stand geht eine Landingpage oder Kampagnenseite auch direkt online.',
      tr: 'Taslakta bile tarayıcıdaki gibi hissettiren hareket ve geçişler için. Aynı yerden bir açılış ya da kampanya sayfası doğrudan yayına da alınabilir.',
      en: 'For motion and transitions that already feel like the finished browser experience while still in draft. From the same file, a landing or campaign page can also go live directly.',
    },
  },
  webflow: {
    name: 'Webflow',
    mark: { file: '/images/logos/webflow.svg' },
    // Fuellt seine Zeichenflaeche ganz aus und ist mit 1,6:1 die breiteste
    // Form — breite Zeichen wirken bei gleicher Box groesser.
    scale: 0.86,
    text: {
      de: 'Websites, die Sie im Browser weiterbauen — Layout, Texte und Bilder ohne eigenen Server. Passend, wenn Sie viel selbst gestalten wollen und ein monatliches Abo in Ordnung geht.',
      tr: 'Tarayıcıda geliştirmeye devam ettiğiniz siteler — kendi sunucunuz olmadan yerleşim, metin ve görsel. Çoğu şeyi kendiniz biçimlendirmek istiyorsanız ve aylık abonelik sizin için sorun değilse uygundur.',
      en: 'Websites you keep building in the browser — layout, copy and images without your own server. A fit when you want to shape things yourself and a monthly subscription is fine.',
    },
  },
  wordpress: {
    name: 'WordPress',
    mark: { file: '/images/logos/wordpress.svg' },
    // Der Kreis fuellt nur zwei Drittel der Zeichenflaeche; der Zuschlag holt
    // das auf, bleibt aber unter den offenen Formen — Flaeche wiegt schwerer.
    scale: 1.16,
    text: {
      de: 'Der Klassiker, wenn Ihr Team schon damit arbeitet oder ein Shop, ein Mitgliederbereich oder eine große Redaktion dazukommt. Wir setzen ihn schlank auf, ohne Plugin-Stapel.',
      tr: 'Ekibiniz zaten onunla çalışıyorsa ya da bir mağaza, üyelik alanı veya büyük bir yayın ekibi işin içine giriyorsa klasik seçenek. Eklenti yığını olmadan, yalın kurarız.',
      en: 'The classic when your team already works with it, or when a shop, a member area or a large editorial team comes along. We set it up lean, without a stack of plugins.',
    },
  },
  code: {
    name: 'Code',
    mark: { draw: 'code' },
    scale: 1,
    text: {
      de: 'Handgeschriebene Seiten für alles, was kein Baukasten sauber abbildet: Rechner, Konfiguratoren, Anbindungen an Ihre Systeme. Ladezeiten unter einer Sekunde, Quellcode bei Ihnen.',
      tr: 'Hiçbir hazır kurgunun düzgün karşılayamadığı her şey için elle yazılmış sayfalar: hesaplayıcılar, yapılandırıcılar, sistemlerinize bağlantılar. Bir saniyenin altında yüklenme, kaynak kod sizde.',
      en: 'Hand-written pages for everything no site builder covers cleanly: calculators, configurators, connections to your systems. Sub-second load times, source code in your hands.',
    },
  },
  cms: {
    name: 'CMS',
    mark: { draw: 'cms' },
    scale: 1,
    text: {
      de: 'Ein Redaktionsbereich, in dem Sie Texte, Bilder und Beiträge selbst ändern — klassisch im System oder headless, getrennt von der Darstellung. Für jede Kleinigkeit kommt keine Rechnung.',
      tr: 'Metinleri, görselleri ve yazıları kendiniz değiştirdiğiniz bir yönetim alanı — klasik ya da headless, sunumdan ayrılmış. Her ufak iş için fatura gelmez.',
      en: 'An editing area where you change copy, images and posts yourself — classic or headless, kept apart from the presentation. No invoice for every small correction.',
    },
  },
  postgresql: {
    name: 'PostgreSQL',
    mark: { file: '/images/logos/postgresql.svg' },
    // Der Elefant fuellt seine Flaeche randlos aus und ist in der Farbfassung
    // eine gefuellte Silhouette statt einer Strichzeichnung.
    scale: 0.78,
    text: {
      de: 'Die Datenbank für alles, was über Seiten hinausgeht: Buchungen, Kundendaten, Preislisten, Bestände. Offen, verlässlich und ohne Lizenzkosten, auch wenn der Bestand wächst.',
      tr: 'Sayfaların ötesine geçen her şey için veritabanı: rezervasyonlar, müşteri verileri, fiyat listeleri, stoklar. Açık, güvenilir ve veri büyüse de lisans maliyeti olmayan.',
      en: 'The database for everything beyond pages: bookings, customer records, price lists, stock. Open, dependable and licence-free, even as the data grows.',
    },
  },
};

export interface TechSet {
  items: TechId[];
  copy: Record<Lang, { eyebrow: string; title: string; lead: string }>;
  /**
   * Ersetzt den Text eines Eintrags fuer genau diese Belegung. Framer kommt in
   * beiden Sets vor, beantwortet dort aber zwei verschiedene Fragen: auf der
   * Designseite ist es das Entwurfswerkzeug, auf der Entwicklungsseite eine
   * Plattform, auf der die fertige Seite laufen kann. Ohne diese Trennung
   * stuende derselbe Absatz auf zwei Unterseiten — fuer Google ein doppelter
   * Textblock, fuer den Leser eine Antwort auf die falsche Frage.
   */
  texts?: Partial<Record<TechId, Record<Lang, string>>>;
}

/**
 * Welche Seite welche Auswahl zeigt.
 *
 * `platforms` beantwortet die Frage des Kunden "worauf laeuft meine Seite
 * spaeter?", `design` die Frage "womit entsteht der Entwurf?". Zwei
 * verschiedene Fragen — deshalb zwei verschiedene Ueberschriften.
 */
export const techSets: Record<'platforms' | 'design', TechSet> = {
  platforms: {
    items: ['webflow', 'framer', 'wordpress', 'code', 'cms', 'postgresql'],
    texts: {
      framer: {
        de: 'Schnell online und stark im Detail: für Landingpages, Kampagnen und Auftritte, die überzeugen statt verwalten müssen. Der Umfang bleibt überschaubar, die Pflege einfach.',
        tr: 'Hızlı yayına ve detayda güçlü: yönetmek yerine ikna etmesi gereken açılış sayfaları, kampanyalar ve tanıtımlar için. Kapsam sınırlı, bakımı kolay kalır.',
        en: 'Live quickly, strong on detail: for landing pages, campaigns and sites that need to convince rather than administrate. Modest in scope, simple to maintain.',
      },
    },
    copy: {
      de: {
        eyebrow: 'Technologie',
        title: 'Die Technik richtet sich nach dem Projekt',
        lead: 'Wir binden Sie nicht an das System, das wir zufällig am besten kennen. Was am Ende läuft, entscheidet sich danach, wer die Inhalte pflegt, was die Seite können muss und was der Betrieb kosten darf.',
      },
      tr: {
        eyebrow: 'Teknoloji',
        title: 'Teknoloji projeye göre seçilir',
        lead: 'Sizi tesadüfen en iyi bildiğimiz sisteme bağlamayız. Sonunda neyin çalışacağı; içeriği kimin yöneteceğine, sitenin neler yapması gerektiğine ve işletmenin ne kadara mal olabileceğine göre belirlenir.',
      },
      en: {
        eyebrow: 'Technology',
        title: 'The technology follows the project',
        lead: 'We do not tie you to whichever system we happen to know best. What ends up running depends on who maintains the content, what the site has to do, and what running it may cost.',
      },
    },
  },
  design: {
    items: ['figma', 'framer'],
    copy: {
      de: {
        eyebrow: 'Entwurfswerkzeug',
        title: 'Sie sehen die Website, bevor sie gebaut wird',
        lead: 'Entworfen wird nicht in Bildern, sondern in klickbaren Prototypen. Sie öffnen einen Link, gehen durch Ihre eigene Seite und geben frei — Änderungen kosten hier Minuten statt Umbauten am fertigen Code.',
      },
      tr: {
        eyebrow: 'Tasarım aracı',
        title: 'Siteyi inşa edilmeden önce görürsünüz',
        lead: 'Tasarım, resimlerle değil tıklanabilir prototiplerle yapılır. Bir bağlantı açar, kendi sitenizde gezinir ve onay verirsiniz — değişiklikler burada dakikalar sürer, bitmiş kodda yeniden inşa gerektirmez.',
      },
      en: {
        eyebrow: 'Design tools',
        title: 'You see the website before it gets built',
        lead: 'We design in clickable prototypes, not in pictures. You open a link, walk through your own site and sign it off — a change costs minutes here, instead of rebuilding finished code.',
      },
    },
  },
};
