<?php
/**
 * Outgoing mail for the website forms.
 *
 * Why this exists: the host's PHP mail() hands messages to a local relay that
 * has been refusing connections ("dial tcp 127.0.0.1:125: connection
 * refused"), so every enquiry was being lost. Mail now goes out over
 * authenticated SMTP when mail-config.php is present (written at deploy time
 * from repository secrets), and falls back to mail() when it is not.
 *
 * Whatever happens to the send, the enquiry is first written to a spool
 * outside the web root, so a mail outage never loses a lead. Spooled entries
 * that could not be sent are retried on the next successful send.
 */
declare(strict_types=1);

const TRIDENT_SPOOL_DIR = __DIR__ . '/../../../enquiries';

/** SMTP settings, or null when the deploy did not provide any. */
function trident_mail_config(): ?array
{
    $file = __DIR__ . '/../mail-config.php';
    if (!is_file($file)) {
        return null;
    }
    $cfg = include $file;
    if (!is_array($cfg) || empty($cfg['host']) || empty($cfg['user']) || empty($cfg['pass'])) {
        return null;
    }
    $cfg['port'] = (int) ($cfg['port'] ?? 587);
    return $cfg;
}

/** Write the enquiry to the spool. Returns the file path, or null if unwritable. */
function trident_spool(string $kind, array $fields, string $subject, string $body): ?string
{
    $dir = TRIDENT_SPOOL_DIR . '/' . date('Y-m');
    if (!is_dir($dir) && !@mkdir($dir, 0700, true)) {
        return null;
    }
    $name = gmdate('Y-m-d\THis\Z') . '-' . $kind . '-' . bin2hex(random_bytes(3)) . '.json';
    $path = $dir . '/' . $name;
    $ok = @file_put_contents($path, json_encode([
        'kind' => $kind,
        'received' => date('c'),
        'fields' => $fields,
        'subject' => $subject,
        'body' => $body,
        'status' => 'pending',
    ], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES), LOCK_EX);
    return $ok === false ? null : $path;
}

function trident_spool_mark(?string $path, string $status): void
{
    if ($path === null || !is_file($path)) {
        return;
    }
    $data = json_decode((string) file_get_contents($path), true);
    if (is_array($data)) {
        $data['status'] = $status;
        $data['sent'] = $status === 'sent' ? date('c') : null;
        @file_put_contents($path, json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES), LOCK_EX);
    }
}

/**
 * Send one message to the sales inboxes. Returns true when a transport
 * accepted it. `$replyTo` is [name, email] of the visitor.
 */
function trident_send(string $to, string $subject, string $body, array $replyTo, string $fallbackFrom): bool
{
    $cfg = trident_mail_config();
    if ($cfg !== null) {
        $err = trident_smtp_send($cfg, $to, $subject, $body, $replyTo);
        if ($err === null) {
            return true;
        }
        error_log('Trident mailer: SMTP failed: ' . $err);
        // Fall through to mail() rather than give up.
    }

    $clean = static fn(string $v): string => str_replace(["\r", "\n"], ' ', $v);
    return @mail(
        $to,
        $clean($subject),
        $body,
        implode("\r\n", [
            'From: Trident Website <' . $fallbackFrom . '>',
            'Reply-To: ' . $clean($replyTo[0]) . ' <' . $clean($replyTo[1]) . '>',
            'Content-Type: text/plain; charset=utf-8',
        ]),
        '-f' . $fallbackFrom,
    );
}

/** Re-send up to $limit spooled entries still marked pending. */
function trident_spool_retry(string $to, string $fallbackFrom, int $limit = 20): void
{
    $files = glob(TRIDENT_SPOOL_DIR . '/*/*.json') ?: [];
    sort($files);
    $done = 0;
    foreach ($files as $file) {
        if ($done >= $limit) {
            break;
        }
        $data = json_decode((string) @file_get_contents($file), true);
        if (!is_array($data) || ($data['status'] ?? '') !== 'pending') {
            continue;
        }
        $f = $data['fields'] ?? [];
        $replyTo = [(string) ($f['name'] ?? 'Website visitor'), (string) ($f['email'] ?? $fallbackFrom)];
        $subject = '[Delayed, received ' . ($data['received'] ?? '?') . '] ' . ($data['subject'] ?? 'Website enquiry');
        if (trident_send($to, $subject, (string) ($data['body'] ?? ''), $replyTo, $fallbackFrom)) {
            trident_spool_mark($file, 'sent');
            $done++;
        } else {
            break; // transport is down again; leave the rest for next time
        }
    }
}

/**
 * Minimal SMTP client: implicit TLS on 465, STARTTLS otherwise, AUTH LOGIN.
 * Returns null on success, or a one-line reason.
 */
function trident_smtp_send(array $cfg, string $to, string $subject, string $body, array $replyTo): ?string
{
    $host = (string) $cfg['host'];
    $port = (int) $cfg['port'];
    $implicitTls = $port === 465;
    $timeout = 15;

    // 'insecure' exists for tests against a self-signed server only.
    $verify = empty($cfg['insecure']);
    $ctx = stream_context_create(['ssl' => ['verify_peer' => $verify, 'verify_peer_name' => $verify, 'allow_self_signed' => !$verify, 'SNI_enabled' => true, 'peer_name' => $host]]);
    $sock = @stream_socket_client(($implicitTls ? 'ssl://' : 'tcp://') . $host . ':' . $port, $errno, $errstr, $timeout, STREAM_CLIENT_CONNECT, $ctx);
    if (!$sock) {
        return "connect: $errstr ($errno)";
    }
    stream_set_timeout($sock, $timeout);

    $read = static function () use ($sock): array {
        $lines = [];
        while (($line = fgets($sock, 2048)) !== false) {
            $lines[] = rtrim($line, "\r\n");
            if (strlen($line) < 4 || $line[3] !== '-') {
                break;
            }
        }
        $code = isset($lines[0]) ? (int) substr($lines[0], 0, 3) : 0;
        return [$code, implode(' | ', $lines)];
    };
    $cmd = static function (string $line, array $okCodes) use ($sock, $read): ?string {
        fwrite($sock, $line . "\r\n");
        [$code, $text] = $read();
        return in_array($code, $okCodes, true) ? null : "$line -> $text";
    };

    [$code, $text] = $read();
    if ($code !== 220) {
        return "greeting: $text";
    }
    $ehlo = 'EHLO ' . (gethostname() ?: 'tridentmodular.com');
    if ($e = $cmd($ehlo, [250])) return $e;
    if (!$implicitTls) {
        if ($e = $cmd('STARTTLS', [220])) return $e;
        if (!@stream_socket_enable_crypto($sock, true, STREAM_CRYPTO_METHOD_TLS_CLIENT)) {
            return 'STARTTLS: TLS negotiation failed';
        }
        if ($e = $cmd($ehlo, [250])) return $e;
    }
    if ($e = $cmd('AUTH LOGIN', [334])) return $e;
    if ($e = $cmd(base64_encode((string) $cfg['user']), [334])) return $e;
    if ($e = $cmd(base64_encode((string) $cfg['pass']), [235])) return 'AUTH: ' . $e;

    $from = (string) ($cfg['from'] ?? $cfg['user']);
    if ($e = $cmd("MAIL FROM:<$from>", [250])) return $e;
    foreach (array_map('trim', explode(',', $to)) as $rcpt) {
        if ($rcpt !== '' && ($e = $cmd("RCPT TO:<$rcpt>", [250, 251]))) return $e;
    }
    if ($e = $cmd('DATA', [354])) return $e;

    $clean = static fn(string $v): string => str_replace(["\r", "\n"], ' ', $v);
    $encHeader = static fn(string $v): string => mb_encode_mimeheader($clean($v), 'UTF-8', 'B', "\r\n");
    $headers = [
        'Date: ' . date(DATE_RFC2822),
        'From: ' . $encHeader('Trident Website') . " <$from>",
        'To: ' . $to,
        'Reply-To: ' . $encHeader($replyTo[0]) . ' <' . $clean($replyTo[1]) . '>',
        'Subject: ' . $encHeader($subject),
        'Message-ID: <' . bin2hex(random_bytes(12)) . '@' . substr(strrchr($from, '@') ?: '@tridentmodular.com', 1) . '>',
        'MIME-Version: 1.0',
        'Content-Type: text/plain; charset=utf-8',
        'Content-Transfer-Encoding: 8bit',
        'X-Mailer: Trident website',
    ];
    $data = implode("\r\n", $headers) . "\r\n\r\n" . preg_replace('/^\./m', '..', str_replace(["\r\n", "\r"], "\n", $body));
    $data = str_replace("\n", "\r\n", $data);
    fwrite($sock, $data . "\r\n.\r\n");
    [$code, $text] = $read();
    if ($code !== 250) {
        return "DATA end: $text";
    }
    fwrite($sock, "QUIT\r\n");
    fclose($sock);
    return null;
}
