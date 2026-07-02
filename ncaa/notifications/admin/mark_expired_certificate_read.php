<?php



     header("Access-Control-Allow-Origin: *");
     header("Access-Control-Allow-Headers: *");
     header("Access-Control-Allow-Methods: POST");
     header("Content-Type: application/json");

     include "../../database.php";

     $status = "Unread";

     $sql = "UPDATE
             admin_notifications
             SET status = 'Read'
             WHERE title = 'Expired certification'
             AND status = ?;
     ";
     $stmt = $conn->prepare($sql);
     $stmt->bind_param("s", $status);
     $stmt->execute();

     echo json_encode([
        "success" => true
     ]);

     $conn->close();




?>