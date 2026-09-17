<?php



       header("Content-Type: application/json"); 
       header("Access-Control-Allow-Origin: *"); 
       header("Access-Control-Allow-Methods: POST"); 
       header("Access-Control-Allow-Headers: Content-Type");


       include "../database.php";
       require "../mail/passwordReset.php";

       $data = json_decode(file_get_contents("php://input"), true);

       $email = trim($data["email"] ?? "");

       if (!$email) {
              echo json_encode([
                     "success" => false,
                     "message" => "Please enter your email"
              ]);
              exit;
       }


       $sql = "SELECT * FROM users WHERE email = ?";

       $stmt = $conn->prepare($sql);
       $stmt->bind_param("s", $email);
       $stmt->execute();

       $result = $stmt->get_result();

       if ($result->num_rows === 0) {
           echo json_encode([
              "success" => false,
              "message" => "Email address not found"
           ]);
           exit;
       }


       $user = $result->fetch_assoc();


       sendPasswordResetEmail(
              $user["email"],
              $user["first_name"]
       );



       echo json_encode([
              "success" => true,
              "message" => "Password reset email reset"
       ]);

       $conn->close();








?>