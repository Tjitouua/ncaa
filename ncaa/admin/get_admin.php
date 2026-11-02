<?php 


     session_start();


     header("Content-Type: application/json");
     header("Access-Control-Allow-Origin: http://localhost:5173");
     header("Access-Control-Allow-Credentials: true");

     include "../database.php";

     $sql = "SELECT id, email FROM users WHERE role = 'admin' LIMIT 1";
     $stmt = $conn->prepare($sql);
     $stmt->execute();

     $result = $stmt->get_result();
     $admin = $result->fetch_assoc();

     if ($admin) {
        echo json_encode([
            "success" => true,
            "admin" => $admin
        ]);
     } else {
        echo json_encode([
            "success" => false,
            "message" => "Administrator account not found"
        ]);
     }

     $stmt->close();
     $conn->close();





?>