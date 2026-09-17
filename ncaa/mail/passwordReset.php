<?php

    // require "../vendor/autoload.php";
    require __DIR__ . "/../vendor/autoload.php";

    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exception;


    function sendPasswordResetEmail($toEmail, $name)
    {
        $mail = new PHPMailer(true);

        try {
            // Settings 
            $mail->isSMTP();
            $mail->Host = "smtp.office365.com";
            $mail->SMTPAuth = true;
            $mail->Username = 'mapohaT@ncaa.na';   
            $mail->Password = 'Veripamwe@2002';   
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
            $mail->Port = 587;

            // Email 
            $mail->setFrom("mapohaT@ncaa.na", "NCAA Training Management System");
            $mail->addAddress($toEmail, $name);

            $mail->isHTML(true);
            $mail->Subject = "Reset Your NCAA Password";

            $mail->Body = "
               <p>Hello $name</p>
               <br>
               <p>We received a request to reset your NCAA Training Management System password.</p>
               <br>
               <p>Click the link below to reset your password:</p>
               <p><a href='http://localhost:5173/password?email=$toEmail'>Set Password</a></p>
            ";

            $mail->send();
            return true;

        } catch (Exception $e) {
             error_log("Email error: " . $mail->ErrorInfo);
             return false;
        }
    }


?>