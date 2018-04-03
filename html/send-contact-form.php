<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'php/Exception.php';
require 'php/PHPMailer.php';
require 'php/SMTP.php';

if ($_POST['contact_submit'] !== 'contact_form'){
  header("Location: home.html");
  die();
}

$contact_name = $_POST["contact_name"];
$contact_phone = $_POST["contact_phone"];
$contact_email = $_POST["contact_email"];
$contact_message = $_POST["contact_message"];

$email_smtp = "smtp.serviciodecorreo.es";
$email_user = "hola@flyingpigs.es";
$email_pass = "Flying2017";
$email_name = "Flying Pigs";

$sentUs = false;
$sentClient = false;

$mailUs = new PHPMailer(true);
try {
  // Server settings
  // $mail->SMTPDebug = 3;                                   // Enable verbose debug output
  $mailUs->isSMTP();                                      // Set mailer to use SMTP
  $mailUs->Host = $email_smtp;                            // Specify main and backup SMTP servers
  $mailUs->SMTPAuth = true;                               // Enable SMTP authentication
  $mailUs->Username = $email_user;                        // SMTP username
  $mailUs->Password = $email_pass;                        // SMTP password
  $mailUs->SMTPSecure = 'tls';                            // Enable TLS encryption, `ssl` also accepted
  $mailUs->Port = 587;                                    // TCP port to connect to
  $mailUs->CharSet = 'UTF-8';                             // Set compatible charset

  // Recipients
  $mailUs->setFrom($email_user, $email_name);
  $mailUs->addAddress('elena@flyingpigs.es', 'Elena FP');     // Add a recipient
  $mailUs->addReplyTo($email_user, $email_name);
  // $mailUs->addCC('cc@example.com');
  // $mailUs->addBCC('bcc@example.com');

  // Attachments
  // $mailUs->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
  // $mailUs->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name

  // Content
  $mailUs->isHTML(true);                                  // Set email format to HTML
  $mailUs->Subject = 'Nuevo formulario de contacto recibido';
  $mailUs->Body    = '
    Nombre: ' . $contact_name . '<br />
    Tel&eacute;fono: ' . $contact_phone . '<br />
    Email: ' . $contact_email . '<br />
    Mensaje: <br />' . $contact_message . '<br />';
  $mailUs->AltBody = '
    Nombre: ' . $contact_name . '\r\n
    Tel&eacute;fono: ' . $contact_phone . '\r\n
    Email: ' . $contact_email . '\r\n
    Mensaje: \r\n' . $contact_message . '\r\n';

  $mailUs->send();
  $sentUs = true;
  // echo 'Message has been sent';

} catch (Exception $e) {
  // echo 'Message could not be sent. Mailer Error: ', $mailUs->ErrorInfo;
}

$mailClient = new PHPMailer(true);
try {
  // Server settings
  // $mail->SMTPDebug = 3;                                     // Enable verbose debug output
  $mailClient->isSMTP();                                    // Set mailer to use SMTP
  $mailClient->Host = $email_smtp;                          // Specify main and backup SMTP servers
  $mailClient->SMTPAuth = true;                             // Enable SMTP authentication
  $mailClient->Username = $email_user;                      // SMTP username
  $mailClient->Password = $email_pass;                      // SMTP password
  $mailClient->SMTPSecure = 'tls';                          // Enable TLS encryption, `ssl` also accepted
  $mailClient->Port = 587;                                  // TCP port to connect to
  $mailClient->CharSet = 'UTF-8';                           // Set compatible charset

  // Recipients
  $mailClient->setFrom($email_user, $email_name);
  $mailClient->addAddress($contact_email, $contact_name);     // Add a recipient
  $mailClient->addReplyTo($email_user, $email_name);
  // $mailClient->addCC('cc@example.com');
  // $mailClient->addBCC('bcc@example.com');

  // Attachments
  // $mailClient->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
  // $mailClient->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name

  // Content
  $mailClient->isHTML(true);                                  // Set email format to HTML
  $mailClient->Subject = 'Formulario de contacto de Flying Pigs';
  $mailClient->Body    = '
    Hola ' . $contact_name .',<br /><br />
    Hemos recibido el formulario de contacto correctamente con los siguientes datos: <br /><br />
    Nombre: ' . $contact_name . '<br />
    Tel&eacute;fono: ' . $contact_phone . '<br />
    Email: ' . $contact_email . '<br />
    Mensaje: <br />' . $contact_message . '<br /><br />
    Nos pondremos en contacto con usted lo antes posible. <br /><br />
    Gracias.';
  $mailClient->AltBody = '
    Hola ' . $contact_name .',\r\n\r\n
    Hemos recibido el formulario de contacto correctamente con los siguientes datos: \r\n\r\n
    Nombre: ' . $contact_name . '\r\n
    Tel&eacute;fono: ' . $contact_phone . '\r\n
    Email: ' . $contact_email . '\r\n
    Mensaje: \r\n' . $contact_message . '\r\n\r\n
    Nos pondremos en contacto con usted lo antes posible. \r\n\r\n
    Gracias.';

  $mailClient->send();
  $sentClient = true;
  //echo 'Message has been sent';

} catch (Exception $e) {
  // echo 'Message could not be sent. Mailer Error: ', $mailClient->ErrorInfo;
}

if ($sentUs && $sentClient){
  echo 'success';
}
else{
  echo 'failure';
}
