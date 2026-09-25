<?php




    session_start();

    header("Content-Type: application/json");
    header("Access-Control-Allow-Origin: http://localhost:5173");
    header("Access-Control-Allow-Credentials: true");
    header("Access-Control-Allow-Methods: POST");
    header("Access-Control-Allow-Headers: Content-Type");


    include "../database.php";


    if ($_SERVER["REQUEST_METHOD"] !== "POST") {
        echo json_encode([
            "success" => false,
            "message" => "Invalid request method"
        ]);
        exit;
    }


    $data = json_decode(file_get_contents("php://input"), true);

    $email = $data["email"] ?? "";
    $password = $data["password"] ?? "";


    if (!$email || !$password) {
        echo json_encode([
            "success" => false,
            "message" => "Email and Password are required"
        ]);
        exit;
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode([
            "success" => false,
            "message" => "Please enter a valid email"
        ]);
        exit;
    }




    $staffSql = "SELECT id FROM users WHERE email = ?";

    $staffStmt = $conn->prepare($staffSql);
    $staffStmt->bind_param("s", $email);
    $staffStmt->execute();

    $staffResult = $staffStmt->get_result();
    $staffExists = $staffResult->fetch_assoc();

    $staffStmt->close();

    if ($staffExists) {
        echo json_encode([
            "success" => false,
            "message" => "This email address is already being used by a staff member"
        ]);
        exit;
    }





    $passwordHash = password_hash($password, PASSWORD_DEFAULT);



    // Find admin 
    $sql = "SELECT id FROM users WHERE role = 'admin' LIMIT 1";

    $stmt = $conn->prepare($sql);
    $stmt->execute();

    $result = $stmt->get_result();
    $admin = $result->fetch_assoc();

    $stmt->close();

    if (!$admin) {
        echo json_encode([
            "success" => false,
            "message" => "Administrator account not found"
        ]);
        exit;
    }

    // Update admin 
    $updateSql = "UPDATE users SET email = ?, password = ? WHERE id = ?";
    $updateStmt = $conn->prepare($updateSql);

    $updateStmt->bind_param("ssi", $email, $passwordHash, $admin["id"]);

    if ($updateStmt->execute()) {
        echo json_encode([
            "success" => true,
            "message" => "Account details updated successfully"
        ]);
    } else {
        echo json_encode([
            "success" => false,
            "message" => "Failed to update account details"
        ]);
    }

    $updateStmt->close();







?>