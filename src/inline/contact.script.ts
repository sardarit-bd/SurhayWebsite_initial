/* Woertlich uebernommen aus src/components/sections/Contact.astro (Astro-Fassung).
   Nicht umschreiben: dieselbe Datei, dieselben Zeilen, damit das Verhalten
   nachweisbar unveraendert bleibt. Astro kompilierte den <script>-Block zu
   JavaScript und lieferte ihn inline aus; hier macht das scripts/build-inline.mjs.
   Diese Datei wird NICHT gebuendelt — sie ist die Quelle fuer den Inline-Text. */

  // Progressive Enhancement: Formular via fetch absenden, Erfolg inline zeigen.
  // Ohne JS funktioniert der normale Formspree-POST weiterhin. Fehlt die
  // Form-ID, existiert das Formular gar nicht — dann greift nichts davon.
  const form = document.getElementById('contact-form') as HTMLFormElement | null;
  const success = document.getElementById('form-success');
  const error = document.getElementById('form-error');

  form?.addEventListener('submit', async (e) => {
    e.preventDefault();
    success?.classList.add('hidden');
    error?.classList.add('hidden');
    try {
      const res = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      });
      if (res.ok) {
        form.reset();
        success?.classList.remove('hidden');
      } else {
        error?.classList.remove('hidden');
      }
    } catch {
      error?.classList.remove('hidden');
    }
  });
