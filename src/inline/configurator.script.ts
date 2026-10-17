/* Woertlich uebernommen aus src/components/Configurator.astro (Astro-Fassung).
   Nicht umschreiben: dieselbe Datei, dieselben Zeilen, damit das Verhalten
   nachweisbar unveraendert bleibt. Astro kompilierte den <script>-Block zu
   JavaScript und lieferte ihn inline aus; hier macht das scripts/build-inline.mjs.
   Diese Datei wird NICHT gebuendelt — sie ist die Quelle fuer den Inline-Text. */

  const form = document.getElementById('config-form') as HTMLFormElement | null;
  if (form) {
    /* Zahlenformat der aktiven Sprache — <html lang> traegt de | tr | en. */
    const locale = document.documentElement.lang || 'de';
    const estimate = document.getElementById('estimate')!;
    const duration = document.getElementById('duration')!;
    const monthly = document.getElementById('estimate-monthly')!;
    const summaryList = document.getElementById('summary-list')!;
    const summaryField = document.getElementById('config-summary') as HTMLInputElement;
    const success = document.getElementById('cfg-success');
    const error = document.getElementById('cfg-error');

    /* ------------------------------------------------ Preis & Dauer */
    const update = () => {
      const type = form.querySelector<HTMLInputElement>('input[name="typ"]:checked');
      const care = form.querySelector<HTMLInputElement>('input[name="wartung"]:checked');
      const typeId = type?.dataset.typeId ?? '';
      const basePrice = type?.dataset.price ? parseInt(type.dataset.price) : null;

      let total = basePrice ?? 0;
      let extraWeeks = 0;
      const chosenLabels: string[] = [];
      if (type) chosenLabels.push(type.value);

      form.querySelectorAll<HTMLInputElement>('input[name="extras"]').forEach((extra) => {
        const includedIn = (extra.dataset.freeFor ?? '').split(' ').filter(Boolean);
        const isIncluded = includedIn.includes(typeId);
        const priceLabel = extra.closest('label')?.querySelector<HTMLElement>('[data-price-label]');
        if (priceLabel) {
          priceLabel.classList.toggle('is-included', isIncluded);
          priceLabel.textContent = isIncluded
            ? (priceLabel.dataset.includedLabel ?? '')
            : `+ ${parseInt(extra.dataset.price ?? '0').toLocaleString(locale)} €`;
        }
        if (extra.checked) {
          chosenLabels.push(extra.value);
          extraWeeks += parseInt(extra.dataset.weeks ?? '0');
          if (!isIncluded) total += parseInt(extra.dataset.price ?? '0');
        }
      });
      if (care) chosenLabels.push(care.value);

      // Gesamtpreis
      if (basePrice === null) {
        estimate.textContent = estimate.dataset.custom ?? '';
        estimate.style.fontSize = '1.35rem';
      } else {
        estimate.textContent = `${estimate.dataset.from} ${total.toLocaleString(locale)} €`;
        estimate.style.fontSize = '';
      }
      monthly.classList.toggle('hidden', care?.dataset.care !== 'care-yes');

      // Projektdauer
      const weeksMin = type?.dataset.weeksMin ? parseInt(type.dataset.weeksMin) + extraWeeks : null;
      const weeksMax = type?.dataset.weeksMax ? parseInt(type.dataset.weeksMax) + extraWeeks : null;
      if (weeksMin === null || weeksMax === null) {
        duration.textContent = duration.dataset.custom ?? '';
        duration.style.fontSize = '1.35rem';
      } else {
        const range = weeksMin === weeksMax ? `${weeksMin}` : `${weeksMin}–${weeksMax}`;
        duration.textContent = `${duration.dataset.approx} ${range} ${duration.dataset.weeksUnit}`;
        duration.style.fontSize = '';
      }

      // Zusammenfassungsliste + verstecktes Feld für die E-Mail
      summaryList.innerHTML = '';
      for (const label of chosenLabels) {
        const li = document.createElement('li');
        li.className = 'flex items-start gap-2';
        li.innerHTML =
          '<svg class="mt-1.5 h-3 w-3 flex-none text-accent-400" viewBox="0 0 14 14" fill="none" aria-hidden="true"><path d="M2 7.5 5.5 11 12 3" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
        li.append(label);
        summaryList.append(li);
      }
      summaryField.value = `${chosenLabels.join(' · ')} — ${estimate.textContent} — ${duration.textContent}`;
    };

    form.addEventListener('change', update);
    update();

    /* ------------------------------------------------ Wizard-Schritte */
    const steps = [...form.querySelectorAll<HTMLElement>('.cfg-step')];
    const progress = document.getElementById('config-progress')!;
    const progressFill = document.getElementById('progress-fill')!;
    const progressLabel = document.getElementById('progress-label')!;
    const progressStepName = document.getElementById('progress-step-name')!;
    const nav = document.getElementById('wizard-nav')!;
    const backBtn = document.getElementById('wizard-back')!;
    const nextBtn = document.getElementById('wizard-next')!;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let current = 0;

    form.classList.add('js-wizard');
    progress.hidden = false;
    nav.hidden = false;

    const showStep = (index: number, scroll: boolean) => {
      current = Math.max(0, Math.min(index, steps.length - 1));
      steps.forEach((step, i) => step.classList.toggle('is-active', i === current));
      progressFill.style.transform = `scaleX(${(current + 1) / steps.length})`;
      progressLabel.textContent = (progressLabel.dataset.template ?? '')
        .replace('{c}', String(current + 1))
        .replace('{t}', String(steps.length));
      progressStepName.textContent = steps[current].dataset.stepName ?? '';
      backBtn.classList.toggle('invisible', current === 0);
      nextBtn.classList.toggle('hidden', current === steps.length - 1);
      if (current === steps.length - 1) update();
      if (scroll) {
        document.getElementById('config-top')?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
        steps[current].focus({ preventScroll: true });
      }
    };

    nextBtn.addEventListener('click', () => showStep(current + 1, true));
    backBtn.addEventListener('click', () => showStep(current - 1, true));
    showStep(0, false);

    /* ------------------------------------------------ Absenden */
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (!form.reportValidity()) return;
      success?.classList.add('hidden');
      error?.classList.add('hidden');

      /* Ohne hinterlegten Endpunkt darf nichts abgesendet werden.
         Bewusst getAttribute statt form.action: die Eigenschaft liefert ohne
         action-Attribut die URL der aktuellen Seite zurueck — ein Absenden
         wuerde die komplette Konfiguration samt Name und E-Mail an den
         Webserver dieser Website posten (auf GitHub Pages: an GitHub und
         dessen CDN Fastly). Gemessen am 5. September 2026: form.action war
         "https://surhay276.github.io/SurhayWebsite/konfigurator/". */
      const endpoint = form.getAttribute('action');
      if (!endpoint) {
        error?.classList.remove('hidden');
        return;
      }

      try {
        const res = await fetch(endpoint, {
          method: 'POST',
          body: new FormData(form),
          headers: { Accept: 'application/json' },
        });
        if (res.ok) {
          success?.classList.remove('hidden');
        } else {
          error?.classList.remove('hidden');
        }
      } catch {
        error?.classList.remove('hidden');
      }
    });
  }
