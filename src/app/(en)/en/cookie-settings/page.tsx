import { altPaths, path, useTranslations } from '@/i18n/utils';
import { SITE } from '@/config';
import Legal from '@/layouts/Legal';
import { astroPathname } from '@/lib/props';

/**
 * Cookie-Seite (EN) — Uebersetzung der deutschen Fassung.
 *
 * Verbindlich bleibt src/pages/cookie-einstellungen.astro. Wird dort die
 * Bestandsaufnahme geaendert, muss diese Datei und tr/cerez-ayarlari.astro
 * mitgezogen werden.
 */
export default function Page() {
  const lang = 'en' as const;
  const t = useTranslations(lang);

  return (
    <Legal title={t('legal.cookies.title')} description={t('legal.cookies.desc')} kind="cookies" alternates={altPaths('cookies')}  lang={lang}
      pathname={astroPathname('/en/cookie-settings')}
    >
      <p>
        In short: this website sets no cookies and stores nothing on your device. There is therefore nothing to
        configure here — and that is why no consent window appears on your first visit. This page explains what that
        means technically, and what happens should it ever change.
      </p>

      <h2>Why there is no cookie banner here</h2>
      <p>
        This website stores no cookies on your device and uses neither local storage nor session storage. No analytics,
        audience measurement or marketing tools are in use. No storage requiring consent under § 25 TDDDG takes place —
        and without such storage, a banner would be nothing but a click you would have to dismiss for no reason.
      </p>

      <h2>What this website stores on your device</h2>
      <p>The list below is complete. It reflects the technical state of the website, not an intention.</p>

      <div className="table-scroll" role="region" aria-labelledby="storage-table" tabIndex={0}>
        <table>
          <caption id="storage-table">Storage and data transfer at a glance</caption>
          <thead>
            <tr>
              <th scope="col">Area</th>
              <th scope="col">What is stored on your device</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Cookies</th>
              <td><strong>None.</strong> Neither our own nor third-party ones — not even technically necessary ones.</td>
            </tr>
            <tr>
              <th scope="row">Local storage, session storage</th>
              <td><strong>Nothing.</strong> The website writes to neither of them anywhere.</td>
            </tr>
            <tr>
              <th scope="row">Language choice</th>
              <td>
                <strong>Nothing.</strong> The chosen language is part of the page address (<code>/</code>,{' '}
                <code>/tr/</code>, <code>/en/</code>), so it does not need to be stored.
              </td>
            </tr>
            <tr>
              <th scope="row">Fonts</th>
              <td>
                <strong>Only the ordinary browser cache.</strong> Inter and Bricolage Grotesque are hosted on our own
                server. There is no connection to Google Fonts or any other font provider.
              </td>
            </tr>
            <tr>
              <th scope="row">Analytics, statistics, advertising</th>
              <td><strong>Nothing.</strong> No analytics or tracking tool is embedded, no pixel and no ad network.</td>
            </tr>
            <tr>
              <th scope="row">Embedded content</th>
              <td>
                <strong>Nothing.</strong> No maps, videos, social media buttons or other content from third-party servers
                are embedded.
              </td>
            </tr>
            <tr>
              <th scope="row">Appointment booking</th>
              <td>
                <strong>Nothing.</strong> Cal.com is reached through an ordinary link. Only when you click it do you
                leave this website; nothing is transmitted to the provider before that.
              </td>
            </tr>
            <tr>
              <th scope="row">Enquiry form and configurator</th>
              <td>
                <strong>Nothing.</strong> Your entries exist only in the form itself and disappear when you leave the
                page without submitting.
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>What is processed nonetheless</h2>
      <p>
        Without storage on your device, processing does not drop to zero: on every website visit your browser transmits
        technically necessary details to the server, and when you write to us we process what you enter. Both — server
        log files and the enquiry form — are covered with purpose, legal basis and retention period in the{' '}
        <a href={path('en', 'privacy')}>privacy policy</a>.
      </p>

      <h2>If this ever changes</h2>
      <p>
        Should we embed something in future that requires consent, this website will first receive a consent window that
        blocks the resource in question until you agree — and the “Cookie settings” link in the footer will then open
        that window so you can change your decision at any time. Until then, what is written above applies.
      </p>
      <p>
        We are happy to answer questions at <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
      </p>
    </Legal>
  );
}
