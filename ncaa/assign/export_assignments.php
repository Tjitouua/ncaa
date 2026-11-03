<?php


    include "../database.php";

    header('Content-Type: text/csv; charset=utf-8');
    header('Content-Disposition: attachment; filename=ncaa_training_records.csv');

    $output = fopen("php://output", "w");




    $search = $_GET["search"] ?? "";


    $query = "SELECT
                a.id AS assignment_id,
                a.assigned_date,
                a.status,

                s.staff_no,
                s.first_name,
                s.last_name,
                s.gender,
                s.department,
                s.role,
                s.disadvantaged,
                s.disability,

                t.*
                FROM training_assignments a
                LEFT JOIN staff s ON s.id = a.staff_id
                LEFT JOIN training_programs t ON t.id = a.program_id
                WHERE 1=1
                ";


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
               s.staff_no LIKE ?
               OR s.first_name LIKE ?
               OR s.last_name LIKE ?
               OR s.gender LIKE ?
               OR s.role LIKE ?
               OR s.department LIKE ?
               OR s.disadvantaged LIKE ?
               OR s.disability LIKE ?

               OR t.training_name LIKE ?
               OR t.reason LIKE ?
               OR t.training_type LIKE ?
               OR t.duration LIKE ?
               OR t.provider LIKE ?
               OR t.location LIKE ?
               OR t.start_date LIKE ?
               OR t.end_date LIKE ?

               OR a.status LIKE ?


               OR CONCAT(s.first_name, ' ' , s.last_name) LIKE ?
           )
        ";

        $searchValue = "%" . $search . "%";

        for ($i = 0; $i < 18; $i++) {
            $params[] = $searchValue;
            $types .= "s";
        }
    }



    // Function
    $addInFilter("s.`function`", "function");




    // Department 
    $addInFilter("s.department", "department");



    // Division
    $addInFilter("s.division", "division");



    // Job Category
    $addInFilter("s.job_category", "job_category");


    // Category 
    $addInFilter("t.category", "category");


    // Training Type
    $addInFilter("t.training_type", "training_type");


    // Quarter 
    $addInFilter("t.quarter", "quarter");


    // Method
    $addInFilter("t.method", "method");



    // Status 
    $addInFilter("a.status", "status");



    // Disadvantaged 
    $addInFilter("s.disadvantaged", "disadvantaged");



    // Disability 
    $addInFilter("s.disability", "disability");




    // Gender 
    $addInFilter("s.gender", "gender");




    // Year 
    $addInFilter("t.year", "year");




    // Month 
    $addInFilter("MONTH(t.start_date)", "months");



    // Region 
    $addInFilter("t.region", "region");




    // Acceptance 
    $addInFilter("t.approved", "approved");



    $query .= " ORDER BY a.id ASC";

    $stmt = $conn->prepare($query);

    if (!$stmt) {
        die("Failed to prepare query: " . $conn->error);
    }


    if (!empty($params)) {
        $stmt->bind_param($types, ...$params);
    }


    $stmt->execute();

    $result = $stmt->get_result();

    $fields = $result->fetch_fields();

    $headers = [];

    $totalCostIndex = -1;


    foreach ($fields as $index => $field) {
        $headers[] = $field->name;
        if ($field->name === "total_cost") {
            $totalCostIndex = $index;
        }
    }

    fputcsv($output, $headers);

    $totalCost = 0;


    while ($row = $result->fetch_row()) {
        if ($totalCostIndex !== -1) {
           $totalCost += (float) $row[$totalCostIndex];
        }


        fputcsv($output, $row);
    } 



    $totalRow = array_fill(0, count($headers), "");

    if ($totalCostIndex > 0) {
      $totalRow[$totalCostIndex - 1] = "TOTAL COST";
      $totalRow[$totalCostIndex] = number_format($totalCost, 2, ".", " ");
    }



    // Total 
    fputcsv($output, $totalRow);





    fclose($output);
    $stmt->close();
    $conn->close();
    exit;


?>