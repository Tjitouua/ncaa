<?php
  
  header("Access-Control-Allow-Origin: *");
  header("Access-Control-Allow-Headers: *");
  header("Content-Type: application/json");

  include "database.php";

  $data = json_decode(file_get_contents("php://input"));

  $username = $data->username;
  $password = $data->password;

  $sql = "SELECT * FROM users WHERE username = ?";
  $stmt = $conn->prepare($sql);

  $stmt->bind_param("s", $username);
  $stmt->execute();

  $result = $stmt->get_result();

  if($result->num_rows > 0) {
    $user = $result->fetch_assoc();

    if ($password == $user["password"]) {
       echo json_encode([
         "success" => true,
         "message" => "Login successfull",
         "user" => [
            "id" => $user["id"],
            "username" => $user["username"],
            "role" => $user["role"]
         ]
         ]);
    } else {
        echo json_encode([
           "success" => false,
           "message" => "Incorrect password"
        ]);
    }
  } else {
    echo json_encode([
        "success" => false,
        "message" => "User not found"
    ]);
  }

?>