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

   $sql = " SELECT
               a.id,
               s.first_name,
               s.last_name,
               s.department,
               t.*,
               a.status
               FROM training_assignments a
               LEFT JOIN staff s ON a.staff_id = s.id
               LEFT JOIN training_programs t ON a.program_id = t.id
               WHERE s.email = ?
               ORDER BY a.id DESC;
   ";

   $stmt = $conn->prepare($sql);
   $stmt->bind_param("s", $email);
   $stmt->execute();

   $result = $stmt->get_result();

   $assignments = [];

   while ($row = $result->fetch_assoc()) {
      $assignments[] = $row;
   }

   echo json_encode([
      "success" => true,
      "data" => $assignments
   ]);

   $conn->close();





?>