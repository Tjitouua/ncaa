<?php

   
   include "../database.php";


    header('Content-Type: text/csv; charset=utf-8');
    header('Content-Disposition: attachment; filename=staff_export.csv');

    $output = fopen("php://output", "w");




    $search = $_GET["search"] ?? "";



    $query = "SELECT * FROM staff WHERE 1=1";

    $params = [];
    $types = "";




    $addInFilter = function ($column, $filterName) use (&$query, &$params, &$types) {
        
      $values = array_filter(
          array_map("trim", explode(",", $_GET[$filterName] ?? "")),
          fn($value) => $value !== ""
      );

      if (!empty($values)) {
          $placeholders = implode(",", array_fill(0, count($values), "?"));

          $query .= " AND $column IN ($placeholders)";

          foreach ($values as $value) {
              $params[] = $value;
              $types .= "s";
          }
      }
  };



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
   $addInFilter("`function`", "function");




    // Department 
    $addInFilter("department", "department");


   //  Division 
   $addInFilter("division", "division");



   // Job/AA Category 
   $addInFilter("job_category", "job_category");



    // Disadvantaged 
    $addInFilter("disadvantaged", "disadvantaged");



    // Disability 
    $addInFilter("disability", "disability");



    // Gender 
    $addInFilter("gender", "gender");

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