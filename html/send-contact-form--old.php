<?php

  if ($_POST['contact_submit'] !== 'contact_form'){
    header("Location: home.html");
    die();
  }

  $contact_name = $_POST["contact_name"];
  $contact_phone = $_POST["contact_phone"];
  $contact_email = $_POST["contact_email"];
  $contact_message = $_POST["contact_message"];

  $email_web = "hola@flyingpigs.es";
  $headers_web = 'From: Flying Pigs <$email_web>' . "\r\n";

  try {

    //mail to client
    $email_client = $contact_email;
    $subject_client = "Formulario de contacto";
    $message_client = "
      Formulario de contacto recibido correctamente. Nos pondremos en contacto con usted lo antes posible. Gracias.
    ";

    $client_sent = mail($email_client, $subject_client, $message_client, $headers_web);

    //mail to flying pigs
    $email_company = "elena@flyingpigs.es";
    $subject_company = "Formulario de contacto recibido";
    $message_company = "
      Nombre: $contact_name
      Teléfono: $contact_phone
      Email: $contact_email
      Mensaje: $contact_message
    ";

    $company_sent = mail($email_company, $subject_company, $message_company, $headers_web);

  }
  catch (Exception $e){
    echo 'failure';
  }

  if ($client_sent && $company_sent){
    echo 'success';
  }
  else{
    echo 'failure';
  }

?>
