<?php



    header("Content-Type: application/json");
    header("Access-Control-Allow-Origin: *");

    include "../database.php";

    $id = $_GET["id"] ?? null;

    if(!$id) {
        echo json_encode([
            "success" => false,
            "message" => "Role ID required"
        ]);
        exit;
    }

    $sql = "SELECT role, department FROM roles WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $id);
    $stmt->execute();


    $result = $stmt->get_result();

    $roleData = $result->fetch_assoc();

    if(!$roleData) {
        echo json_encode([
            "success" => false,
            "message" => "Role not found"
        ]);
        exit;
    };


    $role = $roleData["role"];
    $department = $roleData["department"];


    

    $query = "SELECT * FROM staff WHERE role = ? AND department = ?";
    $stmt2 = $conn->prepare($query);
    $stmt2->bind_param("ss", $role, $department);
    $stmt2->execute();

    $result = $stmt2->get_result();

    $data = [];

    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }

    if($data) {
        echo json_encode([
            "success" => true,
            "data" => $data
        ]);
        exit;
    }


    

    $stmt->close();
    $conn->close();









?>