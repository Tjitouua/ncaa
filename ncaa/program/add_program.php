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


    $staff_id = (int)$data["staff_id"];
    $trainingName = trim($data["trainingName"]);
    $reason = trim($data["reason"]);
    $duration = trim($data["duration"]);
    $category = trim($data["category"]);
    $training_type = trim($data["trainingType"]);
    $method = trim($data["method"]);
    $validity = trim($data["validity"]);
    $provider = trim($data["provider"]);
    $trainer = trim($data["trainer"]);
    $trainer_status = trim($data["trainerStatus"]);
    $location = trim($data["location"]);
    $contact_no = trim($data["contactNo"]) !== "" ? trim($data["contactNo"]) : NULL;
    $email = trim($data["email"]) !== "" ? trim($data["email"]) : NULL;
    $training_cost = (float)($data["trainingCost"] ?: 0);
    $accommodation_cost = (float)($data["accommodationCost"] ?: 0);
    $snt_cost = (float)($data["sntCost"] ?: 0);
    $flight_cost = (float)($data["flightCost"] ?: 0);
    $other_costs = (float)($data["otherCosts"] ?: 0);
    $approved = trim($data["approved"]);
    $region = trim($data["region"]);
    $acceptance = trim($data["acceptance"]);
    $year = trim($data["year"]);
    $quarter = trim($data["quarter"]);
    $start_date = trim($data["start_date"]) !== "" ? trim($data["start_date"]) : NULL;
    $end_date = trim($data["end_date"]) !== "" ? trim($data["end_date"]) : NULL;
   

    $total_cost = $training_cost + $accommodation_cost + $snt_cost + $flight_cost + $other_costs;


    $sql = "
         INSERT INTO training_programs (
            staff_id,
            training_name,
            reason,
            duration,
            category,
            training_type,
            method,
            validity,
            provider,
            trainer,
            trainer_status,
            location,
            contact_no,
            email,
            training_cost,
            accommodation_cost,
            snt_cost,
            flight_cost,
            other_costs,
            total_cost,
            approved,
            year,
            quarter,
            start_date,
            end_date,
            region,
            acceptance
         )
         VALUES (
            ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
         );
    ";

    $stmt = $conn->prepare($sql);

    $stmt->bind_param(
        "isssssssssssssddddddsiissss",
        $staff_id,
        $trainingName,
        $reason,
        $duration,
        $category,
        $training_type,
        $method,
        $validity,
        $provider,
        $trainer,
        $trainer_status,
        $location,
        $contact_no,
        $email,
        $training_cost,
        $accommodation_cost,
        $snt_cost,
        $flight_cost,
        $other_costs,
        $total_cost,
        $approved,
        $year,
        $quarter,
        $start_date,
        $end_date,
        $region,
        $acceptance,
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