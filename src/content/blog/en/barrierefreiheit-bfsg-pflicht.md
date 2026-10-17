---
title: 'Accessible websites: what the European Accessibility Act means for you'
category: 'Accessibility'
author: 'Surhay'
date: 2026-06-18
metaTitle: 'The EAA and accessible websites: who is affected and what to do'
metaDescription: 'Since June 2025 the European Accessibility Act applies. Who falls under it, which requirements actually bite, and what can be fixed with reasonable effort.'
ogImage: '/og-default.png'
---

Since 28 June 2025 the European Accessibility Act has applied across the EU — in Germany through the Barrierefreiheitsstärkungsgesetz (BFSG). For the first time it reaches private companies, not just public bodies. Many website owners have heard about it but do not know whether they are covered. This article settles both questions: who is affected, and what actually has to happen.

## Who is covered — and who is not

The law applies to products and services in electronic commerce. Put simply: if a contract can be concluded on your website — a purchase, a booking, a subscription — you fall within scope.

Two exemptions matter for smaller companies:

- **Microenterprises** with fewer than ten employees *and* no more than two million euros in annual turnover are exempt for services.
- **Purely informational websites** without any contract conclusion are outside the scope. A tradesperson's site with a service overview and a contact form is not electronic commerce.

Note the "and": a company with twelve staff is no longer a microenterprise, even on modest turnover.

## Why the exemption is not a free pass

Even if the law does not reach you, there are three good reasons to build accessibly anyway.

The first is reach. Around 87 million people in the EU live with some form of disability. Add everyone who is temporarily impaired — a broken arm, bright sunlight on a phone screen, a loud train without headphones. Accessibility is rarely a special case for a few; it is usually a better solution for everyone.

The second is technical. Almost everything that makes a page accessible also makes it more legible to search engines: a clean heading hierarchy, meaningful link text, alt attributes, semantic HTML. Google sees your website roughly the way a screen reader sees it.

The third is procurement. Anyone supplying public bodies or working with larger companies increasingly finds accessibility written into the requirements — regardless of whether the law itself applies.

## What is actually required

The technical basis is the harmonised European standard EN 301 549, which largely points to WCAG at conformance level AA. Four principles carry the whole framework: perceivable, operable, understandable, robust.

In practice most websites fail on the same five points:

**Contrast.** Body text needs a contrast ratio of at least 4.5:1 against its background; large text 3:1. Light grey body copy on white — the default in many themes — regularly breaks this.

**Keyboard operation.** Every function must be reachable without a mouse, and focus must be visible. The most common failure is an `outline: none` in the CSS, removed by someone who found the blue ring ugly.

**Alt text.** Every meaningful image needs a description. Decorative images get an empty `alt=""` — not a missing attribute.

**Forms.** Every field needs an associated label. Placeholder text is not a label: it disappears as you type, and screen readers announce it unreliably.

**Structure.** One H1 per page, then a hierarchy without skipped levels. Headings are navigation, not font size.

## The accessibility statement

Providers within scope must publish a statement describing the current state of accessibility, naming known limitations and giving a way to report problems. It belongs somewhere permanently reachable — usually the footer, next to the imprint and privacy policy.

An honest statement with named gaps is legally stronger than a polished one. It documents that you have engaged with the issue.

## What this costs in effort

On a newly built website accessibility is close to free — provided it is designed in from the start. Fixing contrast in the design system, writing semantic HTML, designing focus states: that costs hours in concept work, not days.

Retrofitting is what gets expensive. An existing site with thirty plugins, where every element brings its own markup, cannot be patched selectively. Frequently a rebuild is cheaper than a repair — and faster.

A realistic entry point looks like this: measure with an automated tool first (axe DevTools or Lighthouse catch roughly 30 to 40 per cent of issues), then operate the entire site once by keyboard, then sort what you found by severity. Contrast and keyboard operation first — they affect every page at once.

## What to take away

First check whether your website concludes contracts at all. If it does and you are not a microenterprise, accessibility is no longer optional for you. If it does not, it remains an investment with an unusually good effort-to-effect ratio: better findability, wider reach, and a site still operable in five years.
