<?php



    header("Content-Type: application/json");
    header("Access-Control-Allow-Origin: *");

    include "../database.php";

    $id = $_GET["id"] ?? null;

    if(!$id) {
        echo json_encode([
            "success" => false,
            "message" => "Role ID required"
        ]);
        exit;
    }

    $sql = "SELECT 
            m.id,
            m.type,
            r.department,
            r.role,
            r.status,
            p.training_name,
            p.duration,
            p.category,
            p.validity
            FROM matrix m
            LEFT JOIN roles r ON r.id = m.role_id
            LEFT JOIN training_programs p ON p.id = m.program_id
            WHERE m.role_id = ?
            ORDER BY m.id DESC;
    ";

    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $id);
    $stmt->execute();

    $result = $stmt->get_result();

    $data = [];

    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }


    if($data) {
        echo json_encode([
            "success" => true,
            "data" => $data 
        ]);
    } 


    $stmt->close();
    $conn->close();




?>