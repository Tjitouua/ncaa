<?php

    // require "../vendor/autoload.php";
    require __DIR__ . "/../vendor/autoload.php";

    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exception;


    function sendWelcomeEmail($toEmail, $name, $password)
    {
        $mail = new PHPMailer(true);

        try {
            // Settings 
            $mail->isSMTP();
            $mail->Host = "smtp.office365.com";
            $mail->SMTPAuth = true;
            $mail->Username = 'mapohaT@ncaa.na';   
            $mail->Password = 'Spillo@2002';   
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
            $mail->Port = 587;

            // Email 
            $mail->setFrom("mapohaT@ncaa.na", "NCAA Training Management System");
            $mail->addAddress($toEmail, $name);

            $mail->isHTML(true);
            $mail->Subject = "Welcome to NCAA Training Management System";

            $mail->Body = "
               <p>Hello $name</p>
               <br>
               <p>Your account has been created successfully</p>
               <p><strong>Login Email: </strong> $toEmail</p>
               <p><strong>Temporary Password: </strong> $password</p>
               <br>
               <p>Click the link to change your password</p>
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