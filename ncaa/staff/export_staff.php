<?php

   
   include "../database.php";


    header('Content-Type: text/csv; charset=utf-8');
    header('Content-Disposition: attachment; filename=staff_export.csv');

    $output = fopen("php://output", "w");

    fputcsv($output, [
        "Staff ID",
        "Staff Name",
        "Last Name",
        "Gender",
        "Role",
        "Department"
    ]);


    $sql = "SELECT * FROM staff ORDER BY id ASC";
    $result = $conn->query($sql);

    while ($row = $result->fetch_assoc()) {
      fputcsv($output, [
         $row["staff_id"],
         $row["first_name"],
         $row["last_name"],
         $row["gender"],
         $row["role"],
         $row["department"]
      ]);
    }

    fclose($output);
    $conn->close();
    exit;


?>