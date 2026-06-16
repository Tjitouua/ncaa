<?php

    session_start();


    header("Content-Type: application/json");
    header("Access-Control-Allow-Origin: http://localhost:5173");
    header("Access-Control-Allow-Credentials: true");
    header("Access-Control-Allow-Headers: Content-Type");


    $timeout = 60 * 30;

    if (!isset($_SESSION["user"])) {
        echo json_encode([
            "success" => false,
            "message" => "Not logged in"
        ]);
        exit;
    }

    if(isset($_SESSION["last_activity"]) && (time() - $_SESSION["last_activity"]) > $timeout) {
        session_unset();
        session_destroy();

        echo json_encode([
            "success" => false,
            "message" => "Session expired"
        ]);
        exit;
    }

    $_SESSION["last_activity"] = time();

    echo json_encode([
        "success" => true,
        "user" => $_SESSION["user"]
    ]);


?>