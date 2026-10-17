import type { Lang } from '../i18n/ui';

/**
 * Inhalte der Agenturseite (/agentur, /en/about).
 *
 * Ein Ein-Personen-Studio hat gegenueber einer Agentur genau zwei Vorteile:
 * kurze Wege und niemanden, der etwas weiterreicht. Beides muss benannt
 * werden, sonst liest sich „klein“ nur als „wenig Kapazitaet“. Alles hier
 * ist ueberpruefbar formuliert — keine Zahl, fuer die es keinen Beleg gibt.
 */

/** Die Absaetze des Haupttexts. */
export const story: Record<Lang, string[]> = {
  de: [
    'Surhay Design ist ein Studio für Webdesign und Webentwicklung in Berlin. Wir bauen Websites für kleine und mittlere Unternehmen, Selbstständige und Startups im deutschsprachigen Raum — von der Struktur über das Design bis zur laufenden Wartung.',
    'Die meisten Firmenwebsites scheitern nicht an fehlender Kreativität. Sie scheitern daran, dass niemand entschieden hat, was ein Besucher zuerst lesen soll, wo er klicken soll und was danach passiert. Deshalb steht am Anfang jedes Projekts eine Struktur und kein Moodboard.',
    'Wir arbeiten bewusst ohne Baukasten und ohne gekaufte Themes. Das ist keine Ideologie, sondern eine Rechnung: Ein Theme mit dreißig Plugins ist im ersten Monat günstiger und ab dem zweiten Jahr teurer — in Ladezeit, in Sicherheitslücken und in dem Gefühl, die eigene Website nicht mehr anfassen zu können.',
    'Und wir sagen ab. Wenn ein Vorhaben besser bei einer größeren Agentur, bei einem Shop-Spezialisten oder in einem einfachen Baukasten aufgehoben ist, hören Sie das im Erstgespräch. Das kostet uns Aufträge und Ihnen nichts.',
  ],
  tr: [
    'Surhay Design, Berlin’de bir web tasarım ve geliştirme stüdyosudur. Almanca konuşulan pazardaki küçük ve orta ölçekli şirketler, serbest çalışanlar ve girişimler için web siteleri kuruyoruz — yapıdan tasarıma, oradan da sürekli bakıma kadar.',
    'Çoğu şirket web sitesi yaratıcılık eksikliğinden başarısız olmaz. Bir ziyaretçinin önce neyi okuyacağına, nereye tıklayacağına ve sonrasında ne olacağına kimsenin karar vermemiş olmasından başarısız olur. Bu yüzden her proje bir moodboard ile değil, bir yapı ile başlar.',
    'Bilerek hazır kurgular ve satın alınmış temalar olmadan çalışıyoruz. Bu bir ideoloji değil, basit bir hesap: otuz eklentili bir tema ilk ay daha ucuzdur, ikinci yıldan itibaren daha pahalıdır — yüklenme süresinde, güvenlik açıklarında ve kendi sitenize artık dokunamama duygusunda.',
    'Ve hayır da diyoruz. Bir iş daha büyük bir ajansa, bir e-ticaret uzmanına ya da basit bir hazır kurguya daha uygunsa, bunu ön görüşmede duyarsınız. Bize iş kaybettirir, size hiçbir şeye mal olmaz.',
  ],
  en: [
    'Surhay Design is a web design and development studio in Berlin. We build websites for small and medium-sized companies, freelancers and startups across the German-speaking market — from structure and design through to ongoing maintenance.',
    'Most company websites do not fail for lack of creativity. They fail because nobody decided what a visitor should read first, where they should click, and what happens next. That is why every project starts with a structure, not a moodboard.',
    'We deliberately work without site builders and without bought themes. Not out of ideology, but arithmetic: a theme with thirty plugins is cheaper in month one and more expensive from year two — in load time, in security holes, and in the feeling that you can no longer touch your own website.',
    'And we say no. If a project belongs at a larger agency, with a shop specialist, or in a simple site builder, you hear that in the first call. It costs us work and costs you nothing.',
  ],
};

/** Arbeitsprinzipien — was die Zusammenarbeit konkret praegt. */
export const principles: { title: Record<Lang, string>; desc: Record<Lang, string> }[] = [
  {
    title: { de: 'Struktur vor Optik', tr: 'Görünümden önce yapı', en: 'Structure before looks' },
    desc: {
      de: 'Wir entscheiden erst, was in welcher Reihenfolge gesagt wird, und dann, wie es aussieht. Eine falsche Reihenfolge lässt sich mit keiner Gestaltung retten.',
      tr: 'Önce neyin hangi sırayla söyleneceğine, sonra nasıl görüneceğine karar veririz. Yanlış bir sırayı hiçbir tasarım kurtaramaz.',
      en: 'We decide what is said in what order first, and how it looks second. No amount of styling rescues the wrong order.',
    },
  },
  {
    title: { de: 'Nichts behaupten, was messbar ist', tr: 'Ölçülebilir olanı iddia etmeyiz', en: 'Never claim what can be measured' },
    desc: {
      de: 'Ladezeit, Kontrastwerte und Barrierefreiheit werden geprüft und dokumentiert. Wo eine Zahl fehlt, steht keine.',
      tr: 'Yüklenme süresi, kontrast değerleri ve erişilebilirlik ölçülür ve belgelenir. Rakam yoksa, yerine bir şey uydurulmaz.',
      en: 'Load time, contrast ratios and accessibility are measured and documented. Where a number is missing, none is stated.',
    },
  },
  {
    title: { de: 'Sie sollen uns nicht brauchen', tr: 'Bize ihtiyaç duymamalısınız', en: 'You should not need us' },
    desc: {
      de: 'Quellcode, Zugänge und ein pflegbares CMS gehören Ihnen. Bindung entsteht durch Ergebnisse, nicht durch Abhängigkeit.',
      tr: 'Kaynak kod, erişimler ve yönetilebilir bir içerik sistemi size aittir. Bağlılık sonuçlardan doğar, bağımlılıktan değil.',
      en: 'Source code, credentials and a maintainable CMS are yours. Loyalty comes from results, not dependency.',
    },
  },
  {
    title: { de: 'Weniger, aber fertig', tr: 'Daha az, ama bitmiş', en: 'Less, but finished' },
    desc: {
      de: 'Lieber sechs Seiten, die stimmen, als zwölf, von denen die Hälfte Platzhalter trägt. Umfang wird gekürzt, bevor Qualität gekürzt wird.',
      tr: 'Yarısı yer tutucu olan on iki sayfa yerine, hakkıyla yapılmış altı sayfa. Kaliteden önce kapsam kısılır.',
      en: 'Six pages that hold up beat twelve where half carry placeholders. Scope gets cut before quality does.',
    },
  },
  {
    title: { de: 'Barrierefreiheit ist kein Extra', tr: 'Erişilebilirlik ek hizmet değildir', en: 'Accessibility is not an add-on' },
    desc: {
      de: 'Tastaturbedienung, Kontraste und semantisches HTML sind Teil jeder Seite — nicht ein Posten, den man wegverhandeln kann.',
      tr: 'Klavyeyle kullanım, kontrastlar ve anlamsal HTML her sayfanın parçasıdır — pazarlıkla çıkarılabilecek bir kalem değil.',
      en: 'Keyboard operation, contrast and semantic HTML are part of every page — not a line item to negotiate away.',
    },
  },
  {
    title: { de: 'Rechnungen ohne Überraschung', tr: 'Sürprizsiz faturalar', en: 'Invoices without surprises' },
    desc: {
      de: 'Festpreis vor Projektstart, Zahlungsplan in drei Schritten, keine Stundenzettel. Nachträge werden vorher beziffert.',
      tr: 'Başlamadan önce sabit fiyat, üç adımlı ödeme planı, saat çizelgesi yok. Ek işler önceden fiyatlandırılır.',
      en: 'A fixed price before we start, payment in three steps, no timesheets. Additions get quoted in advance.',
    },
  },
];

/** Technik, offen benannt — Kompetenzsignal fuer Entscheider mit IT im Haus. */
export const stackGroups: { label: Record<Lang, string>; items: string[] }[] = [
  { label: { de: 'Design', tr: 'Tasarım', en: 'Design' }, items: ['Figma', 'Designsysteme', 'Variable Fonts', 'WCAG 2.2 AA'] },
  { label: { de: 'Frontend', tr: 'Frontend', en: 'Frontend' }, items: ['Astro', 'TypeScript', 'Tailwind CSS', 'Web Components'] },
  { label: { de: 'Inhalte', tr: 'İçerik', en: 'Content' }, items: ['Git-basiertes CMS', 'Markdown', 'Mehrsprachigkeit', 'Bildoptimierung'] },
  { label: { de: 'Betrieb', tr: 'İşletme', en: 'Operations' }, items: ['GitHub Actions', 'Netlify / Hostinger', 'Uptime-Monitoring', 'Automatische Backups'] },
  { label: { de: 'Messen', tr: 'Ölçüm', en: 'Measurement' }, items: ['Lighthouse', 'Search Console', 'Plausible', 'Matomo'] },
];

/** Was wir NICHT machen — spart beiden Seiten Gespraeche. */
export const notOurThing: Record<Lang, string[]> = {
  de: [
    'Große Onlineshops mit tausenden Artikeln — dafür gibt es Spezialisten',
    'Social-Media-Betreuung und bezahlte Werbung',
    'Reine Logo-Aufträge ohne Website',
    'Rettung von WordPress-Installationen, die seit Jahren kein Update gesehen haben',
  ],
  tr: [
    'Binlerce ürünlü büyük çevrimiçi mağazalar — bunun için uzmanlar var',
    'Sosyal medya yönetimi ve ücretli reklam',
    'Web sitesi olmadan yalnızca logo işleri',
    'Yıllardır güncelleme görmemiş WordPress kurulumlarının kurtarılması',
  ],
  en: [
    'Large online shops with thousands of items — there are specialists for that',
    'Social media management and paid advertising',
    'Logo-only commissions without a website',
    'Rescuing WordPress installs that have not seen an update in years',
  ],
};

/** Fakten zur Zusammenarbeit — ersetzen erfundene Kennzahlen. */
export const facts: { value: Record<Lang, string>; label: Record<Lang, string> }[] = [
  {
    value: { de: '1', tr: '1', en: '1' },
    label: {
      de: 'Ansprechperson vom Erstgespräch bis nach dem Launch',
      tr: 'muhatap — ön görüşmeden yayın sonrasına kadar',
      en: 'contact from the first call until after launch',
    },
  },
  {
    value: { de: '24 h', tr: '24 sa.', en: '24 h' },
    label: {
      de: 'Antwortzeit auf jede Anfrage, werktags meist schneller',
      tr: 'her talebe yanıt süresi, hafta içi çoğu zaman daha hızlı',
      en: 'reply time on any enquiry, usually faster on working days',
    },
  },
  {
    value: { de: '2', tr: '2', en: '2' },
    label: {
      de: 'Korrekturrunden im Design, im Festpreis enthalten',
      tr: 'tasarımda revizyon turu, sabit fiyata dahil',
      en: 'revision rounds in design, included in the fixed price',
    },
  },
  {
    /* Arbeitssprachen — nicht die Sprachen dieser Website. Tuerkisch steht
       hier bewusst nicht: Projekte laufen weiterhin auf Deutsch und
       Englisch. */
    value: { de: 'DE · EN', tr: 'DE · EN', en: 'DE · EN' },
    label: {
      de: 'Arbeitssprachen, remote im gesamten DACH-Raum',
      tr: 'çalışma dilleri, Almanca konuşulan tüm bölgede uzaktan',
      en: 'working languages, remote across the DACH region',
    },
  },
];
