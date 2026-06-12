<?php


    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type");
    header("Content-Type: application/json");

    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        http_response_code(200);
        exit();
    }

    include "../database.php";

    $data = json_decode(file_get_contents("php://input"), true);

    $staff_ids = $data["staff_ids"];
    $program_id = $data["program_id"];
    $date_assigned = $data["date_assigned"];
    $deadline = $data["deadline"];

    $response = ["success" => false];

    if (!$staff_ids || !$program_id) {
        echo json_encode($response);
        exit;
    }

    $sql = "
         INSERT INTO training_assignments (staff_id, program_id, date_assigned, deadline, status)
           VALUES (
               ?,
               ?,
               ?,
               ?,
               'Pending'
           );
    ";

    $stmt = $conn->prepare($sql);
    
    foreach ($staff_ids as $staff_id) {
        $stmt->bind_param("iiss", $staff_id, $program_id, $date_assigned, $deadline);
        $stmt->execute();
    };

    $response["success"] = true;
    echo json_encode($response);


?>