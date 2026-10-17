import { scoped, Fremd } from '../lib/scoped';
import { css } from '../lib/css';
import type { ReactNode } from 'react';
import type { LangProp, PfadProp } from '../lib/props';
import Base from './Base';
import { useTranslations, localePath, routes } from '../i18n/utils';
import { legalUpdated } from '../config';
import { defaultLang, localeMeta, type Lang } from '../i18n/ui';

/** Die drei Rechtsseiten — zugleich die Schluessel in `routes`. */
type LegalKind = 'imprint' | 'privacy' | 'cookies';

/* Der durchgereichte Inhalt laeuft durch <Fremd>: die Rechtstexte stehen in
   den Seiten (src/app/(de)/impressum/page.tsx und den acht Schwestern), nicht
   hier. Ohne die Grenze bekaeme fremdes Markup die Kennung dieses Bauteils
   und dessen Regeln griffen darauf — unter Astro taten sie das nicht. */
interface Props extends LangProp, PfadProp {
  title: string;
  description: string;
  alternates: Record<Lang, string>;
  /** Steuert, auf welche Schwesterseiten unten verlinkt wird. */
  kind: LegalKind;
  /** Hiess unter Astro <slot />. */
  children?: ReactNode;
}
export default function Legal({ title, description, alternates, kind, lang, children, pathname }: Props) {

  const t = useTranslations(lang);

  /* Rechtstexte tragen bewusst kein noindex — sie waeren fuer Suchmaschinen
     sonst praktisch nicht vorhanden. Impressum, Datenschutz und die
     Cookie-Seite muessen leicht erkennbar und unmittelbar erreichbar sein,
     sind also regulaer indexierbar und Teil der Sitemap.

     Die drei Rechtsseiten verweisen wechselseitig aufeinander: Wer auf einer
     von ihnen steht, erreicht die beiden anderen ohne Umweg ueber die
     Fusszeile. Die eigene Seite faellt aus der Aufzaehlung heraus. */
  const siblings = ([
    ['imprint', 'footer.imprint'],
    ['privacy', 'footer.privacy'],
    ['cookies', 'footer.cookies'],
  ] as const)
    .filter(([key]) => key !== kind)
    .map(([key, label]) => ({ href: localePath(lang, `/${routes[lang][key]}`), label: t(label) }));

  /* Rechtstexte sind auf Deutsch verbindlich — das Angebot richtet sich an den
     deutschen Markt. Die uebersetzten Fassungen sind Lesehilfen und sagen das
     ueber dem Text, nicht im Kleingedruckten darunter. Die deutsche Seite
     traegt den Hinweis folgerichtig nicht. */
  const bindingNotice = lang !== defaultLang;

  return scoped(
    'data-c-legal',
    <Base pathname={pathname} lang={lang} title={`${title} | Surhay Design`} description={description} alternates={alternates}>
      <section className="mx-auto max-w-7xl px-5 pt-36 pb-24 md:px-8">
        <a href={localePath(lang, '/')} className="link-slide inline-flex items-center gap-2 text-sm font-semibold text-mute">
          <svg className="h-3.5 w-3.5 rotate-180" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M1 8h13M9 3l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
          </svg>
          {t('legal.backHome')}
        </a>
        <h1 className="display mt-8" style={css("font-size: clamp(2.2rem, 5vw, 3.8rem);")}>{title}</h1>

        {
          bindingNotice && (
            <aside className="legal-notice mt-10" role="note">
              <p className="font-display text-base font-bold tracking-tight">{t('legal.binding.title')}</p>
              <p className="mt-2 text-[0.93rem] leading-relaxed text-mute">{t('legal.binding.text')}</p>
              <a href={alternates[defaultLang]} className="link-slide mt-3 inline-block text-sm font-semibold" hrefLang={localeMeta[defaultLang].hreflang} lang={localeMeta[defaultLang].hreflang}>
                {t('legal.binding.link')} <span aria-hidden="true">→</span>
              </a>
            </aside>
          )
        }

        <div className="prose mt-12">
          <Fremd>{children}</Fremd>
        </div>

        <div className="mt-16 flex flex-wrap items-center gap-x-8 gap-y-3 border-t pt-8 text-sm text-mute" style={css("border-color: var(--line);")}>
          <p>{t('legal.updated')}: {legalUpdated(lang)}</p>
          {siblings.map((page) => <a href={page.href} className="link-slide font-semibold">{page.label}</a>)}
        </div>
      </section>
    </Base>
  );
}

