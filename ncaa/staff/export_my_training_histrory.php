<?php




    include "../database.php";


    $email = $_GET["email"];
    $status = $_GET["status"];

    if (!$email) {
        echo json_encode([
            "success" => false,
            "message" => "Email is required"
        ]);
        exit;
    }


    // Staff details 
    $sql = "SELECT id, first_name, last_name FROM staff WHERE email = ?";
    $stmt = $conn->prepare($sql);

    $stmt->bind_param("s", $email);

    if (!$stmt->execute()) {
        echo json_encode([
            "success" => false,
            "message" => "Failed to get staff details"
        ]);
        exit;
    }


    $result = $stmt->get_result();

    if ($result->num_rows === 0) {
        echo json_encode([
            "success" => false,
            "message" => "Staff member not found"
        ]);
        exit;
    }


    $staff = $result->fetch_assoc();

    $staff_id = $staff["id"];
    $first_name = strtolower($staff["first_name"]);
    $last_name = strtolower($staff["last_name"]);


    $filename = "training_history_" . $first_name . "_" . $last_name . ".csv";





    header('Content-Type: text/csv; charset=utf-8');
    header('Content-Disposition: attachment; filename="' . $filename . '"');

    $output = fopen("php://output", "w");


    // Training History 
    if ($status === "All Statuses") {
    $query = "SELECT
                t.*,
                a.status
                FROM training_assignments a
                LEFT JOIN training_programs t ON t.id = a.program_id
                WHERE a.staff_id = ?
                ORDER BY a.id DESC
    ";

    $stmt2 = $conn->prepare($query);
    $stmt2->bind_param("i", $staff_id);

    } else {
        $query = "SELECT
                t.*,
                a.status
                FROM training_assignments a
                LEFT JOIN training_programs t ON t.id = a.program_id
                WHERE a.staff_id = ?
                AND a.status = ?
                ORDER BY a.id DESC";

        $stmt2 = $conn->prepare($query);
        $stmt2->bind_param("is", $staff_id, $status);
    };



    if (!$stmt2->execute()) {
        echo json_encode([
            "success" => false,
            "message" => "Execution failed"
        ]);
        exit;
    }


    $result2 = $stmt2->get_result();


    $fields = $result2->fetch_fields();

    $headers = [];

    foreach($fields as $field) {
        $headers[] = $field->name;
    }


    fputcsv($output, $headers);

    while ($row = $result2->fetch_row()) {
        fputcsv($output, $row);
    }

    fclose($output);

    $conn->close();

    exit;









?>