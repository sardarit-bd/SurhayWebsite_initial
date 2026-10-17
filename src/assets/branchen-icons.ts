/**
 * Branchen-Icons — lokale Sprite-Datei.
 *
 * Die Pfade stammen aus Tabler Icons (Outline-Set, MIT-Lizenz,
 * https://tabler.io/icons) und liegen hier einmalig ab. Das Paket wird
 * bewusst NICHT als Dependency installiert: sechs Branchen mal sechs Symbole
 * rechtfertigen kein Bundle, das die LCP-Kette verlaengert.
 *
 * Enthalten ist nur der Inhalt des <svg>-Elements. Der Rahmen (viewBox,
 * stroke, stroke-width) sitzt in der Komponente, damit alle Icons einheitlich
 * eingefaerbt und skaliert werden.
 *
 * Ergaenzen: SVG aus dem Outline-Set holen, das unsichtbare Platzhalter-
 * Rechteck entfernen, Rest als neuen Eintrag aufnehmen.
 */
export const branchenIcons: Record<string, string> = {
  "book": "<path d=\"M3 19a9 9 0 0 1 9 0a9 9 0 0 1 9 0\" /> <path d=\"M3 6a9 9 0 0 1 9 0a9 9 0 0 1 9 0\" /> <path d=\"M3 6l0 13\" /> <path d=\"M12 6l0 13\" /> <path d=\"M21 6l0 13\" />",
  "briefcase": "<path d=\"M3 9a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v9a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2l0 -9\" /> <path d=\"M8 7v-2a2 2 0 0 1 2 -2h4a2 2 0 0 1 2 2v2\" /> <path d=\"M12 12l0 .01\" /> <path d=\"M3 13a20 20 0 0 0 18 0\" />",
  "building-arch": "<path d=\"M3 21l18 0\" /> <path d=\"M4 21v-15a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v15\" /> <path d=\"M9 21v-8a3 3 0 0 1 6 0v8\" />",
  "bulb": "<path d=\"M3 12h1m8 -9v1m8 8h1m-15.4 -6.4l.7 .7m12.1 -.7l-.7 .7\" /> <path d=\"M9 16a5 5 0 1 1 6 0a3.5 3.5 0 0 0 -1 3a2 2 0 0 1 -4 0a3.5 3.5 0 0 0 -1 -3\" /> <path d=\"M9.7 17l4.6 0\" />",
  "calculator": "<path d=\"M4 5a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2l0 -14\" /> <path d=\"M8 8a1 1 0 0 1 1 -1h6a1 1 0 0 1 1 1v1a1 1 0 0 1 -1 1h-6a1 1 0 0 1 -1 -1l0 -1\" /> <path d=\"M8 14l0 .01\" /> <path d=\"M12 14l0 .01\" /> <path d=\"M16 14l0 .01\" /> <path d=\"M8 17l0 .01\" /> <path d=\"M12 17l0 .01\" /> <path d=\"M16 17l0 .01\" />",
  "calendar-check": "<path d=\"M11.5 21h-5.5a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v6\" /> <path d=\"M16 3v4\" /> <path d=\"M8 3v4\" /> <path d=\"M4 11h16\" /> <path d=\"M15 19l2 2l4 -4\" />",
  "chart-line": "<path d=\"M4 19l16 0\" /> <path d=\"M4 15l4 -6l4 2l4 -5l4 4\" />",
  "clipboard-heart": "<path d=\"M9 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2h-2\" /> <path d=\"M9 5a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2\" /> <path d=\"M11.993 16.75l2.747 -2.815a1.9 1.9 0 0 0 0 -2.632a1.775 1.775 0 0 0 -2.56 0l-.183 .188l-.183 -.189a1.775 1.775 0 0 0 -2.56 0a1.899 1.899 0 0 0 0 2.632l2.738 2.825l.001 -.009\" />",
  "compass": "<path d=\"M8 16l2 -6l6 -2l-2 6l-6 2\" /> <path d=\"M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0\" /> <path d=\"M12 3l0 2\" /> <path d=\"M12 19l0 2\" /> <path d=\"M3 12l2 0\" /> <path d=\"M19 12l2 0\" />",
  "dental": "<path d=\"M12 5.5c-1.074 -.586 -2.583 -1.5 -4 -1.5c-2.1 0 -4 1.247 -4 5c0 4.899 1.056 8.41 2.671 10.537c.573 .756 1.97 .521 2.567 -.236c.398 -.505 .819 -1.439 1.262 -2.801c.292 -.771 .892 -1.504 1.5 -1.5c.602 0 1.21 .737 1.5 1.5c.443 1.362 .864 2.295 1.262 2.8c.597 .759 2 .993 2.567 .237c1.615 -2.127 2.671 -5.637 2.671 -10.537c0 -3.74 -1.908 -5 -4 -5c-1.423 0 -2.92 .911 -4 1.5\" /> <path d=\"M12 5.5l3 1.5\" />",
  "file-certificate": "<path d=\"M14 3v4a1 1 0 0 0 1 1h4\" /> <path d=\"M5 8v-3a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2h-5\" /> <path d=\"M3 14a3 3 0 1 0 6 0a3 3 0 1 0 -6 0\" /> <path d=\"M4.5 17l-1.5 5l3 -1.5l3 1.5l-1.5 -5\" />",
  "file-check": "<path d=\"M14 3v4a1 1 0 0 0 1 1h4\" /> <path d=\"M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2\" /> <path d=\"M9 15l2 2l4 -4\" />",
  "first-aid-kit": "<path d=\"M8 8v-2a2 2 0 0 1 2 -2h4a2 2 0 0 1 2 2v2\" /> <path d=\"M4 10a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2l0 -8\" /> <path d=\"M10 14h4\" /> <path d=\"M12 12v4\" />",
  "folders": "<path d=\"M9 3h3l2 2h5a2 2 0 0 1 2 2v7a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-9a2 2 0 0 1 2 -2\" /> <path d=\"M17 16v2a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-9a2 2 0 0 1 2 -2h2\" />",
  "gavel": "<path d=\"M13 10l7.383 7.418c.823 .82 .823 2.148 0 2.967a2.11 2.11 0 0 1 -2.976 0l-7.407 -7.385\" /> <path d=\"M6 9l4 4\" /> <path d=\"M13 10l-4 -4\" /> <path d=\"M3 21h7\" /> <path d=\"M6.793 15.793l-3.586 -3.586a1 1 0 0 1 0 -1.414l2.293 -2.293l.5 .5l3 -3l-.5 -.5l2.293 -2.293a1 1 0 0 1 1.414 0l3.586 3.586a1 1 0 0 1 0 1.414l-2.293 2.293l-.5 -.5l-3 3l.5 .5l-2.293 2.293a1 1 0 0 1 -1.414 0\" />",
  "hammer": "<path d=\"M11.414 10l-7.383 7.418a2.091 2.091 0 0 0 0 2.967a2.11 2.11 0 0 0 2.976 0l7.407 -7.385\" /> <path d=\"M18.121 15.293l2.586 -2.586a1 1 0 0 0 0 -1.414l-7.586 -7.586a1 1 0 0 0 -1.414 0l-2.586 2.586a1 1 0 0 0 0 1.414l7.586 7.586a1 1 0 0 0 1.414 0\" />",
  "heartbeat": "<path d=\"M19.5 13.572l-7.5 7.428l-2.896 -2.868m-6.117 -8.104a5 5 0 0 1 9.013 -3.022a5 5 0 1 1 7.5 6.572\" /> <path d=\"M3 13h2l2 3l2 -6l1 3h3\" />",
  "home": "<path d=\"M5 12l-2 0l9 -9l9 9l-2 0\" /> <path d=\"M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7\" /> <path d=\"M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6\" />",
  "layout-grid": "<path d=\"M4 5a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1l0 -4\" /> <path d=\"M14 5a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1l0 -4\" /> <path d=\"M4 15a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1l0 -4\" /> <path d=\"M14 15a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1l0 -4\" />",
  "mood-smile": "<path d=\"M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0\" /> <path d=\"M9 10l.01 0\" /> <path d=\"M15 10l.01 0\" /> <path d=\"M9.5 15a3.5 3.5 0 0 0 5 0\" />",
  "pencil": "<path d=\"M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4\" /> <path d=\"M13.5 6.5l4 4\" />",
  "pill": "<path d=\"M4.5 12.5l8 -8a4.94 4.94 0 0 1 7 7l-8 8a4.94 4.94 0 0 1 -7 -7\" /> <path d=\"M8.5 8.5l7 7\" />",
  "receipt": "<path d=\"M5 21v-16a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v16l-3 -2l-2 2l-2 -2l-2 2l-2 -2l-3 2m4 -14h6m-6 4h6m-2 4h2\" />",
  "report-money": "<path d=\"M9 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2h-2\" /> <path d=\"M9 5a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2\" /> <path d=\"M14 11h-2.5a1.5 1.5 0 0 0 0 3h1a1.5 1.5 0 0 1 0 3h-2.5\" /> <path d=\"M12 17v1m0 -8v1\" />",
  "ruler-measure": "<path d=\"M19.875 12c.621 0 1.125 .512 1.125 1.143v5.714c0 .631 -.504 1.143 -1.125 1.143h-15.875a1 1 0 0 1 -1 -1v-5.857c0 -.631 .504 -1.143 1.125 -1.143h15.75\" /> <path d=\"M9 12v2\" /> <path d=\"M6 12v3\" /> <path d=\"M12 12v3\" /> <path d=\"M18 12v3\" /> <path d=\"M15 12v2\" /> <path d=\"M3 3v4\" /> <path d=\"M3 5h18\" /> <path d=\"M21 3v4\" />",
  "ruler": "<path d=\"M5 4h14a1 1 0 0 1 1 1v5a1 1 0 0 1 -1 1h-7a1 1 0 0 0 -1 1v7a1 1 0 0 1 -1 1h-5a1 1 0 0 1 -1 -1v-14a1 1 0 0 1 1 -1\" /> <path d=\"M4 8l2 0\" /> <path d=\"M4 12l3 0\" /> <path d=\"M4 16l2 0\" /> <path d=\"M8 4l0 2\" /> <path d=\"M12 4l0 3\" /> <path d=\"M16 4l0 2\" />",
  "scale": "<path d=\"M7 20l10 0\" /> <path d=\"M6 6l6 -1l6 1\" /> <path d=\"M12 3l0 17\" /> <path d=\"M9 12l-3 -6l-3 6a3 3 0 0 0 6 0\" /> <path d=\"M21 12l-3 -6l-3 6a3 3 0 0 0 6 0\" />",
  "shield-check": "<path d=\"M11.46 20.846a12 12 0 0 1 -7.96 -14.846a12 12 0 0 0 8.5 -3a12 12 0 0 0 8.5 3a12 12 0 0 1 -.09 7.06\" /> <path d=\"M15 19l2 2l4 -4\" />",
  "sparkles": "<path d=\"M16 18a2 2 0 0 1 2 2a2 2 0 0 1 2 -2a2 2 0 0 1 -2 -2a2 2 0 0 1 -2 2m0 -12a2 2 0 0 1 2 2a2 2 0 0 1 2 -2a2 2 0 0 1 -2 -2a2 2 0 0 1 -2 2m-7 12a6 6 0 0 1 6 -6a6 6 0 0 1 -6 -6a6 6 0 0 1 -6 6a6 6 0 0 1 6 6\" />",
  "stairs": "<path d=\"M22 5h-5v5h-5v5h-5v5h-5\" />",
  "stethoscope": "<path d=\"M6 4h-1a2 2 0 0 0 -2 2v3.5a5.5 5.5 0 0 0 11 0v-3.5a2 2 0 0 0 -2 -2h-1\" /> <path d=\"M8 15a6 6 0 1 0 12 0v-3\" /> <path d=\"M11 3v2\" /> <path d=\"M6 3v2\" /> <path d=\"M18 10a2 2 0 1 0 4 0a2 2 0 1 0 -4 0\" />",
  "tool": "<path d=\"M7 10h3v-3l-3.5 -3.5a6 6 0 0 1 8 8l6 6a2 2 0 0 1 -3 3l-6 -6a6 6 0 0 1 -8 -8l3.5 3.5\" />",
  "truck": "<path d=\"M5 17a2 2 0 1 0 4 0a2 2 0 1 0 -4 0\" /> <path d=\"M15 17a2 2 0 1 0 4 0a2 2 0 1 0 -4 0\" /> <path d=\"M5 17h-2v-11a1 1 0 0 1 1 -1h9v12m-4 0h6m4 0h2v-6h-8m0 -5h5l3 5\" />",
};

/** Prueft, ob ein im Datensatz genannter Name hier hinterlegt ist. */
export function hasIcon(name: string): boolean {
  return name in branchenIcons;
}
