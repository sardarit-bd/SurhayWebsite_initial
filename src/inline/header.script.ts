/* Woertlich uebernommen aus src/components/Header.astro (Astro-Fassung).
   Nicht umschreiben: dieselbe Datei, dieselben Zeilen, damit das Verhalten
   nachweisbar unveraendert bleibt. Astro kompilierte den <script>-Block zu
   JavaScript und lieferte ihn inline aus; hier macht das scripts/build-inline.mjs.
   Diese Datei wird NICHT gebuendelt — sie ist die Quelle fuer den Inline-Text. */

  /* -------------------------------------------------- 1. Burger-Menue */
  const toggle = document.getElementById('menu-toggle');
  const menu = document.getElementById('mobile-menu');
  const header = toggle?.closest('header');
  const bar = header?.querySelector<HTMLElement>('.header-bar');
  let isOpen = false;

  /* --------------------------------------------------- Hoehe der Leiste
     Das Menue-Blatt polstert sich oben um genau diesen Wert. Gemessen statt
     angenommen: Die Leiste traegt zwar `h-[var(--header-h)]`, aber sobald
     jemand die Grundschrift hochstellt oder eine Sprache laenger umbricht,
     stimmt eine fest eingetragene Zahl nicht mehr — und der erste Menuepunkt
     laege wieder darunter. Der Startwert in global.css deckt den ersten Frame
     und den Fall ohne JS ab. */
  if (bar) {
    const messen = () =>
      document.documentElement.style.setProperty('--header-h', `${Math.round(bar.getBoundingClientRect().height)}px`);
    new ResizeObserver(messen).observe(bar);
    messen();
  }

  /* ------------------------------------------------------- Scroll-Lock
     `overflow: hidden` am Body genuegt nicht: iOS Safari scrollt darueber
     hinweg, und beim Schliessen stuende die Seite an einer anderen Stelle als
     vorher. Der Body wird deshalb an Ort und Stelle festgesetzt und beim
     Schliessen exakt dorthin zurueckgeholt.

     `scroll-behavior: smooth` steht in global.css am `html` — ohne die
     Ausnahme hier wuerde der Ruecksprung sichtbar animiert. */
  let gemerkteHoehe = 0;

  const sperren = () => {
    gemerkteHoehe = window.scrollY;
    document.body.style.position = 'fixed';
    document.body.style.top = `-${gemerkteHoehe}px`;
    document.body.style.insetInline = '0';
  };

  const entsperren = () => {
    const wurzel = document.documentElement;
    const vorher = wurzel.style.scrollBehavior;
    wurzel.style.scrollBehavior = 'auto';
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.insetInline = '';
    window.scrollTo(0, gemerkteHoehe);
    wurzel.style.scrollBehavior = vorher;
  };

  /* Alles ausser der Kopfzeile liegt bei offenem Menue hinter dem Blatt und
     hat dort nichts mehr zu suchen — weder unter dem Tabulator noch im
     Screenreader. `inert` nimmt beides in einem Zug.

     Ueber die Geschwister des Headers statt ueber eine Liste von Selektoren:
     So sind Sprungmarke, `main` und `footer` erfasst, und alles, was spaeter
     dazukommt, ebenfalls. Das Menue selbst steckt IM Header und bleibt
     dadurch aussen vor. `aria-hidden` laeuft nur als Rueckfall fuer Engines
     ohne `inert` mit — allein gesetzt waere es ein Fehler, denn die Elemente
     blieben fokussierbar. */
  const dahinter = () => [...document.body.children].filter((el) => el !== header) as HTMLElement[];

  const setOpen = (next: boolean, restoreFocus = false) => {
    if (!toggle || !menu || !header || isOpen === next) return;
    isOpen = next;
    toggle.setAttribute('aria-expanded', String(next));
    toggle.setAttribute('aria-label', (next ? toggle.dataset.labelClose : toggle.dataset.labelOpen) ?? '');
    menu.classList.toggle('open', next);
    header.classList.toggle('menu-open', next);

    if (next) {
      sperren();
      /* Das Blatt oeffnet immer am Anfang der Liste. Ohne das behielte der
         scrollende Bereich seine Position vom letzten Mal, und beim zweiten
         Oeffnen stuende nicht „Leistungen“ oben, sondern irgendein Punkt aus
         der Mitte. */
      menu.querySelector('.menu-scroll')?.scrollTo(0, 0);
      menu.focus({ preventScroll: true });
      dahinter().forEach((el) => {
        el.inert = true;
        el.setAttribute('aria-hidden', 'true');
      });
    } else {
      dahinter().forEach((el) => {
        el.inert = false;
        el.removeAttribute('aria-hidden');
      });
      entsperren();
      if (restoreFocus) toggle.focus({ preventScroll: true });
      /* Der Ruecksprung loest kein Scroll-Ereignis mehr aus, wenn die Seite
         ohnehin schon dort stand — die Blur-Klasse muss deshalb von Hand
         nachgezogen werden. */
      header.classList.toggle('scrolled', window.scrollY > 8);
    }
  };

  toggle?.addEventListener('click', () => setOpen(!isOpen));
  menu?.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => setOpen(false)));

  /* ------------------------------------------------------- Fokus-Falle
     Solange das Blatt offen ist, gehoert der Tabulator ihm. Ohne das wandert
     der Fokus hinter das Blatt — dort ist er unsichtbar, und gescrollt wird
     auch nicht mehr. `inert` allein reicht nicht: Es haelt den Fokus in der
     Seite, nicht aber in der Adressleiste des Browsers und zurueck.

     Der Umschalter zaehlt dazu: Er liegt ueber dem Blatt und ist dort das
     Kreuz. Er steht ganz vorn im Zyklus, damit Shift+Tab vom ersten
     Menuepunkt auf „schliessen“ fuehrt und nicht ins Nichts. */
  const fokussierbare = () => {
    if (!menu || !toggle) return [] as HTMLElement[];
    const imBlatt = [
      ...menu.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'),
    ].filter((el) => el.offsetParent !== null);
    return [toggle, ...imBlatt];
  };

  document.addEventListener('keydown', (e) => {
    if (!isOpen || e.key !== 'Tab') return;
    const liste = fokussierbare();
    if (liste.length === 0) return;
    const erster = liste[0];
    const letzter = liste[liste.length - 1];
    const aktiv = document.activeElement as HTMLElement | null;

    /* Der Fokus steht noch auf dem Blatt selbst (es bekommt ihn beim Oeffnen
       ueber tabindex="-1"): der naechste Schritt ist der erste echte Punkt,
       der vorherige der letzte. */
    if (aktiv === menu) {
      e.preventDefault();
      (e.shiftKey ? letzter : (liste[1] ?? erster)).focus();
      return;
    }
    if (e.shiftKey && aktiv === erster) {
      e.preventDefault();
      letzter.focus();
    } else if (!e.shiftKey && aktiv === letzter) {
      e.preventDefault();
      erster.focus();
    }
  });

  /* ---------------------------------------------------- Breitenwechsel
     Ab der Navigationsschwelle traegt die offene Navigation die Struktur,
     und das Blatt ist per CSS weg — der Scroll-Lock am Body aber nicht. Ohne
     diese Regel liesse sich die Seite nach dem Aufziehen des Fensters oder
     dem Aufklappen eines Foldables nicht mehr scrollen, und der Grund waere
     unsichtbar.

     ZWEI WEGE ZUM SELBEN ZUSTAND, mit Absicht:
       1. Der ResizeObserver auf dem Wurzelelement. Er kommt aus dem
          Layout-Schritt des Browsers und meldet auch dann, wenn kein
          `resize`-Ereignis zugestellt wird (eingebettete Ansichten,
          gedrosselte Hintergrund-Tabs).
       2. Die Media Query als Ergaenzung. Sie feuert genau einmal an der
          Grenze statt bei jedem Pixel.
     `setOpen` steigt bei gleichem Zustand sofort aus — doppelte Meldungen
     kosten also nichts.

     Die Schwelle steht als Zeichenkette, weil weder Media Query noch JS eine
     CSS-Variable lesen koennen. Wandert die Stufe, muss sie hier mit —
     deshalb steht sie nur EINMAL. */
  /* In em, damit die Schwelle der Schriftgroesse des Browsers folgt —
     derselbe Wert wie im Stilblock oben. */
  const DESKTOP_NAV_AB = '64em';
  const schliesseBeiDesktopbreite = () => {
    if (window.matchMedia(`(min-width: ${DESKTOP_NAV_AB})`).matches) setOpen(false);
  };
  new ResizeObserver(schliesseBeiDesktopbreite).observe(document.documentElement);
  window.matchMedia(`(min-width: ${DESKTOP_NAV_AB})`).addEventListener('change', schliesseBeiDesktopbreite);

  /* Zurueck-Taste aus dem Seiten-Cache: Der Browser stellt das Dokument so
     wieder her, wie es beim Verlassen war — mit offenem Menue und gesperrtem
     Body. Beides hier aufloesen, sonst startet die Seite fest. */
  window.addEventListener('pageshow', (e) => {
    if (e.persisted) setOpen(false);
  });

  /* ------------------------------------------- 2. Aufklappmenue (Desktop)
     Sichtbarkeit macht CSS. Hier nur die Zustandsmeldung fuer Screenreader
     und Escape zum Schliessen. */
  const aufklapper = [...document.querySelectorAll<HTMLElement>('.nav-item.has-menu')];

  aufklapper.forEach((item) => {
    const trigger = item.querySelector<HTMLElement>('.nav-link');
    if (!trigger) return;
    const sync = (open: boolean) => trigger.setAttribute('aria-expanded', String(open));
    /* Das Verlassen hebt ein vorheriges Escape wieder auf — beim naechsten
       Ueberfahren soll die Flaeche wie gewohnt aufklappen. */
    const wiederFreigeben = () => item.classList.remove('is-dismissed');
    item.addEventListener('pointerenter', () => sync(true));
    item.addEventListener('pointerleave', () => { sync(false); wiederFreigeben(); });
    item.addEventListener('focusin', () => sync(true));
    item.addEventListener('focusout', (e) => {
      if (!item.contains(e.relatedTarget as Node)) { sync(false); wiederFreigeben(); }
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    setOpen(false, true);
    const active = document.activeElement as HTMLElement | null;
    // Fokus aus einer offenen Aufklappflaeche auf ihren Ausloeser zurueckholen
    const openItem = active?.closest('.nav-item.has-menu');
    if (openItem) openItem.querySelector<HTMLElement>('.nav-link')?.focus();
    /* Ausblendbar auch ohne Fokus darin: Wer die Flaeche nur mit dem Zeiger
       geoeffnet hat, kommt sonst nicht an den Inhalt darunter (WCAG 1.4.13,
       „ausblendbar"). Deshalb jede offene Flaeche schliessen, nicht nur die
       fokussierte. */
    for (const item of aufklapper) {
      if (item.matches(':hover') || item.contains(document.activeElement)) item.classList.add('is-dismissed');
    }
  });

  /* --------------------------------------------- 3. Blur beim Scrollen */
  if (header) {
    /* Beim Sperren rutscht die Dokumentposition auf 0 — ohne den Riegel wuerde
       das die Blur-Klasse abwerfen. Bei offenem Menue sagt ohnehin
       `.menu-open`, wie die Leiste aussieht. */
    const onScroll = () => {
      if (isOpen) return;
      header.classList.toggle('scrolled', window.scrollY > 8);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }
