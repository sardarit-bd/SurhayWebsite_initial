import type { Lang } from '../i18n/ui';

/**
 * Ablauf eines Projekts — ausfuehrliche Fassung fuer /prozess.
 *
 * Die Startseite zeigt davon nur Titel und Dauer; die Prozessseite nennt zu
 * jeder Phase, was wir tun, was Sie bekommen und was wir von Ihnen brauchen.
 * Der dritte Punkt ist der wichtigste: Projekte scheitern selten an Technik,
 * sondern daran, dass Inhalte nicht kommen.
 */

export interface Phase {
  index: string;
  duration: Record<Lang, string>;
  title: Record<Lang, string>;
  summary: Record<Lang, string>;
  /** Was in dieser Phase passiert. */
  work: Record<Lang, string[]>;
  /** Was Sie am Ende in der Hand haben. */
  output: Record<Lang, string[]>;
  /** Was wir von Ihnen brauchen. */
  yourPart: Record<Lang, string>;
}

export const phases: Phase[] = [
  {
    index: '01',
    duration: { de: '30–45 Minuten', tr: '30–45 dakika', en: '30–45 minutes' },
    title: { de: 'Erstgespräch', tr: 'Ön görüşme', en: 'First call' },
    summary: {
      de: 'Wir klären, worum es geht, was es kosten darf und ob wir die Richtigen sind. Kostenlos und ohne Verpflichtung.',
      tr: 'Konunun ne olduğunu, bütçenin ne olabileceğini ve doğru adres olup olmadığımızı netleştiririz. Ücretsiz ve yükümlülük yok.',
      en: 'We clarify what this is about, what it may cost, and whether we are the right fit. Free and without obligation.',
    },
    work: {
      de: [
        'Ihr Angebot, Ihre Zielgruppe und Ihr Wettbewerb im Überblick',
        'Was die heutige Website leistet — und was nicht',
        'Budgetrahmen und Wunschtermin offen benennen',
        'Grobe Einschätzung von Umfang und Preisspanne',
      ],
      tr: [
        'Teklifinize, hedef kitlenize ve rakiplerinize genel bakış',
        'Bugünkü sitenin ne yapıp ne yapmadığı',
        'Bütçe aralığı ve hedef tarihin açıkça konuşulması',
        'Kapsam ve fiyat aralığı için kaba bir değerlendirme',
      ],
      en: [
        'An overview of your offer, your audience and your competition',
        'What your current website does — and what it does not',
        'Budget range and target date named openly',
        'A rough read on scope and price range',
      ],
    },
    output: {
      de: ['Einschätzung, ob und wie wir helfen können', 'Preisspanne und realistischer Zeitrahmen'],
      tr: ['Yardımcı olup olamayacağımıza dair değerlendirme', 'Fiyat aralığı ve gerçekçi bir zaman çerçevesi'],
      en: ['An assessment of whether and how we can help', 'A price range and a realistic timeframe'],
    },
    yourPart: {
      de: '45 Minuten Zeit und die Bereitschaft, über Budget zu sprechen.',
      tr: '45 dakikanız ve bütçe konuşmaya açık olmanız.',
      en: '45 minutes of your time and a willingness to talk about budget.',
    },
  },
  {
    index: '02',
    duration: { de: '3–5 Werktage', tr: '3–5 iş günü', en: '3–5 working days' },
    title: { de: 'Angebot & Festpreis', tr: 'Teklif & sabit fiyat', en: 'Proposal & fixed price' },
    summary: {
      de: 'Sie bekommen ein Angebot, das den Umfang benennt und den Preis fixiert. Was nicht drinsteht, ist nicht enthalten — auch das steht drin.',
      tr: 'Kapsamı adlandıran ve fiyatı sabitleyen bir teklif alırsınız. İçinde yazmayan dahil değildir — bu da teklifte yazar.',
      en: 'You get a proposal that names the scope and fixes the price. What is not in it is not included — and that is stated too.',
    },
    work: {
      de: [
        'Seitenplan als Liste, nicht als Schlagwort',
        'Festpreis mit Zahlungsplan in drei Schritten',
        'Termine für Designfreigabe und Launch',
        'Was Sie liefern müssen, mit Frist',
      ],
      tr: [
        'Sayfa planı, slogan olarak değil liste olarak',
        'Üç adımlı ödeme planıyla sabit fiyat',
        'Tasarım onayı ve yayın için tarihler',
        'Sizin teslim etmeniz gerekenler, tarihiyle birlikte',
      ],
      en: [
        'A site plan as a list, not a buzzword',
        'A fixed price with a three-step payment plan',
        'Dates for design approval and launch',
        'What you need to deliver, with a deadline',
      ],
    },
    output: {
      de: ['Schriftliches Angebot mit Festpreis', 'Projektplan mit Terminen', 'Checkliste Ihrer Zulieferungen'],
      tr: ['Sabit fiyatlı yazılı teklif', 'Tarihleriyle proje planı', 'Sizden gelecekler için kontrol listesi'],
      en: ['A written proposal with a fixed price', 'A project plan with dates', 'A checklist of what you supply'],
    },
    yourPart: {
      de: 'Prüfen, Rückfragen stellen, freigeben.',
      tr: 'İnceleyin, soru sorun, onaylayın.',
      en: 'Review it, ask questions, approve it.',
    },
  },
  {
    index: '03',
    duration: { de: '1–2 Wochen', tr: '1–2 hafta', en: '1–2 weeks' },
    title: { de: 'Struktur & Design', tr: 'Yapı & tasarım', en: 'Structure & design' },
    summary: {
      de: 'Zuerst die Reihenfolge der Argumente, dann das Aussehen. Am Ende steht ein klickbarer Entwurf, den Sie freigeben oder ablehnen.',
      tr: 'Önce argümanların sırası, sonra görünüm. Sonunda onaylayacağınız ya da reddedeceğiniz tıklanabilir bir taslak durur.',
      en: 'First the order of the arguments, then the look. At the end there is a clickable draft you either approve or reject.',
    },
    work: {
      de: [
        'Seitenstruktur und Navigationslogik festlegen',
        'Designsystem: Farben, Schrift, Abstände, Zustände',
        'Gestaltung der Startseite und aller Seitentypen',
        'Zwei Korrekturrunden mit gesammeltem Feedback',
      ],
      tr: [
        'Sayfa yapısının ve gezinme mantığının belirlenmesi',
        'Tasarım sistemi: renk, yazı, boşluk, durumlar',
        'Ana sayfanın ve tüm sayfa tiplerinin tasarımı',
        'Toplu geri bildirimle iki revizyon turu',
      ],
      en: [
        'Page structure and navigation logic settled',
        'Design system: colour, type, spacing, states',
        'Design of the homepage and every page type',
        'Two revision rounds on collected feedback',
      ],
    },
    output: {
      de: ['Klickbarer Entwurf in Desktop- und Mobilbreite', 'Designsystem als Grundlage aller weiteren Seiten'],
      tr: ['Masaüstü ve mobil genişlikte tıklanabilir taslak', 'Sonraki tüm sayfaların temeli olan tasarım sistemi'],
      en: ['A clickable draft at desktop and mobile widths', 'A design system as the basis for every later page'],
    },
    yourPart: {
      de: 'Feedback gesammelt und entscheidungsfähig — idealerweise von einer Person statt aus fünf Abteilungen.',
      tr: 'Toplu ve karar verebilen geri bildirim — ideal olarak beş departmandan değil, tek bir kişiden.',
      en: 'Feedback, collected and decisive — ideally from one person rather than five departments.',
    },
  },
  {
    index: '04',
    duration: { de: '2–4 Wochen', tr: '2–4 hafta', en: '2–4 weeks' },
    title: { de: 'Entwicklung', tr: 'Geliştirme', en: 'Development' },
    summary: {
      de: 'Der freigegebene Entwurf wird gebaut. Sie sehen den Fortschritt jederzeit auf einer Vorschau-URL, nicht erst am Ende.',
      tr: 'Onaylanan taslak hayata geçer. İlerlemeyi bir önizleme adresinde istediğiniz an görürsünüz, sonunda değil.',
      en: 'The approved draft gets built. You see progress on a preview URL at any time, not only at the end.',
    },
    work: {
      de: [
        'Umsetzung aller Seiten und Komponenten',
        'CMS einrichten und mit Ihren Inhalten füllen',
        'Formulare, Anbindungen, Rechtstexte',
        'Barrierefreiheit und Ladezeit laufend prüfen',
      ],
      tr: [
        'Tüm sayfa ve bileşenlerin hayata geçirilmesi',
        'İçerik sisteminin kurulması ve içeriklerinizle doldurulması',
        'Formlar, entegrasyonlar, hukuki metinler',
        'Erişilebilirlik ve yüklenme süresinin sürekli ölçülmesi',
      ],
      en: [
        'Building every page and component',
        'Setting up the CMS and filling it with your content',
        'Forms, integrations, legal pages',
        'Continuous accessibility and load-time checks',
      ],
    },
    output: {
      de: ['Vollständige Website auf einer Vorschau-URL', 'Redaktionsbereich mit Ihren echten Inhalten'],
      tr: ['Önizleme adresinde eksiksiz web sitesi', 'Gerçek içeriklerinizle dolu yönetim alanı'],
      en: ['The complete website on a preview URL', 'An editing area holding your real content'],
    },
    yourPart: {
      de: 'Texte, Bilder und Logo in der vereinbarten Frist. Das ist der Punkt, an dem Projekte am häufigsten stehen bleiben.',
      tr: 'Metinler, görseller ve logo, kararlaştırılan tarihte. Projelerin en sık takıldığı nokta burasıdır.',
      en: 'Copy, images and logo by the agreed date. This is where projects most often stall.',
    },
  },
  {
    index: '05',
    duration: { de: '3–5 Werktage', tr: '3–5 iş günü', en: '3–5 working days' },
    title: { de: 'Test & Launch', tr: 'Test & yayın', en: 'Test & launch' },
    summary: {
      de: 'Prüfen auf echten Geräten, Weiterleitungen setzen, Domain umziehen. Ohne Ausfall Ihrer E-Mail-Postfächer.',
      tr: 'Gerçek cihazlarda test, yönlendirmelerin kurulması, alan adının taşınması. E-posta kutularınız kesintiye uğramadan.',
      en: 'Checks on real devices, redirects in place, domain moved. Without your mailboxes going down.',
    },
    work: {
      de: [
        'Test auf Geräten, Browsern und mit Tastatur',
        'Lighthouse-Messung und letzte Optimierungen',
        '301-Weiterleitungen aller alten URLs',
        'Domainumzug, SSL, Sitemap bei Google einreichen',
      ],
      tr: [
        'Cihazlarda, tarayıcılarda ve klavyeyle test',
        'Lighthouse ölçümü ve son iyileştirmeler',
        'Tüm eski adresler için 301 yönlendirmeleri',
        'Alan adı taşıma, SSL, site haritasının Google’a gönderilmesi',
      ],
      en: [
        'Testing on devices, browsers and by keyboard',
        'A Lighthouse run and final optimisations',
        '301 redirects for every old URL',
        'Domain move, SSL, sitemap submitted to Google',
      ],
    },
    output: {
      de: ['Live-Website unter Ihrer Domain', 'Messprotokoll vor der Abnahme', 'Zugänge und Einweisung, 30 Minuten'],
      tr: ['Kendi alan adınızda yayında bir site', 'Teslim öncesi ölçüm kaydı', 'Erişimler ve 30 dakikalık devir eğitimi'],
      en: ['A live website on your domain', 'A measurement record before sign-off', 'Credentials and a 30-minute walkthrough'],
    },
    yourPart: {
      de: 'Abnahme und Zugang zu Domain und Hosting.',
      tr: 'Onay ve alan adı ile hosting erişimi.',
      en: 'Sign-off, plus access to domain and hosting.',
    },
  },
  {
    index: '06',
    duration: { de: 'fortlaufend', tr: 'süregelen', en: 'ongoing' },
    title: { de: 'Betrieb & Weiterentwicklung', tr: 'İşletme & geliştirme', en: 'Operation & growth' },
    summary: {
      de: 'Auf Wunsch übernehmen wir Updates, Sicherheit und Inhalte. Ohne Wartungspaket bekommen Sie trotzdem alles, was Sie zum Weiterarbeiten brauchen.',
      tr: 'İsterseniz güncellemeleri, güvenliği ve içerikleri biz üstleniriz. Bakım paketi almasanız da devam etmek için gereken her şeyi alırsınız.',
      en: 'On request we take over updates, security and content. Without a care plan you still get everything you need to carry on alone.',
    },
    work: {
      de: [
        'Updates, Backups und Sicherheitsprüfung',
        'Inhaltspflege nach Kontingent',
        'Laufende SEO-Betreuung im größeren Paket',
        'Quartalsbericht: was war, was kommt',
      ],
      tr: [
        'Güncellemeler, yedekler ve güvenlik kontrolleri',
        'Kontenjan dahilinde içerik bakımı',
        'Büyük pakette sürekli SEO çalışması',
        'Üç aylık rapor: ne oldu, sırada ne var',
      ],
      en: [
        'Updates, backups and security checks',
        'Content work within your allowance',
        'Ongoing SEO in the larger plan',
        'A quarterly report: what happened, what is next',
      ],
    },
    output: {
      de: ['Eine Website, die aktuell und erreichbar bleibt', 'Ein Ansprechpartner statt einer Ticketnummer'],
      tr: ['Güncel ve erişilebilir kalan bir web sitesi', 'Bilet numarası değil, bir muhatap'],
      en: ['A website that stays current and reachable', 'A named contact instead of a ticket number'],
    },
    yourPart: {
      de: 'Sagen, was sich ändern soll. Alles Weitere übernehmen wir.',
      tr: 'Neyin değişmesi gerektiğini söyleyin. Gerisini biz üstleniriz.',
      en: 'Tell us what should change. We handle the rest.',
    },
  },
];

/** Regeln der Zusammenarbeit — was auf der Prozessseite unter den Phasen steht. */
export const workingRules: { title: Record<Lang, string>; desc: Record<Lang, string> }[] = [
  {
    title: { de: 'Eine Ansprechperson, durchgehend', tr: 'Baştan sona tek muhatap', en: 'One contact, throughout' },
    desc: {
      de: 'Wer entwirft, entwickelt auch und wartet später. Es gibt niemanden, an den weitergereicht wird — und damit keinen Übergabeverlust.',
      tr: 'Tasarlayan aynı zamanda geliştirir ve sonradan bakımını yapar. Devredilecek kimse yok — dolayısıyla devir kaybı da yok.',
      en: 'Whoever designs also builds and later maintains. There is nobody to hand off to — and so nothing gets lost in handover.',
    },
  },
  {
    title: { de: 'Feedback gesammelt, nicht tröpfchenweise', tr: 'Geri bildirim damla damla değil, toplu', en: 'Feedback collected, not dripping in' },
    desc: {
      de: 'Ein Dokument pro Runde statt zwölf E-Mails über drei Tage. Das ist kein Formalismus — es halbiert die Korrekturzeit.',
      tr: 'Üç güne yayılmış on iki e-posta yerine tur başına tek bir belge. Bu bir formalite değil — revizyon süresini yarıya indirir.',
      en: 'One document per round instead of twelve emails over three days. Not a formality — it halves revision time.',
    },
  },
  {
    title: { de: 'Änderungen nach Freigabe sind Änderungen', tr: 'Onaydan sonraki değişiklikler değişikliktir', en: 'Changes after approval are changes' },
    desc: {
      de: 'Nach der Designfreigabe steht der Umfang. Neue Wünsche sind willkommen, werden aber als Nachtrag beziffert statt still den Termin zu verschieben.',
      tr: 'Tasarım onayından sonra kapsam sabittir. Yeni istekler memnuniyetle karşılanır, ama tarihi sessizce kaydırmak yerine ek iş olarak fiyatlandırılır.',
      en: 'After design approval the scope is set. New wishes are welcome but get quoted as an addendum instead of quietly moving the deadline.',
    },
  },
  {
    title: { de: 'Termine gelten in beide Richtungen', tr: 'Tarihler iki yönde de geçerlidir', en: 'Deadlines apply both ways' },
    desc: {
      de: 'Wenn wir uns verspäten, sagen wir es früh. Wenn Inhalte zwei Wochen zu spät kommen, verschiebt sich der Launch — auch das sagen wir früh.',
      tr: 'Biz gecikirsek erkenden söyleriz. İçerikler iki hafta geç gelirse yayın kayar — bunu da erkenden söyleriz.',
      en: 'If we run late, we say so early. If content arrives two weeks late, the launch moves — and we say that early too.',
    },
  },
];
