<?php



    require "../vendor/autoload.php";

    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exception;

    function sendAcceptedEmail($toEmail, $name, $training, $quarter, $year)
    {
        $mail = new PHPMailer(true);

        try {

        // Out Settings 
        $mail->isSMTP();
        $mail->Host = "smtp.office365.com";
        $mail->SMTPAuth = true;

        $mail->Username = 'mapohaT@ncaa.na';
        $mail->Password = 'Veripamwe@2002';

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
              <p><strong style='margin-right: 5px;'>Training: </strong>$training</p>
              <p><strong style='margin-right: 5px;'>Quarter: </strong>$quarter</p>
              <p><strong style='margin-right: 5px;'>Year: </strong>$year</p>
              <br>
              <p>Once you have completed the training, please submit your training certificate through the system.</p>
              <p>This will allow your training record to be updated and marked as completed.</p>
              <br>
              <p>Please log into the system for more details.</p>
              <p>http://localhost:5173/</p>
        ";
        $mail->send();
        return true;

        } catch (Exception $e) {
            error_log("Email error: " . $mail->ErrorInfo);
            return false;
        }
    }





    // Reject Email 
    function sendRejectedEmail($toEmail, $name, $training, $quarter, $year, $rejectReason)
    {
        $mail = new PHPMailer(true);

        try {

        // Out Settings 
        $mail->isSMTP();
        $mail->Host = "smtp.office365.com";
        $mail->SMTPAuth = true;

        $mail->Username = 'mapohaT@ncaa.na';
        $mail->Password = 'Veripamwe@2002';

        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = 587;

        // Email Content 
        $mail->setFrom('mapohaT@ncaa.na', 'NCAA Training Management System');
        $mail->addAddress($toEmail, $name);

        $mail->isHTML(true);
        $mail->Subject = "Training Plan Rejected (NCAA)";

        $mail->Body = "
              <p>Hello $name,</p>
              <br>
              <p>Unfortunately, your training has been <strong>rejected</strong></p>
              <p><strong style='margin-right: 5px;'>Training: </strong>$training</p>
              <p><strong style='margin-right: 5px;'>Quarter: </strong>$quarter</p>
              <p><strong style='margin-right: 5px;'>Year: </strong>$year</p>
              <br>
              <p><strong>Reason for rejection:</strong></p>
              <p>$rejectReason</p>
              <br>
              <p>Please log into the system for more details.</p>
              <p>http://localhost:5173/</p>
        ";
        $mail->send();
        return true;

        } catch (Exception $e) {
            error_log("Email error: " . $mail->ErrorInfo);
            return false;
        }
    }








    
    // Old Training Email 
    function sendHistoryEmail($toEmail, $name, $training, $quarter, $year)
    {
        $mail = new PHPMailer(true);

        try {

        // Out Settings 
        $mail->isSMTP();
        $mail->Host = "smtp.office365.com";
        $mail->SMTPAuth = true;

        $mail->Username = 'mapohaT@ncaa.na';
        $mail->Password = 'Veripamwe@2002';

        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = 587;

        // Email Content 
        $mail->setFrom('mapohaT@ncaa.na', 'NCAA Training Management System');
        $mail->addAddress($toEmail, $name);

        $mail->isHTML(true);
        $mail->Subject = "Training Record Added (NCAA)";

        $mail->Body = "
              <p>Hello $name,</p>
              <br>
              <p>A training record has been added to your training history.</p>
              <p><strong style='margin-right: 5px;'>Training: </strong>$training</p>
              <p><strong style='margin-right: 5px;'>Quarter: </strong>$quarter</p>
              <p><strong style='margin-right: 5px;'>Year: </strong>$year</p>
              <br>
              <p>This record has been added to the NCAA Training Management System for record-keeping purposes.</p>
              <br>
              <p>Please log into the system for more details.</p>
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