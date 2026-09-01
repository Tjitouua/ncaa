<?php


   session_start();

   header("Content-Type: application/json");
   header("Access-Control-Allow-Origin: http://localhost:5173");
   header("Access-Control-Allow-Credentials: true");
   header("Access-Control-Allow-Methods: *");
   header("Access-Control-Allow-Headers: Content-Type");


   include "../database.php";

   if (!isset($_SESSION["user"])) {
       echo json_encode([
         "success" => false,
         "message" => "User is not logged in"
       ]);
       exit;
   }

   $staff_id = $_SESSION["user"]["id"];

   $sql = "SELECT * FROM training_requests WHERE staff_id = ?";
   $stmt = $conn->prepare($sql);

   $stmt->bind_param("i", $staff_id);
   $stmt->execute();

   $result = $stmt->get_result();
//    $data = $result->fetch_assoc();

   $data = [];

   while ($row = $result->fetch_assoc()) {
      $data[] = $row;
   }

   if ($data) {
      echo json_encode([
         "success" => true,
         "data" => $data
      ]);
   } else {
     echo json_encode([
        "success" => false,
        "message" => "User id not found"
     ]);
   }

   $stmt->close();
   $conn->close();




?>