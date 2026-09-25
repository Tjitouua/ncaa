<?php


    session_start();


    header("Content-Type: application/json");
    header("Access-Control-Allow-Origin: http://localhost:5173");
    header("Access-Control-Allow-Credentials: true");
    header("Access-Control-Allow-Methods: POST");
    header("Access-Control-Allow-Headers: Content-Type");


    include "../database.php";
    include "../mail/certificate_reject.php";


    if (!isset($_SESSION["user"])) {
        echo json_encode([
            "success" => false,
            "message" => "User is not logged in"
        ]);
        exit;
    }

    if ($_SERVER["REQUEST_METHOD"] !== "POST") {
        echo json_encode([
            "success" => false,
            "message" => "Invalid request method"
        ]);
        exit;
    }


    $data = json_decode(file_get_contents("php://input"), true);

    $training_id = $data["training_id"] ?? null;

    if (!$training_id) {
        echo json_encode([
            "success" => false,
            "message" => "Training ID is required"
        ]);
        exit;
    }



    // Certificate & Staff Information 
    $sql = "SELECT
              c.id,
              c.file,
              c.staff_email,
              ta.id AS assignment_id,
              s.first_name,
              s.last_name,
              tp.training_name,
              tp.quarter,
              tp.year
            FROM certificates c
            INNER JOIN staff s ON s.email = c.staff_email
            INNER JOIN training_assignments ta ON ta.id = c.training_id
            INNER JOIN training_programs tp ON tp.id = ta.program_id
            WHERE c.training_id = ?
    ";

    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $training_id);
    $stmt->execute();


    $result = $stmt->get_result();

    $certificate = $result->fetch_assoc();

    if (!$certificate) {
        echo json_encode([
            "success" => false,
            "message" => "Certificate not found"
        ]);
        exit;
    }


    $filePath = $certificate["file"];
    $staff_email = $certificate["staff_email"];
    $staff_name = $certificate["first_name"] . " " . $certificate["last_name"];

    $name = $certificate["first_name"];
    $training = $certificate["training_name"];
    $quarter = $certificate["quarter"];
    $year = $certificate["year"];



    // Delete certificate from database 
    $deleteSql = "DELETE FROM certificates WHERE training_id = ?";

    $deleteStmt = $conn->prepare($deleteSql);
    $deleteStmt->bind_param("i", $training_id);

    if (!$deleteStmt->execute()) {
        echo json_encode([
            "success" => false,
            "message" => "Failed to reject certificate"
        ]);
        exit;
    }


    // Delete the physical file 
    if (file_exists($filePath)) {
        unlink($filePath);
    }


    // Update training status back to pending 
    $updateSql = "UPDATE training_assignments SET status = 'Pending' WHERE id = ?";

    $updateStmt = $conn->prepare($updateSql);
    $updateStmt->bind_param("i", $training_id);
    $updateStmt->execute();


    // Notification 
    $title = "Certification rejected";
    $message = "Your certificate submission for $training has been rejected by HR. Please upload a new certificate for this training.";
    $status = "Unread";
    $notificationType = "Certificate Rejection";
    $sentDate = date("Y-m-d H:i:s");

    $notifSql = "INSERT INTO staff_notifications (staff_email, training_id, notification_type, title, message, status, sent_date)
                 VALUES (?, ?, ?, ?, ?, ?, ?)
    ";

    $notifStmt = $conn->prepare($notifSql);

    $notifStmt->bind_param(
                  "sisssss",
                  $staff_email,
                  $training_id,
                  $notificationType,
                  $title,
                  $message,
                  $status,
                  $sentDate
    );

    $notifStmt->execute();

    sendCertificateRejectedEmail(
          $staff_email,
          $name,
          $training,
          $quarter,
          $year
    );

    echo json_encode([
        "success" => true,
        "message" => "Certificate rejected successfully"
    ]);


    $conn->close();




?>