/* Woertlich uebernommen aus src/layouts/BlogIndex.astro (Astro-Fassung).
   Nicht umschreiben: dieselbe Datei, dieselben Zeilen, damit das Verhalten
   nachweisbar unveraendert bleibt. Astro kompilierte den <script>-Block zu
   JavaScript und lieferte ihn inline aus; hier macht das scripts/build-inline.mjs.
   Diese Datei wird NICHT gebuendelt — sie ist die Quelle fuer den Inline-Text. */

  // Themenfilter: blendet Karten aus, ohne die Seite neu zu laden. Der
  // Aufmacher bleibt stehen — er ist der juengste Beitrag, nicht Teil des Rasters.
  const buttons = document.querySelectorAll<HTMLButtonElement>('.topic-btn');
  const cards = document.querySelectorAll<HTMLElement>('.blog-card');
  const empty = document.getElementById('post-empty');

  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const topic = btn.dataset.topic;
      buttons.forEach((b) => {
        b.classList.toggle('is-active', b === btn);
        b.setAttribute('aria-pressed', String(b === btn));
      });
      let visible = 0;
      cards.forEach((card) => {
        const show = topic === 'all' || card.dataset.topic === topic;
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
  const status = document.getElementById('post-count');
  let flip = false;
  function announce(n: number) {
    if (!status) return;
    const tpl = status.dataset.countTemplate ?? '';
    flip = !flip;
    status.textContent = tpl.replace('{n}', String(n)) + (flip ? '' : ' ');
  }
