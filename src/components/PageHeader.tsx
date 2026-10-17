import clsx from 'clsx';
import Breadcrumbs, { type Crumb } from './Breadcrumbs';
import { css } from '../lib/css';
import type { LangProp } from '../lib/props';

/**
 * Kopfbereich jeder Unterseite — Brotkrumen, Eyebrow, H1, Lead.
 *
 * Eine eigene Komponente, damit alle Unterseiten denselben Auftakt haben:
 * gleicher Abstand unter der fixierten Leiste, gleiche Typo-Stufen, gleiche
 * Position der Brotkrumen. Ohne sie driften zwoelf Seiten in zwoelf Richtungen.
 */
interface Props extends LangProp {
  eyebrow: string;
  title: string;
  lead?: string;
  crumbs: Crumb[];
  /** Zusatzangaben unter dem Lead, z. B. Preisrahmen und Dauer. */
  meta?: { label: string; value: string }[];
  dark?: boolean;
}

export default function PageHeader({ eyebrow, title, lead, crumbs, meta = [], dark = false, lang }: Props) {
  return (
    <section
      className={clsx(['page-header relative', dark && 'dark-section grain'])}
      style={css('padding-top: clamp(7.5rem, 12vw, 10rem); padding-bottom: clamp(2.5rem, 5vw, 4rem);')}
    >
      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <Breadcrumbs items={crumbs} dark={dark} lang={lang} />

        <p className={clsx(['eyebrow mt-8', dark ? 'text-mute-dark' : 'text-mute'])}>{eyebrow}</p>

        <h1
          className="display intro-rise mt-5 max-w-4xl"
          style={css('font-size: clamp(2.4rem, 6.5vw, 4.75rem); --intro-delay: 0.05s;')}
        >
          {title}
        </h1>

        {lead && (
          <p
            className={clsx(['lead intro-rise mt-7 max-w-2xl', dark ? 'text-mute-dark' : 'text-mute'])}
            style={css('--intro-delay: 0.18s;')}
          >
            {lead}
          </p>
        )}

        {meta.length > 0 && (
          <dl
            className="intro-rise mt-10 flex flex-wrap gap-x-12 gap-y-5 border-t pt-6"
            style={css(`border-color: ${dark ? 'var(--line-dark)' : 'var(--line)'}; --intro-delay: 0.3s;`)}
          >
            {meta.map((item) => (
              <div key={item.label}>
                <dt className={clsx(['text-xs font-semibold uppercase tracking-wider', dark ? 'text-mute-dark' : 'text-mute'])}>
                  {item.label}
                </dt>
                <dd className="mt-1.5 font-display text-lg font-bold tracking-tight">{item.value}</dd>
              </div>
            ))}
          </dl>
        )}
      </div>
    </section>
  );
}
