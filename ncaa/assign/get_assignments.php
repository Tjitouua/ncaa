<?php


     header("Access-Control-Allow-Origin: *");
     header("Access-Control-Allow-Headers: *");
     header("Content-Type: application/json");

     include "../database.php";

     $today = date("Y-m-d");

     $conn->query("
          UPDATE training_assignments
          SET status = 'Overdue'
          WHERE deadline < '$today'
          AND status != 'Completed';
     ");

     $sql = "SELECT
               a.id,
               s.first_name,
               s.last_name,
               s.email,
               t.training_name,
               t.duration,
               a.date_assigned,
               a.deadline, 
               a.status
               FROM training_assignments a 
               LEFT JOIN staff s ON a.staff_id = s.id
               LEFT JOIN training_programs t ON a.program_id = t.id
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