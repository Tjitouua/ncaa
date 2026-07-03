<?php

  ini_set('display_errors', 1);
  ini_set('display_startup_errors', 1);
  error_reporting(E_ALL);

  session_start();

  
  header("Content-Type: application/json");
  header("Access-Control-Allow-Origin: http://localhost:5173");
  header("Access-Control-Allow-Credentials: true");
  header("Access-Control-Allow-Headers: Content-Type");

  include "../database.php";
  require_once "../scripts/certificateChecker.php";

  $data = json_decode(file_get_contents("php://input"));

  $email = $data->email;
  $password = $data->password;

  $sql = " SELECT
             u.id,
             u.role,
             u.email,
             u.first_name,
             u.last_name,
             u.password,
             s.department,
             s.role AS position
             FROM users u
             LEFT JOIN staff s ON u.email = s.email
             WHERE u.email = ?
  ";
  $stmt = $conn->prepare($sql);

  $stmt->bind_param("s", $email);
  $stmt->execute();

  $result = $stmt->get_result();

  if($result->num_rows > 0) {
    $user = $result->fetch_assoc();

    if (password_verify($password, $user["password"]) || $password == $user["password"]) {

      $_SESSION["user"] = [
        "id" => $user["id"],
            "email" => $user["email"],
            "role" => $user["role"],
            "first_name" => $user["first_name"],
            "last_name" => $user["last_name"],
            "department" => $user["department"],
            "position" => $user["position"]
      ];

      $_SESSION["last_activity"] = time();

      if ($user["role"] === "admin") {
         runCertificateCheck($conn);
      }

       echo json_encode([
         "success" => true,
         "message" => "Login successfull",
         "user" => $_SESSION["user"]
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