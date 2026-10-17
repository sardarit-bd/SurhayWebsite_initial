---
title: 'Barrierefreie Website: Was das BFSG für Unternehmen bedeutet'
category: 'Barrierefreiheit'
author: 'Surhay'
date: 2026-06-18
metaTitle: 'BFSG und barrierefreie Websites: Wer betroffen ist und was zu tun ist'
metaDescription: 'Seit Juni 2025 gilt das Barrierefreiheitsstärkungsgesetz. Wer betroffen ist, welche Anforderungen konkret gelten und was sich mit überschaubarem Aufwand umsetzen lässt.'
ogImage: '/og-default.png'
---

Seit dem 28. Juni 2025 gilt in Deutschland das Barrierefreiheitsstärkungsgesetz (BFSG). Es setzt den European Accessibility Act in nationales Recht um und betrifft erstmals auch private Unternehmen — nicht nur Behörden. Viele Website-Betreiber haben davon gehört, wissen aber nicht, ob sie gemeint sind. Dieser Beitrag klärt beides: die Frage der Betroffenheit und die Frage, was konkret zu tun ist.

## Wer betroffen ist — und wer nicht

Das Gesetz gilt für Produkte und Dienstleistungen im elektronischen Geschäftsverkehr. Vereinfacht: Wenn auf Ihrer Website ein Vertrag geschlossen werden kann — ein Kauf, eine Buchung, ein Abonnement —, fallen Sie in den Anwendungsbereich.

Zwei Ausnahmen sind für kleinere Unternehmen wichtig:

- **Kleinstunternehmen** mit weniger als zehn Beschäftigten *und* höchstens zwei Millionen Euro Jahresumsatz sind bei Dienstleistungen ausgenommen.
- **Reine Informationswebsites** ohne Vertragsabschluss fallen nicht darunter. Eine Handwerker-Website mit Leistungsübersicht und Kontaktformular ist kein elektronischer Geschäftsverkehr.

Wichtig ist die Formulierung „und": Wer zwölf Mitarbeitende hat, ist kein Kleinstunternehmen mehr, auch bei geringem Umsatz.

## Warum die Ausnahme trotzdem kein Freibrief ist

Auch wer nicht unter das BFSG fällt, hat drei gute Gründe, trotzdem barrierefrei zu bauen.

Der erste ist die Reichweite. In Deutschland leben rund 7,8 Millionen Menschen mit einer anerkannten Schwerbehinderung. Dazu kommen alle, die vorübergehend eingeschränkt sind — mit gebrochenem Arm, in der prallen Sonne auf dem Handy, in einem lauten Zug ohne Kopfhörer. Barrierefreiheit ist selten eine Sonderlösung für wenige; sie ist meistens eine bessere Lösung für alle.

Der zweite ist die Technik. Fast alles, was eine Seite barrierefrei macht, macht sie auch für Suchmaschinen lesbarer: eine saubere Überschriftenhierarchie, sprechende Linktexte, Alternativtexte für Bilder, semantisches HTML. Google sieht Ihre Website ungefähr so, wie ein Screenreader sie sieht.

Der dritte ist die Ausschreibungspraxis. Wer öffentliche Auftraggeber beliefert oder mit größeren Unternehmen zusammenarbeitet, findet Barrierefreiheit zunehmend als Anforderung im Lastenheft — unabhängig davon, ob das Gesetz greift.

## Was konkret gefordert ist

Die technische Grundlage ist die harmonisierte europäische Norm EN 301 549, die im Wesentlichen auf die WCAG in Konformitätsstufe AA verweist. Vier Prinzipien tragen das Regelwerk: wahrnehmbar, bedienbar, verständlich, robust.

In der Praxis fallen die meisten Websites an denselben fünf Punkten durch:

**Kontraste.** Normaler Text braucht ein Kontrastverhältnis von mindestens 4,5:1 zum Hintergrund, große Schrift 3:1. Hellgraue Fließtexte auf weißem Grund — die Standardeinstellung vieler Themes — reißen das regelmäßig.

**Tastaturbedienung.** Jede Funktion muss ohne Maus erreichbar sein, und der Fokus muss sichtbar sein. Der häufigste Fehler ist ein `outline: none` im CSS, das jemand entfernt hat, weil der blaue Rahmen störte.

**Alternativtexte.** Jedes inhaltstragende Bild braucht eine Beschreibung. Dekorative Bilder bekommen ein leeres `alt=""` — nicht gar kein Attribut.

**Formulare.** Jedes Feld braucht ein verknüpftes Label. Ein Platzhaltertext im Feld ist kein Label: Er verschwindet beim Tippen, und Screenreader lesen ihn unzuverlässig vor.

**Struktur.** Eine H1 pro Seite, danach eine Hierarchie ohne Sprünge. Überschriften sind Navigation, nicht Schriftgröße.

## Die Erklärung zur Barrierefreiheit

Betroffene Anbieter müssen eine Erklärung veröffentlichen, die den Stand der Barrierefreiheit beschreibt, bekannte Einschränkungen benennt und einen Kontaktweg für Rückmeldungen nennt. Sie gehört an eine dauerhaft erreichbare Stelle — üblicherweise in die Fußzeile neben Impressum und Datenschutzerklärung.

Eine ehrliche Erklärung mit benannten Lücken ist rechtlich besser als eine geschönte. Sie dokumentiert, dass Sie sich mit dem Thema befasst haben.

## Was das in Aufwand bedeutet

Bei einer neu gebauten Website ist Barrierefreiheit fast kostenlos — vorausgesetzt, sie wird von Anfang an mitgedacht. Kontraste im Designsystem festlegen, semantisches HTML schreiben, Fokuszustände gestalten: Das kostet in der Konzeption Stunden, nicht Tage.

Teuer wird es beim Nachrüsten. Eine bestehende Seite mit dreißig Plugins, in der jedes Element sein eigenes Markup mitbringt, lässt sich nicht punktuell reparieren. Häufig ist ein Neubau günstiger als die Sanierung — und schneller.

Ein realistischer Einstieg sieht so aus: Erst mit einem automatischen Werkzeug messen (axe DevTools oder Lighthouse finden etwa 30 bis 40 Prozent der Probleme), dann die Seite einmal komplett mit der Tastatur bedienen, dann die gefundenen Punkte nach Schwere sortieren. Kontraste und Tastaturbedienung zuerst — sie betreffen jede Seite gleichzeitig.

## Was Sie mitnehmen sollten

Prüfen Sie zuerst, ob Ihre Website überhaupt Verträge abschließt. Ist das der Fall und Sie sind kein Kleinstunternehmen, ist Barrierefreiheit für Sie keine Kür mehr. Ist es nicht der Fall, bleibt sie eine Investition mit gutem Verhältnis von Aufwand zu Wirkung: bessere Auffindbarkeit, größere Reichweite und eine Seite, die auch in fünf Jahren noch bedienbar ist.
