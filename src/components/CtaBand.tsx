import { SITE } from '../config';
import { useTranslations, path } from '../i18n/utils';
import { css } from '../lib/css';
import type { LangProp } from '../lib/props';

/**
 * Abschlussband — steht am Ende jeder Unterseite.
 *
 * Auf einer Multipage-Seite endet fast jeder Besuch auf einer Unterseite,
 * nicht auf der Startseite. Ohne einen Abschluss pro Seite laeuft der Besuch
 * dort ins Leere. Zwei Wege: Gespraech oder Konfigurator.
 *
 * Die {' '} im Markup sind kein Zierrat: JSX wirft Whitespace weg, der einen
 * Zeilenumbruch enthaelt, Astro lieferte ihn aus. Zwischen Inline-Inhalt ist
 * das ein sichtbares Leerzeichen — ohne die Einfuegung stuende hier
 * "·Festpreis" statt "· Festpreis".
 */
interface Props extends LangProp {
  title?: string;
  sub?: string;
}

export default function CtaBand({ lang, title, sub }: Props) {
  const t = useTranslations(lang);
  const titel = title ?? t('cta.title');
  const unter = sub ?? t('cta.sub');

  return (
    <section className="dark-section grain" style={css('padding-block: var(--spacing-section-sm);')}>
      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid gap-10 lg:grid-cols-[3fr_2fr] lg:items-end">
          <div>
            <h2 className="h2 h2-sm max-w-2xl" data-reveal>
              {titel}
            </h2>
            <p className="lead mt-5 max-w-xl text-mute-dark" data-reveal style={css('--reveal-delay: 0.08s;')}>
              {unter}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4 lg:justify-end" data-reveal style={css('--reveal-delay: 0.16s;')}>
            <a href={path(lang, 'contact')} className="btn btn-primary">
              {t('cta.primary')}{' '}
              <svg className="btn-arrow h-4 w-4" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path
                  d="M1 8h13M9 3l5 5-5 5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
            </a>
            <a href={path(lang, 'configurator')} className="btn btn-ghost">
              {t('cta.secondary')}
            </a>
          </div>
        </div>
        <p className="mt-10 border-t pt-6 text-sm text-mute-dark" style={css('border-color: var(--line-dark);')}>
          <a href={`mailto:${SITE.email}`} className="link-slide font-semibold">
            {SITE.email}
          </a>{' '}
          <span className="mx-2" aria-hidden="true">
            ·
          </span>{' '}
          {t('trust.1.title')}
        </p>
      </div>
    </section>
  );
}
