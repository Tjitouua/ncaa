<?php



     header("Content-Type: application/json");
     header("Access-Control-Allow-Origin: *");
     header("Access-Control-Allow-Methods: POST, OPTIONS");
     header("Access-Control-Allow-Headers: Content-Type");

     include "../database.php";

     $data = json_decode(file_get_contents("php://input"), true);

     if (!$data) {
        echo json_encode([
            "success" => false,
            "message" => "No data received"
        ]);
        exit;
     } 

     $id = $data["id"] ?? null;

     if (!$id) {
        echo json_encode([
            "success" => false,
            "message" => "Staff ID required"
        ]);
        exit;
     }

     $staff_id = trim($data["staff_id"]);
     $first_name = trim($data["first_name"]);
     $last_name = trim($data["last_name"]);
     $gender = trim($data["gender"]);
     $email = trim($data["email"]);
     $dob = trim($data["dob"]);
     $national_id = trim($data["national_id"]);
     $phone_no = trim($data["phone_no"]);
     $city = trim($data["city"]);
     $address = trim($data["address"]);
     $postal_address = trim($data["postal_address"]);
     $department = trim($data["department"]);
     $role = trim($data["role"]);
     $employment_type = trim($data["employment_type"]);
     $doj = trim($data["doj"]);
     $employment_status = trim($data["employment_status"]);



     $sql = "
        UPDATE staff SET
            staff_id = ?,
            first_name = ?,
            last_name = ?,
            gender = ?,
            email = ?,
            dob = ?,
            national_id = ?,
            phone_no = ?,
            city = ?,
            address = ?,
            postal_address = ?,
            department = ?,
            role = ?,
            employment_type = ?,
            doj = ?,
            employment_status = ?
        WHERE id = ?;
     ";


     $stmt = $conn->prepare($sql);

     $stmt->bind_param(
        "ssssssssssssssssi",
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
        $postal_address,
        $department,
        $role,
        $employment_type,
        $doj,
        $employment_status,
        $id
     );


     if ($stmt->execute()) {
        echo json_encode([
            "success" => true,
            "message" => "Staff updated successfully"
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