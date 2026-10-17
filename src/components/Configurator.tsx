import { scoped } from '../lib/scoped';
import { css } from '../lib/css';
import type { LangProp } from '../lib/props';
import { SITE, formspreeAction } from '../config';
import { getLangFromUrl } from '../i18n/utils';
import { localeMeta } from '../i18n/ui';
import { InlineScript } from '../lib/inline-once';

export default function Configurator({ lang }: LangProp) {
  /* Konfigurator-Texte & Preis-/Zeitlogik — bewusst lokal statt in ui.ts,
     damit Optionen, Preise und Dauern an einer Stelle gepflegt werden.
     weeks: [min, max] Basis-Projektdauer; Extras addieren `weeks` Wochen. */
  const dict = {
    de: {
      eyebrow: 'Konfigurator',
      title: 'Stellen Sie sich Ihre Website zusammen.',
      sub: 'Vier kurze Schritte — am Ende sehen Sie Gesamtpreis und Projektdauer und fragen direkt ein Angebot an.',
      stepNames: ['Website-Typ', 'Extras', 'Wartung', 'Zusammenfassung'],
      progressTemplate: 'Schritt {c} von {t}',
      next: 'Weiter',
      back: 'Zurück',
      typeLegend: 'Was für eine Website brauchen Sie?',
      extrasLegend: 'Welche Extras sollen dazu?',
      extrasHint: 'Optional — alles lässt sich später erweitern.',
      careLegend: 'Wartung nach dem Launch?',
      contactLegend: 'Wohin dürfen wir das Angebot schicken?',
      name: 'Name',
      email: 'E-Mail',
      notes: 'Anmerkungen (optional)',
      summaryTitle: 'Ihre Konfiguration',
      priceLabel: 'Geschätzter Gesamtpreis',
      durationLabel: 'Geschätzte Projektdauer',
      from: 'ab',
      approx: 'ca.',
      weeksUnit: 'Wochen',
      custom: 'individuell — wir beraten Sie',
      durationCustom: 'nach Beratung',
      monthlyNote: '+ Wartung ab 89 €/Monat',
      disclaimer: 'Unverbindliche Schätzung. Den Festpreis erhalten Sie nach dem kostenlosen Erstgespräch.',
      included: 'inklusive',
      submit: 'Konfiguration anfragen',
      success: 'Danke! Ihre Konfiguration ist angekommen — Sie erhalten innerhalb von 24 Stunden ein Angebot.',
      error: 'Das hat leider nicht geklappt. Schreiben Sie uns direkt an',
      types: [
        { id: 'onepager', price: 2900, weeks: [3, 4], label: 'OnePager', desc: 'Eine starke Seite mit allen Sektionen — ideal für Selbstständige und fokussierte Angebote.' },
        { id: 'website', price: 5900, weeks: [5, 7], label: 'Mehrseitige Website', desc: 'Bis 8 Unterseiten inklusive CMS — für Unternehmen mit mehr Inhalt.' },
        { id: 'shop', price: 8900, weeks: [7, 10], label: 'Onlineshop', desc: 'Produkte, Warenkorb, Bezahlung — verkaufen rund um die Uhr.' },
        { id: 'unsure', price: null, weeks: null, label: 'Noch unsicher', desc: 'Kein Problem — wir finden im Erstgespräch gemeinsam das richtige Format.' },
      ],
      extras: [
        { id: 'cms', price: 600, weeks: 0, freeFor: ['website', 'shop'], label: 'CMS zur eigenen Pflege', desc: 'Texte und Bilder selbst ändern — ohne Technikkenntnisse.' },
        { id: 'bilingual', price: 900, weeks: 1, label: 'Zweisprachig (DE/EN)', desc: 'Beide Sprachen mit sauberem SEO-Setup.' },
        { id: 'blog', price: 400, weeks: 0, label: 'Blog / News-Bereich', desc: 'Artikel selbst veröffentlichen, gut für Google.' },
        { id: 'booking', price: 500, weeks: 0, label: 'Online-Terminbuchung', desc: 'Termine rund um die Uhr, ohne E-Mail-Pingpong.' },
        { id: 'seo', price: 600, weeks: 0, label: 'SEO-Startpaket', desc: 'Keyword-Recherche, Meta-Daten, lokale Sichtbarkeit.' },
        { id: 'copy', price: 800, weeks: 1, label: 'Texterstellung', desc: 'Professionelle Website-Texte, die verkaufen.' },
        { id: 'branding', price: 1200, weeks: 2, label: 'Logo & Branding', desc: 'Logo, Farben, Typografie — ein Auftritt aus einem Guss.' },
      ],
      care: [
        { id: 'care-yes', label: 'Ja, Wartungspaket', desc: 'Updates, Backups, Support — ab 89 €/Monat, monatlich kündbar.' },
        { id: 'care-no', label: 'Nein, Übergabe an mich', desc: 'Sie erhalten alles übergeben, inklusive Einweisung.' },
        { id: 'care-later', label: 'Später entscheiden', desc: 'Kein Problem — das hat bis zum Launch Zeit.' },
      ],
    },
    tr: {
      eyebrow: 'Yapılandırıcı',
      title: 'Web sitenizi kendiniz oluşturun.',
      sub: 'Dört kısa adım — sonunda toplam fiyatı ve proje süresini görür, doğrudan teklif istersiniz.',
      stepNames: ['Site tipi', 'Ekstralar', 'Bakım', 'Özet'],
      progressTemplate: 'Adım {c} / {t}',
      next: 'Devam',
      back: 'Geri',
      typeLegend: 'Nasıl bir web sitesine ihtiyacınız var?',
      extrasLegend: 'Hangi ekstralar eklensin?',
      extrasHint: 'İsteğe bağlı — her şey sonradan genişletilebilir.',
      careLegend: 'Yayından sonra bakım?',
      contactLegend: 'Teklifi nereye gönderelim?',
      name: 'Ad Soyad',
      email: 'E-posta',
      notes: 'Notlar (isteğe bağlı)',
      summaryTitle: 'Yapılandırmanız',
      priceLabel: 'Tahmini toplam fiyat',
      durationLabel: 'Tahmini proje süresi',
      from: 'başlangıç',
      approx: 'yakl.',
      weeksUnit: 'hafta',
      custom: 'özel — birlikte belirleriz',
      durationCustom: 'görüşmeden sonra',
      monthlyNote: '+ aylık 89 €’dan başlayan bakım',
      disclaimer: 'Bağlayıcı olmayan tahmin. Sabit fiyatı ücretsiz ön görüşmeden sonra alırsınız.',
      included: 'dahil',
      submit: 'Yapılandırma için teklif iste',
      success: 'Teşekkürler! Yapılandırmanız bize ulaştı — 24 saat içinde bir teklif alacaksınız.',
      error: 'Maalesef bu işe yaramadı. Bize doğrudan şuradan yazın:',
      types: [
        { id: 'onepager', price: 2900, weeks: [3, 4], label: 'Tek sayfa', desc: 'Tüm bölümleri içeren güçlü tek bir sayfa — serbest çalışanlar ve odaklı teklifler için ideal.' },
        { id: 'website', price: 5900, weeks: [5, 7], label: 'Çok sayfalı web sitesi', desc: 'İçerik sistemi dahil 8 alt sayfaya kadar — daha fazla içeriği olan şirketler için.' },
        { id: 'shop', price: 8900, weeks: [7, 10], label: 'Çevrimiçi mağaza', desc: 'Ürünler, sepet, ödeme — günün her saati satış.' },
        { id: 'unsure', price: null, weeks: null, label: 'Henüz emin değilim', desc: 'Sorun değil — doğru formatı ön görüşmede birlikte buluruz.' },
      ],
      extras: [
        { id: 'cms', price: 600, weeks: 0, freeFor: ['website', 'shop'], label: 'Kendi yönetiminiz için içerik sistemi', desc: 'Metin ve görselleri kendiniz değiştirin — teknik bilgi gerekmez.' },
        { id: 'bilingual', price: 900, weeks: 1, label: 'İki dilli (DE/EN)', desc: 'Her iki dil de temiz bir SEO kurulumuyla.' },
        { id: 'blog', price: 400, weeks: 0, label: 'Blog / haber alanı', desc: 'Yazıları kendiniz yayınlayın, Google için iyi.' },
        { id: 'booking', price: 500, weeks: 0, label: 'Çevrimiçi randevu', desc: 'Günün her saati randevu, e-posta trafiği olmadan.' },
        { id: 'seo', price: 600, weeks: 0, label: 'SEO başlangıç paketi', desc: 'Anahtar kelime araştırması, meta veriler, yerel görünürlük.' },
        { id: 'copy', price: 800, weeks: 1, label: 'Metin yazarlığı', desc: 'Satış getiren profesyonel site metinleri.' },
        { id: 'branding', price: 1200, weeks: 2, label: 'Logo & marka kimliği', desc: 'Logo, renkler, tipografi — bütünlüklü bir görünüm.' },
      ],
      care: [
        { id: 'care-yes', label: 'Evet, bakım paketi', desc: 'Güncellemeler, yedekler, destek — aylık 89 €’dan başlar, aylık iptal edilebilir.' },
        { id: 'care-no', label: 'Hayır, bana devredin', desc: 'Her şeyi devir eğitimiyle birlikte teslim alırsınız.' },
        { id: 'care-later', label: 'Sonra karar vereyim', desc: 'Sorun değil — bunun yayına kadar zamanı var.' },
      ],
    },
    en: {
      eyebrow: 'Configurator',
      title: 'Configure your website.',
      sub: 'Four short steps — at the end you see the total price and project duration and request an offer right away.',
      stepNames: ['Website type', 'Extras', 'Maintenance', 'Summary'],
      progressTemplate: 'Step {c} of {t}',
      next: 'Next',
      back: 'Back',
      typeLegend: 'What kind of website do you need?',
      extrasLegend: 'Which extras should be included?',
      extrasHint: 'Optional — everything can be extended later.',
      careLegend: 'Maintenance after launch?',
      contactLegend: 'Where should we send the offer?',
      name: 'Name',
      email: 'Email',
      notes: 'Notes (optional)',
      summaryTitle: 'Your configuration',
      priceLabel: 'Estimated total price',
      durationLabel: 'Estimated project duration',
      from: 'from',
      approx: 'approx.',
      weeksUnit: 'weeks',
      custom: 'custom — we will advise you',
      durationCustom: 'after consultation',
      monthlyNote: '+ maintenance from €89/month',
      disclaimer: 'Non-binding estimate. You receive a fixed quote after the free consultation.',
      included: 'included',
      submit: 'Request offer',
      success: 'Thank you! Your configuration has arrived — you will receive an offer within 24 hours.',
      error: 'That did not work, unfortunately. Email us directly at',
      types: [
        { id: 'onepager', price: 2900, weeks: [3, 4], label: 'One-pager', desc: 'One strong page with every section — ideal for freelancers and focused offers.' },
        { id: 'website', price: 5900, weeks: [5, 7], label: 'Multi-page website', desc: 'Up to 8 subpages including CMS — for companies with more content.' },
        { id: 'shop', price: 8900, weeks: [7, 10], label: 'Online shop', desc: 'Products, cart, payments — sell around the clock.' },
        { id: 'unsure', price: null, weeks: null, label: 'Not sure yet', desc: 'No problem — we will find the right format together in the consultation.' },
      ],
      extras: [
        { id: 'cms', price: 600, weeks: 0, freeFor: ['website', 'shop'], label: 'CMS for self-service editing', desc: 'Change copy and images yourself — no technical skills needed.' },
        { id: 'bilingual', price: 900, weeks: 1, label: 'Bilingual (DE/EN)', desc: 'Both languages with a clean SEO setup.' },
        { id: 'blog', price: 400, weeks: 0, label: 'Blog / news section', desc: 'Publish articles yourself, great for Google.' },
        { id: 'booking', price: 500, weeks: 0, label: 'Online booking', desc: 'Appointments around the clock, no email ping-pong.' },
        { id: 'seo', price: 600, weeks: 0, label: 'SEO starter package', desc: 'Keyword research, meta data, local visibility.' },
        { id: 'copy', price: 800, weeks: 1, label: 'Copywriting', desc: 'Professional website copy that sells.' },
        { id: 'branding', price: 1200, weeks: 2, label: 'Logo & branding', desc: 'Logo, colors, typography — one coherent identity.' },
      ],
      care: [
        { id: 'care-yes', label: 'Yes, maintenance plan', desc: 'Updates, backups, support — from €89/month, cancel monthly.' },
        { id: 'care-no', label: 'No, hand it over to me', desc: 'You receive a full handover, walkthrough included.' },
        { id: 'care-later', label: 'Decide later', desc: 'No problem — that can wait until launch.' },
      ],
    },
  }[lang];

  const numberLocale = localeMeta[lang].intl;

  return (
    <>
      {scoped(
        'data-c-configurator',
        <section id="config-top" className="mx-auto max-w-3xl scroll-mt-24 px-5 pt-36 pb-24 md:px-8">
          <p className="eyebrow text-mute">{dict.eyebrow}</p>
          <h1 className="display intro-rise mt-5" style={css("font-size: clamp(2.2rem, 5.5vw, 3.6rem); --intro-delay: 0.05s;")}>
            {dict.title}
          </h1>
          <p className="lead intro-rise mt-6 text-mute" style={css("--intro-delay: 0.2s;")}>{dict.sub}</p>

          {/* Fortschrittsbalken (wird per JS gesteuert; ohne JS ausgeblendet) */}
          <div id="config-progress" className="mt-12" hidden>
            {/* Eine Live-Region um beides: Vorher lag aria-live nur auf der Zahl,
                der Name des Schrittes wechselte stumm. Jetzt wird „Schritt 2 von 4,
                Extras" als ein Satz angesagt (WCAG 4.1.3). */}
            <div className="flex items-baseline justify-between gap-4 text-sm font-semibold" aria-live="polite">
              <span id="progress-label" data-template={dict.progressTemplate}></span>
              <span id="progress-step-name" className="text-mute"></span>
            </div>
            {/* Der Balken wiederholt nur, was die Zeile darueber sagt. */}
            <div className="mt-3 h-1.5 overflow-hidden rounded-full" style={css("background: var(--line);")} aria-hidden="true">
              <div id="progress-fill" className="h-full w-full origin-left rounded-full bg-accent-600" style={css("transform: scaleX(0.25); transition: transform var(--dur-panel) var(--ease-panel);")}>
              </div>
            </div>
          </div>

          {/* Der Konfigurator postet an Formspree, nicht an SITE.formEndpoint: seine
              Felder sind andere als die des Anfrageformulars (siehe config.ts). */}
          <form id="config-form" action={formspreeAction ?? undefined} method="POST" className="mt-10">
            <input type="hidden" name="_subject" defaultValue="Konfigurator-Anfrage — Surhay Design" />
            <input type="hidden" name="konfiguration" id="config-summary" defaultValue="" />

            {/* Schritt 1 — Website-Typ */}
            <div className="cfg-step" data-step-name={dict.stepNames[0]} tabIndex={-1} role="group" aria-labelledby="cfg-legend-0">
              <fieldset>
                {/* Die Legende ist zugleich die Ueberschrift des Schrittes: ohne sie
                    haette die Seite nur eine h1 und danach nichts mehr, obwohl
                    optisch vier Kapitel folgen (WCAG 1.3.1). <h2> in <legend> ist
                    gueltiges HTML — der Inhalt darf Ueberschriften enthalten. */}
                <legend id="cfg-legend-0"><h2 className="h3">{dict.typeLegend}</h2></legend>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {
                    dict.types.map((type) => (
                      <label className="option-card">
                        <input type="radio" name="typ" defaultValue={type.label} data-price={type.price ?? ''} data-weeks-min={type.weeks?.[0] ?? ''} data-weeks-max={type.weeks?.[1] ?? ''} data-type-id={type.id} defaultChecked={type.id === 'onepager'} className="sr-only" />
                        <span className="flex items-baseline justify-between gap-3">
                          <span className="option-title font-display text-lg font-bold tracking-tight">{type.label}</span>
                          <span className="option-price text-sm font-semibold whitespace-nowrap">
                            {type.price ? `${dict.from} ${type.price.toLocaleString(numberLocale)} €` : '—'}
                          </span>
                        </span>
                        <span className="mt-2 block text-sm leading-relaxed text-mute">{type.desc}</span>
                      </label>
                    ))
                  }
                </div>
              </fieldset>
            </div>

            {/* Schritt 2 — Extras */}
            <div className="cfg-step" data-step-name={dict.stepNames[1]} tabIndex={-1} role="group" aria-labelledby="cfg-legend-1">
              <fieldset>
                {/* Die Legende ist zugleich die Ueberschrift des Schrittes: ohne sie
                    haette die Seite nur eine h1 und danach nichts mehr, obwohl
                    optisch vier Kapitel folgen (WCAG 1.3.1). <h2> in <legend> ist
                    gueltiges HTML — der Inhalt darf Ueberschriften enthalten. */}
                <legend id="cfg-legend-1"><h2 className="h3">{dict.extrasLegend}</h2></legend>
                <p className="mt-2 text-sm text-mute">{dict.extrasHint}</p>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {
                    dict.extras.map((extra) => (
                      <label className="option-card">
                        <input type="checkbox" name="extras" defaultValue={extra.label} data-price={extra.price} data-weeks={extra.weeks} data-free-for={extra.freeFor?.join(' ') ?? ''} className="sr-only" />
                        <span className="flex items-baseline justify-between gap-3">
                          <span className="option-title font-display text-lg font-bold tracking-tight">{extra.label}</span>
                          <span className="option-price text-sm font-semibold whitespace-nowrap" data-price-label="" data-included-label={dict.included}>
                            + {extra.price.toLocaleString(numberLocale)} €
                          </span>
                        </span>
                        <span className="mt-2 block text-sm leading-relaxed text-mute">{extra.desc}</span>
                      </label>
                    ))
                  }
                </div>
              </fieldset>
            </div>

            {/* Schritt 3 — Wartung */}
            <div className="cfg-step" data-step-name={dict.stepNames[2]} tabIndex={-1} role="group" aria-labelledby="cfg-legend-2">
              <fieldset>
                {/* Die Legende ist zugleich die Ueberschrift des Schrittes: ohne sie
                    haette die Seite nur eine h1 und danach nichts mehr, obwohl
                    optisch vier Kapitel folgen (WCAG 1.3.1). <h2> in <legend> ist
                    gueltiges HTML — der Inhalt darf Ueberschriften enthalten. */}
                <legend id="cfg-legend-2"><h2 className="h3">{dict.careLegend}</h2></legend>
                <div className="mt-6 grid gap-4 sm:grid-cols-3">
                  {
                    dict.care.map((option) => (
                      <label className="option-card">
                        <input type="radio" name="wartung" defaultValue={option.label} data-care={option.id} defaultChecked={option.id === 'care-later'} className="sr-only" />
                        <span className="option-title font-display text-lg font-bold tracking-tight">{option.label}</span>
                        <span className="mt-2 block text-sm leading-relaxed text-mute">{option.desc}</span>
                      </label>
                    ))
                  }
                </div>
              </fieldset>
            </div>

            {/* Schritt 4 — Zusammenfassung: Gesamtpreis, Projektdauer, Kontakt */}
            <div className="cfg-step" data-step-name={dict.stepNames[3]} tabIndex={-1} role="group" aria-labelledby="cfg-legend-3">
              <div className="rounded-2xl bg-ink p-8 text-paper">
                <h2 id="cfg-legend-3" className="eyebrow text-mute-dark">{dict.summaryTitle}</h2>
                <ul id="summary-list" className="mt-5 space-y-2 text-[0.95rem]"></ul>

                <div className="mt-6 grid gap-6 border-t pt-6 sm:grid-cols-2" style={css("border-color: var(--line-dark);")}>
                  <div>
                    <p className="text-sm text-mute-dark">{dict.priceLabel}</p>
                    <p className="mt-1 font-display text-3xl font-bold tracking-tight text-accent-400 md:text-4xl" id="estimate" data-from={dict.from} data-custom={dict.custom}>
                    </p>
                    <p className="mt-1 hidden text-sm text-mute-dark" id="estimate-monthly">{dict.monthlyNote}</p>
                  </div>
                  <div>
                    <p className="text-sm text-mute-dark">{dict.durationLabel}</p>
                    <p className="mt-1 font-display text-3xl font-bold tracking-tight md:text-4xl" id="duration" data-approx={dict.approx} data-weeks-unit={dict.weeksUnit} data-custom={dict.durationCustom}>
                    </p>
                  </div>
                </div>

                <p className="mt-5 text-xs leading-relaxed text-mute-dark">{dict.disclaimer}</p>
              </div>

              <fieldset className="mt-10">
                <legend><h2 className="h3">{dict.contactLegend}</h2></legend>
                <div className="mt-6 grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="cfg-name" className="mb-2 block text-sm font-semibold">{dict.name}</label>
                    <input id="cfg-name" name="name" type="text" required autoComplete="name" className="w-full rounded-xl border bg-white px-4 py-3.5 cfg-input" style={css("border-color: var(--line-control);")} />
                  </div>
                  <div>
                    <label htmlFor="cfg-email" className="mb-2 block text-sm font-semibold">{dict.email}</label>
                    <input id="cfg-email" name="email" type="email" required autoComplete="email" className="w-full rounded-xl border bg-white px-4 py-3.5 cfg-input" style={css("border-color: var(--line-control);")} />
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="cfg-notes" className="mb-2 block text-sm font-semibold">{dict.notes}</label>
                    <textarea id="cfg-notes" name="anmerkungen" rows={3} className="w-full resize-y rounded-xl border bg-white px-4 py-3.5 cfg-input" style={css("border-color: var(--line-control);")}></textarea>
                  </div>
                </div>
              </fieldset>

              <button type="submit" id="cfg-submit" className="btn btn-primary mt-8 w-full sm:w-auto">
                {dict.submit}
                <svg className="btn-arrow h-4 w-4" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M1 8h13M9 3l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
              </button>

              <p id="cfg-success" className="mt-4 hidden rounded-xl bg-accent-600 px-5 py-4 text-sm font-medium text-white" role="status">
                {dict.success}
              </p>
              {/* Rahmen war border-red-400 und trug 2.77:1 — unter den 3:1 aus
                  WCAG 1.4.11. Dieselbe Fehlerfarbe wie im Anfrageformular: 6.54:1
                  als Text auf Weiss, 5.36:1 als Rahmen. */}
              <p id="cfg-error" className="cfg-error-box mt-4 hidden rounded-xl border px-5 py-4 text-sm" role="alert">
                {dict.error}
                <a href={`mailto:${SITE.email}`} className="link-slide font-semibold">{SITE.email}</a>
              </p>

              {/* Ohne Endpunkt UND ohne JavaScript: der Browser wuerde beim Klick auf
                  "Absenden" ein natives POST an die aktuelle Seite schicken — die
                  Konfiguration ginge damit an den Webserver dieser Website, statt
                  nirgendwohin. Der Guard im Skript oben greift nur mit JavaScript,
                  deshalb hier zusaetzlich der statische Riegel: Button ausblenden,
                  Hinweis mit E-Mail-Adresse stehen lassen. Der Inhalt von <noscript>
                  wird nur geparst, wenn Skripte abgeschaltet sind — fuer alle anderen
                  aendert sich nichts. Faellt von selbst weg, sobald ein Endpunkt in
                  src/config.ts gepflegt ist. */}
              {!formspreeAction && (
                <noscript>
                  <style>{"#cfg-submit { display: none; }"}</style>
                  <p className="mt-4 rounded-xl border border-red-400 px-5 py-4 text-sm" role="alert">
                    {dict.error}
                    <a href={`mailto:${SITE.email}`} className="link-slide font-semibold">{SITE.email}</a>
                  </p>
                </noscript>
              )}
            </div>

            {/* Wizard-Navigation (nur mit JS sichtbar) */}
            <div id="wizard-nav" className="mt-10 flex items-center justify-between gap-4" hidden>
              <button type="button" id="wizard-back" className="btn btn-ghost invisible">
                <svg className="h-4 w-4 rotate-180" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M1 8h13M9 3l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
                {dict.back}
              </button>
              <button type="button" id="wizard-next" className="btn btn-primary">
                {dict.next}
                <svg className="btn-arrow h-4 w-4" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M1 8h13M9 3l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
              </button>
            </div>
          </form>
        </section>
      )}
      <InlineScript name="configurator" />
    </>
  );
}
