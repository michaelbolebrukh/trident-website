<?php
// TEMPORARY diagnostic for the contact form mailer. Removed once read.
declare(strict_types=1);
header('Content-Type: application/json; charset=utf-8');
if (($_GET['t'] ?? '') !== 'RJLMxld8arPRv6YYAFpigEKyRIiq') { http_response_code(404); exit; }

$out = [];

// 1. hsendmail's own verdict on a well-formed message, with stderr captured.
$msg = "To: contact@tridentmodular.com\r\nFrom: Trident Website <contact@tridentmodular.com>\r\nSubject: Diag direct\r\nContent-Type: text/plain; charset=utf-8\r\n\r\nDirect hsendmail diagnostic, please ignore.\r\n";
foreach (['/usr/sbin/hsendmail -t', '/usr/sbin/hsendmail -t -i -fcontact@tridentmodular.com', '/usr/sbin/sendmail -t'] as $cmd) {
    $d = [0 => ['pipe', 'r'], 1 => ['pipe', 'w'], 2 => ['pipe', 'w']];
    $p = @proc_open($cmd, $d, $pipes);
    if (!is_resource($p)) { $out['exec'][$cmd] = 'proc_open failed'; continue; }
    fwrite($pipes[0], $msg); fclose($pipes[0]);
    $stdout = stream_get_contents($pipes[1]); $stderr = stream_get_contents($pipes[2]);
    fclose($pipes[1]); fclose($pipes[2]);
    $out['exec'][$cmd] = ['exit' => proc_close($p), 'stdout' => $stdout, 'stderr' => $stderr];
}
$out['hsendmail_file'] = ['is_file' => is_file('/usr/sbin/hsendmail'), 'executable' => is_executable('/usr/sbin/hsendmail'), 'link' => @readlink('/usr/sbin/hsendmail')];

// 2. Earlier mail.log entries for this site, diagnostics excluded.
$log = (string) ini_get('mail.log');
$lines = is_file($log) ? (@file($log, FILE_IGNORE_NEW_LINES) ?: []) : [];
$mine = array_values(array_filter($lines, static fn($l) => str_contains($l, 'tridentmodular.com/public_html/api/') && !str_contains($l, 'Diag ')));
$out['site_mail_log_count'] = count($mine);
$out['site_mail_log'] = array_map(static fn($l) => mb_substr($l, 0, 400), $mine);

// 3. The site's PHP error log.
$err = dirname($log) . '/error_log_tridentmodular_com';
$out['error_log_tail'] = is_file($err) ? array_slice(@file($err, FILE_IGNORE_NEW_LINES) ?: [], -30) : 'missing';

echo json_encode($out, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
