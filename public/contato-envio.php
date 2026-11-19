<?php
/**
 * Envio do formulário de contato do site da Versta (pedido do Lucas, 19/11/2026).
 *
 * Recebe o formulário (POST, JSON) e manda um e-mail para contato@versta.com.br
 * pelo SMTP da Hostinger, autenticado na própria caixa (não cai no spam).
 * O "Responder" do e-mail vai direto para quem preencheu o formulário.
 *
 * A senha NÃO fica aqui (o repositório é público): fica em
 * ../privado/contato-config.php, fora da pasta pública, criado pela publicação
 * automática a partir do segredo SMTP_PASSWORD do GitHub.
 */

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
header('X-Robots-Tag: noindex');

function responder(int $codigo, array $dados): void {
    http_response_code($codigo);
    echo json_encode($dados, JSON_UNESCAPED_UNICODE);
    exit;
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    responder(405, ['ok' => false, 'erro' => 'metodo']);
}

// Só aceita envios vindos do próprio site.
$origem = $_SERVER['HTTP_ORIGIN'] ?? '';
if ($origem !== '' && !in_array($origem, ['https://versta.com.br', 'https://www.versta.com.br'], true)) {
    responder(403, ['ok' => false, 'erro' => 'origem']);
}

$config = __DIR__ . '/../privado/contato-config.php';
if (!is_file($config)) {
    responder(503, ['ok' => false, 'erro' => 'config']);
}
$cfg = require $config; // ['usuario' => ..., 'senha' => ..., 'destino' => [...]]

$corpo = file_get_contents('php://input', false, null, 0, 20000);
$d = json_decode($corpo ?: '', true);
if (!is_array($d)) {
    responder(400, ['ok' => false, 'erro' => 'dados']);
}

// Antispam: campo invisível preenchido ou envio rápido demais = robô.
// Responde "ok" para o robô não insistir, mas não envia nada.
if (!empty($d['site_web']) || (int)($d['tempo'] ?? 0) < 3000) {
    responder(200, ['ok' => true]);
}

$campo = function (string $nome, int $max) use ($d): string {
    $v = is_string($d[$nome] ?? null) ? trim($d[$nome]) : '';
    $v = str_replace("\0", '', $v);
    return mb_substr($v, 0, $max, 'UTF-8');
};
$umaLinha = fn(string $v): string => trim(preg_replace('/[\r\n\t]+/', ' ', $v));

$nome     = $umaLinha($campo('nome', 120));
$empresa  = $umaLinha($campo('empresa', 160));
$email    = $umaLinha($campo('email', 160));
$telefone = $umaLinha($campo('telefone', 40));
$area     = $umaLinha($campo('area', 120));
$mensagem = $campo('mensagem', 5000);

if ($nome === '' || $mensagem === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    responder(422, ['ok' => false, 'erro' => 'campos']);
}

// Limite simples: no máximo 5 envios por hora para o mesmo endereço de internet.
$pastaLimite = __DIR__ . '/../privado/limite';
if (!is_dir($pastaLimite)) @mkdir($pastaLimite, 0700, true);
$arqLimite = $pastaLimite . '/' . hash('sha256', ($_SERVER['REMOTE_ADDR'] ?? '') . 'versta');
$agora = time();
$envios = array_filter(
    is_file($arqLimite) ? array_map('intval', file($arqLimite, FILE_IGNORE_NEW_LINES)) : [],
    fn($t) => $t > $agora - 3600
);
if (count($envios) >= 5) {
    responder(429, ['ok' => false, 'erro' => 'limite']);
}

$linhas = [
    "Nova mensagem pelo formulário do site (versta.com.br/contato).",
    "",
    "Nome: $nome",
    "Empresa: " . ($empresa !== '' ? $empresa : '-'),
    "E-mail: $email",
    "Telefone: " . ($telefone !== '' ? $telefone : '-'),
    "Área de interesse: " . ($area !== '' ? $area : '-'),
    "",
    "Mensagem:",
    $mensagem,
    "",
    "--",
    "Para responder, use o botão Responder: a resposta vai para $email.",
];
$texto = implode("\r\n", $linhas);
$assunto = "Contato pelo site: $nome" . ($area !== '' ? " ($area)" : '');

$enviado = enviarSmtp($cfg, $assunto, $texto, $nome, $email);
if (!$enviado) {
    responder(502, ['ok' => false, 'erro' => 'envio']);
}

$envios[] = $agora;
@file_put_contents($arqLimite, implode("\n", $envios));
responder(200, ['ok' => true]);

/* ---------- SMTP (smtp.hostinger.com, SSL na porta 465) ---------- */

function cabecalho(string $texto): string {
    return '=?UTF-8?B?' . base64_encode($texto) . '?=';
}

function enviarSmtp(array $cfg, string $assunto, string $texto, string $nomeVisitante, string $emailVisitante): bool {
    $usuario = $cfg['usuario'];
    $destinos = $cfg['destino'] ?? [$usuario];
    $ctx = stream_context_create(['ssl' => ['verify_peer' => true, 'verify_peer_name' => true]]);
    $s = @stream_socket_client('ssl://smtp.hostinger.com:465', $en, $es, 20, STREAM_CLIENT_CONNECT, $ctx);
    if (!$s) return false;
    stream_set_timeout($s, 20);

    $ler = function () use ($s): string {
        $resp = '';
        while (($linha = fgets($s, 1024)) !== false) {
            $resp .= $linha;
            if (strlen($linha) < 4 || $linha[3] === ' ') break;
        }
        return $resp;
    };
    $cmd = function (string $c, array $esperado) use ($s, $ler): bool {
        if ($c !== '') fwrite($s, $c . "\r\n");
        $r = $ler();
        return in_array((int)substr($r, 0, 3), $esperado, true);
    };

    $msgId = sprintf('<%s.%s@versta.com.br>', bin2hex(random_bytes(8)), time());
    $cab = [
        'Date: ' . date('r'),
        'From: ' . cabecalho('Site Versta') . " <$usuario>",
        'To: ' . implode(', ', array_map(fn($e) => "<$e>", $destinos)),
        'Reply-To: ' . cabecalho($nomeVisitante) . " <$emailVisitante>",
        'Subject: ' . cabecalho($assunto),
        "Message-ID: $msgId",
        'MIME-Version: 1.0',
        'Content-Type: text/plain; charset=UTF-8',
        'Content-Transfer-Encoding: base64',
    ];
    $dados = implode("\r\n", $cab) . "\r\n\r\n" . chunk_split(base64_encode($texto), 76, "\r\n");

    $ok = $cmd('', [220])
        && $cmd('EHLO versta.com.br', [250])
        && $cmd('AUTH LOGIN', [334])
        && $cmd(base64_encode($usuario), [334])
        && $cmd(base64_encode($cfg['senha']), [235])
        && $cmd("MAIL FROM:<$usuario>", [250]);
    if ($ok) {
        foreach ($destinos as $dest) {
            $ok = $ok && $cmd("RCPT TO:<$dest>", [250, 251]);
        }
    }
    $ok = $ok && $cmd('DATA', [354]) && $cmd($dados . "\r\n.", [250]);
    $cmd('QUIT', [221]);
    fclose($s);
    return $ok;
}
