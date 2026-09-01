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


    $training_name = trim($data["training_name"]);
    $reason = trim($data["reason"]);
    $duration = trim($data["duration"]);
    $category = trim($data["category"]);
    $training_type = trim($data["training_type"]);
    $method = trim($data["method"]);
    $validity = trim($data["validity"]);
    $provider = trim($data["provider"]);
    $trainer = trim($data["trainer"]);
    $trainer_status = trim($data["trainer_status"]);
    $location = trim($data["location"]);
    $contact_no = trim($data["contact_no"]);
    $email = trim($data["email"]);
    $training_cost = (float)($data["training_cost"] ?: 0);
    $accommodation_cost = (float)($data["accommodation_cost"] ?: 0);
    $snt_cost = (float)($data["snt_cost"] ?: 0);
    $flight_cost = (float)($data["flight_cost"] ?: 0);
    $other_costs = (float)($data["other_costs"] ?: 0);
    $approved = trim($data["approved"]);
    $region = trim($data["region"]);
    $acceptance = trim($data["acceptance"]);
    $year = trim($data["year"]);
    $quarter = trim($data["quarter"]);
    $start_date = trim($data["start_date"]) !== "" ? trim($data["start_date"]) : NULL;
    $end_date = trim($data["end_date"]) !== "" ? trim($data["end_date"]) : NULL;

    $total_cost = $training_cost + $accommodation_cost + $snt_cost + $flight_cost + $other_costs;


    $sql = "
        UPDATE training_programs SET
              training_name = ?,
              reason = ?,
              duration = ?,
              category = ?,
              training_type = ?,
              method = ?,
              validity = ?,
              provider = ?,
              trainer = ?,
              trainer_status = ?,
              location = ?,
              contact_no = ?,
              email = ?,
              training_cost = ?,
              accommodation_cost = ?,
              snt_cost = ?,
              flight_cost = ?,
              other_costs = ?,
              total_cost = ?,
              approved = ?,
              year = ?,
              quarter = ?,
              start_date = ?,
              end_date = ?,
              region = ?,
              acceptance = ?
        WHERE id = ?;
    ";


    $stmt = $conn->prepare($sql);

    $stmt->bind_param(
        "sssssssssssssddddddsiissssi",
        $training_name,
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