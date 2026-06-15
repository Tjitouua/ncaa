<?php


    include "../database.php";

    header('Content-Type: text/csv; charset=utf-8');
    header('Content-Disposition: attachment; filename=ncaa_training_records.csv');

    $output = fopen("php://output", "w");

    fputcsv($output, [
        "First Name",
        "Last Name",
        "Training Name",
        "Duration", 
        "Date Assigned",
        "Deadline",
        "Status"
    ]);


    $sql = "
        SELECT
               a.id,
               s.first_name,
               s.last_name,
               t.training_name,
               t.duration,
               a.date_assigned,
               a.deadline, 
               a.status
               FROM training_assignments a 
               LEFT JOIN staff s ON a.staff_id = s.id
               LEFT JOIN training_programs t ON a.program_id = t.id
    ";
    $result = $conn->query($sql);

    while ($row = $result->fetch_assoc()) {
        fputcsv($output, [
            $row["first_name"],
            $row["last_name"],
            $row["training_name"],
            $row["duration"],
            $row["date_assigned"],
            $row["deadline"],
            $row["status"]
        ]);
    } 

    fclose($output);
    $conn->close();
    exit;


?>