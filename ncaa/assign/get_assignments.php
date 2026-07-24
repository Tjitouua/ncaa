<?php


     header("Access-Control-Allow-Origin: *");
     header("Access-Control-Allow-Headers: *");
     header("Content-Type: application/json");

     include "../database.php";

     $today = date("Y-m-d");

     $conn->query("
          UPDATE training_assignments
          SET status = 'Overdue'
          WHERE end_date < '$today'
          AND status != 'Completed';
     ");

     $sql = "SELECT
               a.id,
               s.first_name,
               s.last_name,
               s.email,
               t.training_name,
               a.type,
               t.duration,
               a.assigned_date,
               a.scheduled_date,
               a.end_date, 
               a.status
               FROM training_assignments a 
               LEFT JOIN staff s ON a.staff_id = s.id
               LEFT JOIN training_programs t ON a.program_id = t.id
               ORDER BY a.id DESC
     ";

     $result = mysqli_query($conn, $sql);

     $assignments = [];

     while ($row = mysqli_fetch_assoc($result)) {
        $assignments[] = $row;
     }

     echo json_encode([
        "success" => true,
        "data" => $assignments
     ])

     


?>