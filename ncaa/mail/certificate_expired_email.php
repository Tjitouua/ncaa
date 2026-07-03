<?php



    require __DIR__ . "/../vendor/autoload.php";

    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exception;

    function sendCertificateExpiredEmail($toEmail, $name, $training, $expiryDate)
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

            $mail->setFrom("mapohaT@ncaa.na", "NCAA Training Management System");
            $mail->addAddress($toEmail, $name);

            $mail->isHTML(true);
            $mail->Subject = "Certificate Expired";

            $mail->Body = "
                <p>Hello $name</p>
                <br>
                <p>Your training certificate has expired.</p>
                <br>
                <p><strong>Training: </strong>$training</p>
                <p><strong>Expired On: </strong>$expiryDate</p>
                <br>
                <p>
                   If you already have a renewed certificate, please upload it as soon as possible.
                   If you do not have a renewed certificate, please contact your administrator to have this training reassigned so that you can complete it again.
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