<?php


    header("Content-Type: application/json");
    header("Access-Control-Allow-Origin: *");

    include "../database.php";

    $id = $_GET["id"] ?? null;

    if (!$id) {
        echo json_encode([
            "success" => false,
            "message" => "Training assignment is required"
        ]);
        exit;
    }


    $sql = "SELECT
              a.id,
              a.date_assigned,
              a.deadline,
              a.status,
              t.training_code,
              t.training_name,
              t.description,
              t.duration,
              t.category,
              t.trainer,
              t.training_type,
              t.location,
              t.contact_no,
              t.email,
              s.first_name,
              s.last_name,
              s.department,
              s.role AS position,
              c.certificate_no,
              c.issued_date,
              c.expiry_date,
              c.file
              FROM training_assignments a
              LEFT JOIN training_programs t ON t.id = a.program_id
              LEFT JOIN staff s ON s.id = a.staff_id
              LEFT JOIN certificates c ON c.training_id = a.id
              WHERE a.id = ?;
    ";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $id);
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
            "message" => "Training assignment not found"
        ]);
    }

    $stmt->close();
    $conn->close();




?>