<?php

    // require "../vendor/autoload.php";
    require __DIR__ . "/../vendor/autoload.php";

    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exception;


    function sendCertificateRejectedEmail($toEmail, $name, $training, $quarter, $year)
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
            $mail->Subject = "Certificate Rejected (NCAA)";

            $mail->Body = "
               <p>Hello $name</p>
               <br>
               <p>Your submitted training certificate has been <strong>rejected by HR</strong></p>
               <br>
               <p><strong style='margin-right: 5px;'>Training: </strong>$training</p>
               <p><strong style='margin-right: 5px;'>Quarter: </strong>$quarter</p>
               <p><strong style='margin-right: 5px;'>Year: </strong>$year</p>
               <br>
               <p>Please log into the NCAA Training Management System and upload a new certificate for this training.</p>
               <p>http://localhost:5173/</p>
            ";

            $mail->send();
            return true;

        } catch (Exception $e) {
             error_log("Email error: " . $mail->ErrorInfo);
             return false;
        }
    }


?>