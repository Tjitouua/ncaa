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

     $staff_no = trim($data["staff_no"]);
     $first_name = trim($data["first_name"]);
     $last_name = trim($data["last_name"]);
     $gender = trim($data["gender"]);
     $email = trim($data["email"]);
     $dob = trim($data["dob"]);
     $national_id = trim($data["national_id"]);
     $phone_no = trim($data["phone_no"]);
     $city = trim($data["city"]);
     $function = trim($data["function"]);
     $department = trim($data["department"]);
     $division = trim($data["division"]);
     $job_category = trim($data["job_category"]);
     $job_grade = trim($data["job_grade"]);
     $ethnicity = trim($data["ethnicity"]);
     $role = trim($data["role"]);
     $employment_type = trim($data["employment_type"]);
     $doj = trim($data["doj"]);
     $employment_status = trim($data["employment_status"]);
     $disadvantaged = trim($data["disadvantaged"]);
     $disability = trim($data["disability"]);



     $sql = "
        UPDATE staff SET
            staff_no = ?,
            first_name = ?,
            last_name = ?,
            gender = ?,
            email = ?,
            dob = ?,
            national_id = ?,
            phone_no = ?,
            city = ?,
            function = ?,
            department = ?,
            division = ?,
            job_category = ?,
            job_grade = ?,
            ethnicity = ?,
            role = ?,
            employment_type = ?,
            doj = ?,
            employment_status = ?,
            disadvantaged = ?,
            disability = ?
        WHERE id = ?;
     ";


     $stmt = $conn->prepare($sql);

     $stmt->bind_param(
        "sssssssssssssssssssssi",
        $staff_no,
        $first_name,
        $last_name,
        $gender,
        $email,
        $dob,
        $national_id,
        $phone_no,
        $city,
        $function,
        $department,
        $division,
        $job_category,
        $job_grade,
        $ethnicity,
        $role,
        $employment_type,
        $doj,
        $employment_status,
        $disadvantaged,
        $disability,
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