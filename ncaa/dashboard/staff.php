<?php


    session_start();


    header("Content-Type: application/json");
    header("Access-Control-Allow-Origin: http://localhost:5173");
    header("Access-Control-Allow-Credentials: true");
    header("Access-Control-Allow-Headers: Content-Type");


    include "../database.php";

    if (!isset($_SESSION["user"])) {
        echo json_encode([
            "success" => false,
            "message" => "Not logged in"
        ]);
        exit;
    }

    $email = $_SESSION["user"]["email"];

    $response = [];

    // My Trainings 
    $trainingsSql = "SELECT COUNT(*) AS trainings
                     FROM training_assignments ta
                     INNER JOIN staff s ON s.id = ta.staff_id
                     WHERE s.email = ?
    ";

    $trainingsStmt = $conn->prepare($trainingsSql);
    $trainingsStmt->bind_param("s", $email);
    $trainingsStmt->execute();
    $result = $trainingsStmt->get_result();

    $response["trainings"] = mysqli_fetch_assoc($result)["trainings"];


    // Completed 
    $completedSql = "SELECT COUNT(*) AS completed
                     FROM training_assignments ta
                     INNER JOIN staff s ON s.id = ta.staff_id
                     WHERE s.email = ?
                     AND ta.status = 'Completed'
    ";

    $completedStmt = $conn->prepare($completedSql);
    $completedStmt->bind_param("s", $email);
    $completedStmt->execute();
    $result = $completedStmt->get_result();

    $response["completed"] = mysqli_fetch_assoc($result)["completed"];



    // Pending
    $pendingSql = "SELECT COUNT(*) AS pending
                     FROM training_assignments ta
                     INNER JOIN staff s ON s.id = ta.staff_id
                     WHERE s.email = ?
                     AND ta.status = 'Pending'
    ";

    $pendingStmt = $conn->prepare($pendingSql);
    $pendingStmt->bind_param("s", $email);
    $pendingStmt->execute();
    $result = $pendingStmt->get_result();

    $response["pending"] = mysqli_fetch_assoc($result)["pending"];




    // Rejected
    $rejectedSql = "SELECT COUNT(*) AS rejected
                     FROM training_assignments ta
                     INNER JOIN staff s ON s.id = ta.staff_id
                     WHERE s.email = ?
                     AND ta.status = 'Rejected'
    ";

    $rejectedStmt = $conn->prepare($rejectedSql);
    $rejectedStmt->bind_param("s", $email);
    $rejectedStmt->execute();
    $result = $rejectedStmt->get_result();

    $response["rejected"] = mysqli_fetch_assoc($result)["rejected"];




    echo json_encode([
        "success" => true,
        "stats" => $response
    ]);



?>