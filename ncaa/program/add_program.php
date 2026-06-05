<?php

    header("Content-Type: application/json");
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: POST");
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


    $trainingCode = trim($data["trainingCode"]);
    $trainingName = trim($data["trainingName"]);
    $desc = trim($data["desc"]);
    $duration = trim($data["duration"]);
    $category = trim($data["category"]);
    $trainer = trim($data["trainer_provider"]);
    $training_type = trim($data["trainingType"]);
    $validity = trim($data["validity"]);
    $status = trim($data["status"]);
    $target_roles = trim($data["targetRole"]);
    $start_date = trim($data["startDate"]);
    $end_date = trim($data["endDate"]);
    $recurrence = trim($data["recurrence"]);
    $location = trim($data["location"]);
    $contact_no = trim($data["contactNo"]);
    $email = trim($data["email"]);


    $sql = "
         INSERT INTO training_programs (
            training_code,
            training_name,
            description,
            duration,
            category,
            trainer,
            training_type,
            validity,
            status,
            target_roles,
            start_date,
            end_date,
            recurrence,
            location,
            contact_no,
            email
         )
         VALUES (
            ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
         );
    ";

    $stmt = $conn->prepare($sql);

    $stmt->bind_param(
        "ssssssssssssssss",
        $trainingCode,
        $trainingName,
        $desc,
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
        $email
    );


    if ($stmt->execute()) {
        echo json_encode([
            "success" => true,
            "message" => "Training program added successfully"
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