<?php



    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json");


    include "../database.php";

    $staff_id = $_GET["id"] ?? null;
    $year = $_GET["year"] ?? date("Y");

    if (!$staff_id) {
        echo json_encode([
            "success" => false,
            "message" => "Staff ID required"
        ]);
        exit;
    }



    $sql = "SELECT
               COUNT(DISTINCT t.id) AS total_trainings,
               COUNT(DISTINCT CASE
                        WHEN a.status = 'Completed' THEN t.id 
                        END) AS completed_trainings
            FROM training_programs t
            LEFT JOIN training_assignments a ON a.program_id = t.id
            AND a.staff_id = t.staff_id
            WHERE t.staff_id = ?
            AND t.year = ?
     ";

    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ii", $staff_id, $year);
    $stmt->execute();

    $result = $stmt->get_result();
    $data = $result->fetch_assoc();

    $total = (int) $data["total_trainings"];
    $completed = (int) $data["completed_trainings"];

    $percentage = $total > 0
                  ? round(($completed / $total) * 100)
                  : 0;

    
    echo json_encode([
        "success" => true,
        "total_trainings" => $total,
        "completed_trainings" => $completed,
        "percentage" => $percentage
    ]);






?>