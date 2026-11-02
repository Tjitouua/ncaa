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

    $query = "SELECT first_name, last_name FROM staff WHERE id = ?";
    $staffStmt = $conn->prepare($query);
    $staffStmt->bind_param("i", $staff_id);
    $staffStmt->execute();

    $staff_result = $staffStmt->get_result();
    $staff = $staff_result->fetch_assoc();

    if (!$staff) {
        echo json_encode([
            "success" => false,
            "message" => "User not found"
        ]);
        exit;
    }

    $sql = "SELECT * FROM training_programs WHERE staff_id = ? AND year = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ii", $staff_id, $year);
    $stmt->execute();

    $result = $stmt->get_result();
    $data = $result->fetch_all(MYSQLI_ASSOC);

    
        echo json_encode([
            "success" => true,
            "staff" => $staff,
            "data" => $data
        ]);

    $stmt->close();
    $staffStmt->close();
    $conn->close();




?>