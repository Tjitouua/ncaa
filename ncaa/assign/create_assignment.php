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

    $staff_ids = $data["staff_ids"];
    $program_id = $data["program_id"];
    $date_assigned = $data["date_assigned"];
    $deadline = $data["deadline"];

    $response = ["success" => false];

    if (!$staff_ids || !$program_id) {
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
         INSERT INTO training_assignments (staff_id, program_id, date_assigned, deadline, status)
           VALUES (
               ?,
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
    
    foreach ($staff_ids as $staff_id) {


        
        $query2 = "SELECT first_name, email FROM staff WHERE id = ?;";
        $stmt2 = $conn->prepare($query2);
        $stmt2->bind_param("i", $staff_id);
        $stmt2->execute();

        $result2 = $stmt2->get_result();
        $staff = $result2->fetch_assoc();

        if (!$staff) continue;




        $stmt->bind_param("iiss", $staff_id, $program_id, $date_assigned, $deadline);
        $stmt->execute();


        $title = "New training assigned";
        $formatted_date = date("d F Y", strtotime($deadline));
        $message = "You have been assigned $trainingName. Complete it before $formatted_date";
        $status = "Unread";

        $NotifStmt->bind_param("sisss", $staff["email"], $program_id, $title, $message, $status);
        $NotifStmt->execute();


        sendAssignmentEmail(
            $staff["email"],
            $staff["first_name"],
            $trainingName,
            $deadline
        );



    };

    $response["success"] = true;
    echo json_encode($response);


?>