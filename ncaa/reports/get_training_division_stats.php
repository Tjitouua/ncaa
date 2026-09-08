<?php




     header("Content-Type: application/json");
     header("Access-Control-Allow-Origin: *");

     include "../database.php";

     $year = $_GET["year"] ?? "";

     $sql = "SELECT
                s.division AS name,
                COUNT(ta.id) AS trainings,
                COUNT(DISTINCT ta.staff_id) AS staff,
                COALESCE(SUM(tp.total_cost), 0) AS cost
                FROM training_assignments ta
                INNER JOIN staff s ON s.id = ta.staff_id
                INNER JOIN training_programs tp ON tp.id = ta.program_id
                WHERE ta.status = 'Completed'
     ";

    if ($year !== "") {
       $sql .= " AND tp.year = ?";
    }

   $sql .= " GROUP BY s.division 
             ORDER BY s.division
   ";

     $stmt = $conn->prepare($sql);

     if ($year !== "") {
       $stmt->bind_param("i", $year);
     }


     $stmt->execute();

     $result = $stmt->get_result();

     $data = [];

     while ($row = $result->fetch_assoc()) {
        $data[] = [
            "name" => $row["name"],
            "trainings" => (int)$row["trainings"],
            "staff" => (int)$row["staff"],
            "cost" => (float)$row["cost"]
        ];
     }



     echo json_encode([
        "success" => true,
        "data" => $data
     ]);





?>