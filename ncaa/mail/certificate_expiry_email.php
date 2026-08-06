<?php


    require __DIR__ . "/../vendor/autoload.php";

    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exception;

    function sendCertificateExpiryEmail($toEmail, $name, $training, $expiryDate)
    {
        $mail = new PHPMailer(true);

        try {

            $mail->isSMTP();
            $mail->Host = "smtp.office365.com";
            $mail->SMTPAuth = true;
            $mail->Username = "mapohaT@ncaa.na";
            $mail->Password = "Veripamwe@2002";
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
            $mail->Port = 587;

            $mail->setFrom("mapohaT@ncaa.na", "NCAA Training Management System");
            $mail->addAddress($toEmail, $name);

            $mail->isHTML(true);
            $mail->Subject = "Certificate Expiring Soon";

            $mail->Body = "
                <p>Hello $name</p>
                <br>
                <p>Your certificate is about to expire</p>
                <p><strong>Training: </strong>$training</p>
                <p><strong>Expiry date: </strong>$expiryDate</p>
                <br>
                <p>
                   To renew your certification, this training must first be reassigned to you by an administrator.
                   Please contact your administrator if you have not yet received a new training assignment.
                </p>
                <br>
                <a href='http://localhost:5173/'>Open NCAA Training System</a>
            ";

            $mail->Send();
            return true;
        } catch (Exception $e) {
            error_log("Email error: " . $mail->ErrorInfo);
            return false;
        }

    }




?>