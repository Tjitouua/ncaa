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
    $type = trim($data["type"]);
    $validity = trim($data["validity"]);
    $status = trim($data["status"]);
    $trainer = trim($data["trainer"]);
    $provider = trim($data["provider"]);
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
            type,
            validity,
            status,
            trainer,
            provider,
            location,
            contact_no,
            email
         )
         VALUES (
            ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
         );
    ";

    $stmt = $conn->prepare($sql);

    $stmt->bind_param(
        "sssssssssssss",
        $trainingCode,
        $trainingName,
        $desc,
        $duration,
        $category,
        $type,
        $validity,
        $status,
        $trainer,
        $provider,
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