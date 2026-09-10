<?php


     include "../database.php";




     $staff_id = $_GET["staff_id"];
     $year = $_GET["year"];

     if (!$staff_id || !$year) {
       echo json_encode([
         "success" => false,
         "message" => "Staff ID and year are required"
       ]);
       exit;
     }



     $staff_sql = "SELECT first_name, last_name FROM staff WHERE id = ?";
     $staff_stmt = $conn->prepare($staff_sql);

     $staff_stmt->bind_param("i", $staff_id);

     if (!$staff_stmt->execute()) {
        echo json_encode([
           "success" => false,
           "message" => "Failed to get staff details"
        ]);
        exit;
     }


     $staff_result = $staff_stmt->get_result();

     if ($staff_result->num_rows === 0) {
        echo json_encode([
           "success" => false,
           "message" => "Staff member not found"
        ]);
        exit;
     }


     $staff = $staff_result->fetch_assoc();

     $first_name = strtolower($staff["first_name"]);
     $last_name = strtolower($staff["last_name"]);

     $filename = "training_plan_" . $first_name . "_" . $last_name . "_" . $year . ".csv";









     header('Content-Type: text/csv; charset=utf-8');
     header('Content-Disposition: attachment; filename="' . $filename . '"');

     $output = fopen("php://output", "w");






     $sql = "SELECT * FROM training_programs WHERE staff_id = ? and year = ? ORDER BY id ASC";
     $stmt = $conn->prepare($sql);

     $stmt->bind_param("ii", $staff_id, $year);

     if (!$stmt->execute()) {
        echo json_encode([
           "success" => false,
           "message" => "Execution failed"
        ]);
        exit;
     }

     $result = $stmt->get_result();


     $fields = $result->fetch_fields();

     $headers = [];

     foreach ($fields as $field) {
        $headers[] = $field->name;
     }

     fputcsv($output, $headers);

     while ($row = $result->fetch_assoc()) {
        fputcsv($output, $row);
     }

     fclose($output);

     $conn->close();

     exit;






?>