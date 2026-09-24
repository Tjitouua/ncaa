<?php



     header("Access-Control-Allow-Origin: *");
     header("Access-Control-Allow-Headers: *");
     header("Access-Control-Allow-Methods: POST");
     header("Content-Type: application/json");

     include "../../database.php";

     $notification_id = $_POST["notification_id"] ?? null;

     if (!$notification_id) {
        echo json_encode([
            "success" => false,
            "message" => "Notification ID is required"
        ]);
        exit;
     }

     $sql = "UPDATE
             admin_notifications
             SET status = 'Read'
             WHERE id = ?
             AND status = 'Unread'
     ";

     $stmt = $conn->prepare($sql);
     $stmt->bind_param("i", $notification_id);

     if ($stmt->execute()) {
        echo json_encode([
            "success" => true,
            "message" => "Notification marked as read"
        ]);
        exit;
     } else {
        echo json_encode([
            "success" => false,
            "message" => "Failed to mark notification as read"
        ]);
     }


     $stmt->close();
     $conn->close();




?>