/* Woertlich uebernommen aus src/components/LanguageSwitcher.astro (Astro-Fassung).
   Nicht umschreiben: dieselbe Datei, dieselben Zeilen, damit das Verhalten
   nachweisbar unveraendert bleibt. Astro kompilierte den <script>-Block zu
   JavaScript und lieferte ihn inline aus; hier macht das scripts/build-inline.mjs.
   Diese Datei wird NICHT gebuendelt — sie ist die Quelle fuer den Inline-Text. */

  /* -----------------------------------------------------------------------
     1. Anker und Query beim Sprachwechsel mitnehmen
     Statisch gebaut weiss die Seite nichts von #kontakt oder ?utm_source —
     beides steht nur im Browser. Die Sprachlinks bekommen es deshalb hier
     angehaengt, und zwar beim Laden (damit auch „Link kopieren“ und
     Mittelklick es mitnehmen) sowie bei jeder Anker-Aenderung.
  ----------------------------------------------------------------------- */
  const carryOver = () => {
    const tail = window.location.search + window.location.hash;
    document.querySelectorAll<HTMLAnchorElement>('[data-lang-link]').forEach((link) => {
      const base = link.dataset.langBase ?? link.getAttribute('href') ?? '';
      link.dataset.langBase = base;
      link.setAttribute('href', base + tail);
    });
  };
  carryOver();
  window.addEventListener('hashchange', carryOver);
  window.addEventListener('popstate', carryOver);

  /* -----------------------------------------------------------------------
     2. Aufklappen — Tastatur vollstaendig, Zeiger als Zugabe
     Enter/Leertaste oeffnen (das macht der Button selbst), Pfeiltasten
     wandern durch die Liste, Escape schliesst und gibt den Fokus zurueck,
     ein Klick daneben oder ein Tab hinaus schliesst ebenfalls.
  ----------------------------------------------------------------------- */
  document.querySelectorAll<HTMLElement>('[data-lang-switcher]').forEach((root) => {
    const toggle = root.querySelector<HTMLButtonElement>('[data-lang-toggle]');
    const menu = root.querySelector<HTMLElement>('[data-lang-menu]');
    if (!toggle || !menu) return;

    const items = () => [...menu.querySelectorAll<HTMLAnchorElement>('a')];
    let open = false;

    const setOpen = (next: boolean, focus: 'button' | 'first' | 'last' | 'none' = 'none') => {
      open = next;
      toggle.setAttribute('aria-expanded', String(next));
      menu.classList.toggle('open', next);
      if (!next) {
        if (focus === 'button') toggle.focus();
        return;
      }
      const list = items();
      if (focus === 'first') list[0]?.focus();
      if (focus === 'last') list[list.length - 1]?.focus();
    };

    toggle.addEventListener('click', () => setOpen(!open));

    toggle.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setOpen(true, 'first');
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setOpen(true, 'last');
      }
    });

    menu.addEventListener('keydown', (e) => {
      const list = items();
      const at = list.indexOf(document.activeElement as HTMLAnchorElement);
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        list[(at + 1) % list.length]?.focus();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        list[(at - 1 + list.length) % list.length]?.focus();
      } else if (e.key === 'Home') {
        e.preventDefault();
        list[0]?.focus();
      } else if (e.key === 'End') {
        e.preventDefault();
        list[list.length - 1]?.focus();
      }
    });

    root.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && open) {
        e.stopPropagation();
        setOpen(false, 'button');
      }
    });

    /* Fokus verlaesst die Gruppe (Tab weiter) → zu, aber ohne den Fokus
       zurueckzuholen; das waere eine Fokusfalle. */
    root.addEventListener('focusout', (e) => {
      if (!root.contains(e.relatedTarget as Node)) setOpen(false);
    });

    document.addEventListener('pointerdown', (e) => {
      if (open && !root.contains(e.target as Node)) setOpen(false);
    });
  });
