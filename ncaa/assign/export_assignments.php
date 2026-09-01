<?php


    include "../database.php";

    header('Content-Type: text/csv; charset=utf-8');
    header('Content-Disposition: attachment; filename=ncaa_training_records.csv');

    $output = fopen("php://output", "w");

    fputcsv($output, [
        "Staff_No",
        "First Name",
        "Last Name",
        "Gender",
        "Department",
        "Role",
        "Disadvantaged",
        "Disability",
        "Training Name",
        "Development Gap",
        "Type",
        "Duration", 
        "Assigned Date",
        "Scheduled Date",
        "End Date",
        "Status",
        "Provider",
        "Location",
        "Total Cost"
    ]);




    $search = $_GET["search"] ?? "";
    $status = $_GET["status"] ?? "";
    $function = $_GET["function"] ?? "";
    $department = $_GET["department"] ?? "";
    $division = $_GET["division"] ?? "";
    $job_category = $_GET["job_category"] ?? "";
    $category = $_GET["category"] ?? "";
    $training_type = $_GET["training_type"] ?? "";
    // $quarter = $_GET["quarter"] ?? "";
    $method = $_GET["method"] ?? "";
    $disadvantaged = $_GET["disadvantaged"] ?? "";
    $disability = $_GET["disability"] ?? "";
    $gender = $_GET["gender"] ?? "";
    $year = $_GET["year"] ?? "";


    $query = "SELECT
                a.id,
                a.assigned_date,
                a.scheduled_date,
                a.end_date,
                a.type,
                a.status,

                s.staff_no,
                s.first_name,
                s.last_name,
                s.gender,
                s.department,
                s.role,
                s.disadvantaged,
                s.disability,

                t.training_name,
                t.reason,
                t.duration,
                t.provider,
                t.location,
                t.total_cost
                FROM training_assignments a
                LEFT JOIN staff s ON s.id = a.staff_id
                LEFT JOIN training_programs t ON t.id = a.program_id
                WHERE 1=1
                ";


    $params = [];
    $types = "";


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
               OR t.duration LIKE ?
               OR t.provider LIKE ?
               OR t.location LIKE ?

               OR a.assigned_date LIKE ?
               OR a.scheduled_date LIKE ?
               OR a.end_date LIKE ?
               OR t.status LIKE ?
               OR a.type LIKE ?

               OR CONCAT(s.first_name, ' ' , s.last_name) LIKE ?
           )
        ";

        $searchValue = "%" . $search . "%";

        for ($i = 0; $i < 19; $i++) {
            $params[] = $searchValue;
            $types .= "s";
        }
    }



    // Function
    if ($function !== "") {
        $query .= " AND s.function = ?";
        $params[] = $function;
        $types .= "s";
    }




    // Department 
    if ($department !== "") {
        $query .= " AND s.department = ?";
        $params[] = $department;
        $types .= "s";
    }



    // Division
    if ($division !== "") {
        $query .= " AND s.division = ?";
        $params[] = $division;
        $types .= "s";
    }



    // Job Category
    if ($job_category !== "") {
        $query .= " AND s.job_category = ?";
        $params[] = $job_category;
        $types .= "s";
    }


    // Category 
    if ($category !== "") {
        $query .= " AND s.category = ?";
        $params[] = $category;
        $types .= "s";
    }


    // Training Type
    if ($training_type !== "") {
        $query .= " AND t.training_type = ?";
        $params[] = $training_type;
        $types .= "s";
    }


    // Method
    if ($method !== "") {
        $query .= " AND t.method = ?";
        $params[] = $method;
        $types .= "s";
    }



    // Status 
    if ($status !== "") {
        $query .= " AND a.status = ?";
        $params[] = $status;
        $types .= "s";
    }



    // Disadvantaged 
    if ($disadvantaged !== "") {
        $query .= " AND s.disadvantaged = ?";
        $params[] = $disadvantaged;
        $types .= "s";
    }



    // Disability 
    if ($disability !== "") {
        $query .= " AND s.disability = ?";
        $params[] = $disability;
        $types .= "s";
    }




    // Gender 
    if ($gender !== "") {
        $query .= " AND s.gender = ?";
        $params[] = $gender;
        $types .= "s";
    }




    // Year 
    if ($year !== "") {
        $query .= " AND YEAR(a.scheduled_date) = ?";
        $params[] = $year;
        $types .= "s";
    }



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

    $totalCost = 0;




    while ($row = $result->fetch_assoc()) {


        $totalCost += (float) $row["total_cost"];


        fputcsv($output, [
            $row["staff_no"],
            $row["first_name"],
            $row["last_name"],
            $row["gender"],
            $row["department"],
            $row["role"],
            $row["disadvantaged"],
            $row["disability"],
            $row["training_name"],
            $row["reason"],
            $row["type"],
            $row["duration"],
            $row["assigned_date"],
            $row["scheduled_date"],
            $row["end_date"],
            $row["status"],
            $row["provider"],
            $row["location"],
            number_format((float)$row["total_cost"], 2, ".", " ")
        ]);
    } 




    // Total 
    fputcsv($output, [
       "",
       "",
       "",
       "",
       "",
       "",
       "",
       "",
       "",
       "",
       "",
       "",
       "",
       "",
       "",
       "",
       "",
       "TOTAL COST",
       number_format($totalCost, 2, ".", " ")
    ]);





    fclose($output);
    $stmt->close();
    $conn->close();
    exit;


?>