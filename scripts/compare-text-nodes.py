#!/usr/bin/env python3
"""
Textknoten mit EXAKTEM Whitespace vergleichen.

Der schaerfste Whitespace-Test, den es ohne Browser gibt: jeder Textknoten in
Dokumentordnung, unveraendert. Faengt genau die Faelle, die --words nicht
sieht — ein fehlendes oder zusaetzliches Leerzeichen zwischen Inline-Inhalt.

Zwei Normalisierungen, beide notwendig und beide ohne Wirkung auf die
Darstellung:
  - React trennt zwei aufeinanderfolgende Textknoten mit <!-- -->, damit die
    Hydration sie wiederfindet. Solche Nachbarn werden zusammengefuegt.
  - Nur-Whitespace-Knoten an BLOCK-Grenzen sind unsichtbar (Astro lieferte den
    Quell-Whitespace mit aus, JSX wirft ihn weg). Sie werden auf beiden Seiten
    entfernt. An Inline-Grenzen bleiben sie stehen — dort sind sie sichtbar.
"""
import re, sys
from pathlib import Path
from html.parser import HTMLParser

WURZEL = Path('/Users/surhay/Projekte/SurhayWebsite')
import os
REF = WURZEL / os.environ.get('VERGLEICH_REF', '.reference-dist-root')
NEU = WURZEL / os.environ.get('VERGLEICH_NEU', 'out')

UNSICHTBAR = {'script', 'style', 'noscript', 'template', 'title'}
LEER = {'img','br','hr','input','meta','link','source','area','base','col','embed','param','track','wbr'}
INLINE = {
  'a','span','strong','em','b','i','u','s','small','sup','sub','code','kbd','samp','var',
  'abbr','cite','q','time','mark','label','button','img','svg','path','circle','rect','g',
  'line','polyline','polygon','ellipse','use','defs','clippath','input','select','textarea',
  'output','data','dfn','ins','del','bdi','bdo','picture','source','video','audio','canvas',
  'iframe','wbr','nobr','tspan','text',
}

class Knoten(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.stuecke = []      # ('text', s) | ('grenze', tag, art)
        self.unsichtbar = 0
        self.kleben = False
    def _grenze(self, tag):
        self.stuecke.append(('grenze', tag, 'inline' if tag in INLINE and tag != 'br' else 'block'))
        self.kleben = False
    def handle_starttag(self, tag, attrs):
        if tag in UNSICHTBAR: self.unsichtbar += 1
        self._grenze(tag)
    def handle_startendtag(self, tag, attrs): self._grenze(tag)
    def handle_endtag(self, tag):
        if tag in UNSICHTBAR and self.unsichtbar: self.unsichtbar -= 1
        self._grenze(tag)
    def handle_comment(self, d): self.kleben = True
    def handle_data(self, d):
        if self.unsichtbar: return
        if self.kleben and self.stuecke and self.stuecke[-1][0] == 'text':
            self.stuecke[-1] = ('text', self.stuecke[-1][1] + d)
        else:
            self.stuecke.append(('text', d))
        self.kleben = False

def texte(pfad):
    roh = Path(pfad).read_text()
    roh = re.sub(r'<script>\s*\(?self\.__next_f.*?</script>', '', roh, flags=re.S)
    k = Knoten(); k.feed(roh)
    raus = []
    for i, st in enumerate(k.stuecke):
        if st[0] != 'text': continue
        s = st[1]
        if not s.strip():
            # Nur Whitespace: nur behalten, wenn BEIDE Nachbarn inline sind
            vor = next((x for x in reversed(k.stuecke[:i]) if x[0] == 'grenze'), None)
            nach = next((x for x in k.stuecke[i+1:] if x[0] == 'grenze'), None)
            if not (vor and nach and vor[2] == 'inline' and nach[2] == 'inline'):
                continue
            raus.append(' ')
            continue
        # Text: Whitespace-Laeufe zu einem Leerzeichen, aber Anfang/Ende behalten
        raus.append(re.sub(r'\s+', ' ', s))
    return raus

seiten = sys.argv[1:] or sorted(str(p.relative_to(REF)) for p in REF.rglob('*.html'))
gleich = abw = 0
for rel in seiten:
    a, b = texte(REF / rel), texte(NEU / rel)
    if a == b:
        gleich += 1
        continue
    abw += 1
    import difflib
    sm = difflib.SequenceMatcher(None, a, b)
    unterschiede = [(t, a[i1:i2], b[j1:j2]) for t, i1, i2, j1, j2 in sm.get_opcodes() if t != 'equal']
    print(f'XX {rel}  ({len(a)} vs {len(b)} Textknoten, {len(unterschiede)} Stellen)')
    for t, x, y in unterschiede[:6]:
        print(f'   {t:8s} REF {x!r}')
        print(f'   {"":8s} NEXT {y!r}')
print(f'\n=== {gleich} identisch, {abw} abweichend (von {gleich+abw}) ===')
