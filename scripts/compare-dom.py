#!/usr/bin/env python3
"""
DOM-Vergleich Astro-Referenz gegen Next-Export.

Byte-Gleichheit ist strukturell unmoeglich (Bereichskennung, Nexts eigene
Skript-Tags, Asset-Hashes, React-Schreibweise von style). Verglichen wird
deshalb das, was zaehlt:

  --words   Textinhalt ohne jeden Whitespace — faengt fehlenden, zusaetzlichen
            oder veraenderten TEXT, unabhaengig davon, wo Leerzeichen stehen.
            Whitespace selbst ist so nicht pruefbar: ob ein Leerzeichen
            sichtbar ist, haengt am display der Umgebung (in einem
            Flex-Container erzeugt ein Whitespace-Textknoten gar nichts).
            Dafuer ist der Browser-Vergleich zustaendig.
  --text    sichtbarer Text mit Block-/Inline-Heuristik — nur als Hinweisgeber,
            liefert bei Flex- und Grid-Containern Fehlalarme
  --tree    Elementfolge im ganzen Dokument (Tag-Namen in Dokumentordnung)
  --jsonld  die JSON-LD-Bloecke (Inhalt und Anzahl). Sie stehen bei Astro im
            <head>, bei React im Rumpf: React hebt <script> nicht selbst
            hinaus. Google liest JSON-LD an jeder Stelle des Dokuments; der
            Inhalt muss trotzdem gleich sein.
  --body    Elementfolge AB <body> — der Kopf hat eine bekannte, nicht
            beeinflussbare Reihenfolge (Next spritzt seine eigenen Tags ein),
            der Rumpf muss exakt stimmen
  --attrs   Attribute je Element
  --head    die Tags im <head>

Aufruf: compare-dom.py <modus> [seite ...]
Ohne Seitenangabe werden alle 70 verglichen.
"""
import sys, re, html
from pathlib import Path
from html.parser import HTMLParser

WURZEL = Path('/Users/surhay/Projekte/SurhayWebsite')
import os
# Standard: das Hostinger-Ziel (base '/'). Fuer das Pages-Ziel:
#   VERGLEICH_REF=.reference-dist-pages VERGLEICH_NEU=out-pages
REF = WURZEL / os.environ.get('VERGLEICH_REF', '.reference-dist-root')
NEU = WURZEL / os.environ.get('VERGLEICH_NEU', 'out')

# Elemente, deren Inhalt kein sichtbarer Text ist
UNSICHTBAR = {'script', 'style', 'noscript', 'template', 'title'}
LEER = {'img','br','hr','input','meta','link','source','area','base','col','embed','param','track','wbr'}

# Inline-Elemente. Alles andere gilt als Block: an einer Blockgrenze entsteht
# beim Rendern ohnehin ein Umbruch, also darf dort ein Leerzeichen stehen oder
# fehlen — Astro lieferte den Quell-Whitespace mit aus, JSX wirft ihn weg.
# An einer INLINE-Grenze ist ein Leerzeichen dagegen sichtbar, und genau dort
# soll der Vergleich anschlagen.
INLINE = {
  'a','span','strong','em','b','i','u','s','small','sup','sub','code','kbd','samp','var',
  'abbr','cite','q','time','mark','label','button','img','svg','path','circle','rect','g',
  'line','polyline','polygon','ellipse','use','defs','clippath','input','select','textarea',
  'output','data','dfn','ins','del','bdi','bdo','picture','source','video','audio','canvas',
  'iframe','wbr','nobr','tspan','text',
}

WEG = object()   # Kennzeichen: dieses Attribut faellt aus dem Vergleich

# Attribute, die auf beiden Seiten wegfallen
def attr_filter(name, wert, tag):
    if name.startswith('data-astro-cid-') or name.startswith('data-c-'):
        return WEG
    if wert is None:
        # Wertloses Attribut. Astro schrieb `data-reveal`, React schreibt
        # `data-reveal=""` — im DOM ist beides der leere String.
        return ''
    if name == 'class' and wert is not None:
        # Klassenliste normalisieren (Reihenfolge bleibt, doppelte Leerzeichen weg)
        return ' '.join(wert.split())
    if name == 'style' and wert is not None:
        teile = []
        tief = 0; akt = ''
        for ch in wert:
            if ch == '(': tief += 1
            elif ch == ')': tief -= 1
            if ch == ';' and tief == 0:
                teile.append(akt); akt = ''
            else: akt += ch
        teile.append(akt)
        norm = []
        for t in teile:
            if ':' not in t: continue
            k, v = t.split(':', 1)
            norm.append(f'{k.strip()}:{" ".join(v.split())}')
        return ';'.join(sorted(norm))
    if name in ('href', 'src') and wert:
        # Asset-Hashes vereinheitlichen
        wert = re.sub(r'/_astro/[^"]*', '/ASSET', wert)
        wert = re.sub(r'/_next/[^"]*', '/ASSET', wert)
        return wert
    return wert

class Baum(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.elemente = []   # (tiefe, tag, attrs)
        self.roh = []        # Rohtext samt Whitespace und Blockgrenzen
        self.stack = []
        self.unsichtbar = 0
    def grenze(self, tag):
        """Blockgrenze und <br> zaehlen als Whitespace, Inline-Grenzen nicht."""
        if tag == 'br' or tag not in INLINE:
            self.roh.append(' ')

    def handle_starttag(self, tag, attrs):
        a = {}
        for n, v in attrs:
            nv = attr_filter(n.lower(), v, tag)
            if nv is WEG: continue
            a[n.lower()] = nv
        self.elemente.append((len(self.stack), tag, a))
        self.grenze(tag)
        if tag in UNSICHTBAR: self.unsichtbar += 1
        if tag not in LEER: self.stack.append(tag)
    def handle_startendtag(self, tag, attrs):
        a = {}
        for n, v in attrs:
            nv = attr_filter(n.lower(), v, tag)
            if nv is WEG: continue
            a[n.lower()] = nv
        self.elemente.append((len(self.stack), tag, a))
        self.grenze(tag)
    def handle_endtag(self, tag):
        if tag in UNSICHTBAR and self.unsichtbar: self.unsichtbar -= 1
        self.grenze(tag)
        while self.stack:
            oben = self.stack.pop()
            if oben == tag: break
    def handle_comment(self, d):
        # Kommentare tragen keinen Text und keine Grenze bei.
        return

    def _alt_handle_comment(self, d):
        """React trennt zwei aufeinanderfolgende Textknoten mit <!-- -->, damit
        die Hydration sie wiederfindet; dazu kommen die Suspense-Marken
        <!--$--> und <!--/$-->. Fuer den sichtbaren Text sind das keine
        Trenner — der naechste Textblock gehoert an den vorigen angeklebt,
        sonst meldet der Vergleich ein Leerzeichen, das es nicht gibt."""
        self.nach_kommentar = True

    def handle_data(self, d):
        if self.unsichtbar: return
        self.roh.append(d)

def sichtbar(parser):
    """Sichtbarer Text: Whitespace-Laeufe zu einem Leerzeichen, getrimmt."""
    return ' '.join(''.join(parser.roh).split())


def nexts_eigenes(elemente):
    """Nexts Laufzeit-Tags entfernen — Astro hatte sie nicht. JSON-LD ebenfalls:
    es steht auf beiden Seiten, nur an verschiedener Stelle (siehe --jsonld)."""
    raus = []
    for tiefe, tag, a in elemente:
        if tag == 'script' and a.get('type') == 'application/ld+json': continue
        # Modul-Skripte werden separat und exakt geprueft (Vorhandensein je
        # Seite, Inhalt, Ausfuehrungsreihenfolge). Ihre POSITION im Rumpf ist
        # ohne Wirkung, weil Modul-Skripte deferred laufen — Astro hob sie an
        # andere Stellen als React. Sie bleiben deshalb aus dem
        # Strukturvergleich heraus.
        if tag == 'script' and a.get('type') == 'module': continue
        if tag == 'script' and a.get('src', '').startswith('/ASSET'): continue
        if tag == 'script' and a.get('id') == '_R_': continue
        if tag == 'link' and a.get('rel') == 'preload' and a.get('as') == 'script': continue
        if tag == 'div' and a.get('hidden') is not None and len(a) == 1: continue
        raus.append((tiefe, tag, a))
    return raus

def lade(pfad):
    roh = Path(pfad).read_text()
    # Nexts Bootstrap entfernen: die Skripte, die den RSC-Strom in den
    # Client schieben. Astro hatte nichts davon; sie tragen keinen Inhalt und
    # keine Struktur der Seite.
    roh = re.sub(r'<script>\s*\(?self\.__next_f.*?</script>', '', roh, flags=re.S)
    roh = re.sub(r'<script[^>]*src="/_next/[^"]*"[^>]*></script>', '', roh)
    p = Baum()
    p.feed(roh)
    return p

def seiten():
    if len(sys.argv) > 2:
        return sys.argv[2:]
    return sorted(str(p.relative_to(REF)) for p in REF.rglob('*.html'))

def jsonld(pfad):
    import json
    roh = Path(pfad).read_text()
    raus = []
    for m in re.finditer(r'<script type="application/ld\+json"[^>]*>(.*?)</script>', roh, re.S):
        raus.append(json.dumps(json.loads(html.unescape(m.group(1))), sort_keys=True, ensure_ascii=False))
    return sorted(raus)


modus = sys.argv[1]
abweichend = 0
gleich = 0
for rel in seiten():
    a = lade(REF / rel)
    b = lade(NEU / rel)
    if modus == '--words':
        ta = re.sub(r'\s+', '', sichtbar(a)); tb = re.sub(r'\s+', '', sichtbar(b))
        if ta == tb: gleich += 1; continue
        abweichend += 1
        i = 0
        while i < min(len(ta), len(tb)) and ta[i] == tb[i]: i += 1
        print(f'XX {rel}  (ref {len(ta)} / next {len(tb)} Zeichen, erste Abweichung bei {i})')
        print(f'   REF : …{ta[max(0,i-70):i+90]}')
        print(f'   NEXT: …{tb[max(0,i-70):i+90]}')
    elif modus == '--text':
        ta = sichtbar(a); tb = sichtbar(b)
        if ta == tb: gleich += 1; continue
        abweichend += 1
        i = 0
        while i < min(len(ta), len(tb)) and ta[i] == tb[i]: i += 1
        print(f'XX {rel}  (ref {len(ta)} / next {len(tb)} Zeichen, erste Abweichung bei {i})')
        print(f'   REF : …{ta[max(0,i-70):i+90]}')
        print(f'   NEXT: …{tb[max(0,i-70):i+90]}')
    elif modus in ('--tree', '--body'):
        def ab_body(el):
            raus, drin = [], modus == '--tree'
            for eintrag in el:
                if eintrag[1] == 'body': drin = True
                if drin: raus.append(eintrag)
            return raus
        ea = [t for _, t, _ in ab_body(nexts_eigenes(a.elemente))]
        eb = [t for _, t, _ in ab_body(nexts_eigenes(b.elemente))]
        if ea == eb: gleich += 1; continue
        abweichend += 1
        i = 0
        while i < min(len(ea), len(eb)) and ea[i] == eb[i]: i += 1
        print(f'XX {rel}  (ref {len(ea)} / next {len(eb)} Elemente, erste Abweichung an {i})')
        print(f'   REF : {ea[max(0,i-6):i+10]}')
        print(f'   NEXT: {eb[max(0,i-6):i+10]}')
    elif modus == '--nie-tree':
        ea = [t for _, t, _ in nexts_eigenes(a.elemente)]
        eb = [t for _, t, _ in nexts_eigenes(b.elemente)]
        if ea == eb: gleich += 1; continue
        abweichend += 1
        i = 0
        while i < min(len(ea), len(eb)) and ea[i] == eb[i]: i += 1
        print(f'XX {rel}  (ref {len(ea)} / next {len(eb)} Elemente, erste Abweichung an {i})')
        print(f'   REF : {ea[max(0,i-6):i+10]}')
        print(f'   NEXT: {eb[max(0,i-6):i+10]}')
    elif modus == '--attrs':
        def ab_body(el):
            raus, drin = [], False
            for e in el:
                if e[1] == 'body': drin = True
                if drin: raus.append(e)
            return raus
        ea = ab_body(nexts_eigenes(a.elemente)); eb = ab_body(nexts_eigenes(b.elemente))
        fehler = []
        for k, ((_, ta, aa), (_, tb, ab)) in enumerate(zip(ea, eb)):
            if ta != tb:
                fehler.append(f'   [{k}] Tag {ta} vs {tb}'); break
            if aa != ab:
                nur_a = {x: aa[x] for x in aa if aa.get(x) != ab.get(x)}
                nur_b = {x: ab[x] for x in ab if aa.get(x) != ab.get(x)}
                fehler.append(f'   [{k}] <{ta}>  REF {nur_a}  NEXT {nur_b}')
        if not fehler and len(ea) == len(eb): gleich += 1; continue
        abweichend += 1
        print(f'XX {rel}')
        for f in fehler[:6]: print(f)
        if len(ea) != len(eb): print(f'   Elementzahl {len(ea)} vs {len(eb)}')
    elif modus == '--jsonld':
        ja, jb = jsonld(REF / rel), jsonld(NEU / rel)
        if ja == jb: gleich += 1; continue
        abweichend += 1
        print(f'XX {rel}  ({len(ja)} vs {len(jb)} Bloecke)')
        for x in ja:
            if x not in jb: print(f'   - {x[:160]}')
        for x in jb:
            if x not in ja: print(f'   + {x[:160]}')
    elif modus == '--head':
        def kopf(p):
            raus = []
            for tiefe, tag, at in nexts_eigenes(p.elemente):
                raus.append((tag, tuple(sorted(at.items()))))
                if tag == 'body': break
            return raus
        ka, kb = kopf(a), kopf(b)
        sa, sb = set(ka), set(kb)
        if sa == sb: gleich += 1; continue
        abweichend += 1
        print(f'XX {rel}')
        for x in sorted(sa - sb)[:8]: print(f'   - {x}')
        for x in sorted(sb - sa)[:8]: print(f'   + {x}')

print(f'\n=== {gleich} identisch, {abweichend} abweichend (von {gleich + abweichend}) ===')
