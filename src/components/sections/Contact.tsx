import { scoped } from '../../lib/scoped';
import { css } from '../../lib/css';
import type { LangProp } from '../../lib/props';
import { SITE, formspreeAction } from '../../config';
import { localePath, routes } from '../../i18n/utils';
import { InlineScript } from '../../lib/inline-once';

const contactContent = {
  de: {
    eyebrow: 'Kontakt', title: 'Lassen Sie uns über Ihr Projekt sprechen.',
    sub: 'Erzählen Sie kurz, worum es geht — Sie erhalten innerhalb von 24 Stunden eine ehrliche Einschätzung. Oder stellen Sie sich Ihre Wunsch-Website direkt im Konfigurator zusammen.',
    name: 'Name', email: 'E-Mail', message: 'Ihr Projekt in 2–3 Sätzen', submit: 'Anfrage senden', or: 'oder', configurator: 'Zum Konfigurator', privacyNote: 'Mit dem Absenden stimmen Sie der Verarbeitung Ihrer Daten zu — Details in unserer', privacyLink: 'Datenschutzerklärung', success: 'Danke! Ihre Nachricht ist angekommen — Sie hören innerhalb von 24 Stunden von uns.', error: 'Das hat leider nicht geklappt. Schreiben Sie uns direkt an', direct: 'Direkt', country: 'Deutschland', response: 'Antwort in 24 Stunden',
    route1: { step: 'Weg 1', title: 'Kurz schreiben', desc: 'Zwei, drei Sätze zum Vorhaben genügen. Sie bekommen innerhalb von 24 Stunden eine ehrliche Einschätzung — inklusive grober Preisspanne.', subject: 'Projektanfrage über surhay.design', cta: 'E-Mail schreiben' },
    route2: { step: 'Weg 2', title: 'Direkt einen Termin nehmen', desc: '30 bis 45 Minuten, kostenlos und unverbindlich. Oder Sie stellen vorab im Konfigurator zusammen, was Sie brauchen.', cta: 'Termin wählen' },
  },
  tr: {
    eyebrow: 'İletişim', title: 'Projenizi konuşalım.',
    sub: 'Kısaca neyle ilgili olduğunu anlatın — 24 saat içinde dürüst bir değerlendirme alırsınız. Ya da hayalinizdeki siteyi doğrudan yapılandırıcıda oluşturun.',
    name: 'Ad Soyad', email: 'E-posta', message: 'Projeniz 2–3 cümleyle', submit: 'Talebi gönder', or: 'veya', configurator: 'Yapılandırıcıya git', privacyNote: 'Göndererek verilerinizin işlenmesini kabul etmiş olursunuz — ayrıntılar', privacyLink: 'gizlilik metnimizde', success: 'Teşekkürler! Mesajınız bize ulaştı — 24 saat içinde sizden haber alacaksınız.', error: 'Maalesef bu işe yaramadı. Bize doğrudan şuradan yazın:', direct: 'Doğrudan', country: 'Almanya', response: '24 saat içinde yanıt',
    route1: { step: '1. yol', title: 'Kısaca yazın', desc: 'Projeyle ilgili iki üç cümle yeter. 24 saat içinde dürüst bir değerlendirme alırsınız — kaba bir fiyat aralığıyla birlikte.', subject: 'surhay.design üzerinden proje talebi', cta: 'E-posta yazın' },
    route2: { step: '2. yol', title: 'Doğrudan randevu alın', desc: '30–45 dakika, ücretsiz ve bağlayıcı değil. Ya da önce yapılandırıcıda neye ihtiyacınız olduğunu belirleyin.', cta: 'Saat seçin' },
  },
  en: {
    eyebrow: 'Contact', title: 'Let’s talk about your project.',
    sub: 'Tell us briefly what it is about — you will get an honest assessment within 24 hours. Or configure your ideal website right away.',
    name: 'Name', email: 'Email', message: 'Your project in 2–3 sentences', submit: 'Send inquiry', or: 'or', configurator: 'To the configurator', privacyNote: 'By submitting, you agree to the processing of your data — details in our', privacyLink: 'privacy policy', success: 'Thank you! Your message has arrived — you will hear from us within 24 hours.', error: 'That did not work, unfortunately. Email us directly at', direct: 'Direct', country: 'Germany', response: 'Reply within 24 hours',
    route1: { step: 'Option 1', title: 'Send a short message', desc: 'Two or three sentences about the project are enough. You get an honest assessment within 24 hours — including a rough price range.', subject: 'Project enquiry via surhay.design', cta: 'Write an email' },
    route2: { step: 'Option 2', title: 'Book a slot directly', desc: '30 to 45 minutes, free and without obligation. Or put together what you need in the configurator first.', cta: 'Pick a time' },
  },
} as const;

/**
 * Kontakt — letzter Block der Seite, drei Wege zum Gespräch.
 *
 * FORMULAR ODER NICHT
 * Das Formular postet an Formspree — nicht an SITE.formEndpoint, das der
 * Kontaktseite gehoert. Solange in SITE.formspreeId noch der
 * Auslieferungswert steht, geht jede abgeschickte Anfrage verloren — der
 * teuerste denkbare Fehler auf einer Verkaufsseite. Deshalb rendert die
 * Sektion in diesem Fall gar kein Formular, sondern die beiden Wege, die
 * ohne Konfiguration funktionieren: Direktnachricht per E-Mail und
 * Terminbuchung. Sobald die Form-ID eingetragen ist, erscheint das Formular
 * automatisch wieder.
 */

export default function Contact({ lang }: LangProp) {
  const copy = contactContent[lang];
  const privacyHref = localePath(lang, `/${routes[lang].privacy}`);
  const configuratorHref = localePath(lang, `/${routes[lang].configurator}`);

  return (
    <>
      {scoped(
        'data-c-contact',
        <section id="contact" className="dark-section grain scroll-mt-24" style={css("padding-block: var(--spacing-section);")}>
          <div className="relative mx-auto grid max-w-7xl gap-14 px-5 md:px-8 lg:grid-cols-[3fr_2fr] lg:gap-24">
            <div>
              <p className="eyebrow text-mute-dark" data-reveal="">{copy.eyebrow}</p>
              <h2 className="h2 reveal-mask mt-5" data-reveal="">
                <span className="reveal-line">{copy.title}</span>
              </h2>
              <p className="lead mt-5 max-w-xl text-mute-dark" data-reveal="" style={css("--reveal-delay: 0.08s;")}>{copy.sub}</p>

              {
                formspreeAction ? (
                  /* Kontaktformular: drei Felder, statisch via Formspree. */
                  <form id="contact-form" action={formspreeAction} method="POST" className="mt-10 max-w-xl space-y-5" data-reveal="" style={css("--reveal-delay: 0.16s;")}>
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label htmlFor="cf-name" className="mb-2 block text-sm font-semibold">
                          {copy.name}
                        </label>
                        <input id="cf-name" name="name" type="text" required autoComplete="name" className="cf-input w-full rounded-xl border bg-transparent px-4 py-3.5" />
                      </div>
                      <div>
                        <label htmlFor="cf-email" className="mb-2 block text-sm font-semibold">
                          {copy.email}
                        </label>
                        <input id="cf-email" name="email" type="email" required autoComplete="email" className="cf-input w-full rounded-xl border bg-transparent px-4 py-3.5" />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="cf-message" className="mb-2 block text-sm font-semibold">
                        {copy.message}
                      </label>
                      <textarea id="cf-message" name="message" rows={4} required className="cf-input w-full resize-y rounded-xl border bg-transparent px-4 py-3.5" />
                    </div>

                    <div className="flex flex-wrap items-center gap-4">
                      <button type="submit" className="btn btn-primary">
                        {copy.submit}
                        <svg className="btn-arrow h-4 w-4" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                          <path d="M1 8h13M9 3l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </button>
                      <span className="text-sm text-mute-dark">{copy.or}</span>
                      <a href={configuratorHref} className="btn btn-ghost">
                        {copy.configurator}
                      </a>
                    </div>

                    <p className="text-xs leading-relaxed text-mute-dark">
                      {copy.privacyNote}
                      <a href={privacyHref} className="link-slide ml-1 font-semibold">
                        {copy.privacyLink}
                      </a>
                      .
                    </p>

                    <p id="form-success" className="hidden rounded-xl bg-accent-600 px-5 py-4 font-medium text-white" role="status">
                      {copy.success}
                    </p>
                    <p id="form-error" className="hidden rounded-xl border border-red-400 px-5 py-4 text-sm" role="alert">
                      {copy.error}
                      <a href={`mailto:${SITE.email}`} className="link-slide font-semibold">
                        {SITE.email}
                      </a>
                    </p>
                  </form>
                ) : (
                  /* Ohne Form-ID: die zwei Wege, die ohne Konfiguration tragen. */
                  <div className="mt-10 max-w-xl" data-reveal="" style={css("--reveal-delay: 0.16s;")}>
                    <ol className="space-y-8">
                      <li>
                        <p className="eyebrow text-mute-dark">{copy.route1.step}</p>
                        <p className="mt-3 font-display text-xl font-bold tracking-tight">{copy.route1.title}</p>
                        <p className="mt-2 text-[0.95rem] leading-relaxed text-mute-dark">{copy.route1.desc}</p>
                        <a href={`mailto:${SITE.email}?subject=${encodeURIComponent(copy.route1.subject)}`} className="btn btn-primary mt-5">
                          {copy.route1.cta}
                          <svg className="btn-arrow h-4 w-4" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                            <path d="M1 8h13M9 3l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </a>
                      </li>
                      <li className="border-t pt-8" style={css("border-color: var(--line-dark);")}>
                        <p className="eyebrow text-mute-dark">{copy.route2.step}</p>
                        <p className="mt-3 font-display text-xl font-bold tracking-tight">{copy.route2.title}</p>
                        <p className="mt-2 text-[0.95rem] leading-relaxed text-mute-dark">{copy.route2.desc}</p>
                        <div className="mt-5 flex flex-wrap items-center gap-4">
                          <a href={SITE.calendarUrl} className="btn btn-ghost" rel="noopener noreferrer" target="_blank">
                            {copy.route2.cta}
                          </a>
                          <a href={configuratorHref} className="link-slide font-semibold">
                            {copy.configurator}
                          </a>
                        </div>
                      </li>
                    </ol>
                  </div>
                )
              }
            </div>

            <aside className="lg:pt-24" data-reveal="" style={css("--reveal-delay: 0.24s;")}>
              <div className="rounded-2xl border p-8" style={css("border-color: var(--line-dark); background: var(--color-ink-2);")}>
                <p className="eyebrow text-mute-dark">{copy.direct}</p>
                <a href={`mailto:${SITE.email}`} className="link-slide mt-4 block font-display text-xl font-semibold break-all">
                  {SITE.email}
                </a>
                <p className="mt-6 flex items-center gap-2 text-sm text-mute-dark">
                  <span className="pulse-dot inline-flex h-2.5 w-2.5 rounded-full bg-accent-ctx"></span>
                  {copy.response}
                </p>
                <div className="mt-8 border-t pt-6 text-sm text-mute-dark" style={css("border-color: var(--line-dark);")}>
                  {SITE.name}<br />
                  {SITE.city}, {copy.country}
                </div>
              </div>
            </aside>
          </div>
        </section>
      )}
      <InlineScript name="contact" />
    </>
  );
}
