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
              a.assigned_date,
              a.status,
              t.training_name,
              t.reason,
              t.duration,
              t.category,
              t.training_type,
              t.method,
              t.validity,
              t.provider,
              t.trainer,
              t.trainer_status,
              t.location,
              t.contact_no,
              t.email,
              t.training_cost,
              t.accommodation_cost,
              t.snt_cost,
              t.flight_cost,
              t.other_costs,
              t.total_cost,
              t.approved,
              t.year,
              t.quarter,
              t.start_date,
              t.end_date,
              t.region,
              t.acceptance,
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