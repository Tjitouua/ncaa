<?php


     session_start();


     header("Content-Type: application/json");
     header("Access-Control-Allow-Origin: http://localhost:5173");
     header("Access-Control-Allow-Credentials: true");
     header("Access-Control-Allow-Methods: POST");
     header("Access-Control-Allow-Headers: Content-Type");

     include "../database.php";


     if (!isset($_SESSION["user"])) {
        echo json_encode([
           "success" => false,
           "message" => "User is not looged in"
        ]);
        exit;
     }

     $staff_email = $_SESSION["user"]["email"];
     $staff_first_name = $_SESSION["user"]["first_name"];
     $staff_last_name = $_SESSION["user"]["last_name"];



     if ($_SERVER["REQUEST_METHOD"] !== "POST") {
        echo json_encode([
            "success" => false,
            "message" => "Invalid request method"
        ]);
        exit;
     }

     $training_id = $_POST["training_id"] ?? null;
     $certificate_no = $_POST["certificate_no"] ?? null;
     $issued_date = $_POST["issued_date"] ?? null;
     $expiry_date = $_POST["expiry_date"] ?? null;

     $training_name = $_POST["training_name"] ?? null;

     if (!$training_id || !$issued_date || !$expiry_date) {
        echo json_encode([
            "success" => false,
            "message" => "Missing required fields"
        ]);
        exit;
     }

     if (empty($certificate_no)) {
        $certificate_no = "CERT-" . rand(10000, 99999);
     }

     if (!isset($_FILES["file"])) {
        echo json_encode([
            "success" => false,
            "message" => "File is required"
        ]);
        exit;
     }

     $file = $_FILES["file"];

     $uploadDir = "certificates/";

     if (!is_dir($uploadDir)) {
        mkdir($uploadDir, 0777, true);
     }

     $fileName = time() . "_" . basename($file["name"]);
     $filePath = $uploadDir . $fileName;

     $allowedTypes = ["pdf", "jpg", "jpeg", "png"];
     $fileExt = strtolower(pathinfo($fileName, PATHINFO_EXTENSION));

     if (!in_array($fileExt, $allowedTypes)) {
        echo json_encode([
            "success" => false,
            "message" => "Invalid file type"
        ]);
        exit;
     }

     if ($file["size"] > 5 * 1024 * 1024) {
        echo json_encode([
            "success" => false,
            "message" => "File too large (max 5MB)"
        ]);
        exit;
     }

     if (!move_uploaded_file($file["tmp_name"], $filePath)) {
        echo json_encode([
            "success" => false,
            "message" => "File upload failed"
        ]);
        exit;
     }

     $sql = "INSERT INTO certificates
            (training_id, staff_email, certificate_no, issued_date, expiry_date, file)
             VALUES
             (?, ?, ?, ?, ?, ?);
     ";


     $stmt = $conn->prepare($sql);
     $stmt->bind_param("isssss", $training_id, $staff_email, $certificate_no, $issued_date, $expiry_date, $filePath);

     if ($stmt->execute()) {

       $title = "New certificate upload";
       $message = "$staff_first_name $staff_last_name has uploaded a certificate for $training_name. Please review and verify the document.";
       $status = "Unread";
       $sent_date = date("Y-m-d H:i:s");

       $notifSql = "INSERT INTO admin_notifications (staff_email, training_id, title, message, status, sent_date)
                    VALUES (?, ?, ?, ?, ?, ?);
       ";

       $notifStmt = $conn->prepare($notifSql);
       $notifStmt->bind_param("sissss", $staff_email, $training_id, $title, $message, $status, $sent_date);
       $notifStmt->execute();
       $notifStmt->close();


        echo json_encode([
            "success" => true,
            "message" => "Certificate uploaded successfully"
        ]);
        exit;
     } else {
        echo json_encode([
            "success" => false,
            "message" => "Database insert failed"
        ]);
        exit;
     }









?>