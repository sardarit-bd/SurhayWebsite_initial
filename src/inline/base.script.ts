/* Woertlich uebernommen aus src/layouts/Base.astro (Astro-Fassung).
   Nicht umschreiben: dieselbe Datei, dieselben Zeilen, damit das Verhalten
   nachweisbar unveraendert bleibt. Astro kompilierte den <script>-Block zu
   JavaScript und lieferte ihn inline aus; hier macht das scripts/build-inline.mjs.
   Diese Datei wird NICHT gebuendelt — sie ist die Quelle fuer den Inline-Text. */

      /* ------------------------------------------------------------------
         Animationssystem — Vanilla JS, kein Framework.
         Ein Trigger: alles unter dem Hero ([data-reveal]) über einen
         IntersectionObserver, jedes Element genau einmal. Der Hero bringt
         seine Einblend-Staffelung selbst mit; hier bleibt von ihm nur der
         Akzentstrich unter dem markierten Wort, der nach document.fonts.ready
         aufzieht — sonst liefe er während des Font-Swaps ins Leere.
      ------------------------------------------------------------------ */
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      /** Endzustand setzen und will-change nach der Transition freigeben. */
      const reveal = (el: HTMLElement, delayMs = 0) => {
        if (delayMs > 0) el.style.setProperty('--reveal-delay', `${delayMs}ms`);
        el.classList.add('is-visible');
        if (reduceMotion) {
          el.classList.add('reveal-done');
          return;
        }
        const done = () => el.classList.add('reveal-done');
        el.addEventListener('transitionend', done, { once: true });
        // Sicherheitsnetz, falls transitionend ausbleibt (z. B. Element unsichtbar)
        setTimeout(done, delayMs + 1200);
      };

      /* ------------------------------------------- 1. Akzentstrich im Hero */
      const marker = document.querySelector<HTMLElement>('.marker');

      if (marker) {
        if (reduceMotion) {
          marker.classList.add('is-visible');
        } else {
          // Fonts abwarten (mit Timeout-Fallback), dann im nächsten Frame
          // starten: so zieht der Strich erst auf, wenn die Wortbreite steht.
          const fontsReady = document.fonts
            ? Promise.race([document.fonts.ready, new Promise((r) => setTimeout(r, 1500))])
            : Promise.resolve();
          fontsReady.then(() =>
            requestAnimationFrame(() => requestAnimationFrame(() => marker.classList.add('is-visible')))
          );
        }
      }

      /* --------------------------------------------- 2. Scroll-Reveals */
      const revealEls = [...document.querySelectorAll<HTMLElement>('[data-reveal]')];
      if (reduceMotion) {
        revealEls.forEach((el) => reveal(el));
      } else {
        const pending = new Set(revealEls);

        const show = (el: HTMLElement) => {
          if (!pending.has(el)) return;
          pending.delete(el);
          io.unobserve(el);
          reveal(el, parseInt(el.dataset.revealDelay || '0'));
          // Zahlen im selben Block starten gleichzeitig mit dem Reveal
          el.querySelectorAll<HTMLElement>('[data-count]').forEach(runCounter);
          if (el.hasAttribute('data-count')) runCounter(el);
        };

        const io = new IntersectionObserver(
          (entries) => {
            for (const entry of entries) if (entry.isIntersecting) show(entry.target as HTMLElement);
          },
          { threshold: 0.15, rootMargin: '0px 0px -10% 0px' }
        );
        revealEls.forEach((el) => io.observe(el));

        /* Sicherheitsnetz: Bei sehr schnellem Scrollen, Ankersprüngen oder
           wiederhergestellter Scroll-Position kann ein Element zwischen zwei
           Observer-Messungen komplett übersprungen werden — es bliebe dann
           dauerhaft unsichtbar. Dieser Sweep holt alles nach, was bereits
           oberhalb der Sichtgrenze liegt. */
        let sweepQueued = false;
        const sweep = () => {
          sweepQueued = false;
          const limit = window.innerHeight * 0.9;
          for (const el of [...pending]) {
            if (el.getBoundingClientRect().top < limit) show(el);
          }
          if (pending.size === 0) {
            window.removeEventListener('scroll', queueSweep);
            window.removeEventListener('resize', queueSweep);
          }
        };
        function queueSweep() {
          if (sweepQueued) return;
          sweepQueued = true;
          requestAnimationFrame(sweep);
        }
        window.addEventListener('scroll', queueSweep, { passive: true });
        window.addEventListener('resize', queueSweep, { passive: true });
        queueSweep();
      }

      /* ------------------------------------------------ 3. Count-up
         <span data-count="98" data-prefix="" data-suffix="+">
         Läuft 1200 ms mit ease-out; startet mit dem Reveal seines Blocks. */
      function runCounter(el: HTMLElement) {
        if (el.dataset.counted) return;
        el.dataset.counted = '1';
        const target = parseFloat(el.dataset.count || '0');
        const prefix = el.dataset.prefix || '';
        const suffix = el.dataset.suffix || '';
        // Zahlenformat der aktiven Sprache — <html lang> ist die einzige
        // Quelle, die dem Skript zur Laufzeit zur Verfuegung steht.
        const format = (v: number) => prefix + v.toLocaleString(document.documentElement.lang || 'de') + suffix;
        if (reduceMotion) {
          el.textContent = format(target);
          return;
        }
        const duration = 1200;
        const start = performance.now();
        const step = (now: number) => {
          const p = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - p, 3); // ease-out
          el.textContent = format(Math.round(target * eased));
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      }

      /* ---------------------------------------- 4. Flaechen-Hover (Kreis)
         Baut fuer jede Leistungs-Zeile und -Karte die Maske, den Kreis und
         die helle Kopie des Inhalts; Kurven, Dauern und Farben stehen in
         global.css (Abschnitt Flaechen-Hover). Der Radius wird bei jedem
         Eintritt neu gerechnet und nie gespeichert — nach einem Resize
         stimmt er damit von selbst. */
      const fillEls = [...document.querySelectorAll<HTMLElement>('.fx-fill')];

      if (fillEls.length) {
        /* Nur eine feine Zeigerspitze bekommt den Kreis. Touch faerbt die
           Flaeche beim Druck ohne Kreis, reduzierte Bewegung blendet sie
           ein — beides ueber dieselbe Zustandsklasse. */
        const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
        const radial = finePointer && !reduceMotion;
        if (radial) document.documentElement.classList.add('fx-radial');

        for (const el of fillEls) {
          const clip = document.createElement('span');
          clip.className = 'fx-clip';
          clip.setAttribute('aria-hidden', 'true');
          clip.setAttribute('inert', '');

          const circle = document.createElement('span');
          circle.className = 'fx-circle';

          /* Die Kopie traegt die Layout-Klassen des Originals — und dessen
             Astro-Scope-Attribut, sonst greifen die Bauteil-Styles nicht. */
          const clone = document.createElement('div');
          clone.className = `${el.className.replace(/\bfx-fill\b/, '')} fx-clone`;
          for (const attr of Array.from(el.attributes)) {
            if (attr.name.startsWith('data-astro-cid')) clone.setAttribute(attr.name, attr.value);
          }
          clone.innerHTML = el.innerHTML;
          // Inline gesetzte Linienfarben wuerden die hellen Werte schlagen.
          clone.querySelectorAll<HTMLElement>('[style]').forEach((n) => n.style.removeProperty('border-color'));
          clone.querySelectorAll('[data-reveal]').forEach((n) => n.removeAttribute('data-reveal'));

          circle.append(clone);
          clip.append(circle);
          el.prepend(clip);

          /** Kreis und Kopie auf den Eintrittspunkt setzen — ohne Uebergang,
              damit nichts springt. Ohne Ereignis: volle Flaeche (Touch). */
          const place = (e?: MouseEvent) => {
            const er = el.getBoundingClientRect();
            /* Wieviel Rand links und rechts der Inhaltsspalte bleibt. Das CSS
               deckelt den seitlichen Ueberstand der Zeilen darauf, damit die
               Flaeche nie aus dem Viewport laeuft. Erst danach die Maske
               messen — sie ist gerade breiter geworden. */
            el.style.setProperty(
              '--fx-room',
              `${Math.max(0, Math.min(er.left, document.documentElement.clientWidth - er.right))}px`
            );
            const cr = clip.getBoundingClientRect();
            /* Die Kopie deckt die Randbox des Originals. Die Maske steht je
               nach Bauteil davor oder dahinter; der Versatz gleicht das aus,
               sonst stuende der Text der Kopie daneben. */
            const dx = er.left - cr.left;
            const dy = er.top - cr.top;
            clone.style.width = `${er.width}px`;
            clone.style.height = `${er.height}px`;

            if (!e) {
              clone.style.left = `${dx}px`;
              clone.style.top = `${dy}px`;
              return;
            }

            const x = e.clientX - cr.left;
            const y = e.clientY - cr.top;
            // Abstand zur weitest entfernten Ecke, plus 2 px gegen gerundete
            // Layoutmasse — sonst bliebe dort ein cremefarbener Rest.
            const r = Math.hypot(Math.max(x, cr.width - x), Math.max(y, cr.height - y)) + 2;

            circle.style.left = `${x - r}px`;
            circle.style.top = `${y - r}px`;
            circle.style.width = `${2 * r}px`;
            circle.style.height = `${2 * r}px`;
            clone.style.left = `${dx - x + r}px`;
            clone.style.top = `${dy - y + r}px`;
            // Die Gegenskalierung dreht sich um den Kreismittelpunkt.
            clone.style.transformOrigin = `${x - dx}px ${y - dy}px`;
          };

          const on = (e?: MouseEvent) => {
            place(radial ? e : undefined);
            el.classList.add('is-fx-on');
            clone.classList.add('is-fx-on');
          };
          const off = () => {
            el.classList.remove('is-fx-on');
            clone.classList.remove('is-fx-on');
          };

          if (finePointer) {
            el.addEventListener('mouseenter', on);
            el.addEventListener('mouseleave', off);
          } else {
            el.addEventListener('pointerdown', () => on());
            el.addEventListener('pointerup', off);
            el.addEventListener('pointercancel', off);
            el.addEventListener('pointerleave', off);
          }
        }
      }

      /* ------------------------------------- 5. Ziffer in der Bildschirmmitte
         Der eine bewusste Zustand der Ablauf-Schritte. Er antwortet nicht auf
         den Zeiger, sondern auf die Leseposition: ein Hover waere hier falsch,
         weil ein Schritt kein Ziel ist und keinen Klick einloesen kann.
         Das Band ist null Pixel hoch (rootMargin -50%/-50%) — darin steht
         immer nur ein gestapelter Schritt, „genau eine Ziffer aktiv“ ergibt
         sich damit von selbst. Bei reduzierter Bewegung entfaellt der Zustand
         ersatzlos; die Farben stehen in global.css. */
      const stepEls = [...document.querySelectorAll<HTMLElement>('[data-step-mark]')];

      if (stepEls.length && !reduceMotion) {
        const midObserver = new IntersectionObserver(
          (entries) => {
            for (const entry of entries) entry.target.classList.toggle('is-mid', entry.isIntersecting);
          },
          { rootMargin: '-50% 0px -50% 0px' }
        );
        stepEls.forEach((el) => midObserver.observe(el));
      }
