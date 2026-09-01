<?php



   session_start();


   header("Content-Type: application/json");
   header("Access-Control-Allow-Origin: http://localhost:5173");
   header("Access-Control-Allow-Credentials: true");
   header("Access-Control-Allow-Methods: POST");
   header("Access-Control-Allow-Headers: Content-Type");

   include "../database.php";


   if (!isset($_SESSION["user"]) || $_SESSION["user"]["role"] !== "admin") {
      echo json_encode([
        "success" => false,
        "message" => "Access denied. Admins only."
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



   $training_id = $_POST["training_id"] ?? null;
   $certificate_no = $_POST["certificate_no"] ?? null;
   $issued_date = $_POST["issued_date"] ?? null;
   $expiry_date = $_POST["expiry_date"] ?? null;



   if (!$training_id || !$issued_date || !$expiry_date) {
      echo json_encode([
        "success" => false,
        "message" => "Missing required field"
      ]);
      exit;
   }


   $sql = "SELECT
           a.id,
           s.email AS staff_email
           FROM training_assignments a
           INNER JOIN staff s ON s.id = a.staff_id
           WHERE a.id = ?
   ";

   $stmt = $conn->prepare($sql);
   $stmt->bind_param("i", $training_id);
   $stmt->execute();

   $result = $stmt->get_result();
   $assignment = $result->fetch_assoc();

   $stmt->close();


   if (!$assignment) {
     echo json_encode([
        "success" => false,
        "message" => "Training assignment not found"
     ]);
     exit;
   }

   if (empty($certificate_no)) {
      $certificate_no = "CERT_" . rand(10000, 99999);
   }

   if (!isset($_FILES["file"])) {
     echo json_encode([
        "success" => false,
        "message" => "Certificate file is required"
     ]);
     exit;
   }

   $file = $_FILES["file"];


   if ($file["error"] !== UPLOAD_ERR_OK) {
      echo json_encode([
        "success" => false,
        "message" => "There was an error uploading the file"
      ]);
      exit;
   }


   
   if ($file["size"] > 5 * 1024 * 1024) {
      echo json_encode([
        "success" => false,
        "message" => "File too large. Maximum size is 5MB"
      ]);
      exit;
   }


   $allowedTypes = ["pdf", "jpg", "jpeg", "png"];



   $originalName = basename($file["name"]);
   $fileExt = strtolower(pathinfo($originalName, PATHINFO_EXTENSION));
  

   if (!in_array($fileExt, $allowedTypes)) {
     echo json_encode([
        "success" => false,
        "message" => "Invalid file type"
     ]);
     exit;
   }                
   
   
   $uploadDir = "certificates/";

   if (!is_dir($uploadDir)) {
     mkdir($uploadDir, 0777, true);
   }


   $fileName = time() . "_" . uniqid() . "_" . $originalName;
   $filePath = $uploadDir . $fileName;


   if (!move_uploaded_file($file["tmp_name"], $filePath)) {
      echo json_encode([
        "success" => false,
        "message" => "File upload failed"
      ]);
      exit;
   }


   $sql = "INSERT INTO certificates 
           (
              training_id,
              staff_email,
              certificate_no,
              issued_date,
              expiry_date,
              file
           )
           VALUES (?, ?, ?, ?, ?, ?)
   ";

   $stmt = $conn->prepare($sql);

   $stmt->bind_param("isssss",
                      $training_id,
                      $assignment["staff_email"],
                      $certificate_no,
                      $issued_date,
                      $expiry_date,
                      $filePath
           );


   if (!$stmt->execute()) {
       if (file_exists($filePath)) {
          unlink($filePath);
       }

       echo json_encode([
          "success" => false,
          "message" => "Database insert failed"
       ]);
       $stmt->close();
       exit;
   }


   $stmt->close();

   echo json_encode([
     "success" => true,
     "message" => "Certificate uploaded successfully"
   ]);

   $conn->close();





?>