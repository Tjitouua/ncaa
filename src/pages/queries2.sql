

CREATE DATABASE IF NOT EXISTS ncaa_trainings;


USE ncaa_trainings;


-- User table 
CREATE TABLE IF NOT EXISTS users 
(
    id INT PRIMARY KEY AUTO_INCREMENT,
    role VARCHAR (250) NOT NULL,
    email VARCHAR(250) NOT NULL,
    first_name VARCHAR(250) NOT NULL,
    last_name VARCHAR(250) NOT NULL,
    password VARCHAR(250) NOT NULL
);





-- Staff table 
CREATE TABLE IF NOT EXISTS staff 
(
    id INT PRIMARY KEY AUTO_INCREMENT,
    staff_no VARCHAR (50) NOT NULL UNIQUE,
    first_name VARCHAR (250) NOT NULL,
    last_name VARCHAR (250) NOT NULL,
    gender VARCHAR (250) NOT NULL,
    email VARCHAR (250) NOT NULL UNIQUE,
    dob DATE NOT NULL,
    national_id VARCHAR (250) NOT NULL UNIQUE,
    phone_no VARCHAR (250) NOT NULL UNIQUE,
    city VARCHAR (250) NOT NULL,
    disadvantaged VARCHAR (250) NOT NULL,
    disability VARCHAR (250) NOT NULL,
    function VARCHAR (250) NOT NULL,
    department VARCHAR (50) NOT NULL,
    division VARCHAR (250) NOT NULL,
    job_category VARCHAR (250) NOT NULL,
    job_grade VARCHAR (250) NOT NULL,
    ethnicity VARCHAR (250) NOT NULL,
    role VARCHAR (250) NOT NULL,
    employment_type VARCHAR (250) NOT NULL,
    doj DATE,
    employment_status VARCHAR (250) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);




-- Training programs table 
CREATE TABLE IF NOT EXISTS training_programs
(
    id INT PRIMARY KEY AUTO_INCREMENT,
    staff_id INT NOT NULL,
    training_name VARCHAR (250) NOT NULL,
    reason VARCHAR (50) NOT NULL,
    duration VARCHAR (250) NOT NULL,
    category VARCHAR (250) NOT NULL,
    training_type VARCHAR (250) NOT NULL,
    method VARCHAR (250) NOT NULL,
    validity VARCHAR (250) NOT NULL,
    provider VARCHAR (250) NOT NULL,
    trainer VARCHAR (250) NOT NULL,
    trainer_status VARCHAR (250) NOT NULL,
    location VARCHAR (250) NOT NULL,
    contact_no VARCHAR (250) NULL,
    email VARCHAR (250) NULL,
    training_cost DECIMAL (10,2) NULL,
    accommodation_cost DECIMAL (10,2) NULL,
    snt_cost DECIMAL (10,2) NULL,
    flight_cost DECIMAL (10,2) NULL,
    other_costs DECIMAL (10,2) NULL,
    total_cost DECIMAL (10,2) NOT NULL,
    approved VARCHAR (250) NOT NULL,
    year INT NOT NULL,
    quarter INT NOT NULL,
    start_date DATE NULL,
    end_date DATE NULL,
    region VARCHAR (250) NOT NULL,
    acceptance VARCHAR (250) NOT NULL,

    CONSTRAINT chk_contact_or_email
    CHECK(contact_no IS NOT NULL OR email IS NOT NULL),
    
    FOREIGN KEY (staff_id) REFERENCES staff (id) ON DELETE CASCADE
);





-- Assignments table 
CREATE TABLE IF NOT EXISTS training_assignments
( 
    id INT PRIMARY KEY AUTO_INCREMENT,
    staff_id INT NOT NULL,
    program_id INT NOT NULL,
    assigned_date DATE,
    status VARCHAR (250) NOT NULL,
    
    FOREIGN KEY (staff_id) REFERENCES staff (id) ON DELETE CASCADE,
    FOREIGN KEY (program_id) REFERENCES training_programs (id) ON DELETE CASCADE
);





-- Certficates table 
CREATE TABLE certificates
( 
    id INT PRIMARY KEY AUTO_INCREMENT,
    training_id INT NOT NULL,
    staff_email VARCHAR (250) NOT NULL,
    certificate_no VARCHAR (250) NOT NULL,
    issued_date DATE NOT NULL,
    expiry_date DATE NOT NULL,
    file VARCHAR(250) NOT NULL,
    
    FOREIGN KEY (training_id) REFERENCES training_assignments (id) ON DELETE CASCADE
);



-- INSERT INTO staff (staff_id, first_name, last_name, email, department, role)
-- VALUES
-- (
--     "EMP-001",
--     "Tjitouua",
--     "Mapoha",
--     "mapohaT@ncaa.na",
--     "ICT",
--     "Software Developer"
-- );






-- Staff Notifications table 
CREATE TABLE staff_notifications
(
    id INT PRIMARY KEY AUTO_INCREMENT,
    staff_email VARCHAR (250) NOT NULL,
    training_id INT NOT NULL,
    notification_type VARCHAR (250) NOT NULL,
    title VARCHAR (250) NOT NULL,
    message VARCHAR (250) NOT NULL,
    status VARCHAR (250) NOT NULL,
    sent_date DATETIME NOT NULL,
    
    UNIQUE KEY unique_staff_notification (
        staff_email,
        training_id,
        notification_type
    )
);







-- Admin Notifications table 
CREATE TABLE admin_notifications
(
    id INT PRIMARY KEY AUTO_INCREMENT,
    staff_email VARCHAR (250) NOT NULL,
    training_id INT NOT NULL,
    notification_type VARCHAR (250) NOT NULL,
    title VARCHAR (25) NOT NULL,
    message VARCHAR (250) NOT NULL,
    status VARCHAR (250) NOT NULL,
    sent_date DATETIME NOT NULL,
    
    UNIQUE KEY unique_admin_notification (
        staff_email,
        training_id,
        notification_type
    )
);








INSERT INTO users (role, email, first_name, last_name, password)
VALUES
(
    'admin',
    'admin@ncaa.na',
    'Administrator',
    'Administrator',
    'admin@123'
);