<?php
// TEMPORARY diagnostic for the contact form mailer. Removed once read.
declare(strict_types=1);
header('Content-Type: application/json; charset=utf-8');
if (($_GET['t'] ?? '') !== 'RJLMxld8arPRv6YYAFpigEKyRIiq') { http_response_code(404); exit; }

$errors = [];
set_error_handler(static function (int $no, string $str, string $file, int $line) use (&$errors): bool {
    $errors[] = "$no: $str ($file:$line)";
    return true;
});

$out = [
    'php' => PHP_VERSION,
    'sapi' => PHP_SAPI,
    'sendmail_path' => ini_get('sendmail_path'),
    'sendmail_from' => ini_get('sendmail_from'),
    'mail_add_x_header' => ini_get('mail.add_x_header'),
    'mail_log' => ini_get('mail.log'),
    'disable_functions' => ini_get('disable_functions'),
    'mail_exists' => function_exists('mail'),
    'safe_mode' => ini_get('safe_mode'),
    'open_basedir' => ini_get('open_basedir'),
    'sendmail_binary' => is_file('/usr/sbin/sendmail') ? 'present' : 'missing',
    'hostname' => gethostname(),
    'server' => $_SERVER['SERVER_SOFTWARE'] ?? null,
];

$to   = 'contact@tridentmodular.com';
$hdrs = "From: Trident Website <contact@tridentmodular.com>\r\nContent-Type: text/plain; charset=utf-8";
$body = 'Mail diagnostic from the website, ' . date('c') . '. Please ignore.';

$tests = [
    'with_f'    => static fn() => mail($to, 'Diag 1: with -f', $body, $hdrs, '-fcontact@tridentmodular.com'),
    'without_f' => static fn() => mail($to, 'Diag 2: without -f', $body, $hdrs),
    'no_headers'=> static fn() => mail($to, 'Diag 3: bare', $body),
];
foreach ($tests as $name => $fn) {
    $errors = [];
    $start = microtime(true);
    try { $r = $fn(); } catch (Throwable $e) { $r = 'EXC ' . $e->getMessage(); }
    $out['test_' . $name] = ['result' => $r, 'ms' => round((microtime(true) - $start) * 1000), 'errors' => $errors, 'last' => error_get_last()];
}
echo json_encode($out, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
