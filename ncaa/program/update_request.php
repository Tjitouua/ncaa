<?php


   header("Content-Type: application/json");
   header("Access-Control-Allow-Origin: *");
   header("Access-Control-Allow-Methods: POST, OPTIONS");
   header("Access-Control-Allow-Headers: Content-Type");

   include "../database.php";

   $data = json_decode(file_get_contents("php://input"), true);

   if(!$data) {
     echo json_encode([
        "success" => false,
        "message" => "No data received"
     ]);
     exit;
   }

   $id = $data["id"] ?? null;

   if (!$id) {
      echo json_encode([
         "success" => false,
         "message" => "Request ID required"
      ]);
      exit;
   }



   $training_code = trim($data["training_code"]);
   $training_name = trim($data["training_name"]);
   $description = trim($data["description"]);
   $duration = trim($data["duration"]);
   $category = trim($data["category"]);
   $type = trim($data["type"]);
   $validity = trim($data["validity"]);
   $trainer = trim($data["trainer"]);
   $provider = trim($data["provider"]);
   $location = trim($data["location"]);
   $contact = trim($data["contact"]);
   $email = trim($data["email"]);
   $cost = trim($data["cost"]);
   $start_date = trim($data["start_date"]);
   $end_date = trim($data["end_date"]);
   $reason = trim($data["reason"]);

   $sql = "UPDATE training_requests SET 
                 training_code = ?,
                 training_name = ?,
                 description = ?,
                 duration = ?,
                 category = ?,
                 type = ?,
                 validity = ?,
                 trainer = ?,
                 provider = ?,
                 location = ?,
                 contact = ?,
                 email = ?,
                 cost = ?,
                 start_date = ?,
                 end_date = ?,
                 reason = ?
           WHERE id = ?
   ";

   $stmt = $conn->prepare($sql);

   $stmt->bind_param("ssssssssssssssssi", 
                      $training_code,
                      $training_name,
                      $description,
                      $duration,
                      $category,
                      $type,
                      $validity,
                      $trainer,
                      $provider,
                      $location,
                      $contact,
                      $email,
                      $cost,
                      $start_date,
                      $end_date,
                      $reason,
                      $id
);

if ($stmt->execute()) {
    echo json_encode([
        "success" => true,
        "message" => "Requested updated succesfully"
    ]);
} else {
    echo json_encode([
        "success" => false,
        "message" => $stmt->error
    ]);
}

$stmt->close();
$conn->close();




?>