<?php


    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: *");
    header("Access-Control-Allow-Methods: POST");
    header("Content-Type: application/json");

    include "../database.php";

    $data = json_decode(file_get_contents("php://input"), true);

    if (!$data || !isset($data["email"])) {
        echo json_encode([
            "success" => false,
            "message" => "Email is required"
        ]);
        exit;
    }

    $email = $data["email"];

    $sql = "SELECT 
               c.id,
               p.training_name,
               c.certificate_no,
               c.issued_date,
               c.expiry_date,
               c.file
               FROM certificates c
               LEFT JOIN training_assignments t ON t.id = c.training_id
               LEFT JOIN training_programs p ON p.id = t.program_id
               LEFT JOIN staff s ON s.id = t.staff_id
               WHERE s.email = ?
               ORDER BY c.id DESC;
    ";

    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $email);
    $stmt->execute();

    $result = $stmt->get_result();
    $certificates = [];

    while ($row = $result->fetch_assoc()) {
        $certificates[] = $row;
    }

    echo json_encode([
        "success" => true,
        "data" => $certificates
    ]);

    $conn->close();




?>