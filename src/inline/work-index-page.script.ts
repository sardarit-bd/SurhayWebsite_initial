/* Woertlich uebernommen aus src/components/pages/WorkIndexPage.astro (Astro-Fassung).
   Nicht umschreiben: dieselbe Datei, dieselben Zeilen, damit das Verhalten
   nachweisbar unveraendert bleibt. Astro kompilierte den <script>-Block zu
   JavaScript und lieferte ihn inline aus; hier macht das scripts/build-inline.mjs.
   Diese Datei wird NICHT gebuendelt — sie ist die Quelle fuer den Inline-Text. */

  // Branchenfilter, rein clientseitig. Ohne freigegebene Case Study gibt es
  // keine Schaltflaechen — dann laeuft das hier ins Leere und tut nichts.
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
