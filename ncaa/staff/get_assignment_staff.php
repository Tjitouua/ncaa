<?php

    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: *");
    header("Content-Type: application/json");


    include "../database.php";

    $sql = "SELECT
           s.*,
           GROUP_CONCAT(
             CONCAT(m.program_id, ':', m.type)
           ) AS programs
           FROM staff s
           LEFT JOIN roles r ON s.role = r.role
           AND s.department = r.department
           LEFT JOIN matrix m ON r.id = m.role_id
           GROUP BY s.id
           ORDER BY s.first_name ASC
        ";

    $result = mysqli_query($conn, $sql);

    $staff = [];

    while($row = mysqli_fetch_assoc($result)) {

        $programs = [];

        if($row["programs"]) {
            foreach(explode(",", $row["programs"]) as $program) {
                $parts = explode(":", $program);

                $programs[] = [
                    "id" => intval($parts[0]),
                    "type" => $parts[1]
                ];
            }
        }

        $row["programs"] = $programs;



        // $row["programs"] = $row["programs"]
        // ? array_map('intval', explode(",", $row["programs"]))
        // : [];

        $staff[] = $row;
    }


    echo json_encode([
        "success" => true,
        "data" => $staff
    ]);





?>