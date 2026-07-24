<?php



   header("Access-Control-Allow-Origin: *");
   header("Access-Control-Allow-Headers: *");
   header("Access-Control-Allow-Methods: POST");
   header("Content-Type: application/json");

   include "../database.php";

   $data = json_decode(file_get_contents("php://input"), true);

   if (!$data || !isset($data["email"])) {
      echo json_encode([
         "success" => false,
         "message" => "Email is required"
      ]);
      exit;
   }

   $email = $data["email"];
   $status = "Read";

   $sql = "SELECT
             n.id,
             n.training_id,
             n.title,
             n.message,
             n.status,
             n.sent_date
          FROM staff_notifications n
          WHERE n.staff_email = ? 
          AND status = ?
          ORDER BY id DESC;
   ";

   $stmt = $conn->prepare($sql);
   $stmt->bind_param("ss", $email, $status);
   $stmt->execute();

   $result = $stmt->get_result();
   $notifications = [];

   while ($row = $result->fetch_assoc()) {
     $notifications[] = $row;
   }

   echo json_encode([
      "success" => true,
      "data" => $notifications
   ]);

   $conn->close();

   








?>