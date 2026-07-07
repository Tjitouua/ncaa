<?php



    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");
    header("Content-Type: application/json");

    include "../database.php";
    require "../mail/training_status_email.php";

    $data = json_decode(file_get_contents("php://input"), true);

    if (!isset($data["id"]) || !isset($data["status"])) {
        echo json_encode([
            "success" => false,
            "message" => "Missing id or status"
        ]);
        exit;
    }


    $id = $data["id"];
    $status = $data["status"];


    $sql = "UPDATE training_assignments SET status = ? WHERE id = ?;";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("si", $status, $id);

    if ($stmt->execute()) {



        $sql2 = "SELECT
             s.email,
             s.first_name,
             p.training_name
             FROM training_assignments t
             LEFT JOIN staff s ON s.id = t.staff_id
             LEFT JOIN training_programs p ON p.id = t.program_id
             WHERE t.id = ?;
    ";

    $stmt2 = $conn->prepare($sql2);
    $stmt2->bind_param("i", $id);
    $stmt2->execute();

    $result = $stmt2->get_result();
    $staff = $result->fetch_assoc();

    if($staff) {
        sendTrainingStatusEmail(
            $staff["email"],
            $staff["first_name"],
            $staff["training_name"],
            $status
        );
    }


        echo json_encode([
            "success" => true,
            "message" => "Status updated successfully"
        ]);
    } else {
        echo json_encode([
            "success" => false,
            "message" => "Failed to update status"
        ]);
    }




    $stmt->close();
    $conn->close();




?>