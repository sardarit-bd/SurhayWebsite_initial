/* Woertlich uebernommen aus src/components/sections/Work.astro (Astro-Fassung).
   Nicht umschreiben: dieselbe Datei, dieselben Zeilen, damit das Verhalten
   nachweisbar unveraendert bleibt. Astro kompilierte den <script>-Block zu
   JavaScript und lieferte ihn inline aus; hier macht das scripts/build-inline.mjs.
   Diese Datei wird NICHT gebuendelt — sie ist die Quelle fuer den Inline-Text. */

  // Portfolio-Filter: rein clientseitig, ohne Framework. Läuft ins Leere,
  // solange keine freigegebene Case Study existiert — dann gibt es keine
  // Schaltflächen, über die er stolpern könnte.
  const buttons = document.querySelectorAll<HTMLButtonElement>('.filter-btn');
  const cards = document.querySelectorAll<HTMLElement>('.case-card');
  const empty = document.getElementById('case-empty');

  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;
      buttons.forEach((b) => {
        b.classList.toggle('is-active', b === btn);
        b.setAttribute('aria-pressed', String(b === btn));
      });
      let visible = 0;
      cards.forEach((card) => {
        const show = filter === 'all' || card.dataset.industry === filter;
        card.classList.toggle('is-filtered-out', !show);
        if (show) visible++;
      });
      empty?.classList.toggle('hidden', visible > 0);
      announce(visible);
    });
  });

  /* Die Meldung wird bei jedem Filterwechsel neu geschrieben — auch wenn
     die Zahl gleich bleibt, denn sonst faende der Screenreader keine
     Aenderung und schwiege. Deshalb haengt ein Punkt oder keiner an. */
  const status = document.getElementById('case-count');
  let flip = false;
  function announce(n: number) {
    if (!status) return;
    const tpl = status.dataset.countTemplate ?? '';
    flip = !flip;
    status.textContent = tpl.replace('{n}', String(n)) + (flip ? '' : ' ');
  }
