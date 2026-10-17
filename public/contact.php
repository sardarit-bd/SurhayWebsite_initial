<?php
/**
 * Eigener Endpunkt für das Anfrageformular — PHP-Mailer direkt beim Hoster.
 *
 * WARUM ES IHN GIBT
 * Er ist die Antwort auf die Datenschutzfrage: Die Anfrage verlässt den
 * Server des Hosters nicht, es ist kein Drittanbieter beteiligt, und damit
 * braucht es weder eine Drittlandsübermittlung noch einen zusätzlichen
 * Auftragsverarbeitungsvertrag. Läuft der Hoster in der EU, liegen die Daten
 * in der EU.
 *
 * AKTIVIERUNG
 * 1. In src/config.ts `formEndpoint: '/contact.php'` setzen. Mehr ist nicht
 *    nötig — Kontaktformular, Startseiten-Sektion und Konfigurator lesen den
 *    Wert von dort.
 * 2. Unten $to auf die Empfänger-Adresse setzen (Postfach beim Hoster
 *    anlegen, damit mail() zuverlässig zustellt).
 * 3. Den Abschnitt „Kontaktformular“ der Datenschutzerklärung anpassen: dort
 *    steht dann kein Drittanbieter mehr, sondern der eigene Server.
 *
 * SPAMSCHUTZ
 * Honeypot und Zeitfalle prüft der Server ein zweites Mal. Die Prüfung im
 * Browser ist Komfort, kein Schutz — ein Bot, der direkt hierher postet,
 * hat sie nie gesehen.
 */

declare(strict_types=1);

$to = 'hallo@surhay.design'; // TODO: Empfänger-Adresse prüfen

/** Kürzeste Zeit in Sekunden, die ein Mensch zum Ausfüllen braucht. */
const MIN_FILL_SECONDS = 3;

// Nur POST zulassen
if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    http_response_code(405);
    exit('Method Not Allowed');
}

$wantsJson = str_contains($_SERVER['HTTP_ACCEPT'] ?? '', 'application/json');

function respond(bool $ok, ?string $error = null): never
{
    global $wantsJson;
    if ($wantsJson) {
        header('Content-Type: application/json; charset=utf-8');
        http_response_code($ok ? 200 : 422);
        echo json_encode($ok ? ['ok' => true] : ['ok' => false, 'error' => $error]);
    } else {
        // Ohne JavaScript: zurück auf die Seite, von der abgeschickt wurde —
        // /kontakt oder /en/contact. Übernommen wird ausschließlich der Pfad
        // einer Referrer-URL vom eigenen Host, damit daraus keine offene
        // Weiterleitung wird.
        $back = '/kontakt';
        $parts = parse_url((string)($_SERVER['HTTP_REFERER'] ?? ''));
        if (
            ($parts['host'] ?? '') === ($_SERVER['HTTP_HOST'] ?? '')
            && str_starts_with((string)($parts['path'] ?? ''), '/')
        ) {
            $back = $parts['path'];
        }
        header('Location: ' . $back, true, 303);
    }
    exit;
}

/** Feld als getrimmter String, egal ob gesendet oder nicht. */
function field(string $name): string
{
    return trim((string)($_POST[$name] ?? ''));
}

/** Mehrfachauswahl kommt als wiederholter Feldname an. */
function fieldList(string $name): array
{
    $raw = $_POST[$name] ?? [];
    if (!is_array($raw)) {
        $raw = [$raw];
    }
    return array_values(array_filter(array_map(
        static fn ($value) => trim((string)$value),
        $raw
    ), static fn (string $value) => $value !== ''));
}

/* ------------------------------------------------------------- Spamschutz
   Beides wird stillschweigend als Erfolg quittiert: Wer die Falle auslöst,
   soll nicht lernen, woran es lag. */

if (field('_gotcha') !== '') {
    respond(true);
}

$loadedAt = field('zeitstempel');
// Leer heißt „kein JavaScript“ — dann greift nur der Honeypot, statt
// Besucher ohne JS auszusperren. Der Wert kommt in Millisekunden.
if ($loadedAt !== '' && ctype_digit($loadedAt)) {
    $elapsed = (microtime(true) * 1000) - (float)$loadedAt;
    if ($elapsed < MIN_FILL_SECONDS * 1000) {
        respond(true);
    }
}

/* ------------------------------------------------------------ Validierung
   Dieselben Pflichtfelder wie im Browser: Paket, Leistung, Nachricht, Name,
   E-Mail und die Einwilligung. */

$package  = field('paket');
$services = fieldList('leistung');
$message  = field('nachricht');
$name     = field('name');
$email    = field('email');
$consent  = field('einwilligung');

$company  = field('unternehmen');
$phone    = field('telefon');

if ($package === '' || $services === [] || mb_strlen($message) < 20 || $name === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    respond(false, 'validation');
}

// Ohne Einwilligung darf die Anfrage nicht verarbeitet werden.
if ($consent === '') {
    respond(false, 'consent');
}

$limits = [
    'name' => [$name, 200], 'email' => [$email, 200], 'unternehmen' => [$company, 200],
    'telefon' => [$phone, 100], 'nachricht' => [$message, 5000], 'paket' => [$package, 200],
];
foreach ($limits as [$value, $max]) {
    if (mb_strlen($value) > $max) {
        respond(false, 'too_long');
    }
}
if (count($services) > 10) {
    respond(false, 'too_long');
}

/* ----------------------------------------------------------------- Versand
   Header-Injection verhindern: In Betreff und Absenderzeile darf kein
   Zeilenumbruch landen. */

$safe = static fn (string $value): string => str_replace(["\r", "\n"], ' ', $value);

$name  = $safe($name);
$email = str_replace(["\r", "\n"], '', $email);

$lines = [
    'Name:        ' . $name,
    'E-Mail:      ' . $email,
];
if ($company !== '') {
    $lines[] = 'Unternehmen: ' . $safe($company);
}
if ($phone !== '') {
    $lines[] = 'Telefon:     ' . $safe($phone);
}
$lines[] = 'Paket:       ' . $safe($package);
$lines[] = 'Leistung:    ' . implode(', ', array_map($safe, $services));
$lines[] = '';
$lines[] = 'Nachricht:';
$lines[] = $message;
$lines[] = '';
$lines[] = 'Einwilligung in die Datenverarbeitung: erteilt';

$subject = '=?UTF-8?B?' . base64_encode("Neue Projektanfrage von {$name}") . '?=';
$body    = implode("\n", $lines) . "\n";
$headers = implode("\r\n", [
    'From: Website <no-reply@' . ($_SERVER['SERVER_NAME'] ?? 'surhay.design') . '>',
    "Reply-To: {$email}",
    'Content-Type: text/plain; charset=utf-8',
    'X-Mailer: surhay-design-contact',
]);

respond(mail($to, $subject, $body, $headers));
