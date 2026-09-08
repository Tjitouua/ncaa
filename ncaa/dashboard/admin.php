<?php


     header("Access-Control-Allow-Origin: *");
     header("Access-Control-Allow-Headers: *");
     header("Content-Type: application/json");


     include "../database.php";

     $response = [];

    //  Staff 
    $staffSql = "SELECT COUNT(*) employees FROM staff;";
    $result = mysqli_query($conn, $staffSql);

    $response["employees"] = mysqli_fetch_assoc($result)["employees"];


    // Programs 
    $trainingsSql = "SELECT COUNT(*) trainings FROM training_programs;";
    $trainingResult = mysqli_query($conn, $trainingsSql);

    $response["trainings"] = mysqli_fetch_assoc($trainingResult)["trainings"];


    // Total Cost
    $totalCostSql = "SELECT COALESCE(SUM(tp.total_cost), 0) AS total_cost
                     FROM training_assignments ta
                     INNER JOIN training_programs tp ON tp.id = ta.program_id
                     WHERE ta.status = 'Completed'
    ";
    $totalCostResult = mysqli_query($conn, $totalCostSql);
    $response["total_cost"] = mysqli_fetch_assoc($totalCostResult)["total_cost"];


    // Rejected 
    $overdueSql = "SELECT COUNT(*) rejected FROM training_assignments WHERE status = 'Rejected';";
    $overdueResult = mysqli_query($conn, $overdueSql);

    $response["rejected"] = mysqli_fetch_assoc($overdueResult)["rejected"];



    // Pending
    $overdueSql = "SELECT COUNT(*) pending FROM training_assignments WHERE status = 'Pending';";
    $overdueResult = mysqli_query($conn, $overdueSql);

    $response["pending"] = mysqli_fetch_assoc($overdueResult)["pending"];

    
    // Certs Alerts 
    $alertsSql = "SELECT COUNT(*) alerts FROM admin_notifications WHERE status = 'Unread'";
    $alertsResult = mysqli_query($conn, $alertsSql);

    $response["alerts"] = mysqli_fetch_assoc($alertsResult)["alerts"];

    echo json_encode([
        "success" => true,
        "stats" => $response
    ]);





?>