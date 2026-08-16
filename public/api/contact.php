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

const MAIL_TO      = 'contact@tridentmodular.com';
// Must be a mailbox on the sending domain — shared hosts reject or spam-bin
// mail claiming to be from an address they do not host.
const MAIL_FROM    = 'website@tridentmodular.com';
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

$sent = mail(
    MAIL_TO,
    'Website enquiry — ' . $header($name) . ' (' . $header($projectType) . ')',
    implode("\n", $lines),
    implode("\r\n", [
        'From: Trident Website <' . MAIL_FROM . '>',
        'Reply-To: ' . $header($name) . ' <' . $header($email) . '>',
        'Content-Type: text/plain; charset=utf-8',
        'X-Mailer: PHP/' . phpversion(),
    ])
);

if (!$sent) {
    error_log('Trident contact form: mail() failed for ' . $email);
    fail(500, 'We could not send your enquiry. Please email us directly.');
}

echo json_encode(['ok' => true]);
