<?php


    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: *");
    header("Content-Type: application/json");

    include "../database.php";

    $sql = "SELECT * FROM users WHERE role = 'hr'";
    $result = mysqli_query($conn, $sql);

    $hr = [];

    while ($row = mysqli_fetch_assoc($result)) {
        $hr[] = $row;
    }

    echo json_encode([
        "success" => true,
        "data" => $hr
    ]);


?>