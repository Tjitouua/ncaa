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

    $sql = "SELECT 
            t.id,
            p.training_name,
            t.status
            FROM training_assignments t
            LEFT JOIN training_programs p ON p.id = t.program_id
            LEFT JOIN staff s ON s.id = t.staff_id
            WHERE t.staff_id = ?;
    ";

    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $id);
    $stmt->execute();

    $result = $stmt->get_result();
    $data = $result->fetch_all(MYSQLI_ASSOC);

    if ($data) {
        echo json_encode([
            "success" => true,
            "data" => $data
        ]);
    } else {
        echo json_encode([
            "success" => false,
            "message" => "Training (s) not found"
        ]);
    }

    $stmt->close();
    $conn->close();



?>