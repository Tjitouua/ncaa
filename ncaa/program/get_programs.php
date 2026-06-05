<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Content-Type: application/json");

include "../database.php";

$sql = "SELECT * FROM training_programs ORDER BY id ASC";
$result = mysqli_query($conn, $sql);

$trainingPrograms = [];

while ($row = mysqli_fetch_assoc($result)) {
    $trainingPrograms[] = $row;
}

echo json_encode([
    "success" => true,
    "data" => $trainingPrograms
]);

?>