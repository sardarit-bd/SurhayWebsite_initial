import type { Lang } from '../i18n/ui';

/**
 * Kategorien der FAQ-Seite (/faq, /en/faq).
 *
 * WARUM EINE EIGENE DATEI
 * Die Fragen selbst liegen als Content Collection (src/content/faq/<lang>/),
 * damit sie im CMS pflegbar bleiben. Die Kategorien gehoeren aber nicht in
 * einen Eintrag, sondern ueber alle: Reihenfolge, Ueberschrift und der Satz
 * unter der Ueberschrift muessen an einer Stelle stehen, sonst driften
 * Filterleiste, Sprungmarken und Sektionen auseinander.
 *
 * Die IDs sind gleichzeitig die Anker der Seite (/faq#preise) und der Wert
 * im Frontmatter jeder Frage. Wer hier eine ID aendert, aendert URLs —
 * dann auch die Markdown-Dateien und public/admin/config.yml nachziehen.
 */

export interface FaqCategory {
  id: string;
  label: Record<Lang, string>;
  /** Ein Satz unter der Ueberschrift — ordnet ein, was in der Gruppe steht. */
  desc: Record<Lang, string>;
}

export const faqCategories: FaqCategory[] = [
  {
    id: 'preise',
    label: { de: 'Preise & Angebot', tr: 'Fiyat & teklif', en: 'Pricing & quotes' },
    desc: {
      de: 'Was eine Website kostet, wie der Festpreis entsteht und was nach dem Launch weiterläuft.',
      tr: 'Bir web sitesinin maliyeti, sabit fiyatın nasıl oluştuğu ve yayından sonra nelerin devam ettiği.',
      en: 'What a website costs, how the fixed price comes about, and what keeps running after launch.',
    },
  },
  {
    id: 'ablauf',
    label: { de: 'Ablauf & Termine', tr: 'Süreç & takvim', en: 'Process & timing' },
    desc: {
      de: 'Wie ein Projekt läuft, wie lange es dauert und woran es am häufigsten hakt.',
      tr: 'Bir projenin nasıl ilerlediği, ne kadar sürdüğü ve en sık nerede takıldığı.',
      en: 'How a project runs, how long it takes, and where it most often stalls.',
    },
  },
  {
    id: 'zusammenarbeit',
    label: { de: 'Zusammenarbeit & Passung', tr: 'İş birliği & uyum', en: 'Working together & fit' },
    desc: {
      de: 'Mit wem Sie es zu tun haben, wie abgestimmt wird — und wann wir absagen.',
      tr: 'Kiminle muhatap olduğunuz, kararların nasıl alındığı — ve ne zaman hayır dediğimiz.',
      en: 'Who you deal with, how we coordinate — and when we say no.',
    },
  },
  {
    id: 'technik',
    label: { de: 'Technik & Hosting', tr: 'Teknik & hosting', en: 'Technology & hosting' },
    desc: {
      de: 'Worauf die Website läuft, wo sie liegt und wem sie am Ende gehört.',
      tr: 'Sitenin neyin üzerinde çalıştığı, nerede durduğu ve sonunda kime ait olduğu.',
      en: 'What the site runs on, where it lives, and who owns it in the end.',
    },
  },
  {
    id: 'pflege',
    label: { de: 'Pflege & Wartung', tr: 'İçerik & bakım', en: 'Content & maintenance' },
    desc: {
      de: 'Wer Inhalte ändert, was ein Wartungspaket abdeckt und was im Störfall passiert.',
      tr: 'İçeriği kimin değiştirdiği, bakım paketinin neyi kapsadığı ve arıza hâlinde ne olduğu.',
      en: 'Who edits content, what a care plan covers, and what happens when something breaks.',
    },
  },
  {
    id: 'bestand',
    label: { de: 'Bestehende Website & Relaunch', tr: 'Mevcut site & yenileme', en: 'Existing site & relaunch' },
    desc: {
      de: 'Übernahme, Umzug und die Frage, ob Rankings einen Relaunch überstehen.',
      tr: 'Devralma, taşıma ve sıralamaların bir yenilemeden sağ çıkıp çıkmadığı sorusu.',
      en: 'Taking over, migrating, and whether rankings survive a relaunch.',
    },
  },
  {
    id: 'recht',
    label: { de: 'Recht & Barrierefreiheit', tr: 'Hukuk & erişilebilirlik', en: 'Legal & accessibility' },
    desc: {
      de: 'Pflichtseiten, Datenschutz, Barrierefreiheit und Lizenzen — technisch umgesetzt, ohne Rechtsberatung.',
      tr: 'Zorunlu sayfalar, veri koruma, erişilebilirlik ve lisanslar — teknik olarak uygulanır, hukuki danışmanlık değildir.',
      en: 'Mandatory pages, privacy, accessibility and licensing — implemented technically, not as legal advice.',
    },
  },
];

/** IDs als Tupel — so kann content.config.ts daraus ein z.enum() bauen. */
export const faqCategoryIds = faqCategories.map((c) => c.id) as [string, ...string[]];
