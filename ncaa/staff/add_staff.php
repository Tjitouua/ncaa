<?php


   header("Content-Type: application/json");
   header("Access-Control-Allow-Origin: *");
   header("Access-Control-Allow-Methods: POST");
   header("Access-Control-Allow-Headers: Content-Type");

   include "../database.php";
   require "../mail/newUser.php";

   $data = json_decode(file_get_contents("php://input"), true);

   if (!$data) {
      echo json_encode([
         "success" => false,
         "message" => "No data receive"
      ]);
      exit;
   }

   $conn->begin_transaction();

   try {

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


   // Employees table 
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

   $stmt->execute();


   // Users table 
   $sql2 = "
       INSERT INTO users (
         role, 
         email,
         first_name,
         last_name,
         password
       ) 
       VALUES (?, ?, ?, ?, ?);
   ";

   $stmt2 = $conn->prepare($sql2);

   $defaultPassPlain = "12345";
   $defaultPass = password_hash($defaultPassPlain, PASSWORD_DEFAULT);
   $role = "staff";
   $stmt2->bind_param("sssss", $role, $email, $first_name, $last_name, $defaultPass);
   $stmt2->execute();


   $conn->commit();

   sendWelcomeEmail($email, $first_name, $defaultPassPlain);



      echo json_encode([
         "success" => true,
         "message" => "Staff added successfully"
      ]);
   

 } catch (Exception $e) {

   $conn->rollback();

   echo json_encode([
      "success" => false,
      "message" => $stmt->error
   ]);

 }

   $conn->close();

?>