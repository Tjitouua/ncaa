<?php



    require "../vendor/autoload.php";

    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exception;

    function sendAssignmentEmail($toEmail, $name, $training, $deadline)
    {
        $mail = new PHPMailer(true);

        try {

        // Out Settings 
        $mail->isSMTP();
        $mail->Host = "smtp.office365.com";
        $mail->SMTPAuth = true;

        $mail->Username = 'mapohaT@ncaa.na';
        $mail->Password = 'Spillo@2002';

        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = 587;

        // Email Content 
        $mail->setFrom('mapohaT@ncaa.na', 'NCAA Training Management System');
        $mail->addAddress($toEmail, $name);

        $mail->isHTML(true);
        $mail->Subject = "New Training Assignment (NCAA)";

        $mail->Body = "
              <p>Hello $name,</p>
              <br>
              <p>You have been assigned a new training program.</p>
              <p><strong>Training:</strong> $training</p>
              <p><strong>Deadline:</strong> $deadline</p>
              <br>
              <p>Please log into the system for more details.</p>
        ";
        $mail->send();
        return true;

        } catch (Exception $e) {
            error_log("Email error: " . $mail->ErrorInfo);
            return false;
        }
    }




?>