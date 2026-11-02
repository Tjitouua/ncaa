<?php


    header("Content-Type: application/json");
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: POST");
    header("Access-Control-Allow-Headers: Content-Type");

    
    include "../database.php";
    require "../mail/newUser.php";

    $data = json_decode(file_get_contents("php://input"), true);

    if (!$data) {
        echo json_encode([
            "success" => false,
            "message" => "No data received"
        ]);
        exit;
    }


    $first_name = trim($data["first_name"]);
    $last_name = trim($data["last_name"]);
    $email = trim($data["email"]);

    $role = "hr";

    $sql = "INSERT INTO users (role, first_name, last_name, email, password)
                        VALUES (?, ?, ?, ?, ?);
    ";

    $stmt = $conn->prepare($sql);

    function generateRandomPass($length = 10) {
        $characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%";
        $password = "";

        for ($i = 0; $i < $length; $i++) {
            $password .= $characters[random_int(0, strlen($characters) - 1)];
        }
        return $password;
    }

    $defaultPassPlain = generateRandomPass();
    $defaultPass = password_hash($defaultPassPlain, PASSWORD_DEFAULT);

    $stmt->bind_param("sssss",
                       $role,
                       $first_name,
                       $last_name,
                       $email,
                       $defaultPass
    );


    if ($stmt->execute()) {
        sendWelcomeEmailHR($email, $first_name, $defaultPassPlain);
        echo json_encode([
            "success" => true,
            "message" => "HR member added successfully"
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