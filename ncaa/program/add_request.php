<?php



   session_start();


   header("Content-Type: application/json");
   header("Access-Control-Allow-Origin: http://localhost:5173");
   header("Access-Control-Allow-Credentials: true");
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


    if (!isset($_SESSION["user"])) {
        echo json_encode([
            "success" => false,
            "message" => "User is not logged in"
        ]);
        exit;
    }

    // $staff_id = $_SESSION["user"]["id"];
    $staff_id = $_SESSION["user"]["id"];


    $training_code = trim($data["trainingCode"]);
    $training_name = trim($data["trainingName"]);
    $description = trim($data["description"]);
    $duration = trim($data["duration"]);
    $category = trim($data["category"]);
    $type = trim($data["type"]);
    $validity = trim($data["validity"]);
    // $training_status = trim($data["status"]);
    $training_status = 'Active';
    $trainer = trim($data["trainer"]);
    $provider = trim($data["provider"]);
    $location = trim($data["location"]);
    $contact = trim($data["contactNo"]);
    $email = trim($data["email"]);

    $cost = trim($data["cost"]);
    $start_date = trim($data["start_date"]);
    $end_date = trim($data["end_date"]);
    $reason = trim($data["reason"]);

    $request_status = 'Pending';


    $sql = "INSERT INTO training_requests (
                    staff_id,
                    training_code,
                    training_name,
                    description,
                    duration,
                    category,
                    type,
                    validity,
                    training_status,
                    trainer,
                    provider,
                    location,
                    contact,
                    email,
                    cost,
                    start_date,
                    end_date,
                    reason,
                    request_status
                )
            VALUES
               (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
    ";

    $stmt = $conn->prepare($sql);

    if (!$stmt) {
        die(json_encode([
            "success" => false,
            "message" => $conn->error
        ]));
    }


    $stmt->bind_param("isssssssssssssdssss",
                       $staff_id,
                       $training_code,
                       $training_name,
                       $description,
                       $duration,
                       $category,
                       $type,
                       $validity,
                       $training_status,
                       $trainer,
                       $provider,
                       $location,
                       $contact,
                       $email,
                       $cost,
                       $start_date,
                       $end_date,
                       $reason,
                       $request_status
    );

    if ($stmt->execute()) {
        echo json_encode([
            "success" => true,
            "message" => "Training request added successfully"
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