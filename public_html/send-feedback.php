<?php
header('Content-Type: text/html; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: index.html');
    exit;
}

$name = isset($_POST['name']) ? trim(htmlspecialchars($_POST['name'])) : '';
$tel  = isset($_POST['tel'])  ? trim(htmlspecialchars($_POST['tel']))  : '';

if (empty($name) || empty($tel)) {
    header('Location: index.html?sent=0');
    exit;
}

$to      = 'dentalfamilu@yandex.ru';
$subject = 'Запись на приём — Dental Family';
$body    = "Новая заявка с сайта:\n\n";
$body   .= "Имя: $name\n";
$body   .= "Телефон: $tel\n";


$fromDomain = $_SERVER['HTTP_HOST'] ?? 'dental-family.ru';
$headers = "From: noreply@{$fromDomain}\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
$headers .= "X-Mailer: PHP/" . phpversion() . "\r\n";

$sent = @mail($to, $subject, $body, $headers);

header('Location: index.html?sent=' . ($sent ? '1' : '0'));
exit;
