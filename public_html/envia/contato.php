<?php
 
// Inclui o arquivo class.phpmailer.php localizado na pasta phpmailer
require("phpmailer/class.phpmailer.php");
require("phpmailer/PHPMailerAutoload.php");
 
// Inicia a classe PHPMailer
$mail = new PHPMailer();
 
// Define os dados do servidor e tipo de conexão
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
$mail->IsMail(); // Define que a mensagem será SMTP
$mail->Host = "smtp.uni5.net"; // Endereço do servidor SMTP (caso queira utilizar a autenticação, utilize o host smtp.seudomínio.com.br)
$mail->SMTPAuth = true; // Usar autenticação SMTP (obrigatório para smtp.seudomínio.com.br)
$mail->Username = 'envia@dettomoveis.com.br'; // Usuário do servidor SMTP (endereço de email)
$mail->Password = '102030dw'; // Senha do servidor SMTP (senha do email usado)
 
// Define o remetente
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
$mail->From = "contato@dettomoveis.com.br"; // Seu e-mail
$mail->Sender = "contato@dettomoveis.com.br"; // Seu e-mail
$mail->FromName = "contato@dettomoveis.com.br"; // Seu nome
 
// Define os destinatário(s)
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
$mail->AddAddress('contato@dettomoveis.com.br', 'contato@dettomoveis.com.br');
$mail->AddAddress('DESTINATÁRIO_2');
//$mail->AddCC('ciclano@site.net', 'Ciclano'); // Copia
//$mail->AddBCC('fulano@dominio.com.br', 'Fulano da Silva'); // Cópia Oculta
 
// Define os dados técnicos da Mensagem
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
$mail->IsHTML(true); // Define que o e-mail será enviado como HTML
//$mail->CharSet = 'iso-8859-1'; // Charset da mensagem (opcional)
$mail->CharSet = 'utf-8'; // Charset da mensagem (opcional)

// Define a mensagem (Texto e Assunto)
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

    function safe($name) {
   return(str_ireplace(array( "\r", "\n", "%0a", "%0d", "Content-Type:", "bcc:","to:","cc:" ), "", $name));
}
    $nome = utf8_decode(safe($_POST['nome']));
    $tel = utf8_decode(safe($_POST['tel']));
    $email = utf8_decode(safe($_POST['email']));
    $texto = utf8_decode(safe($_POST['texto']));
	if (isset($_POST['g-recaptcha-response'])) {
    $captcha_data = $_POST['g-recaptcha-response'];
    }

    // Se nenhum valor foi recebido, o usuário não realizou o captcha
    if (!$captcha_data) {
        echo '<p>Clique <a href="https://dettomoveis.com.br/contato.html">AQUI</a> para tentar novamente</p>';
        exit;
    }
    //$resposta = file_get_contents("https://www.google.com/recaptcha/api/siteverify?secret=SUA-CHAVE-SECRETA&response=".$captcha_data."&remoteip=".$_SERVER['REMOTE_ADDR']);
    $resposta = file_get_contents("https://www.google.com/recaptcha/api/siteverify?secret=6LfQClccAAAAAI2PFIKhxN4h0vqgxIaNyWLQSFmX&response=".$captcha_data."&remoteip=".$_SERVER['REMOTE_ADDR']);

$mail->Subject  = utf8_decode("Contato do Site"); // Assunto da mensagem
$mail->Body =
        '<b>Nome</b>: ' . $nome . "<br />" .
        '<b>Telefone</b>: ' . $tel . "<br />" .
        '<b>E-mail</b>: ' . $email . "<br />" .
        '<b>Texto</b>: ' . $texto;
$mail->AltBody = ' ';
 
// Define os anexos (opcional)
//$mail->AddAttachment("/home/login/documento.pdf", "novo_nome.pdf");  // Insere um anexo
 
// Envia o e-mail
$enviado = $mail->Send();
 
// Limpa os destinatários e os anexos
$mail->ClearAllRecipients();
$mail->ClearAttachments();
 
// Exibe uma mensagem de resultado
if ($enviado) {
header("Location: https://dettomoveis.com.br/email.html");
} else {
echo "Não foi possível enviar o e-mail.
 
";
echo "Informações do erro: 
" . $mail->ErrorInfo;
}
 
?>