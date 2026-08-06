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


    // Pending 
    $pendingSql = "SELECT COUNT(*) pending FROM training_assignments WHERE status = 'Pending';";
    $pendingResult = mysqli_query($conn, $pendingSql);

    $response["pending"] = mysqli_fetch_assoc($pendingResult)["pending"];


    // Overdue 
    $overdueSql = "SELECT COUNT(*) overdue FROM training_assignments WHERE status = 'Overdue';";
    $overdueResult = mysqli_query($conn, $overdueSql);

    $response["overdue"] = mysqli_fetch_assoc($overdueResult)["overdue"];

    
    // Certs Alerts 
    $alertsSql = "SELECT COUNT(*) alerts FROM admin_notifications WHERE status = 'Unread'";
    $alertsResult = mysqli_query($conn, $alertsSql);

    $response["alerts"] = mysqli_fetch_assoc($alertsResult)["alerts"];

    echo json_encode([
        "success" => true,
        "stats" => $response
    ]);





?>