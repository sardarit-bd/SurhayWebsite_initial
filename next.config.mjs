/* ---------------------------------------------------------------------------
   Zwei Deploy-Ziele mit unterschiedlichem Pfad — dieselbe Codebasis:
   - Hostinger (eigene Domain): laeuft im Root  → SITE_URL=https://surhay.design, BASE_PATH=/
   - GitHub Pages (Projektseite): Unterordner  → SITE_URL=https://surhay276.github.io,
     BASE_PATH=/SurhayWebsite  (wird im Pages-Workflow gesetzt)
   Beides kommt aus Umgebungsvariablen, damit derselbe Code beide Ziele bedient.

   `output: 'export'` — beide Ziele liefern statische Dateien aus. Kein
   Node-Server, keine SSR-Laufzeit; Hostinger ist Apache, Pages ist ein CDN.

   `trailingSlash: true` — die Astro-Fassung schrieb Verzeichnisse
   (dist/agentur/index.html). Ohne diese Zeile schreibt Next out/agentur.html,
   und jede bestehende URL mit Schlussstrich waere eine 404.
--------------------------------------------------------------------------- */
const base = (process.env.BASE_PATH || '/').replace(/\/$/, '');

/** @type {import('next').NextConfig} */
export default {
  output: 'export',
  trailingSlash: true,
  basePath: base || undefined,
  assetPrefix: base || undefined,
  /* ---------------------------------------------------------------------
     Der Build typprueft nicht — genau wie vorher.

     `astro build` hat nie typgeprueft; dafuer gab es das getrennte Skript
     `astro check`, und @astrojs/check war in diesem Projekt nicht einmal
     installiert. Wuerde `next build` jetzt typpruefen, waere die neue
     Fassung strenger als die alte und braeche an zwei vorbestehenden
     Befunden (siehe MIGRATION-NOTES.md) — eine Verhaltensaenderung, die
     diese Migration nicht vornehmen soll.

     Die Pruefung bleibt verfuegbar: `npm run check` (tsc --noEmit),
     dieselbe Rolle, die `astro check` hatte.
  --------------------------------------------------------------------- */
  typescript: { ignoreBuildErrors: true },
  /* Statischer Export kennt keinen Bild-Optimierer. Die Seite benutzt ohnehin
     durchgaengig <img> mit fertigen .webp-Dateien, wie die Astro-Fassung. */
  images: { unoptimized: true },
};
