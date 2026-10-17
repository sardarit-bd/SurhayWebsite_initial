---
title: 'Core Web Vitals: Warum Ladezeit über Umsatz entscheidet'
category: 'Performance'
author: 'Surhay'
date: 2026-04-28
metaTitle: 'Core Web Vitals erklärt: Ladezeit, Rankings und Umsatz'
metaDescription: 'Jede Sekunde Ladezeit kostet Conversions. Was hinter LCP, INP und CLS steckt, warum Google sie misst — und wie Sie Ihre Werte konkret verbessern.'
ogImage: '/og-default.png'
---

Amazon hat es vor Jahren vorgerechnet: 100 Millisekunden mehr Ladezeit kosten ein Prozent Umsatz. Für Ihre Website gilt dieselbe Mechanik, nur brutaler — denn anders als bei Amazon gibt es bei Ihnen keine Kundenbindung, die langsame Seiten verzeiht. Wer auf ein Google-Ergebnis klickt und drei Sekunden auf einen weißen Bildschirm schaut, ist weg.

## Die drei Kennzahlen, die Google misst

**LCP (Largest Contentful Paint)** misst, wann der Hauptinhalt sichtbar ist. Zielwert: unter 2,5 Sekunden. Der häufigste Killer: riesige, unoptimierte Bilder.

**INP (Interaction to Next Paint)** misst, wie schnell die Seite auf Klicks und Eingaben reagiert. Zielwert: unter 200 Millisekunden. Der häufigste Killer: zu viel JavaScript — oft von Tracking-Skripten und Page-Buildern.

**CLS (Cumulative Layout Shift)** misst, ob Inhalte beim Laden springen. Jeder kennt es: Man will klicken, und der Button rutscht weg. Zielwert: unter 0,1.

## Was wirklich hilft — in dieser Reihenfolge

1. **Bilder in WebP oder AVIF**, korrekt dimensioniert, mit Lazy Loading. Das allein löst bei den meisten Websites die Hälfte der Probleme.
2. **JavaScript radikal reduzieren.** Jedes Plugin, jeder Tracker, jede Animation-Library kostet. Statisch generierte Seiten (wie mit Astro) liefern hier strukturell bessere Werte als WordPress mit Page-Builder.
3. **Fonts selbst hosten** und mit `font-display: swap` laden — kein Warten auf Google Fonts.
4. **Caching und CDN** — bei gutem Hosting inklusive.

## Messen statt raten

Testen Sie Ihre Website mit [PageSpeed Insights](https://pagespeed.web.dev) — echte Felddaten, nicht nur Labormessung. Werte unter 90? Dann liegt dort Umsatz auf der Straße. Unsere Projekte liefern wir mit einem Lighthouse-Score von 95+ aus — nicht aus Eitelkeit, sondern weil die Zahlen direkt auf Rankings und Conversions einzahlen.
