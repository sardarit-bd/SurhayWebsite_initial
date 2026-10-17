import type { Lang } from '../i18n/ui';

/**
 * Preisseite — Projektpakete, Zusatzleistungen, Wartungspakete und die
 * Faktoren, die den Preis bewegen.
 *
 * WARUM HIER ZAHLEN STEHEN
 * Preistransparenz ist bei einem kleinen Studio das wirksamste Argument, das
 * ohne Referenzen auskommt: Sie erspart beiden Seiten Gespraeche, die ohnehin
 * am Budget scheitern. Alle Werte sind Netto-Rahmen; der Festpreis entsteht
 * nach dem Erstgespraech.
 */

export interface Plan {
  id: string;
  price: Record<Lang, string>;
  /** true → „ab“ vor dem Preis. */
  from: boolean;
  popular?: boolean;
  name: Record<Lang, string>;
  desc: Record<Lang, string>;
  /** Fuer wen genau dieses Paket gedacht ist. */
  fit: Record<Lang, string>;
  features: Record<Lang, string[]>;
  timeline: Record<Lang, string>;
}

export const projectPlans: Plan[] = [
  {
    id: 'starter',
    price: { de: '2.900 €', tr: '2.900 €', en: '€2,900' },
    from: true,
    name: { de: 'Starter', tr: 'Starter', en: 'Starter' },
    desc: {
      de: 'Der professionelle Einstieg: eine Seite, die Ihr Angebot auf den Punkt bringt und Anfragen einsammelt.',
      tr: 'Profesyonel giriş: teklifinizi net biçimde anlatan ve talep toplayan tek bir sayfa.',
      en: 'The professional entry point: one page that gets your offer across and collects enquiries.',
    },
    fit: {
      de: 'Für Selbstständige und junge Unternehmen mit einem klaren Angebot.',
      tr: 'Net bir teklifi olan serbest çalışanlar ve genç şirketler için.',
      en: 'For freelancers and young companies with one clear offer.',
    },
    features: {
      de: [
        'OnePager mit bis zu 6 Sektionen',
        'Individuelles Design, kein Template',
        'Klickbarer Entwurf vor der Umsetzung',
        'Kontaktformular mit Spamschutz',
        'SEO-Grundsetup & Sitemap',
        'Impressum und Datenschutz eingerichtet',
        'Einweisung, 30 Minuten',
      ],
      tr: [
        '6 bölüme kadar tek sayfa',
        'Özel tasarım, şablon değil',
        'Uygulamadan önce tıklanabilir taslak',
        'Spam korumalı iletişim formu',
        'Temel SEO kurulumu & site haritası',
        'Künye ve gizlilik sayfası kurulumu',
        '30 dakikalık devir eğitimi',
      ],
      en: [
        'One-pager with up to 6 sections',
        'Custom design, no template',
        'Clickable draft before the build',
        'Contact form with spam protection',
        'SEO base setup & sitemap',
        'Imprint and privacy page set up',
        '30-minute walkthrough',
      ],
    },
    timeline: { de: 'Launch in 3–4 Wochen', tr: '3–4 haftada yayın', en: 'Launch in 3–4 weeks' },
  },
  {
    id: 'business',
    price: { de: '5.900 €', tr: '5.900 €', en: '€5,900' },
    from: true,
    popular: true,
    name: { de: 'Business', tr: 'Business', en: 'Business' },
    desc: {
      de: 'Für Unternehmen, die wachsen: mehrseitige Website mit eigenem Redaktionsbereich und Blog.',
      tr: 'Büyüyen şirketler için: kendi yönetim alanı ve blogu olan çok sayfalı web sitesi.',
      en: 'For growing companies: a multi-page website with its own editing area and a blog.',
    },
    fit: {
      de: 'Für KMU mit mehreren Leistungen, Standorten oder Zielgruppen.',
      tr: 'Birden çok hizmeti, lokasyonu veya hedef kitlesi olan KOBİ’ler için.',
      en: 'For SMEs with several services, locations or audiences.',
    },
    features: {
      de: [
        'Alles aus Starter',
        'Bis zu 8 Unterseiten',
        'CMS zur eigenen Pflege',
        'Blog & Referenzbereich',
        'Zweisprachig (DE/EN)',
        'Strukturierte Daten für Google',
        'Ladezeit unter 1 Sekunde, Lighthouse 95+',
        'Weiterleitungen von der alten Website',
      ],
      tr: [
        'Starter’daki her şey',
        '8 alt sayfaya kadar',
        'Kendi yönetiminiz için içerik sistemi',
        'Blog & referans alanı',
        'İki dilli (DE/EN)',
        'Google için yapılandırılmış veri',
        '1 saniyenin altında yüklenme, Lighthouse 95+',
        'Eski siteden yönlendirmeler',
      ],
      en: [
        'Everything in Starter',
        'Up to 8 subpages',
        'CMS for self-service editing',
        'Blog & case study section',
        'Bilingual (DE/EN)',
        'Structured data for Google',
        'Sub-second load time, Lighthouse 95+',
        'Redirects from the old website',
      ],
    },
    timeline: { de: 'Launch in 5–7 Wochen', tr: '5–7 haftada yayın', en: 'Launch in 5–7 weeks' },
  },
  {
    id: 'individuell',
    price: { de: 'auf Anfrage', tr: 'talep üzerine', en: 'on request' },
    from: false,
    name: { de: 'Individuell', tr: 'Özel', en: 'Custom' },
    desc: {
      de: 'Komplexe Anforderungen, Schnittstellen, Portale oder Shop — wir schnüren das Passende.',
      tr: 'Karmaşık gereksinimler, arayüzler, portallar veya mağaza — uygun paketi birlikte kurarız.',
      en: 'Complex requirements, integrations, portals or a shop — we scope what fits.',
    },
    fit: {
      de: 'Für Projekte ab etwa 10.000 € mit Anbindung an bestehende Systeme.',
      tr: 'Mevcut sistemlere bağlanan, yaklaşık 10.000 €’dan başlayan projeler için.',
      en: 'For projects from roughly €10,000 with connections to existing systems.',
    },
    features: {
      de: [
        'Individueller Umfang & Seitenzahl',
        'Schnittstellen zu CRM, ERP oder PIM',
        'Buchungs- oder Kundenbereiche',
        'Workshop zu Strategie und Struktur',
        'Redaktionsplan & Schulung für Ihr Team',
        'Betreuung über den Launch hinaus',
      ],
      tr: [
        'Özel kapsam & sayfa sayısı',
        'CRM, ERP veya PIM entegrasyonları',
        'Rezervasyon veya müşteri alanları',
        'Strateji ve yapı atölyesi',
        'Ekibiniz için içerik planı & eğitim',
        'Yayın sonrasında da destek',
      ],
      en: [
        'Custom scope & page count',
        'Integrations with CRM, ERP or PIM',
        'Booking or customer areas',
        'Strategy and structure workshop',
        'Editorial plan & training for your team',
        'Support beyond launch',
      ],
    },
    timeline: { de: 'Zeitplan nach Workshop', tr: 'Takvim atölyeden sonra belirlenir', en: 'Timeline set after the workshop' },
  },
];

export const carePlans: Plan[] = [
  {
    id: 'basis',
    price: { de: '49 €', tr: '49 €', en: '€49' },
    from: false,
    name: { de: 'Basis', tr: 'Temel', en: 'Basic' },
    desc: {
      de: 'Damit die Seite sicher und erreichbar bleibt.',
      tr: 'Site güvenli ve erişilebilir kalsın diye.',
      en: 'So the site stays secure and reachable.',
    },
    fit: {
      de: 'Für Websites, die selten geändert werden.',
      tr: 'Nadiren değişen web siteleri için.',
      en: 'For websites that rarely change.',
    },
    features: {
      de: ['Updates & Sicherheitsprüfung', 'Tägliches Backup, 30 Tage', 'Verfügbarkeitsprüfung', 'SSL-Überwachung', 'Antwort in 1 Werktag'],
      tr: ['Güncellemeler & güvenlik kontrolü', 'Günlük yedek, 30 gün', 'Erişilebilirlik izleme', 'SSL izleme', '1 iş günü içinde yanıt'],
      en: ['Updates & security checks', 'Daily backup, 30 days', 'Uptime monitoring', 'SSL monitoring', 'Reply within 1 working day'],
    },
    timeline: { de: 'monatlich kündbar', tr: 'aylık iptal edilebilir', en: 'cancel monthly' },
  },
  {
    id: 'pflege',
    price: { de: '129 €', tr: '129 €', en: '€129' },
    from: false,
    popular: true,
    name: { de: 'Pflege', tr: 'Bakım', en: 'Care' },
    desc: {
      de: 'Wartung plus Inhaltsänderungen, die Sie nicht selbst machen wollen.',
      tr: 'Bakım artı kendiniz yapmak istemediğiniz içerik değişiklikleri.',
      en: 'Maintenance plus the content changes you would rather not do yourself.',
    },
    fit: {
      de: 'Für Unternehmen mit regelmäßig neuen Inhalten.',
      tr: 'Düzenli olarak yeni içerik yayınlayan şirketler için.',
      en: 'For companies with regularly changing content.',
    },
    features: {
      de: [
        'Alles aus Basis',
        '2 Stunden Inhaltspflege pro Monat',
        'Neue Bilder & Texte einpflegen',
        'Monatliche Ladezeit-Messung',
        'Quartalsbericht in zwei Absätzen',
      ],
      tr: [
        'Temel’deki her şey',
        'Ayda 2 saat içerik bakımı',
        'Yeni görsel & metinlerin girilmesi',
        'Aylık yüklenme süresi ölçümü',
        'İki paragraflık üç aylık rapor',
      ],
      en: [
        'Everything in Basic',
        '2 hours of content work per month',
        'New images & copy applied for you',
        'Monthly load-time measurement',
        'Quarterly report in two paragraphs',
      ],
    },
    timeline: { de: 'monatlich kündbar', tr: 'aylık iptal edilebilir', en: 'cancel monthly' },
  },
  {
    id: 'wachstum',
    price: { de: '290 €', tr: '290 €', en: '€290' },
    from: true,
    name: { de: 'Wachstum', tr: 'Büyüme', en: 'Growth' },
    desc: {
      de: 'Betreuung mit laufender Weiterentwicklung und SEO.',
      tr: 'Sürekli geliştirme ve SEO ile destek.',
      en: 'Care with ongoing development and SEO.',
    },
    fit: {
      de: 'Für Websites, die aktiv Anfragen bringen sollen.',
      tr: 'Aktif olarak talep getirmesi beklenen web siteleri için.',
      en: 'For websites expected to actively generate enquiries.',
    },
    features: {
      de: [
        'Alles aus Pflege',
        '6 Stunden Weiterentwicklung pro Monat',
        'Laufende SEO-Betreuung',
        'Neue Unterseiten & Landingpages',
        'Monatlicher Termin, 30 Minuten',
        'Priorität bei Anfragen',
      ],
      tr: [
        'Bakım’daki her şey',
        'Ayda 6 saat geliştirme',
        'Sürekli SEO çalışması',
        'Yeni alt sayfalar & açılış sayfaları',
        'Ayda bir 30 dakikalık görüşme',
        'Taleplerde öncelik',
      ],
      en: [
        'Everything in Care',
        '6 hours of development per month',
        'Ongoing SEO work',
        'New subpages & landing pages',
        'A 30-minute call each month',
        'Priority on requests',
      ],
    },
    timeline: { de: 'monatlich kündbar', tr: 'aylık iptal edilebilir', en: 'cancel monthly' },
  },
];

/** Zusatzleistungen, die sich zu jedem Projekt buchen lassen. */
export const addOns: { name: Record<Lang, string>; price: Record<Lang, string>; desc: Record<Lang, string> }[] = [
  {
    name: { de: 'Weitere Unterseite', tr: 'Ek alt sayfa', en: 'Additional subpage' },
    price: { de: '390 €', tr: '390 €', en: '€390' },
    desc: {
      de: 'Gestaltet und umgesetzt im bestehenden System, inklusive SEO-Grundlagen.',
      tr: 'Mevcut sistem içinde tasarlanır ve uygulanır, SEO temelleri dahil.',
      en: 'Designed and built inside the existing system, SEO basics included.',
    },
  },
  {
    name: { de: 'Zweite Sprache', tr: 'İkinci dil', en: 'Second language' },
    price: { de: 'ab 890 €', tr: '890 €’dan başlayan', en: 'from €890' },
    desc: {
      de: 'Eigener Seitenbaum mit hreflang und Sprachumschalter. Übersetzung auf Wunsch vermittelt.',
      tr: 'hreflang ve dil değiştiriciyle kendi sayfa ağacı. İstenirse çeviri de ayarlanır.',
      en: 'A separate page tree with hreflang and a language switch. Translation arranged on request.',
    },
  },
  {
    name: { de: 'Texterstellung', tr: 'Metin yazarlığı', en: 'Copywriting' },
    price: { de: 'ab 190 € / Seite', tr: 'sayfa başına 190 €’dan başlayan', en: 'from €190 / page' },
    desc: {
      de: 'Wir schreiben Ihre Seitentexte auf Basis eines Interviews — kein Füllmaterial aus dem Sprachmodell.',
      tr: 'Sayfa metinlerinizi bir görüşmeye dayanarak yazarız — dil modelinden çıkma dolgu malzemesi değil.',
      en: 'We write your page copy from an interview — not filler out of a language model.',
    },
  },
  {
    name: { de: 'Fotografie & Bildauswahl', tr: 'Fotoğraf & görsel seçimi', en: 'Photography & image selection' },
    price: { de: 'auf Anfrage', tr: 'talep üzerine', en: 'on request' },
    desc: {
      de: 'Vermittlung eines Fotografen in Berlin oder kuratierte Bildauswahl mit sauberer Lizenz.',
      tr: 'Berlin’de bir fotoğrafçının ayarlanması ya da lisansı temiz, seçilmiş görseller.',
      en: 'A photographer in Berlin arranged for you, or a curated image selection with clean licensing.',
    },
  },
  {
    name: { de: 'Website-Analyse', tr: 'Web sitesi analizi', en: 'Website audit' },
    price: { de: '290 €', tr: '290 €', en: '€290' },
    desc: {
      de: 'Technik, Ladezeit, SEO und Barrierefreiheit Ihrer bestehenden Seite — als priorisierte Liste.',
      tr: 'Mevcut sitenizin tekniği, yüklenme süresi, SEO’su ve erişilebilirliği — öncelik sıralı liste hâlinde.',
      en: 'Technology, load time, SEO and accessibility of your existing site — as a prioritised list.',
    },
  },
  {
    name: { de: 'Schulung für Ihr Team', tr: 'Ekibiniz için eğitim', en: 'Training for your team' },
    price: { de: '390 € / Halbtag', tr: 'yarım gün 390 €', en: '€390 / half day' },
    desc: {
      de: 'Redaktion, Bildaufbereitung und SEO-Grundlagen, damit Inhalte im Haus bleiben.',
      tr: 'İçerik yazımı, görsel hazırlama ve SEO temelleri — içerik işi şirket içinde kalsın diye.',
      en: 'Editing, image preparation and SEO basics so content work stays in-house.',
    },
  },
];

/** Was den Preis nach oben oder unten bewegt — offen benannt. */
export const priceFactors: { title: Record<Lang, string>; desc: Record<Lang, string> }[] = [
  {
    title: { de: 'Anzahl der Seiten', tr: 'Sayfa sayısı', en: 'Number of pages' },
    desc: {
      de: 'Nicht jede Seite kostet gleich viel: Fünf Seiten nach demselben Muster sind günstiger als drei, die alle anders aussehen.',
      tr: 'Her sayfa aynı maliyette değildir: aynı düzende beş sayfa, hepsi farklı görünen üç sayfadan ucuzdur.',
      en: 'Not every page costs the same: five pages on one pattern are cheaper than three that all look different.',
    },
  },
  {
    title: { de: 'Zustand Ihrer Inhalte', tr: 'İçeriklerinizin durumu', en: 'State of your content' },
    desc: {
      de: 'Liegen Texte und Bilder vor, geht es schnell. Müssen sie erst entstehen, ist das der größte Zeitfaktor im Projekt.',
      tr: 'Metinler ve görseller hazırsa iş hızlı ilerler. Önce üretilmeleri gerekiyorsa, projedeki en büyük zaman etkeni budur.',
      en: 'If copy and images exist, things move fast. If they still have to be created, that is the biggest time factor in the project.',
    },
  },
  {
    title: { de: 'Anbindungen', tr: 'Entegrasyonlar', en: 'Integrations' },
    desc: {
      de: 'CRM, Buchungssystem, Warenwirtschaft oder Newsletter: Jede Schnittstelle ist ein eigenes kleines Projekt.',
      tr: 'CRM, rezervasyon sistemi, stok yönetimi ya da bülten: her arayüz kendi başına küçük bir projedir.',
      en: 'CRM, booking system, inventory or newsletter: every integration is a small project of its own.',
    },
  },
  {
    title: { de: 'Zweisprachigkeit', tr: 'Çok dillilik', en: 'Bilingual setup' },
    desc: {
      de: 'Eine zweite Sprache verdoppelt nicht die Arbeit, erhöht sie aber deutlich — vor allem in der Pflege.',
      tr: 'İkinci bir dil işi ikiye katlamaz ama belirgin biçimde artırır — özellikle bakımda.',
      en: 'A second language does not double the work, but it does increase it noticeably — especially in maintenance.',
    },
  },
  {
    title: { de: 'Termindruck', tr: 'Zaman baskısı', en: 'Deadline pressure' },
    desc: {
      de: 'Ein Launch in drei statt sieben Wochen ist machbar und kostet einen Aufschlag. Wir sagen vorher, wie hoch.',
      tr: 'Yedi hafta yerine üç haftada yayın mümkündür ve bir fark ücreti gerektirir. Ne kadar olduğunu önceden söyleriz.',
      en: 'A launch in three instead of seven weeks is possible and carries a surcharge. We tell you how much beforehand.',
    },
  },
];

/** Zusagen, die in jedem Paket gelten — unabhaengig vom Preis. */
export const alwaysIncluded: Record<Lang, string[]> = {
  de: [
    'Festpreis, schriftlich vor Projektstart',
    'Klickbarer Entwurf vor der ersten Zeile Code',
    'Zwei Korrekturrunden im Design',
    'Barrierefreiheit nach WCAG 2.2 AA als Ziel',
    'Ladezeit-Messung vor der Abnahme',
    'Quellcode und Zugänge gehören Ihnen',
    'Keine Bindung an ein Wartungspaket',
  ],
  tr: [
    'Proje başlamadan önce, yazılı sabit fiyat',
    'İlk satır koddan önce tıklanabilir taslak',
    'Tasarımda iki revizyon turu',
    'Hedef olarak WCAG 2.2 AA erişilebilirliği',
    'Teslimden önce yüklenme süresi ölçümü',
    'Kaynak kod ve erişimler size aittir',
    'Bakım paketine mecburiyet yok',
  ],
  en: [
    'A fixed price, in writing, before we start',
    'A clickable draft before the first line of code',
    'Two revision rounds in design',
    'WCAG 2.2 AA accessibility as the target',
    'A load-time measurement before sign-off',
    'Source code and credentials belong to you',
    'No obligation to buy a care plan',
  ],
};

/** Zahlungsplan — steht auf der Preisseite, weil danach ohnehin gefragt wird. */
export const paymentTerms: Record<Lang, { step: string; desc: string }[]> = {
  de: [
    { step: '40 % bei Auftrag', desc: 'Nach dem Erstgespräch und der schriftlichen Festpreiszusage.' },
    { step: '30 % nach Designfreigabe', desc: 'Wenn der klickbare Entwurf von Ihnen abgenommen ist.' },
    { step: '30 % bei Launch', desc: 'Nach Abnahme der fertigen Website, vor dem Umzug auf Ihre Domain.' },
  ],
  tr: [
    { step: 'Siparişte % 40', desc: 'Ön görüşmeden ve yazılı sabit fiyat taahhüdünden sonra.' },
    { step: 'Tasarım onayında % 30', desc: 'Tıklanabilir taslağı onayladığınızda.' },
    { step: 'Yayında % 30', desc: 'Biten sitenin teslim onayından sonra, kendi alan adınıza taşınmadan önce.' },
  ],
  en: [
    { step: '40 % on order', desc: 'After the first call and the written fixed-price commitment.' },
    { step: '30 % on design approval', desc: 'Once you have signed off the clickable draft.' },
    { step: '30 % at launch', desc: 'After sign-off of the finished site, before the move to your domain.' },
  ],
};
