<?php

   
   include "../database.php";


    header('Content-Type: text/csv; charset=utf-8');
    header('Content-Disposition: attachment; filename=staff_export.csv');

    $output = fopen("php://output", "w");




    $search = $_GET["search"] ?? "";
    $function = $_GET["function"] ?? "";
    $department = $_GET["department"] ?? "";
    $division = $_GET["division"] ?? "";
    $job_category = $_GET["job_category"] ?? "";
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
             staff_no LIKE ?
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


   //  Function 
   if ($function !== "") {
      $query .= " AND function = ?";
      $params[] = $function;
      $types .= "s";
   }




    // Department 
    if ($department !== "") {
       $query .= " AND department = ?";
       $params[] = $department;
       $types .= "s";
    }


   //  Division 
   if ($division !== "") {
      $query .= " AND division = ?";
      $params[] = $division;
      $types .= "s";
   }



   // Job/AA Category 
   if ($job_category !== "") {
      $query .= " AND job_category = ?";
      $params[] = $job_category;
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



    $fields = $result->fetch_fields();

    $headers = [];

    foreach($fields as $field) {
        $headers[] = $field->name;
    }


    fputcsv($output, $headers);

    while ($row = $result->fetch_row()) {
        fputcsv($output, $row);
    }



    fclose($output);
    $stmt->close();
    $conn->close();
    exit;


?>