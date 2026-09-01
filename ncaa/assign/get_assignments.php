<?php


     header("Access-Control-Allow-Origin: *");
     header("Access-Control-Allow-Headers: *");
     header("Content-Type: application/json");

     include "../database.php";

     $today = date("Y-m-d");

     $conn->query("
          UPDATE training_assignments
          SET status = 'Pending'
          WHERE status != 'Completed';
     ");

     $sql = "SELECT
               s.*,
               a.*,
               t.training_name,
               t.reason,
               t.duration,
               t.category,
               t.training_type,
               t.method,
               t.validity,
               t.provider,
               t.trainer,
               t.trainer_status,
               t.location,
               t.contact_no,
               t.email,
               t.training_cost,
               t.accommodation_cost,
               t.snt_cost,
               t.flight_cost,
               t.other_costs,
               t.total_cost,
               t.approved,
               t.year,
               t.quarter,
               t.start_date,
               t.end_date,
               t.region,
               t.acceptance
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