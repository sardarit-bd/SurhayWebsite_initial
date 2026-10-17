import { z } from 'zod';
import { faqCategoryIds } from './data/faq-categories';

/**
 * Content Collections — gespiegelt zur Decap-CMS-Konfiguration
 * (public/admin/config.yml). Ordnerstruktur pro Sprache:
 * src/content/<collection>/<de|en>/<slug>.md
 *
 * MIGRATION ASTRO → NEXT
 * Die Schemas sind unveraendert. Weggefallen sind nur die beiden Astro-Huellen
 * `defineCollection()` und `glob()`: Next hat keine Content Collections, das
 * Einlesen der Dateien uebernimmt src/lib/content.ts. Geprueft wird weiter mit
 * denselben Zod-Schemas, und weiter zur Bauzeit — ein Schemaverstoss bricht
 * den Build, statt zur Laufzeit durchzurutschen.
 */

export const caseStudySchema = z.object({
  title: z.string(),
  client: z.string(),
  industry: z.string(),
  excerpt: z.string(),
  situation: z.string(),
  solution: z.string(),
  results: z.array(
    z.object({
      value: z.number(),
      prefix: z.string().optional(),
      suffix: z.string().optional(),
      label: z.string(),
    })
  ),
  cover: z.string(),
  coverAlt: z.string(),
  /**
   * Galeriebilder. Zwei Schreibweisen:
   *   - '/pfad.webp'                  rein dekorativ, alt="" (WCAG 1.1.1)
   *   - { src: '…', alt: 'Beschreibung' }  bedeutungstragend
   *
   * Ein Screenshot der gelieferten Arbeit ist in aller Regel das Zweite:
   * Er zeigt, worum es in der Case Study geht. Die kurze Schreibweise
   * bleibt trotzdem erlaubt — fuer Bilder, die wirklich nur Textur sind.
   * Das Layout warnt beim Bauen, wenn sie benutzt wird.
   */
  gallery: z
    .array(z.union([z.string(), z.object({ src: z.string(), alt: z.string() })]))
    .default([]),
  date: z.coerce.date(),
  featured: z.boolean().default(false),
  /**
   * Nur mit `real: true` erscheint die Case Study auf der Startseite.
   * Die Voreinstellung ist bewusst `false`: Ein erfundener Kundenname mit
   * erfundener Kennzahl ist irrefuehrende Werbung (Paragraf 5 UWG) und
   * abmahnfaehig. Erst umschalten, wenn Projekt, Zahlen und Freigabe des
   * Kunden vorliegen.
   */
  real: z.boolean().default(false),
});

export const testimonialSchema = z.object({
  name: z.string(),
  company: z.string(),
  quote: z.string(),
  photo: z.string(),
  order: z.number().default(99),
  /** Siehe `real` bei den Case Studies — gilt hier genauso. */
  real: z.boolean().default(false),
});

export const blogSchema = z.object({
  title: z.string(),
  category: z.string(),
  author: z.string(),
  date: z.coerce.date(),
  metaTitle: z.string().optional(),
  metaDescription: z.string(),
  ogImage: z.string().optional(),
});

export const faqSchema = z.object({
  question: z.string(),
  /**
   * Themengruppe auf /faq — erlaubt sind nur die IDs aus
   * src/data/faq-categories.ts. Ein Tippfehler bricht damit den Build,
   * statt die Frage stillschweigend von der Seite fallen zu lassen.
   */
  category: z.enum(faqCategoryIds),
  /** Reihenfolge innerhalb der Gruppe; die fuenf kleinsten Werte
      stehen zusaetzlich auf der Startseite. */
  order: z.number().default(99),
});

export const collections = {
  'case-studies': caseStudySchema,
  testimonials: testimonialSchema,
  blog: blogSchema,
  faq: faqSchema,
} as const;

export type CollectionKey = keyof typeof collections;
export type CaseStudyData = z.output<typeof caseStudySchema>;
export type TestimonialData = z.output<typeof testimonialSchema>;
export type BlogData = z.output<typeof blogSchema>;
export type FaqData = z.output<typeof faqSchema>;
