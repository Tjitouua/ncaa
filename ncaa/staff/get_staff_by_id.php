<?php



    header("Content-Type: application/json");
    header("Access-Control-Allow-Origin: *");

    include "../database.php";

    $id = $_GET["id"] ?? null;

    if (!$id) {
        json_encode([
            "success" => false,
            "message" => "Staff ID required"
        ]);
        exit;
    }


    $sql = "SELECT * FROM staff WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $id);
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
            "message" => "Staff not found"
        ]);
    }


    $stmt->close();
    $conn->close();



?>