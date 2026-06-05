<?php


   header("Content-Type: application/json");
   header("Access-Control-Allow-Origin: *");
   header("Access-Control-Allow-Methods: POST");
   header("Access-Control-Allow-Headers: Content-Type");

   include "../database.php";

   $data = json_decode(file_get_contents("php://input"), true);

   if (!$data) {
      echo json_encode([
         "success" => false,
         "message" => "No data receive"
      ]);
      exit;
   }

   $staff_id = trim($data["employeeId"]);
   $first_name = trim($data["firstName"]);
   $last_name = trim($data["lastName"]);
   $gender = trim($data["gender"]);
   $email = trim($data["email"]);
   $dob = trim($data["dob"]);
   $national_id = trim($data["nationalId"]);
   $phone_no = trim($data["phoneNo"]);
   $city = trim($data["city"]);
   $address = trim($data["address"]);
   $postal = trim($data["postal"]);
   $department = trim($data["department"]);
   $role = trim($data["role"]);
   $employment_type = trim($data["employmentType"]);
   $doj = trim($data["doj"]);
   $employment_status = trim($data["employmentStatus"]);


   $sql = "
       INSERT INTO staff (
           staff_id,
           first_name,
           last_name,
           gender,
           email,
           dob,
           national_id,
           phone_no,
           city,
           address,
           postal_address,
           department,
           role,
           employment_type,
           doj,
           employment_status
       )
       VALUES (
           ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
       );
   ";

   $stmt = $conn->prepare($sql);

   $stmt->bind_param(
        "ssssssssssssssss",
        $staff_id,
        $first_name,
        $last_name,
        $gender,
        $email,
        $dob,
        $national_id,
        $phone_no,
        $city,
        $address,
        $postal,
        $department,
        $role,
        $employment_type,
        $doj,
        $employment_status
   );

   if ($stmt->execute()) {
      echo json_encode([
         "success" => true,
         "message" => "Staff added successfully"
      ]);
   } else {
      echo json_encode([
         "success" => false,
         "message" => $stmt->error
      ]);
   }

   $stmt->close();
   $conn->close();

?>