<?php


    header("Content-Type: application/json");
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: POST");
    header("Access-Control-Allow-Headers: Content-Type");


    include "../database.php";

    $data = json_decode(file_get_contents("php://input"), true);

    if(!$data) {
        echo json_encode([
            "success" => false,
            "message" => "No data received"
        ]);
        exit;
    }

    $role_id = trim($data["role_id"]);
    $program_id = trim($data["program_id"]);
    $type = trim($data["type"]);

    $sql = "INSERT INTO matrix (role_id, program_id, type)
            VALUES (?, ?, ?);
    ";

    $stmt = $conn->prepare($sql);
    $stmt->bind_param("iis", $role_id, $program_id, $type);

    if($stmt->execute()) {
        echo json_encode([
            "success" => true,
            "message" => "Requirement added to the role"
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