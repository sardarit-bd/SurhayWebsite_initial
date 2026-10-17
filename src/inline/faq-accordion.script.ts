/* Woertlich uebernommen aus src/components/FaqAccordion.astro (Astro-Fassung).
   Nicht umschreiben: dieselbe Datei, dieselben Zeilen, damit das Verhalten
   nachweisbar unveraendert bleibt. Astro kompilierte den <script>-Block zu
   JavaScript und lieferte ihn inline aus; hier macht das scripts/build-inline.mjs.
   Diese Datei wird NICHT gebuendelt — sie ist die Quelle fuer den Inline-Text. */

  /* --------------------------------------------------------------------
     FAQ-Accordion — Zustand, Hoehenmessung und Scroll-Kompensation.

     Aufgabenteilung: Dauern und Kurven stehen vollstaendig in global.css,
     damit die Responsive-Stufe unter 810px automatisch greift. JS setzt nur
     Klassen und die gemessene Hoehe. Die Zeitwerte, die JS selbst braucht
     (Kollaps-Versatz, Sicherheitsnetze), liest es aus denselben Custom
     Properties — kein zweiter Satz Zahlen.
  -------------------------------------------------------------------- */

  /** Zeitwert einer Custom Property in Millisekunden. */
  const ms = (el: Element, prop: string, fallback: number) => {
    const raw = getComputedStyle(el).getPropertyValue(prop).trim();
    if (raw.endsWith('ms')) return parseFloat(raw) || fallback;
    if (raw.endsWith('s')) return (parseFloat(raw) || fallback / 1000) * 1000;
    return fallback;
  };

  type Parts = { trigger: HTMLButtonElement; panel: HTMLElement; inner: HTMLElement };

  const parts = (item: HTMLElement): Parts | null => {
    const trigger = item.querySelector<HTMLButtonElement>('.faq-trigger');
    const panel = item.querySelector<HTMLElement>('.faq-panel');
    const inner = item.querySelector<HTMLElement>('.faq-panel-inner');
    return trigger && panel && inner ? { trigger, panel, inner } : null;
  };

  class FaqAccordion extends HTMLElement {
    private items: HTMLElement[] = [];
    /** Aufraeumfunktion des laufenden Uebergangs, je Zeile. */
    private pending = new WeakMap<HTMLElement, () => void>();
    /** Abbruch der laufenden Scroll-Kompensation — hoechstens eine je Accordion. */
    private holding: (() => void) | null = null;
    private ready = false;

    connectedCallback() {
      if (this.ready) return;
      this.ready = true;
      this.items = [...this.querySelectorAll<HTMLElement>('.faq-item')];

      for (const item of this.items) {
        const p = parts(item);
        if (!p) continue;
        /* Geschlossen heisst auch: fuer Screenreader nicht erreichbar. */
        p.panel.hidden = true;
        p.trigger.addEventListener('click', () => this.toggle(item));
      }
    }

    /**
     * Zustand von aussen setzen (Suchtreffer auf /faq).
     * `animate: false` springt ohne Bewegung — vierzig Panels gleichzeitig
     * zu animieren waere genau das Gegenteil von ruhig.
     */
    setOpen(item: HTMLElement, open: boolean, animate = true) {
      if (animate) {
        if (open !== item.classList.contains('is-open')) open ? this.open(item) : this.close(item);
        return;
      }

      const p = parts(item);
      if (!p) return;
      this.pending.get(item)?.();
      item.classList.add('is-instant');
      item.classList.remove('is-closing');
      item.classList.toggle('is-open', open);
      p.trigger.setAttribute('aria-expanded', String(open));
      p.panel.hidden = !open;
      p.panel.style.height = open ? 'auto' : '';
      p.panel.style.overflow = open ? 'visible' : '';
      void p.panel.offsetHeight;
      item.classList.remove('is-instant');
    }

    private toggle(item: HTMLElement) {
      const p = parts(item);
      if (!p) return;

      const opening = !item.classList.contains('is-open');
      /* Schliessen laeuft kuerzer als Oeffnen und setzt um --faq-collapse-in
         spaeter an, damit der Text weg ist, bevor die Hoehe kollabiert. */
      const duration = opening
        ? ms(item, '--dur-panel', 400)
        : ms(item, '--faq-collapse-in', 40) + ms(item, '--dur-panel-out', 300);

      /* Hoehe kommt und geht ausschliesslich unterhalb der Zeile, die Zeile
         selbst sollte also ohnehin stehen. Die Schleife laeuft trotzdem: Steht
         die Seite am unteren Rand, zieht das kuerzer werdende Dokument die
         Scrollposition mit, und dann wandert die Zeile doch. Kostet nichts,
         solange das Delta null ist. */
      this.hold(item, [p.panel], duration);

      if (opening) this.open(item);
      else this.close(item);
    }

    private open(item: HTMLElement) {
      const p = parts(item);
      if (!p) return;
      const { trigger, panel, inner } = p;

      panel.hidden = false;
      item.classList.remove('is-closing');

      /* Vom aktuellen Wert aus starten — auch mitten in einer Bewegung. */
      panel.style.overflow = 'hidden';
      panel.style.height = `${panel.getBoundingClientRect().height}px`;
      void panel.offsetHeight;

      item.classList.add('is-open');
      trigger.setAttribute('aria-expanded', 'true');
      panel.style.height = `${inner.getBoundingClientRect().height}px`;

      this.settle(item, panel, () => {
        /* Endzustand `auto`: Danach stimmt die Hoehe nach Resize, Umbruch und
           nachgeladener Schrift von selbst — ohne zweite Messung, ohne Sprung
           und ohne Animation. Das ist die Auto-Height aus der Vorgabe.
           overflow zurueck, damit Fokusringe nicht abgeschnitten werden. */
        panel.style.height = 'auto';
        panel.style.overflow = 'visible';
      });
    }

    private close(item: HTMLElement) {
      const p = parts(item);
      if (!p) return;
      const { trigger, panel } = p;

      panel.style.overflow = 'hidden';
      panel.style.height = `${panel.getBoundingClientRect().height}px`;
      void panel.offsetHeight;

      item.classList.remove('is-open');
      item.classList.add('is-closing');
      trigger.setAttribute('aria-expanded', 'false');
      panel.style.height = '0px';

      this.settle(item, panel, () => {
        item.classList.remove('is-closing');
        /* Erst jetzt aus dem Screenreader nehmen, nicht waehrend der Bewegung. */
        panel.hidden = true;
        panel.style.height = '';
        panel.style.overflow = '';
      });
    }

    /** Ruft `done` auf, wenn die Hoehen-Transition durch ist. */
    private settle(item: HTMLElement, panel: HTMLElement, done: () => void) {
      this.pending.get(item)?.();

      let timer = 0;
      const cancel = () => {
        panel.removeEventListener('transitionend', onEnd);
        window.clearTimeout(timer);
        this.pending.delete(item);
      };
      const onEnd = (e: TransitionEvent) => {
        if (e.target !== panel || e.propertyName !== 'height') return;
        cancel();
        done();
      };

      panel.addEventListener('transitionend', onEnd);
      /* Sicherheitsnetz: Bei gleicher Start- und Zielhoehe — und bei
         prefers-reduced-motion — bleibt transitionend aus. */
      timer = window.setTimeout(
        () => {
          cancel();
          done();
        },
        ms(item, '--dur-panel', 400) + 300
      );
      this.pending.set(item, cancel);
    }

    /**
     * Haelt `anchor` — die geklickte Zeile — waehrend der gesamten
     * Hoehenbewegung exakt an ihrer Position im Viewport fest.
     *
     * Warum eine Schleife und keine einmalige Korrektur nach dem Klick: Die
     * Hoehe des kollabierenden Panels aendert sich ueber die volle Transition
     * hinweg. Eine einzelne Korrektur traefe nur den ersten Frame — den Rest
     * der Bewegung liefe die Seite unter dem Cursor weg.
     *
     * Gemessen wird ausschliesslich die geklickte Zeile. Ihre Position
     * enthaelt bereits die Summe aller Hoehenaenderungen oberhalb — je Panel
     * zu rechnen ergaebe denselben Wert, nur fehleranfaelliger.
     *
     * Anker ist `.faq-item` und nicht der Button darin: Der Button verschiebt
     * sich waehrend des Oeffnens um rund zwei Zehntel bis zwei Pixel in seiner
     * eigenen Zeile (Sub-Pixel-Layout, auch ohne diese Kompensation messbar).
     * Wer darauf regelt, uebersetzt eine unsichtbare Zeilen-interne Bewegung in
     * echtes Scrollen. Die Zeile selbst steht starr.
     *
     * Laeuft auch bei prefers-reduced-motion: Dort ist die Transition auf
     * 0.01ms gestellt, die Schleife greift dann ueber den Nachlauf.
     */
    private hold(anchor: HTMLElement, panels: HTMLElement[], duration: number) {
      /* Neuer Klick waehrend einer laufenden Bewegung: erst die alte Schleife
         samt Listenern abbauen, dann neu ansetzen. Sonst korrigieren zwei
         Schleifen dasselbe Delta und die Spruenge addieren sich auf. */
      this.holding?.();

      /* html traegt scroll-behavior: smooth. Fuer die Dauer der Bewegung
         ausgeschaltet, sonst zieht der Browser jede Korrektur weich nach und
         laeuft der naechsten hinterher. Inline gesetzt und am Ende wieder
         entfernt — die Regel in global.css bleibt unangetastet. */
      const root = document.documentElement;
      root.style.scrollBehavior = 'auto';

      const pendingPanels = new Set(panels);
      let last = anchor.getBoundingClientRect().top;
      let frame = 0;
      let net = 0;
      let over = false;

      const compensate = () => {
        const delta = anchor.getBoundingClientRect().top - last;
        /* Unter einem halben Pixel nicht nachfuehren: Scrollpositionen sind
           ganzzahlig, eine Korrektur darunter schoesse ueber und triebe die
           Seite Frame fuer Frame weiter. `last` bleibt dabei stehen, der Rest
           ist also nicht verloren — er wird nachgeholt, sobald er zaehlt. */
        if (Math.abs(delta) < 0.5) return;
        /* Zwei-Argument-Form statt { behavior: 'instant' }: `instant` ist ein
           IDL-Enum, aeltere Engines — Safari vor 15.4 — werfen dabei einen
           TypeError, und die Kompensation waere in jedem Frame still tot.
           Dass trotzdem hart gescrollt wird, sichert `scroll-behavior: auto`
           weiter unten; ein weiches Nachziehen liefe gegen die eigene
           Korrektur. */
        window.scrollBy(0, delta);
        /* Danach neu messen, statt mit dem erwarteten Wert weiterzurechnen:
           ganz oben und ganz unten kann scrollBy den Delta nicht mehr
           ausgleichen. Der Rest wird verworfen statt aufgestaut. */
        last = anchor.getBoundingClientRect().top;
      };

      const tick = () => {
        compensate();
        frame = requestAnimationFrame(tick);
      };

      const finish = (trailing: boolean) => {
        if (over) return;
        over = true;
        cancelAnimationFrame(frame);
        window.clearTimeout(net);
        for (const panel of panels) panel.removeEventListener('transitionend', onEnd);
        if (this.holding === abort) this.holding = null;
        if (!trailing) {
          /* Abbruch durch einen neuen Klick: Der naechste hold() setzt das
             Flag sofort wieder, hier nichts zurueckstellen. */
          return;
        }
        /* Kurzer Nachlauf ueber das Ende hinaus. Zwei Gruende: settle()
           ersetzt die gemessene Hoehe unmittelbar danach durch `auto`, und
           bei prefers-reduced-motion ist die Transition schon durch, bevor
           die Schleife ueberhaupt einen Frame hatte. */
        let tail = 3;
        const after = () => {
          compensate();
          if (--tail > 0) requestAnimationFrame(after);
          else root.style.scrollBehavior = '';
        };
        requestAnimationFrame(after);
      };

      const abort = () => finish(false);
      const complete = () => finish(true);

      const onEnd = (e: TransitionEvent) => {
        /* Nur die Hoehe zaehlt, und nur vom Panel selbst: Deckkraft und
           Transform des Inhalts bubbeln durch dieselbe Stelle. */
        if (e.target !== e.currentTarget || e.propertyName !== 'height') return;
        pendingPanels.delete(e.currentTarget as HTMLElement);
        if (pendingPanels.size === 0) complete();
      };

      for (const panel of panels) panel.addEventListener('transitionend', onEnd);
      /* Sicherheitsnetz: transitionend bleibt aus, wenn Start- und Zielhoehe
         gleich sind, die Transition unterbrochen wird oder der Tab im
         Hintergrund gedrosselt laeuft. */
      net = window.setTimeout(complete, duration + 100);

      /* Bewusst kein Abbruch auf wheel/touchmove/keydown: Die Vorgabe ist,
         dass die Zeile ueber die *gesamte* Bewegung steht. Ein Listener
         darauf wuerde die Kompensation gerade dann abschalten, wenn sie
         gebraucht wird — beim Nachlauf einer Trackpad-Bewegung, die noch
         Wheel-Ereignisse liefert, oder bei Enter und Space, die selbst
         keydown sind. Die Bewegung dauert 340-440 ms; so lange gehoert die
         Scrollposition der Zeile. */
      this.holding = abort;
      frame = requestAnimationFrame(tick);
    }
  }

  if (!customElements.get('faq-accordion')) customElements.define('faq-accordion', FaqAccordion);
