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

    // $staff_ids = $data["staff_ids"];
    $assignments = $data["assignments"];
    $program_id = $data["program_id"];
    $scheduled_date = $data["scheduled_date"];
    $end_date = $data["end_date"];
    // $type = $data["type"];

    $response = ["success" => false];

    if (!$assignments || !$program_id) {
        echo json_encode($response);
        exit;
    }





    $query = "SELECT training_name from training_programs WHERE id = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("i", $program_id);
    $stmt->execute();

    $result = $stmt->get_result();
    $program = $result->fetch_assoc();

    $trainingName = $program["training_name"];


    $sql = "
         INSERT INTO training_assignments (staff_id, program_id, assigned_date, scheduled_date, end_date, type, status)
           VALUES (
               ?,
               ?,
               NOW(),
               ?,
               ?,
               ?,
               'Pending'
           );
    ";


    $stmt = $conn->prepare($sql);

    $notifSql = "INSERT INTO staff_notifications (staff_email, training_id, title, message, status, sent_date)
                 VALUES (?, ?, ?, ?, ?, NOW());
    ";

    $NotifStmt = $conn->prepare($notifSql);
    
    foreach ($assignments as $assignment) {

        $staff_id = $assignment["staff_id"];
        $type = $assignment["type"];


        
        $query2 = "SELECT first_name, email FROM staff WHERE id = ?;";
        $stmt2 = $conn->prepare($query2);
        $stmt2->bind_param("i", $staff_id);
        $stmt2->execute();

        $result2 = $stmt2->get_result();
        $staff = $result2->fetch_assoc();

        if (!$staff) continue;




        $checkAssignment = "SELECT
                            id,
                            status
                            FROM training_assignments
                            WHERE staff_id = ?
                            AND program_id = ?
                            AND status != 'Completed';
        ";

        $checkStmt = $conn->prepare($checkAssignment);
        $checkStmt->bind_param("ii", $staff_id, $program_id);
        $checkStmt->execute();

        $existing = $checkStmt->get_result();

        if ($existing->num_rows > 0) {
            continue;
        };





        $stmt->bind_param("iisss", $staff_id, $program_id, $scheduled_date, $end_date, $type);
        $stmt->execute();


        $assignment_id = $conn->insert_id;



        $title = "New training assigned";
        // $formatted_date = date("d F Y", strtotime($deadline));
        $formatted_start = date("d F Y", strtotime($scheduled_date));
        $formatted_end = date("d F Y", strtotime($end_date));
        $message = "You have been assigned $trainingName. The training runs from $formatted_start to $formatted_end.";
        $status = "Unread";

        


        sendAssignmentEmail(
            $staff["email"],
            $staff["first_name"],
            $trainingName,
            $formatted_start,
            $formatted_end
        );




        $NotifStmt->bind_param("sisss", $staff["email"], $assignment_id, $title, $message, $status);
        $NotifStmt->execute();


        



    };

    $response["success"] = true;
    echo json_encode($response);


?>