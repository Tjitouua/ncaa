<?php
    
    $serverName = 'localhost';
    $username = 'root';
    $password = '';
    $db_name = 'ncaa_trainings';

    $conn = new mysqli($serverName, $username, $password, $db_name);

    if($conn->connect_error) {
        http_response_code(500);
        echo json_encode(["success" => false, "message" => "Database connection failed"]);
        exit;
    }

?>