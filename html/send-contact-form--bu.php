<?php

  if ($_POST['contact_submit'] !== 'contact_form'){
    header("Location: home.html");
    die();
  }

  try {
    echo 'In';

    $contact_name = $_POST["contact_name"];
    $contact_phone = $_POST["contact_phone"];
    $contact_email = $_POST["contact_email"];
    $contact_message = $_POST["contact_message"];

    $email_web = "info@flyingpigs.es";
    $headers_web = "From: $email_web";

    echo 'Pre mail 1 ';
    //mail to client
    $email_client = $contact_email;
    $subject_client = "Formulario de contacto";
    $message_client = "
      Formulario de contacto recibido correctamente. Nos pondremos en contacto con usted lo antes posible. Gracias.
    ";

    $client_sent = mail($email_client, $subject_client, $message_client, $headers_web);

    echo 'Post mail 1 ';

    echo 'Pre mail 2 ';
    //mail to flying pigs
    $email_company = "elena@flyingpigs.es";
    $subject_company = "Formulario de contacto recibido";
    $message_company = "
      Nombre: $contact_name<br />
      Teléfono: $contact_phone<br />
      Email: $contact_phone<br  />
      Mensaje: $contact_message
    ";

    $company_sent = mail($email_company, $subject_company, $message_company, $headers_web);

    echo 'Post mail 2 ';

    if ($client_sent) {
      echo 'Client sent '
    }

    if ($company_sent) {
      echo 'Company sent '
    }

    if ($client_sent && $company_sent){
      return 'success';
    }
    else{
      return 'failure';
    }
  }
  catch (Exception $e){
    echo $e;
  }

?>
