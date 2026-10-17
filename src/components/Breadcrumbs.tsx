import clsx from 'clsx';
import { SITE_HREF } from '../base';
import { useTranslations, localePath } from '../i18n/utils';
import type { LangProp } from '../lib/props';

/**
 * Brotkrumen — Orientierung auf Unterseiten plus BreadcrumbList fuer Google.
 *
 * Erst mit mehreren Ebenen (Leistungen → Webdesign) lohnt sich das; auf der
 * Startseite wird die Komponente gar nicht erst eingebunden.
 */
export interface Crumb {
  label: string;
  /** Letzter Eintrag ohne href — das ist die aktuelle Seite. */
  href?: string;
}

interface Props extends LangProp {
  items: Crumb[];
  /** Auf dunklem Grund die hellen Sekundaerfarben nutzen. */
  dark?: boolean;
}

export default function Breadcrumbs({ items, dark = false, lang }: Props) {
  const t = useTranslations(lang);

  const trail: Crumb[] = [{ label: t('breadcrumb.home'), href: localePath(lang, '/') }, ...items];
  /* Hiess unter Astro `Astro.site?.href ?? SITE.domain`; genau diese
     Reihenfolge steckt jetzt in SITE_HREF (src/base.ts). */
  const siteBase = SITE_HREF;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((crumb, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: crumb.label,
      ...(crumb.href ? { item: new URL(crumb.href, siteBase).href } : {}),
    })),
  };

  return (
    <>
      <nav aria-label={t('breadcrumb.label')} className="text-[0.82rem]">
        <ol className={clsx(['flex flex-wrap items-center gap-x-2 gap-y-1', dark ? 'text-mute-dark' : 'text-mute'])}>
          {trail.map((crumb, i) => (
            <li className="flex items-center gap-2" key={`${i}-${crumb.label}`}>
              {/* Der Schraegstrich stand auf opacity-50 und trug damit 1.97:1.
                  Er ist aria-hidden und rein dekorativ, aber sehende Menschen mit
                  Sehschwaeche lesen die Brotkrumen an ihm entlang. Ohne die
                  Abdunklung erbt er die Sekundaerfarbe der Zeile: 5.13:1 auf
                  Papier, 7.72:1 auf Tinte. Optisch bleibt er das leiseste Zeichen
                  der Zeile — er ist ein Strich. */}
              {i > 0 && <span aria-hidden="true">/</span>}
              {crumb.href ? (
                <a href={crumb.href} className="link-slide tap-24">
                  {crumb.label}
                </a>
              ) : (
                <span aria-current="page" className={clsx([dark ? 'text-paper' : 'text-ink', 'font-semibold'])}>
                  {crumb.label}
                </span>
              )}
            </li>
          ))}
        </ol>
      </nav>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </>
  );
}
