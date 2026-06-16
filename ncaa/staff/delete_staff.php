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
            "message" => "Staff ID is required"
        ]);
        exit;
     }


     $id = $data["id"];

     $conn->begin_transaction();

     try {

        $mailSql = "SELECT email FROM staff WHERE id = ?;";
        $mailStmt = $conn->prepare($mailSql);
        $mailStmt->bind_param("i", $id);
        $mailStmt->execute();
        $result = $mailStmt->get_result();
        $staff = $result->fetch_assoc();

        if (!$staff) {
            throw new Exception("Staff not found");
        }

        $email = $staff["email"];

        $sql2 = "DELETE FROM users WHERE email = ?";
        $stmt2 = $conn->prepare($sql2);
        $stmt2->bind_param("s", $email);
        $stmt2->execute();


        $sql = "DELETE FROM staff WHERE id = ? OR email = ?;";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("is", $id, $email);
        $stmt->execute();

        $conn->commit();

        echo json_encode([
          "success" => true,
          "message" => "Staff deleted successfully"
        ]);
       

     } catch (Exception $e) {

        $conn->rollback();

        echo json_encode([
            "success" => false,
            "message" => $e->getMessage()
        ]);
     }

     $conn->close();




?>