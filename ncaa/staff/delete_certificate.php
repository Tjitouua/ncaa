<?php


    session_start();


    header("Content-Type: application/json");
    header("Access-Control-Allow-Origin: http://localhost:5173");
    header("Access-Control-Allow-Credentials: true");
    header("Access-Control-Allow-Methods: POST");
    header("Access-Control-Allow-Headers: Content-Type");


    include "../database.php";


    if (!isset($_SESSION["user"])) {
        echo json_encode([
            "success" => false,
            "message" => "User is not logged in"
        ]);
        exit;
    }


    if ($_SERVER["REQUEST_METHOD"] !== "POST") {
        echo json_encode([
            "success" => false,
            "message" => "Invalid request method"
        ]);
        exit;
    }


    $training_id = $_POST["training_id"] ?? null;


    if (!$training_id) {
        echo json_encode([
            "success" => false,
            "message" => "Missing Training ID"
        ]);
        exit;
    }



    // Getting certificate 
    $sql = "SELECT id, file
            FROM certificates WHERE training_id = ?
    ";

    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $training_id);
    $stmt->execute();

    $result = $stmt->get_result();
    $certificate = $result->fetch_assoc();

    $stmt->close();


    if (!$certificate) {
        echo json_encode([
            "success" => false,
            "message" => "Certificate not found"
        ]);
        exit;
    }


    // Delete from database 
    $deleteSql = "DELETE FROM certificates WHERE training_id = ?";
    $deleteStmt = $conn->prepare($deleteSql);
    $deleteStmt->bind_param("i", $training_id);

    if (!$deleteStmt->execute()) {
        echo json_encode([
            "success" => false,
            "message" => "Failed to delete certificate"
        ]);
        $deleteStmt->close();
        exit;
    }


    $deleteStmt->close();



    // Delete notification 
    $notifSql = "DELETE FROM admin_notifications WHERE training_id = ? AND title = 'New certificate upload'";
    $notifStmt = $conn->prepare($notifSql);
    $notifStmt->bind_param("i", $training_id);
    $notifStmt->execute();

    $notifStmt->close();


    // Delete the file 
    $filePath = $certificate["file"];

    if (file_exists($filePath)) {
        unlink($filePath);
    }

    echo json_encode([
        "success" => true,
        "message" => "Certificate deleted successfully"
    ]);








?>