<?php



    header("Content-Type: application/json");
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: POST");
    header("Access-Control-Allow-Headers: Content-Type");

    include "../database.php";

    $data = json_decode(file_get_contents("php://input"), true);

    if (!$data) {
        echo json_encode([
            "success" => false,
            "message" => "No data received"
        ]);
        exit;
    }



    $role = trim($data["role"]);
    $department = trim($data["department"]);
    $desc = trim($data["desc"]);
    $status = trim($data["status"]);

    $sql = "INSERT INTO roles (department, role, description, status)
            VALUES (?, ?, ?, ?);
    ";

    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ssss", $department, $role, $desc, $status);
    

    if ($stmt->execute()) {
        echo json_encode([
            "success" => true,
            "message" => "Role added successfully"
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