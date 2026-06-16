<?php



    header("Content-Type: application/json");
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: POST");
    header("Access-Control-Allow-Headers: Content-Type");

    include "../database.php";

    $data = json_decode(file_get_contents("php://input"), true);

    $email = trim($data["email"]);
    $password = trim($data["password"]);

    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

    $sql = "UPDATE users SET password = ? WHERE email = ?;";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ss", $hashedPassword, $email);

    if ($stmt->execute()) {
        echo json_encode([
            "success" => true,
            "message" => "Password updated successfully"
        ]);
    } else {
        echo json_encode([
            "success" => false,
            "message" => "Failed to update password"
        ]);
    }

    $conn->close();






?>