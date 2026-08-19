<?php
/**
 * Gated catalogue download.
 *
 * POST  — validates the enquiry, emails it to the sales inbox, and returns a
 *         short-lived signed token.
 * GET    ?token=… — verifies the token and streams the PDF.
 *
 * The PDF itself lives in /downloads/, which .htaccess blocks from direct HTTP
 * access, so the only route to it is through this script. That is what makes
 * the gate real rather than decorative: readfile() reads from disk and is not
 * affected by the HTTP-level deny.
 *
 * Set DOWNLOAD_SECRET to any long random string before going live.
 */

declare(strict_types=1);

const MAIL_TO         = 'contact@tridentmodular.com';
const MAIL_FROM       = 'website@tridentmodular.com';
const CATALOGUE_FILE  = __DIR__ . '/../downloads/trident-catalogue.pdf';
const CATALOGUE_NAME  = 'Trident Modular Catalogue.pdf';
// CHANGE THIS before launch. Any long random string.
const DOWNLOAD_SECRET = 'change-me-to-a-long-random-string';
const TOKEN_TTL       = 900; // seconds a download link stays valid
const RATE_LIMIT      = 5;
const RATE_WINDOW     = 3600;

function sign(int $expires): string
{
    return $expires . '.' . hash_hmac('sha256', (string) $expires, DOWNLOAD_SECRET);
}

function verify(string $token): bool
{
    $parts = explode('.', $token, 2);
    if (count($parts) !== 2) {
        return false;
    }
    [$expires, $sig] = $parts;
    if (!ctype_digit($expires) || (int) $expires < time()) {
        return false;
    }
    // hash_equals is constant-time, so a wrong token cannot be probed byte by byte.
    return hash_equals(hash_hmac('sha256', $expires, DOWNLOAD_SECRET), $sig);
}

// ─── GET: serve the file to a valid token ───────────────────────────────
if (($_SERVER['REQUEST_METHOD'] ?? '') === 'GET') {
    if (!verify((string) ($_GET['token'] ?? ''))) {
        http_response_code(403);
        header('Content-Type: text/plain; charset=utf-8');
        exit('This download link has expired. Please request the catalogue again.');
    }
    if (!is_readable(CATALOGUE_FILE)) {
        error_log('Catalogue download: file missing at ' . CATALOGUE_FILE);
        http_response_code(404);
        header('Content-Type: text/plain; charset=utf-8');
        exit('The catalogue is temporarily unavailable. Please email us.');
    }
    header('Content-Type: application/pdf');
    header('Content-Disposition: attachment; filename="' . CATALOGUE_NAME . '"');
    header('Content-Length: ' . filesize(CATALOGUE_FILE));
    header('Cache-Control: private, no-store');
    readfile(CATALOGUE_FILE);
    exit;
}

// ─── POST: capture the lead, issue a token ──────────────────────────────
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

// Honeypot — report success so bots do not learn to leave it blank.
if (!empty($data['company'])) {
    echo json_encode(['ok' => true, 'url' => '/api/catalogue.php?token=invalid']);
    exit;
}

$field = static fn(string $k): string => trim((string) ($data[$k] ?? ''));
$name    = $field('name');
$email   = $field('email');
$phone   = $field('phone');
$consent = !empty($data['consent']);

$errors = [];
if ($name === '' || mb_strlen($name) > 100) {
    $errors['name'] = 'Please enter your name.';
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL) || mb_strlen($email) > 254) {
    $errors['email'] = 'Please enter a valid email address.';
}
if ($phone !== '' && mb_strlen($phone) > 40) {
    $errors['phone'] = 'Please shorten your phone number.';
}
if (!$consent) {
    $errors['consent'] = 'Please confirm you are happy for us to contact you.';
}
if ($errors) {
    http_response_code(422);
    echo json_encode(['ok' => false, 'errors' => $errors]);
    exit;
}

$ip     = (string) ($_SERVER['REMOTE_ADDR'] ?? 'unknown');
$bucket = sys_get_temp_dir() . '/tm-catalogue-' . hash('sha256', $ip) . '.json';
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
    fail(429, 'Too many requests from this address. Please try again later.');
}
$hits[] = $now;
@file_put_contents($bucket, json_encode($hits), LOCK_EX);

$clean = static fn(string $v): string => str_replace(["\r", "\n"], ' ', $v);

$sent = mail(
    MAIL_TO,
    'Catalogue download — ' . $clean($name),
    implode("\n", [
        'Name:  ' . $name,
        'Email: ' . $email,
        'Phone: ' . ($phone !== '' ? $phone : '—'),
        '',
        'Consented to being contacted by Trident: yes',
        '',
        '---',
        'Sent: ' . date('c'),
        'Page: ' . $clean((string) ($data['page'] ?? 'unknown')),
        'IP:   ' . $ip,
    ]),
    implode("\r\n", [
        'From: Trident Website <' . MAIL_FROM . '>',
        'Reply-To: ' . $clean($name) . ' <' . $clean($email) . '>',
        'Content-Type: text/plain; charset=utf-8',
    ])
);

if (!$sent) {
    // The lead is lost but the visitor asked for a catalogue in good faith —
    // log it and let the download proceed rather than blocking them.
    error_log('Catalogue download: mail() failed for ' . $email);
}

echo json_encode([
    'ok'  => true,
    'url' => '/api/catalogue.php?token=' . urlencode(sign(time() + TOKEN_TTL)),
]);
