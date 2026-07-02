<?php



   header("Access-Control-Allow-Origin: *");
   header("Access-Control-Allow-Headers: *");
   header("Content-Type: application/json");

   include "../../database.php";


   $sql = "SELECT * FROM admin_notifications WHERE status = 'Unread'";
   $result = mysqli_query($conn, $sql);

   $notifications = [];

   while ($row = mysqli_fetch_assoc($result)) {
      $row["sent_date"] = date("Y-m-d, g:i:s A", strtotime($row["sent_date"]));
      $notifications[] = $row;
   }

   echo json_encode([
      "success" => true,
      "data" => $notifications
   ])
   





?>