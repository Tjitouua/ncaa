<?php



    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: *");
    header("Content-Type: application/json");

    include "../database.php";

    $sql = "SELECT  
            roles.*,
            count(matrix.id) AS requirements
            FROM roles 
            LEFT JOIN matrix ON matrix.role_id = roles.id
            GROUP BY roles.id
            ORDER BY roles.id DESC;";
    $result = mysqli_query($conn, $sql);

    $roles = [];

    while ($row = mysqli_fetch_assoc($result)) {
        $roles[] = $row;
    }

    echo json_encode([
        "success" => true,
        "data" => $roles
    ])





?>