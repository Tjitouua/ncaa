<?php



    header("Content-Type: application/json");
    header("Access-Control-Allow-Origin: *");

    include "../database.php";


    $id = $_GET["id"] ?? null;

    if (!$id) {
        echo json_encode([
            "success" => false,
            "message" => "Role ID required"
        ]);
        exit;
    }

    // Get the role first 
    $sql = "SELECT
             role,
             department
             FROM roles
             WHERE id = ?;
    ";

    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $id);
    $stmt->execute();

    $role = $stmt->get_result()->fetch_assoc();

    if(!$role) {
        echo json_encode([
            "success" => false,
            "message" => "Role not found"
        ]);
        exit;
    }



    // Get all staff for the role
    $query = "SELECT * FROM staff WHERE role = ? AND department = ?;";
    $stmt2 = $conn->prepare($query);
    $stmt2->bind_param("ss", $role["role"], $role["department"]);
    $stmt2->execute();

    $staff = $stmt2->get_result();

    $data = [];

    while ($employee = $staff->fetch_assoc()) {
        // Getting the required training from the matrix
        $trainingSql = "SELECT
                         tp.training_name,
                         m.type,
                         ta.status
                       FROM matrix m
                       INNER JOIN training_programs tp ON tp.id = m.program_id
                       LEFT JOIN training_assignments ta ON ta.program_id = m.program_id
                       AND ta.staff_id = ?
                       WHERE m.role_id = ?
                       ORDER BY tp.training_name;
        ";

        $trainingStmt = $conn->prepare($trainingSql);
        $trainingStmt->bind_param("ii", $employee["id"], $id);
        $trainingStmt->execute();

        $trainingResult = $trainingStmt->get_result();

        $trainings = [];

        while ($training = $trainingResult->fetch_assoc()) {
            $trainings[] = [
                "training" => $training["training_name"],
                "type" => $training["type"],
                "status" => $training["status"] ?? "Not assigned"
            ];
        }


        $employee["trainings"] = $trainings;

        $data[] = $employee;


    }


    echo json_encode([
        "success" => true,
        "data" => $data
    ]);





?>