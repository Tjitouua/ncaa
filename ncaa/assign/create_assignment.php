<?php


    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type");
    header("Content-Type: application/json");

    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        http_response_code(200);
        exit();
    }

    include "../database.php";
    require "../mail/emailer.php";

    $data = json_decode(file_get_contents("php://input"), true);

    if(!isset($data["staff_id"]) || !isset($data["program_ids"])) {
        echo json_encode([
            "success" => false,
            "message" => "Missing staff or trainings"
        ]);
        exit;
    }

    $staff_id = $data["staff_id"];
    $program_ids = $data["program_ids"];
    // $quarter = $data["quarter"] ?? "";



    if (empty($program_ids)) {
        echo json_encode([
            "success" => false,
            "message" => "No trainings selected"
        ]);
        exit;
    }





    $query = "SELECT first_name, email FROM staff WHERE id = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("i", $staff_id);
    $stmt->execute();


    $result = $stmt->get_result();
    $staff = $result->fetch_assoc();

    if (!$staff) {
        echo json_encode([
            "success" => false,
            "message" => "Staff member not found"
        ]);
        exit;
    }




    $sql = "INSERT INTO training_assignments (staff_id, program_id, assigned_date, status)
                   VALUES (?, ?, NOW(), ?)
           ";
    
    $stmt = $conn->prepare($sql);


    $notifSql = "INSERT INTO staff_notifications (staff_email, training_id, notification_type, title, message, status, sent_date)
                             VALUES (?, ?, ?, ?, ?, ?, NOW())
    ";

    $notifStmt = $conn->prepare($notifSql);


    foreach ($program_ids as $program_id) {
        // Get training 
        $programSql = "SELECT training_name, training_type, year, quarter, acceptance, reject_reason FROM training_programs WHERE id = ?";
        $programStmt = $conn->prepare($programSql);
        $programStmt->bind_param("i", $program_id);
        $programStmt->execute();

        $result = $programStmt->get_result();
        $program = $result->fetch_assoc();


        if (!$program) {
            continue;
        }


        $trainingName = $program["training_name"];
        $year = $program["year"];
        $quarter = $program["quarter"];
        $type = $program["training_type"];
        $acceptance = $program["acceptance"];
        $rejectReason = $program["reject_reason"];

        $assignment_status = ($acceptance === "Accepted") ? "Pending" : "Rejected";
        // $assignment_status = "Rejected";



        $checkSql = "SELECT
                       id
                       FROM training_assignments
                       WHERE staff_id = ?
                       AND program_id = ?
                       AND status IN ('Completed', 'Pending', 'Overdue', 'Rejected')
                       LIMIT 1
        ";
        $checkStmt = $conn->prepare($checkSql);
        $checkStmt->bind_param("ii", $staff_id, $program_id);
        $checkStmt->execute();


        $existing = $checkStmt->get_result();


        if ($existing->num_rows > 0) {
            continue;
        }



        $stmt->bind_param("iis",
                           $staff_id,
                           $program_id,
                           $assignment_status
        );



        $stmt->execute();

        $assignment_id = $conn->insert_id;


        $currentYear = date("Y");

        if ($year >= $currentYear) {
           $title = "New training assigned";
           $message = "You have been assigned $trainingName. The training runs/ran in the $quarter quarter of $year.";
        } else {
           $title = "Training record added";
           $message = "A training record for $trainingName has been added to your training history. The training was recorded for the $quarter quarter of $year.";
        }

        $status = "Unread";
        $notificationType = "Training Assignment";


        $notifStmt->bind_param("sissss",
                                $staff["email"],
                                $assignment_id,
                                $notificationType,
                                $title,
                                $message,
                                $status
        );


        $notifStmt->execute();

        if ($acceptance === "Accepted") {
            if ($year >= $currentYear) {
              sendAcceptedEmail(
                $staff["email"],
                $staff["first_name"],
                $trainingName,
                $quarter,
                $year
            );
            } else {
                sendHistoryEmail(
                    $staff["email"],
                    $staff["first_name"],
                    $trainingName,
                    $quarter,
                    $year
                );
            }
        } elseif ($acceptance === "Rejected") {
            sendRejectedEmail(
                $staff["email"],
                $staff["first_name"],
                $trainingName,
                $quarter,
                $year,
                $rejectReason
            );
        }

    }



    echo json_encode([
        "success" => true,
        "message" => "Assignment created"
    ]);









