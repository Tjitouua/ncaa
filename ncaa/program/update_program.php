<?php


    header("Content-Type: application/json");
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type");

    include "../database.php";

    $data = json_decode(file_get_contents("php://input"), true);

    if (!$data) {
        echo json_encode([
           "success" => false,
           "message" => "No data received"
        ]);
        exit;
    }


    $id = $data["id"] ?? null;

    if (!$id) {
        echo json_encode([
            "success" => false,
            "message" => "Program ID required"
        ]);
        exit;
    }


    $training_code = trim($data["training_code"]);
    $training_name = trim($data["training_name"]);
    $description = trim($data["description"]);
    $duration = trim($data["duration"]);
    $category = trim($data["category"]);
    $trainer = trim($data["trainer"]);
    $training_type = trim($data["training_type"]);
    $validity = trim($data["validity"]);
    $status = trim($data["status"]);
    $target_roles = trim($data["target_roles"]);
    $start_date = trim($data["start_date"]);
    $end_date = trim($data["end_date"]);
    $recurrence = trim($data["recurrence"]);
    $location = trim($data["location"]);
    $contact_no = trim($data["contact_no"]);
    $email = trim($data["email"]);


    $sql = "
        UPDATE training_programs SET
              training_code = ?,
              training_name = ?,
              description = ?,
              duration = ?,
              category = ?,
              trainer = ?,
              training_type = ?,
              validity = ?,
              status = ?,
              target_roles = ?,
              start_date = ?,
              end_date = ?,
              recurrence = ?,
              location = ?,
              contact_no = ?,
              email = ?
        WHERE id = ?;
    ";


    $stmt = $conn->prepare($sql);

    $stmt->bind_param(
        "ssssssssssssssssi",
        $training_code,
        $training_name,
        $description,
        $duration,
        $category,
        $trainer,
        $training_type,
        $validity,
        $status,
        $target_roles,
        $start_date,
        $end_date,
        $recurrence,
        $location,
        $contact_no,
        $email,
        $id
    );


    if ($stmt->execute()) {
        echo json_encode([
            "success" => true,
            "message" => "Training updated successfully"
        ]);
    } else {
        echo json_encode([
            "success" => false,
            "message" => $stmt->error
        ]);
    }


    $stmt->close();
    $conn->close();



?>