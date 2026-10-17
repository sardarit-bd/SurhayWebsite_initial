/* Woertlich uebernommen aus src/components/ContactForm.astro (Astro-Fassung).
   Nicht umschreiben: dieselbe Datei, dieselben Zeilen, damit das Verhalten
   nachweisbar unveraendert bleibt. Astro kompilierte den <script>-Block zu
   JavaScript und lieferte ihn inline aus; hier macht das scripts/build-inline.mjs.
   Diese Datei wird NICHT gebuendelt — sie ist die Quelle fuer den Inline-Text. */

  /* ---------------------------------------------------------------------------
     Anfrageformular — Pruefung, Zustaende, Versand.

     REIHENFOLGE DER PRUEFUNG
     Beim Verlassen eines Feldes, nicht bei jedem Tastendruck: ein Feld, das
     rot wird, bevor man fertig getippt hat, wirkt aggressiv. Erst wenn ein
     Feld einmal als fehlerhaft markiert ist, prueft es live wieder mit —
     sonst bliebe die Meldung stehen, obwohl der Fehler behoben ist.

     SPRACHE
     Alle Meldungen kommen als data-Attribute aus dem Markup. So bleibt dieses
     Skript fuer DE und EN dasselbe.
  --------------------------------------------------------------------------- */

  const form = document.getElementById('cf-form') as HTMLFormElement | null;

  if (form) {
    const failBox = document.getElementById('cf-fail')!;
    const successBox = document.getElementById('cf-success')!;
    const successTitle = document.getElementById('cf-success-title')!;
    const submit = document.getElementById('cf-submit') as HTMLButtonElement;
    const submitLabel = submit.querySelector('.cf-submit-label')!;
    const honeypot = form.querySelector<HTMLInputElement>('input[name="_gotcha"]')!;
    const timestamp = form.querySelector<HTMLInputElement>('input[name="zeitstempel"]')!;

    const nameEl = form.querySelector<HTMLInputElement>('#cf-name')!;
    const emailEl = form.querySelector<HTMLInputElement>('#cf-email')!;
    const messageEl = form.querySelector<HTMLTextAreaElement>('#cf-message')!;
    const consentEl = form.querySelector<HTMLInputElement>('#cf-consent')!;
    const serviceBoxes = Array.from(form.querySelectorAll<HTMLInputElement>('input[name="leistung[]"]'));
    const unsureBox = form.querySelector<HTMLInputElement>('input[data-unsure]');
    const packageSelect = form.querySelector<HTMLSelectElement>('#cf-paket')!;

    const msg = form.dataset;
    const idleLabel = submitLabel.textContent ?? '';
    const sendingLabel = submit.dataset.sending ?? idleLabel;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* JS uebernimmt die Pruefung — ohne JS bleibt die des Browsers zustaendig. */
    form.noValidate = true;

    /* Zeitfalle: alles, was in unter drei Sekunden nach dem Laden abgeschickt
       wird, kommt nicht von einem Menschen, der dieses Formular ausfuellt. */
    const loadedAt = Date.now();
    timestamp.value = String(loadedAt);

    const fieldOf = (name: string) => form.querySelector<HTMLElement>(`[data-field="${name}"]`)!;

    type Check = { name: string; focus: () => HTMLElement | null; error: () => string };

    /* Die Reihenfolge hier ist die des Formulars, nicht irgendeine: Beim
       Absenden wird der erste Eintrag mit Fehler angesprungen, und "der erste"
       muss der oberste auf der Seite sein. */
    const checks: Check[] = [
      {
        name: 'name',
        focus: () => nameEl,
        error: () => (nameEl.value.trim() ? '' : msg.errName ?? ''),
      },
      {
        name: 'email',
        focus: () => emailEl,
        error: () => {
          const value = emailEl.value.trim();
          if (!value) return msg.errEmailEmpty ?? '';
          return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value) ? '' : msg.errEmailInvalid ?? '';
        },
      },
      {
        name: 'paket',
        focus: () => packageSelect,
        /* Die Platzhalter-Option traegt einen leeren Wert — mehr braucht die
           Pruefung nicht zu wissen. */
        error: () => (packageSelect.value ? '' : msg.errPaket ?? ''),
      },
      {
        name: 'message',
        focus: () => messageEl,
        /* Zwei Faelle, zwei Meldungen: leer und zu kurz sind nicht dasselbe
           Problem, und wer „Hallo" getippt hat, braucht die Angabe, wie viel
           fehlt — nicht die Behauptung, das Feld sei leer (WCAG 3.3.1, 3.3.3). */
        error: () => {
          const value = messageEl.value.trim();
          if (!value) return msg.errMessage ?? '';
          return value.length >= 20 ? '' : msg.errMessageShort ?? msg.errMessage ?? '';
        },
      },
      {
        name: 'consent',
        focus: () => consentEl,
        error: () => (consentEl.checked ? '' : msg.errConsent ?? ''),
      },
    ];

    function paint(check: Check, text: string) {
      const field = fieldOf(check.name);
      const box = field.querySelector<HTMLElement>('.cf-error')!;
      const label = box.querySelector('.cf-error-text')!;
      const control = check.focus();

      if (text) {
        field.classList.add('is-error');
        label.textContent = text;
        box.hidden = false;
        control?.setAttribute('aria-invalid', 'true');
      } else {
        field.classList.remove('is-error');
        box.hidden = true;
        label.textContent = '';
        control?.removeAttribute('aria-invalid');
      }
    }

    /* Beim Verlassen pruefen; ist einmal ein Fehler markiert, auch waehrend
       der Eingabe — dann darf die Meldung sofort wieder verschwinden. */
    for (const check of checks) {
      const field = fieldOf(check.name);
      const controls = Array.from(field.querySelectorAll<HTMLElement>('input, textarea, select'));

      for (const control of controls) {
        control.addEventListener('blur', () => paint(check, check.error()));
        control.addEventListener('input', () => {
          if (field.classList.contains('is-error')) paint(check, check.error());
        });
        control.addEventListener('change', () => {
          if (field.classList.contains('is-error')) paint(check, check.error());
        });
      }
    }

    /* "Noch unklar" schliesst die vier Leistungen aus, und umgekehrt. */
    for (const box of serviceBoxes) {
      box.addEventListener('change', () => {
        if (!box.checked) return;
        if (unsureBox && box === unsureBox) {
          for (const other of serviceBoxes) if (other !== box) other.checked = false;
        } else if (unsureBox) {
          unsureBox.checked = false;
        }
      });
    }

    /* ------------------------------------------------- Paket-Vorauswahl
       Die Karten der Preis-Sektion springen als gewoehnlicher Anker hierher
       (href="#anfrage"); das Scrollen macht der Browser. Hier wird nur das
       Paket gesetzt und der Fokus nachgezogen — mit preventScroll, sonst
       scrollte die Seite ein zweites Mal und ruckelte gegen den Anker.

       Ein unbekannter Wert waehlt nichts aus. Er kommt von einem alten
       Lesezeichen oder einer getippten URL, nicht vom Besucher — eine
       Fehlermeldung dafuer waere an die falsche Person gerichtet. */
    function selectPackage(id: string) {
      const match = Array.from(packageSelect.options).find((option) => option.dataset.plan === id);
      if (!match) return;
      packageSelect.value = match.value;
      /* Weckt die Live-Pruefung, damit eine stehende Fehlermeldung
         verschwindet, sobald die Wahl von aussen gesetzt wird. */
      packageSelect.dispatchEvent(new Event('change', { bubbles: true }));
      /* Nicht sofort: Der Anker-Sprung laeuft direkt nach dem Klick und setzt
         dabei den Fokus des Dokuments zurueck — ein focus() davor waere sofort
         wieder weg, gemessen auch im naechsten Frame. Ein Makrotask laeuft
         nach der Navigation und haelt. preventScroll, damit der Sprung des
         Browsers die einzige Bewegung bleibt. */
      setTimeout(() => packageSelect.focus({ preventScroll: true }), 0);
    }

    for (const cta of document.querySelectorAll<HTMLAnchorElement>('a[data-paket]')) {
      cta.addEventListener('click', () => selectPackage(cta.dataset.paket ?? ''));
    }

    /* Derselbe Weg von einer anderen Seite aus: /kontakt?paket=business. */
    const wantedPackage = new URLSearchParams(window.location.search).get('paket');
    if (wantedPackage) selectPackage(wantedPackage);

    function setSending(on: boolean) {
      if (on) {
        /* Breite einfrieren, bevor die Beschriftung wechselt — der Button
           soll waehrend des Sendens nicht die Groesse aendern. */
        submit.style.minWidth = `${submit.offsetWidth}px`;
        submit.classList.add('is-sending');
        submit.setAttribute('aria-busy', 'true');
        submitLabel.textContent = sendingLabel;
      } else {
        submit.classList.remove('is-sending');
        submit.removeAttribute('aria-busy');
        submitLabel.textContent = idleLabel;
        submit.style.minWidth = '';
      }
    }

    function showSuccess() {
      form.hidden = true;
      failBox.hidden = true;
      successBox.hidden = false;
      successTitle.focus();
    }

    function showFailure() {
      failBox.hidden = false;
      failBox.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'center' });
    }

    let sending = false;

    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      if (sending) return;

      failBox.hidden = true;

      const failed = checks.filter((check) => {
        const text = check.error();
        paint(check, text);
        return text !== '';
      });

      if (failed.length > 0) {
        const target = failed[0].focus();
        fieldOf(failed[0].name).scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'center' });
        target?.focus({ preventScroll: true });
        return;
      }

      /* Stillschweigend verwerfen: gefuellter Honeypot oder ein Absenden
         innerhalb von drei Sekunden. Wer davon betroffen ist, soll nicht
         lernen, woran es lag. */
      if (honeypot.value.trim() !== '' || Date.now() - loadedAt < 3000) {
        showSuccess();
        return;
      }

      const endpoint = form.getAttribute('action');
      if (!endpoint) {
        showFailure();
        return;
      }

      sending = true;
      setSending(true);

      try {
        const response = await fetch(endpoint, {
          method: 'POST',
          body: new FormData(form),
          headers: { Accept: 'application/json' },
        });
        if (response.ok) showSuccess();
        else showFailure();
      } catch {
        showFailure();
      } finally {
        sending = false;
        setSending(false);
      }
    });
  }
