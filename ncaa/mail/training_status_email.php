<?php


    require "../vendor/autoload.php";

    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exception;

    function sendTrainingStatusEmail($toEmail, $name, $trainingName, $status)
    {
        $mail = new PHPMailer(true);

        try {

            $mail->isSMTP();
            $mail->Host = "smtp.office365.com";
            $mail->SMTPAuth = true;

            $mail->Username = "mapohaT@ncaa.na";
            $mail->Password = "Spillo@2002";

            $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
            $mail->Port = 587;

            $mail->setFrom('mapohaT@ncaa.na', 'NCAA Training Management System');
            $mail->addAddress($toEmail, $name);

            $mail->isHTML(true);
            $mail->Subject = "Training Status Updated";

            $mail->Body = "
                <p>Hello <strong>$name</strong></p>
                <br>
                <p>Your training status has been updated.</p>
                <table cellpadding='6'>
                   <tr>
                      <td><strong>Training</strong></td>
                      <td>$trainingName</td>
                   </tr>
                   <tr>
                      <td><strong>Status</strong></td>
                      <td>$status</td>
                   </tr>
                </table>
                <br>
                <p>
                   Please log in to the system
                   <a href='http://localhost:5173/' target='_blank'>
                      NCAA Training Management System
                   </a>
                </p>
            ";

            $mail->send();
            return true;

        } catch (Exception $e) {
             error_log($mail->ErrorInfo);
             return false;
        }
    }


?>