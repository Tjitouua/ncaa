<?php



     header("Content-Type: application/json");
     header("Access-Control-Allow-Origin: *");
     header("Access-Control-Allow-Methods: POST, DELETE");
     header("Access-Control-Allow-Headers: Content-Type");


     include "../database.php";

     $data = json_decode(file_get_contents("php://input"), true);

     if (!isset($data["id"])) {
        echo json_encode([
            "success" => false,
            "message" => "HR id is required"
        ]);
        exit;
     }


     $id = $data["id"];


     try {
        $sql = "DELETE FROM users WHERE id = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("i", $id);

        if ($stmt->execute()) {
            echo json_encode([
                "success" => true,
                "message" => "HR member deleted successfully"
            ]);
        } else {
            echo json_encode([
                "success" => false,
                "message" => "Failed to delete HR member"
            ]);
        }

        $stmt->close();
        $conn->close();
     } catch (Exception $e) {
        echo json_encode([
            "success" => false,
            "message" => $e->getMessage()
        ]);
     }





?>