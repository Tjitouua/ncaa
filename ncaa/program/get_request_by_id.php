<?php


    header("Content-Type: application/json");
    header("Access-Control-Allow-Origin: *");

    include "../database.php";

    $id = $_GET["id"] ?? null;

    if (!$id) {
        echo json_encode([
            "success" => false,
            "message" => "Request id required"
        ]);
        exit;
    }

    $sql = "SELECT * FROM training_requests WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $id);
    $stmt->execute();

    $result = $stmt->get_result();
    $data = $result->fetch_assoc();

    if ($data) {
        echo json_encode([
            "success" => true,
            "data" => $data
        ]);
    } else {
        echo json_encode([
            "success" => false,
            "message" => "Request not found"
        ]);
    }

    $stmt->close();
    $conn->close();


?>