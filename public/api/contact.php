<?php
/**
 * Contact form handler for the static site.
 *
 * The site is pre-rendered HTML, so this is the only server-side code that
 * runs on Hostinger. It accepts a JSON POST from the enquiry forms, validates
 * it, and emails the enquiry to the sales inbox.
 *
 * Configure the three constants below before going live.
 */

declare(strict_types=1);

// Enquiries go to the sales inbox, Oleg and Michael. PHP mail() accepts a
// comma-separated list.
const MAIL_TO      = 'contact@tridentmodular.com, oleg@tridentmodular.com, bolebruch8075@gmail.com';
// Must be a mailbox on the sending domain — shared hosts reject or spam-bin
// mail claiming to be from an address they do not host.
const MAIL_FROM    = 'contact@tridentmodular.com';
const RATE_LIMIT   = 5;    // max submissions ...
const RATE_WINDOW  = 3600; // ... per this many seconds, per IP

header('Content-Type: application/json; charset=utf-8');

function fail(int $status, string $message): never
{
    http_response_code($status);
    echo json_encode(['ok' => false, 'error' => $message]);
    exit;
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    fail(405, 'Method not allowed.');
}

$raw = file_get_contents('php://input');
if ($raw === false || strlen($raw) > 20000) {
    fail(413, 'Request too large.');
}

$data = json_decode($raw, true);
if (!is_array($data)) {
    fail(400, 'Malformed request.');
}

// Honeypot: a field hidden from users. Anything that fills it is a bot.
// Report success so the bot does not learn to retry with it left blank.
if (!empty($data['company'])) {
    echo json_encode(['ok' => true]);
    exit;
}

$field = static fn(string $key): string => trim((string) ($data[$key] ?? ''));

$name        = $field('name');
$email       = $field('email');
$phone       = $field('phone');
$postcode    = $field('postcode');
$projectType = $field('projectType');
$size        = $field('size');
$message     = $field('message');
$space       = $field('space');
$consent     = !empty($data['consent']);

$errors = [];
if ($name === '' || mb_strlen($name) > 100) {
    $errors['name'] = 'Please enter your name.';
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL) || mb_strlen($email) > 254) {
    $errors['email'] = 'Please enter a valid email address.';
}
if ($phone === '' || mb_strlen($phone) > 40) {
    $errors['phone'] = 'Please enter your phone number.';
}
if ($projectType === '') {
    $errors['projectType'] = 'Please select a project type.';
}
if (!$consent) {
    $errors['consent'] = 'Please confirm you have read the privacy policy.';
}
if (mb_strlen($message) > 5000) {
    $errors['message'] = 'Please shorten your message.';
}

if ($errors) {
    http_response_code(422);
    echo json_encode(['ok' => false, 'errors' => $errors]);
    exit;
}

// Per-IP rate limit. Coarse but enough to stop a script hammering the inbox.
$ip     = (string) ($_SERVER['REMOTE_ADDR'] ?? 'unknown');
$bucket = sys_get_temp_dir() . '/tm-contact-' . hash('sha256', $ip) . '.json';
$hits   = [];
if (is_readable($bucket)) {
    $decoded = json_decode((string) file_get_contents($bucket), true);
    if (is_array($decoded)) {
        $hits = $decoded;
    }
}
$now  = time();
$hits = array_values(array_filter($hits, static fn($t) => is_int($t) && $t > $now - RATE_WINDOW));
if (count($hits) >= RATE_LIMIT) {
    fail(429, 'Too many enquiries from this address. Please try again later or call us.');
}
$hits[] = $now;
@file_put_contents($bucket, json_encode($hits), LOCK_EX);

/** Strip CR/LF so user input cannot inject extra mail headers. */
$header = static fn(string $v): string => str_replace(["\r", "\n"], ' ', $v);

$lines = [
    'Name:         ' . $name,
    'Email:        ' . $email,
    'Phone:        ' . $phone,
    'Postcode:     ' . ($postcode !== '' ? $postcode : '—'),
    'Project type: ' . $projectType,
    'Size:         ' . ($size !== '' ? $size : '—'),
    'Space type:   ' . ($space !== '' ? $space : '—'),
    '',
    'Message:',
    $message !== '' ? $message : '(none)',
    '',
    '---',
    'Sent: ' . date('c'),
    'Page: ' . $header((string) ($data['page'] ?? 'unknown')),
    'IP:   ' . $ip,
];

require __DIR__ . '/lib/mailer.php';

$subject = 'Website enquiry — ' . $header($name) . ' (' . $header($projectType) . ')';
$body    = implode("\n", $lines);

// Spool first, so an outage at the mail transport never loses the lead.
$spooled = trident_spool('contact', compact('name', 'email', 'phone', 'postcode', 'projectType', 'size', 'space', 'message'), $subject, $body);

$sent = trident_send(MAIL_TO, $subject, $body, [$name, $email], MAIL_FROM);
if ($sent) {
    trident_spool_mark($spooled, 'sent');
    trident_spool_retry(MAIL_TO, MAIL_FROM);
    echo json_encode(['ok' => true]);
    exit;
}

error_log('Trident contact form: send failed for ' . $email . ($spooled ? ' (spooled: ' . basename($spooled) . ')' : ' (NOT spooled)'));
if ($spooled === null) {
    fail(500, 'We could not send your enquiry. Please email us directly.');
}
// The enquiry is safe in the spool and will be delivered when mail is back,
// so the visitor gets a thank-you rather than an error they cannot act on.
echo json_encode(['ok' => true, 'queued' => true]);
