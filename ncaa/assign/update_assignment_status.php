<?php



    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");
    header("Content-Type: application/json");

    include "../database.php";

    $data = json_decode(file_get_contents("php://input"), true);

    if (!isset($data["id"]) || !isset($data["status"])) {
        echo json_encode([
            "success" => false,
            "message" => "Missing id or status"
        ]);
        exit;
    }


    $id = $data["id"];
    $status = $data["status"];


    $sql = "UPDATE training_assignments SET status = ? WHERE id = ?;";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("si", $status, $id);

    if ($stmt->execute()) {
        echo json_encode([
            "success" => true,
            "message" => "Status updated successfully"
        ]);
    } else {
        echo json_encode([
            "success" => false,
            "message" => "Failed to update status"
        ]);
    }

    $stmt->close();
    $conn->close();




?>