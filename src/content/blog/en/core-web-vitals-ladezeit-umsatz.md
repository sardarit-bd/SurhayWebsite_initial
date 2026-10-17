---
title: 'Core Web Vitals: why load time decides your revenue'
category: 'Performance'
author: 'Surhay'
date: 2026-04-28
metaTitle: 'Core Web Vitals explained: load time, rankings and revenue'
metaDescription: 'Every second of load time costs conversions. What LCP, INP and CLS actually measure, why Google cares — and how to concretely improve your scores.'
ogImage: '/og-default.png'
---

Amazon famously calculated it years ago: 100 milliseconds of additional load time cost one percent of revenue. The same mechanics apply to your website, only more brutally — because unlike Amazon, you have no customer loyalty that forgives slow pages. Someone who clicks a Google result and stares at a white screen for three seconds is gone.

## The three metrics Google measures

**LCP (Largest Contentful Paint)** measures when the main content becomes visible. Target: under 2.5 seconds. Most common killer: huge, unoptimized images.

**INP (Interaction to Next Paint)** measures how quickly the page reacts to clicks and input. Target: under 200 milliseconds. Most common killer: too much JavaScript — often from tracking scripts and page builders.

**CLS (Cumulative Layout Shift)** measures whether content jumps around while loading. Everyone knows it: you try to click and the button slips away. Target: under 0.1.

## What actually helps — in this order

1. **Images in WebP or AVIF**, correctly sized, with lazy loading. This alone solves half the problems on most websites.
2. **Radically reduce JavaScript.** Every plugin, tracker and animation library has a price. Statically generated sites (like those built with Astro) structurally outperform WordPress with page builders here.
3. **Self-host your fonts** and load them with `font-display: swap` — no waiting for Google Fonts.
4. **Caching and a CDN** — included with good hosting.

## Measure, don't guess

Test your website with [PageSpeed Insights](https://pagespeed.web.dev) — real field data, not just lab metrics. Scores below 90? That's revenue lying on the street. We ship our projects with a Lighthouse score of 95+ — not out of vanity, but because those numbers feed directly into rankings and conversions.
