<?php



    header("Content-Type: application/json");
    header("Access-Control-Allow-Origin: *");

    include "../database.php";

    $year = $_GET["year"] ?? "";

    $sql = "SELECT
               tp.quarter AS quarter,
               COALESCE(SUM(tp.accommodation_cost), 0) AS accommodation,
               COALESCE(SUM(tp.flight_cost), 0) AS travel,
               COALESCE(SUM(tp.snt_cost), 0) AS snt,
               COALESCE(SUM(tp.training_cost), 0) AS training,
               COALESCE(SUM(tp.other_costs), 0) AS others,
               COALESCE(SUM(tp.total_cost), 0) AS total
               FROM training_assignments ta
               INNER JOIN training_programs tp ON tp.id = ta.program_id
               WHERE ta.status = 'Completed'
    ";

if ($year !== "") {
    $sql .= " AND tp.year = ?";
  }

  $sql .= " GROUP BY tp.quarter
            ORDER BY tp.quarter
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
            "quarter" => "Quarter " . $row["quarter"],
            "accommodation" => (float)$row["accommodation"],
            "travel" => (float)$row["travel"],
            "snt" => (float)$row["snt"],
            "training" => (float)$row["training"],
            "others" => (float)$row["others"],
            "total" => (float)$row["total"]
        ];
    }

    echo json_encode([
        "success" => true,
        "data" => $data
    ]);







?>