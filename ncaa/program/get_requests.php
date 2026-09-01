<?php



    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: *");
    header("Content-Type: application/json");


    include "../database.php";

    $sql = "SELECT * FROM training_requests WHERE request_status = 'Pending'";
    $result = mysqli_query($conn, $sql);

    $trainingRequests = [];

    while ($row = mysqli_fetch_assoc($result)) {
        $trainingRequests[] = $row;
    }

    echo json_encode([
        "success" => true,
        "data" => $trainingRequests
    ]);




?>