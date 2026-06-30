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
     $status = "Unread";

     $sql = "UPDATE 
             notifications
             SET status = 'Read'
             WHERE staff_email = ?
             AND status = ?;
     ";
     $stmt = $conn->prepare($sql);
     $stmt->bind_param("ss", $email, $status);
     $stmt->execute();

     echo json_encode([
        "success" => true
     ]);

     $conn->close();






?>