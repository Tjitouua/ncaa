<?php

    // include "../database.php";

    require_once __DIR__ . "/../database.php";
    require_once __DIR__ . "/../mail/certificate_expiry_email.php";
    require_once __DIR__ . "/../mail/certificate_expired_email.php";

    function runCertificateCheck($conn)
    {
        $today = date("Y-m-d");
        $expiringDate = date("Y-m-d", strtotime("+30 days"));

        $sql = "SELECT
                c.id,
                c.training_id,
                c.expiry_date,
                c.staff_email,
                s.first_name,
                s.last_name,
                p.training_name
                FROM certificates c
                LEFT JOIN staff s ON c.staff_email = s.email
                LEFT JOIN training_assignments a ON c.training_id = a.id
                LEFT JOIN training_programs p ON a.program_id = p.id
        ";

        $result = $conn->query($sql);

        if (!$result) {
            error_log("Certificate query failed: " . $conn->error);
            return;
        }

        while ($row = $result->fetch_assoc()) {

            $expiry = $row["expiry_date"];
            $email = $row["staff_email"];
            $name = $row["first_name"] . " " . $row["last_name"];
            $trainingID = $row["training_id"];
            $training = $row["training_name"];

            $formattedExpiry = date("d F Y", strtotime($expiry));

            if ($expiry > $today && $expiry <= $expiringDate) {
                $checkSql = "SELECT
                             id
                             FROM admin_notifications
                             WHERE 
                             staff_email = ?
                             AND training_id = ?
                             AND notification_type = 'EXPIRING';
                ";
                $checkStmt = $conn->prepare($checkSql);
                $checkStmt->bind_param("si", $email, $trainingID);
                $checkStmt->execute();
                $checkResult = $checkStmt->get_result();

                if ($checkResult->num_rows == 0) {
                   sendCertificateExpiryEmail($email, $name, $training, $expiry);
                

                // Admin
                $title = "Certification expiring";
                $message = "$name's $training certificate will expire in 30 days ($formattedExpiry). Please ensure renewal training is scheduled before the expiry date.";
                $status = "Unread";
                $sent = date("Y-m-d H:i:s");
                $expiring_type = "EXPIRING";

                $expirySql = "INSERT INTO admin_notifications (staff_email, training_id, notification_type, title, message, status, sent_date)
                              VALUES (?, ?, ?, ?, ?, ?, ?);
                ";

                $stmt = $conn->prepare($expirySql);
                $stmt->bind_param("sisssss", $email, $trainingID, $expiring_type, $title, $message, $status, $sent);
                $stmt->execute();


                // Staff 
                $titleStaff = "Upcoming expiring";
                $messageStaff = "Your $training will expire in 30 days ($formattedExpiry). Please schedule a renewal.";

                $expiryStaffSql = "INSERT INTO staff_notifications (staff_email, training_id, notification_type, title, message, status, sent_date)
                                     VALUES (?, ?, ?, ?, ?, ?, ?);
                ";
                $staffStmt = $conn->prepare($expiryStaffSql);
                $staffStmt->bind_param("sisssss", $email, $trainingID, $expiring_type, $titleStaff, $messageStaff, $status, $sent);
                $staffStmt->execute();
              }
            }

            if ($expiry < $today) {
                $checkSql = "SELECT
                             id
                             FROM admin_notifications
                             WHERE 
                             staff_email = ?
                             AND training_id = ?
                             AND notification_type = 'EXPIRED';
                ";
                $checkStmt = $conn->prepare($checkSql);
                $checkStmt->bind_param("si", $email, $trainingID);
                $checkStmt->execute();
                $checkResult = $checkStmt->get_result();

                if ($checkResult->num_rows == 0) {
                  sendCertificateExpiredEmail($email, $name, $training, $expiry);
                

                // Admin 
                $title = "Expired certification";
                $message = "$name's $training certificate expired on $formattedExpiry. The staff member is now non-compliant until the certification s renewed.";
                $status = "Unread";
                $sent = date("Y-m-d H:i:s");
                $expired_type = "EXPIRED";

                $expiredSql = "INSERT INTO admin_notifications (staff_email, training_id, notification_type, title, message, status, sent_date)
                              VALUES (?, ?, ?, ?, ?, ?, ?);
                ";

                $stmt = $conn->prepare($expiredSql);
                $stmt->bind_param("sisssss", $email, $trainingID, $expired_type, $title, $message, $status, $sent);
                $stmt->execute();


                // Staff 
                $staffTitle = "Expired certificate";
                $staffMessage = "Your $training certificate expired on $formattedExpiry. You are currently non-compliant.";

                $expiredSql = "INSERT INTO staff_notifications (staff_email, training_id, notification_type, title, message, status, sent_date)
                VALUES (?, ?, ?, ?, ?, ?, ?);
                ";

                $expiredStmt = $conn->prepare($expiredSql);
                $expiredStmt->bind_param("sisssss", $email, $trainingID, $expired_type, $staffTitle, $staffMessage, $status, $sent);
                $expiredStmt->execute();
              }
   
            }

        }

    }



?>