import { altPaths, useTranslations } from '@/i18n/utils';
import { LEGAL, SITE, legalAddressInline } from '@/config';
import Legal from '@/layouts/Legal';
import { astroPathname } from '@/lib/props';

export default function Page() {
  const lang = 'en' as const;
  const t = useTranslations(lang);

  return (
    <Legal title={t('legal.privacy.title')} description={t('legal.privacy.desc')} kind="privacy" alternates={altPaths('privacy')}  lang={lang}
      pathname={astroPathname('/en/privacy')}
    >
      <p>
        Protecting your personal data matters to us. This website is built statically: it sets no cookies, embeds no
        tracking or analytics services and uses no advertising networks. Below we explain which data is processed
        nonetheless — and why.
      </p>

      <h2>1. Controller</h2>
      <p>
        The controller for data processing on this website within the meaning of the GDPR is:<br />
        {legalAddressInline('en')}<br />
        Email: <a href={`mailto:${SITE.email}`}>{SITE.email}</a><br />
        Phone: {LEGAL.phone}
      </p>
      <p>
        We are not legally required to appoint a data protection officer; for any privacy-related matter please use the
        contact details above.
      </p>

      <h2>2. No cookies, no tracking</h2>
      <p>
        This website stores no cookies on your device and uses neither local storage nor session storage. No analytics,
        audience measurement or marketing tools are in use. That is also why there is no cookie banner here: no storage
        requiring consent under § 25 TDDDG takes place.
      </p>

      <h2>3. Hosting and server log files</h2>
      <p>
        This website is hosted by {LEGAL.host}. When you access the site, your browser transmits technically necessary
        data which the host stores in server log files:
      </p>
      <ul>
        <li>IP address of the requesting device</li>
        <li>date and time of access</li>
        <li>name and URL of the retrieved file</li>
        <li>volume of data transferred and notification of successful retrieval</li>
        <li>browser type, browser version and operating system</li>
        <li>referrer URL (the previously visited page)</li>
      </ul>
      <p>
        The legal basis is Art. 6 (1) (f) GDPR. Our legitimate interest lies in the technically error-free delivery,
        stability and security of the website. This data is not merged with other data sources and is not evaluated for
        marketing purposes. Log files are deleted after 30 days at the latest. A data processing agreement pursuant to
        Art. 28 GDPR is in place with the host.
      </p>

      {/* Mirror of section 4 in datenschutz.astro — see the pre-launch checklist there. */}
      <h2>4. Contact form</h2>
      <p>
        Through the enquiry form on the contact page we process exclusively the details you enter there yourself:
      </p>
      <ul>
        <li>Required: name, email address, your message and the selected service</li>
        <li>Optional: phone number and company</li>
        <li>
          A technical timestamp of the page load and a field invisible to you — both serve solely to fend off automated
          spam submissions and are not evaluated for any other purpose
        </li>
      </ul>
      <p>
        We do not store an IP address in this context. Transmission is encrypted via HTTPS only. Your entries are not
        passed on to analytics or marketing services. For spam protection we deliberately use neither Google reCAPTCHA
        nor any comparable service that transfers data to the USA.
      </p>
      <p>
        The legal basis is your consent pursuant to Art. 6 (1) (a) GDPR, which you give explicitly before submitting and
        can withdraw at any time with effect for the future, and Art. 6 (1) (b) GDPR (pre-contractual measures taken at
        your request). Withdrawal does not affect the lawfulness of processing carried out until then.
      </p>
      <p>
        To deliver the form we use the service Formspree, provided by Formspree, Inc., 1007 N Orange St, Wilmington, DE
        19801, USA. Formspree forwards the message to our mailbox. The transfer to the USA is based on the EU standard
        contractual clauses pursuant to Art. 46 (2) (c) GDPR; Formspree is additionally certified under the EU-U.S. Data
        Privacy Framework. Please note that access to the data by US authorities cannot be entirely ruled out. A data
        processing agreement pursuant to Art. 28 GDPR is in place with the provider.
      </p>
      <p>
        We store your inquiry and the associated data until the purpose of storage no longer applies — that is, until
        your request has been fully handled — and at most until statutory retention periods expire. Alternatively, you
        can contact us informally at any time by email at <a href={`mailto:${SITE.email}`}>{SITE.email}</a>; in that
        case no third-party provider is involved.
      </p>

      <h2>5. Configurator</h2>
      <p>
        The website configurator runs entirely in your browser. Your selection is neither stored nor transmitted to us
        or to third parties. Only if you deliberately submit an inquiry at the end does section 4 apply.
      </p>

      <h2>6. Appointment booking</h2>
      <p>
        For initial consultations we link to the external service <a href={SITE.calendarUrl} rel="noopener noreferrer" target="_blank">Cal.com<span className="sr-only"> (opens in a new tab)</span></a>.
        This is a plain link — no data is transmitted to Cal.com when you visit this website. Only when you click the
        link do you leave our site; from that point on, the provider's privacy policy applies.
      </p>

      <h2>7. Fonts and external content</h2>
      <p>
        All fonts used are hosted locally on our server. There is no connection to Google Fonts or other font providers.
        Likewise, no external scripts, maps, videos or social media plugins are loaded from third-party servers. Your IP
        address is therefore not transmitted to any third-party provider.
      </p>

      <h2>8. SSL/TLS encryption</h2>
      <p>
        For security reasons and to protect the transmission of confidential content, this website uses SSL/TLS
        encryption. You can recognise an encrypted connection by the browser address bar switching from “http://” to
        “https://”.
      </p>

      <h2>9. Your rights</h2>
      <p>You have the following rights towards us at any time:</p>
      <ul>
        <li>access to the data processed about you (Art. 15 GDPR)</li>
        <li>rectification of inaccurate data (Art. 16 GDPR)</li>
        <li>erasure of your data (Art. 17 GDPR)</li>
        <li>restriction of processing (Art. 18 GDPR)</li>
        <li>data portability (Art. 20 GDPR)</li>
        <li>objection to processing (Art. 21 GDPR)</li>
        <li>withdrawal of a given consent with effect for the future (Art. 7 (3) GDPR)</li>
      </ul>
      <p>
        An informal message to <a href={`mailto:${SITE.email}`}>{SITE.email}</a> is sufficient to exercise these rights.
      </p>

      <h2>10. Right to object</h2>
      <p>
        Where we process data on the basis of a legitimate interest pursuant to Art. 6 (1) (f) GDPR, you have the right
        to object to that processing at any time on grounds relating to your particular situation. We will then no
        longer process the data concerned unless we can demonstrate compelling legitimate grounds which override your
        interests, rights and freedoms, or the processing serves to assert, exercise or defend legal claims.
      </p>

      <h2>11. Right to lodge a complaint with a supervisory authority</h2>
      <p>
        Without prejudice to any other legal remedy, you have the right to lodge a complaint with a data protection
        supervisory authority — in particular in the Member State of your residence, place of work or the place of the
        alleged infringement. The authority responsible for us is the {LEGAL.authority} ({' '}
        <a href={LEGAL.authorityUrl} rel="noopener noreferrer" target="_blank">{LEGAL.authorityUrl.replace('https://', '')}<span className="sr-only"> (opens in a new tab)</span></a>).
      </p>

      <h2>12. Changes to this privacy policy</h2>
      <p>
        We update this privacy policy whenever the legal situation or our processing activities change. The version
        current at the time applies to each of your visits. You will find the date at the end of this page.
      </p>
    </Legal>
  );
}
