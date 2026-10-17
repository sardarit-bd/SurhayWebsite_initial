/* Woertlich uebernommen aus src/components/pages/FaqPage.astro (Astro-Fassung).
   Nicht umschreiben: dieselbe Datei, dieselben Zeilen, damit das Verhalten
   nachweisbar unveraendert bleibt. Astro kompilierte den <script>-Block zu
   JavaScript und lieferte ihn inline aus; hier macht das scripts/build-inline.mjs.
   Diese Datei wird NICHT gebuendelt — sie ist die Quelle fuer den Inline-Text. */

  /* Stichwortsuche ueber alle Fragen. Sie arbeitet auf dem gerenderten Text,
     also ohne zweite Datenquelle, die auseinanderlaufen koennte. Ohne
     JavaScript bleibt schlicht alles sichtbar. */
  const input = document.getElementById('faq-search') as HTMLInputElement | null;
  const groups = Array.from(document.querySelectorAll<HTMLElement>('.faq-group'));
  const empty = document.getElementById('faq-empty');
  const count = document.getElementById('faq-count');
  const jumps = Array.from(document.querySelectorAll<HTMLElement>('[data-jump]'));

  if (input && groups.length) {
    const items = groups.flatMap((group) =>
      Array.from(group.querySelectorAll<HTMLElement>('.faq-item')).map((el) => ({
        el,
        group,
        text: (el.textContent ?? '').toLowerCase(),
      }))
    );
    const label = count?.textContent?.trim().split(/\s+/).slice(1).join(' ') ?? '';

    /* Das Accordion erst beim Tippen holen: Beim Laden ist das Custom Element
       je nach Bundle-Reihenfolge noch nicht aufgewertet. Aufgeklappt wird
       ohne Bewegung — vierzig Panels gleichzeitig zu animieren waere das
       Gegenteil von ruhig. */
    type Accordion = HTMLElement & { setOpen?: (item: HTMLElement, open: boolean, animate?: boolean) => void };
    const setOpen = (el: HTMLElement, open: boolean) =>
      document.querySelector<Accordion>('faq-accordion')?.setOpen?.(el, open, false);

    const apply = () => {
      const query = input.value.trim().toLowerCase();
      let visible = 0;

      items.forEach(({ el, text }) => {
        const match = query === '' || text.includes(query);
        el.classList.toggle('is-filtered-out', !match);
        /* Bei einer Suche steht die Antwort meist im Body — also aufklappen,
           damit der Treffer auch zu sehen ist. */
        setOpen(el, match && query.length > 1);
        if (match) visible++;
      });

      let first = true;
      groups.forEach((group) => {
        const hasHit = items.some(({ el, group: g }) => g === group && !el.classList.contains('is-filtered-out'));
        /* Ein Treffer, der erst beim Scrollen erscheint, ist kein Treffer: Das
           Filtern schiebt Gruppen nach oben, die nie im Blick waren und deren
           Scroll-Reveal deshalb noch aussteht. Hier vorziehen. */
        if (hasHit) group.querySelectorAll('[data-reveal]').forEach((el) => el.classList.add('is-visible'));
        group.classList.toggle('is-filtered-out', !hasHit);
        group.classList.toggle('is-first', hasHit && first);
        if (hasHit) first = false;
        const jump = jumps.find((j) => j.dataset.jump === group.dataset.group);
        jump?.classList.toggle('is-filtered-out', !hasHit);
      });

      empty?.classList.toggle('hidden', visible > 0);
      if (count) count.textContent = `${visible} ${label}`;
    };

    input.addEventListener('input', apply);
    /* Escape leert das Feld, statt nur den Browser-Vorschlag zu schliessen. */
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && input.value !== '') {
        input.value = '';
        apply();
      }
    });
  }
