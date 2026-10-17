/* Woertlich uebernommen aus src/components/sections/Hero.astro (Astro-Fassung).
   Nicht umschreiben: dieselbe Datei, dieselben Zeilen, damit das Verhalten
   nachweisbar unveraendert bleibt. Astro kompilierte den <script>-Block zu
   JavaScript und lieferte ihn inline aus; hier macht das scripts/build-inline.mjs.
   Diese Datei wird NICHT gebuendelt — sie ist die Quelle fuer den Inline-Text. */

  /* Spiegel der Konstanten aus dem Frontmatter. Astro trennt Server- und
     Client-Bereich, deshalb stehen die Zeitwerte hier ein zweites Mal —
     bewusst direkt untereinander, damit sie zusammen geaendert werden. */
  const ZYKLUS_MS = 4500;
  const UEBERGANG_MS = 420;
  const BELEG_VERZUG_MS = 140;

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ------------------------------------------------ 1. Einblend-Staffelung
     Starten, sobald die Schriften stehen — sonst verpufft die Sequenz
     waehrend des Font-Swaps. */
  const faders = [...document.querySelectorAll<HTMLElement>('[data-fade]')];

  if (faders.length) {
    const show = () => faders.forEach((el) => el.classList.add('in'));
    if (reduce) {
      show();
    } else {
      const ready = document.fonts
        ? Promise.race([document.fonts.ready, new Promise((r) => setTimeout(r, 1200))])
        : Promise.resolve();
      ready.then(() => requestAnimationFrame(show));
    }
  }

  /* ------------------------------------------------------ 2. Segment-Wechsler
     Bei reduzierter Bewegung laeuft nichts: das erste Segment steht bereits
     serverseitig auf `data-on` und bleibt es. */
  const hero = document.querySelector<HTMLElement>('.hero');
  const words = [...document.querySelectorAll<HTMLElement>('[data-word]')];
  const proofs = [...document.querySelectorAll<HTMLElement>('[data-proof]')];
  const iconSets = [...document.querySelectorAll<HTMLElement>('[data-icons]')];

  /* Optischer Ausgleich der Headline-Zeile. Die Wortbreiten werden einmal
     nach dem Font-Laden gemessen und bei Groessenaenderung erneut — nicht pro
     Wechsel, damit kein Layout erzwungen wird. */
  const line2 = document.querySelector<HTMLElement>('.h-line-2');
  const wide = window.matchMedia('(min-width: 768px)');
  let widths: number[] = [];

  const measure = () => {
    widths = words.map((w) => {
      const range = document.createRange();
      range.selectNodeContents(w);
      return range.getBoundingClientRect().width;
    });
  };

  const applyShift = (i: number) => {
    if (!line2) return;
    /* Unter 768px steht der Wechsler auf eigener Zeile und ist dort bereits
       mittig — dann ist kein Ausgleich noetig. */
    if (!wide.matches || !widths.length) {
      line2.style.setProperty('--shift', '0px');
      return;
    }
    const max = Math.max(...widths);
    line2.style.setProperty('--shift', `${Math.round((max - widths[i]) / 2)}px`);
  };

  {
    const ready = document.fonts ? document.fonts.ready : Promise.resolve();
    ready.then(() => {
      measure();
      applyShift(0);
    });
    let resizeTimer = 0;
    window.addEventListener(
      'resize',
      () => {
        clearTimeout(resizeTimer);
        resizeTimer = window.setTimeout(() => {
          measure();
          applyShift(currentIndex);
        }, 150);
      },
      { passive: true }
    );
  }

  let currentIndex = 0;

  if (hero && words.length > 1 && !reduce) {
    /* Ein Takt fuer alle Breiten — bewusst kein Mobil-Sonderfall. */
    const hold = () => ZYKLUS_MS;

    let timer = 0;
    let belegTimer = 0;
    let hovered = false;
    let visible = true;
    /* Vom Besucher angehalten (WCAG 2.2.2). Anders als `hovered` bleibt
       dieser Zustand stehen, bis er ihn selbst zuruecknimmt. */
    let paused = false;

    const halted = () => paused || hovered || document.hidden || !visible;

    const stop = () => {
      if (timer) { clearTimeout(timer); timer = 0; }
    };

    const advance = () => {
      const next = (currentIndex + 1) % words.length;

      /* Das alte Wort faehrt nach oben aus der Maske, das neue kommt
         gleichzeitig von unten herein. `data-out` wird nach dem Lauf wieder
         entfernt, damit das Wort unten wartet statt oben zu haengen. */
      const outgoing = words[currentIndex];
      outgoing.removeAttribute('data-on');
      outgoing.setAttribute('data-out', '');
      words[next].setAttribute('data-on', '');

      window.setTimeout(() => outgoing.removeAttribute('data-out'), UEBERGANG_MS + 40);

      /* Icons haengen am selben Index und wechseln mit dem Wort. */
      iconSets[currentIndex]?.removeAttribute('data-on');
      iconSets[next]?.setAttribute('data-on', '');

      /* Die Beleg-Zeile zieht spaeter nach — gestaffelt statt gleichzeitig. */
      clearTimeout(belegTimer);
      const from = currentIndex;
      belegTimer = window.setTimeout(() => {
        proofs[from]?.removeAttribute('data-on');
        proofs[next]?.setAttribute('data-on', '');
      }, BELEG_VERZUG_MS);

      currentIndex = next;
      applyShift(next);
      schedule();
    };

    const schedule = () => {
      stop();
      if (halted()) return;
      timer = window.setTimeout(advance, hold());
    };

    hero.addEventListener('pointerenter', () => { hovered = true; stop(); });
    hero.addEventListener('pointerleave', () => { hovered = false; schedule(); });
    hero.addEventListener('focusin', () => { hovered = true; stop(); });
    hero.addEventListener('focusout', (e) => {
      if (!hero.contains(e.relatedTarget as Node)) { hovered = false; schedule(); }
    });
    document.addEventListener('visibilitychange', schedule);

    /* --------------------------------------------- Anhalten-Schalter
       Er erscheint erst hier: ohne JS bewegt sich nichts, und bei
       reduzierter Bewegung ist dieser ganze Block gar nicht erst gelaufen. */
    const motionBtn = document.getElementById('hero-motion') as HTMLButtonElement | null;
    if (motionBtn) {
      motionBtn.hidden = false;
      motionBtn.addEventListener('click', () => {
        paused = !paused;
        motionBtn.setAttribute('aria-pressed', String(paused));
        motionBtn.setAttribute(
          'aria-label',
          (paused ? motionBtn.dataset.labelPlay : motionBtn.dataset.labelPause) ?? ''
        );
        hero.classList.toggle('is-paused', paused);
        /* Der Knopf liegt im Hero: ein Klick setzt `hovered`, ein Tab
           hinein ebenfalls. Beim Fortsetzen wuerde `schedule()` deshalb
           sofort wieder aussteigen — den Zeiger-Halt hier aufloesen. */
        if (!paused) hovered = false;
        schedule();
      });
    }

    /* Unter 50 % Sichtbarkeit steht der Wechsler still. */
    const io = new IntersectionObserver(
      (entries) => {
        visible = entries[0].intersectionRatio >= 0.5;
        schedule();
      },
      { threshold: [0, 0.5, 1] }
    );
    io.observe(hero);

    /* Erst nach dem load-Event: waehrend des Ladens soll nichts konkurrieren. */
    if (document.readyState === 'complete') schedule();
    else window.addEventListener('load', schedule, { once: true });

    window.addEventListener('pagehide', () => {
      stop();
      clearTimeout(belegTimer);
      io.disconnect();
    });
  }
