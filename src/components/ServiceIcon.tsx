import clsx from 'clsx';
import { serviceIcons, type ServiceId } from '../data/services';
import { scoped } from '../lib/scoped';
import { css } from '../lib/css';

/**
 * Leistungs-Icon — das Erkennungszeichen einer Leistung.
 *
 * EIN ZEICHEN, EINE LEISTUNG
 * Ein Icon steht auf dieser Seite nicht als Schmuck, sondern als Marke fuer
 * eine der vier Leistungen. Es erscheint deshalb nur an vier Stellen: auf den
 * grossen Leistungs-Karten, auf den Karten "Weitere Leistungen", als
 * Sektionsmarke neben "Enthalten" und im Aufklappmenue der Navigation.
 * Prozess-Schritte, Enthalten-Raster, Blog-, Preis- und Prinzipien-Karten
 * bekommen bewusst keines: sobald Icons ueberall stehen, zeigen sie nichts
 * mehr an, sie werden zu Tapete.
 *
 * WARUM EINE KOMPONENTE
 * Der Zeichenstil steht damit an genau einer Stelle. Vorher trug jede
 * Fundstelle ihre eigenen SVG-Attribute — und damit ihre eigene Strichstaerke.
 *
 * STRICHSTAERKE SKALIERT NICHT MIT
 * 1,5 px gelten bei 24 px Darstellungsgroesse. Jede andere Groesse rechnet
 * zurueck, sonst wirkten kleine Icons duenn und grosse fett — als waeren sie
 * mit verschiedenen Stiften gezeichnet:
 *   20 px → 1,80   24 px → 1,50   28 px → 1,29   32 px → 1,13
 *
 * FARBE KOMMT VOM ELTERNELEMENT
 * `stroke="currentColor"`, kein fester Farbwert im SVG. Deshalb genuegt ein
 * Farbwechsel aussen — im Kreis-Hover greift `.fx-clone .text-accent-600`
 * (global.css), ohne dass es eine zweite Icon-Fassung braeuchte.
 *
 * DEKORATIV
 * Die Leistung steht immer als Text daneben, also `aria-hidden` und
 * `focusable="false"`: kein alt-Text, kein <title>, keine Rolle "img" —
 * Screenreader wuerden sonst jede Leistung doppelt vorlesen.
 */
interface Props {
  service: ServiceId;
  /** Darstellungsgroesse in px. Bestimmt zugleich die Strichstaerke. */
  size?: number;
  /** Hiess unter Astro `class`. */
  className?: string;
}

export default function ServiceIcon({ service, size = 24, className }: Props) {
  const strokeWidth = +((1.5 * 24) / size).toFixed(2);

  return scoped(
    'data-c-service-icon',
    <svg
      className={clsx(['service-icon', className])}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={css(`--service-icon-size: ${size}px;`)}
      aria-hidden="true"
      focusable="false"
      dangerouslySetInnerHTML={{ __html: serviceIcons[service] }}
    />
  );
}
