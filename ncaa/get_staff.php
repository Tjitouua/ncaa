<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Content-Type: application/json");

include "database.php";

$sql = "SELECT * FROM staff ORDER BY id DESC";
$result = mysqli_query($conn, $sql);

$staff = [];

while ($row = mysqli_fetch_assoc($result)) {
    $staff[] = $row;
}

echo json_encode([
    "success" => true,
    "data" => $staff
])

?>