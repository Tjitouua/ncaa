<?php



    header("Content-Type: application/json");
    header("Access-Control-Allow-Origin: *");


    include "../database.php";

    $staff_id = $_GET["id"] ?? null;
    $year = $_GET['year'] ?? null;

    if (!$staff_id) {
        echo json_encode([
            "success" => false,
            "message" => "Staff ID required"
        ]);
        exit;
    }

    $sql = "SELECT * FROM training_programs WHERE staff_id = ? AND year = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ii", $staff_id, $year);
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
            "message" => "Program (s) not found"
        ]);
    }

    $stmt->close();
    $conn->close();




?>