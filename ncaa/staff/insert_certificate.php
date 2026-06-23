<?php



     header("Content-Type: application/json");
     header("Access-Control-Allow-Origin: *");
     header("Access-Control-Allow-Methods: POST");
     header("Access-Control-Allow-Headers: Content-Type");

     include "../database.php";

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
            (training_id, certificate_no, issued_date, expiry_date, file)
             VALUES
             (?, ?, ?, ?, ?);
     ";

     $stmt = $conn->prepare($sql);
     $stmt->bind_param("issss", $training_id, $certificate_no, $issued_date, $expiry_date, $filePath);

     if ($stmt->execute()) {
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