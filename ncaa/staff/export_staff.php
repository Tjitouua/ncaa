<?php

   
   include "../database.php";


    header('Content-Type: text/csv; charset=utf-8');
    header('Content-Disposition: attachment; filename=staff_export.csv');

    $output = fopen("php://output", "w");

    fputcsv($output, [
        "Staff ID",
        "Staff Name",
        "Last Name",
        "Gender",
        "Role",
        "D.O.B",
        "Phone Number",
        "Email",
        "National ID",
        "Department",
        "Position",
        "City",
        "Disadvantaged",
        "Disability",
        "D.O.J"
    ]);




    $search = $_GET["search"] ?? "";
    $department = $_GET["department"] ?? "";
    $role = $_GET["role"] ?? "";
    $disadvantaged = $_GET["disadvantaged"] ?? "";
    $disability = $_GET["disability"] ?? "";
    $gender = $_GET["gender"] ?? "";




    $query = "SELECT * FROM staff WHERE 1=1";

    $params = [];
    $types = "";


    // Search 
    if ($search !== "") {
      $query .= " AND (
             staff_id LIKE ?
             OR first_name LIKE ?
             OR last_name LIKE ?
             OR gender LIKE ?
             OR email LIKE ?
             OR dob LIKE ?
             OR national_id LIKE ?
             OR phone_no LIKE ?
             OR city LIKE ?
             OR department LIKE ?
             OR role LIKE ?
             OR employment_type LIKE ?
             OR doj LIKE ?
             OR employment_status LIKE ?
             OR CONCAT(first_name, ' ' , last_name) LIKE ?
      )";


      $searchValue = "%" . $search . "%";

      for ($i = 0; $i < 15; $i++) {
         $params[] = $searchValue;
         $types .= "s";
      }


    }




    // Department 
    if ($department !== "") {
       $query .= " AND department = ?";
       $params[] = $department;
       $types .= "s";
    }



    // Role 
    if ($role !== "") {
       $query .= " AND role = ?";
       $params[] = $role;
       $types .= "s";
    }



    // Disadvantaged 
    if ($disadvantaged !== "") {
       $query .= " AND disadvantaged = ?";
       $params[] = $disadvantaged;
       $types .= "s";
    }



    // Disability 
    if ($disability !== "") {
       $query .= " AND disability = ?";
       $params[] = $disability;
       $types .= "s";
    }



    // Gender 
    if ($gender !== "") {
      $query .= " AND gender = ?";
      $params[] = $gender;
      $types .= "s";
    }

    $query .= " ORDER BY id ASC";


    $stmt = $conn->prepare($query);

    if (!$stmt) {
       die("Failed to prepare query");
    }

    if (!empty($params)) {
       $stmt->bind_param($types, ...$params);
    }

    $stmt->execute();




    $result = $stmt->get_result();

    while ($row = $result->fetch_assoc()) {
      fputcsv($output, [
         $row["staff_id"],
         $row["first_name"],
         $row["last_name"],
         $row["gender"],
         $row["role"],
         $row["dob"],
         $row["phone_no"],
         $row["email"],
         $row["national_id"],
         $row["department"],
         $row["role"],
         $row["city"],
         $row["disadvantaged"],
         $row["disability"],
         $row["doj"]
      ]);
    }

    fclose($output);
    $stmt->close();
    $conn->close();
    exit;


?>