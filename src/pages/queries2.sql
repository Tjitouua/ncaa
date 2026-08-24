

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


-- Training programs table 
CREATE TABLE IF NOT EXISTS training_programs
(
    id INT PRIMARY KEY AUTO_INCREMENT,
    training_code VARCHAR (50) NOT NULL UNIQUE,
    training_name VARCHAR (250) NOT NULL,
    description VARCHAR (250) NOT NULL,
    duration VARCHAR (250) NOT NULL,
    category VARCHAR (250) NOT NULL,
    type VARCHAR (250) NOT NULL,
    validity VARCHAR (250) NOT NULL,
    status VARCHAR (250) NOT NULL,
    trainer VARCHAR (250) NOT NULL,
    provider VARCHAR (250) NOT NULL,
    location VARCHAR (250) NOT NULL,
    contact_no VARCHAR (250) NOT NULL,
    email VARCHAR (250) NOT NULL,
    cost DECIMAL (10,2)
);






-- INSERT INTO training_programs (training_code, training_name, description, category, duration, provider)
-- VALUES
-- (
--     "TRN-001",
--     "Human Factors in Aviation",
--     "CRM and safety culture",
--     "Mandatory",
--     "2 weeks",
--     "Internal"
-- );



-- Staff table 
CREATE TABLE IF NOT EXISTS staff 
(
    id INT PRIMARY KEY AUTO_INCREMENT,
    staff_id VARCHAR (50) NOT NULL UNIQUE,
    first_name VARCHAR (250) NOT NULL,
    last_name VARCHAR (250) NOT NULL,
    gender VARCHAR (250) NOT NULL,
    email VARCHAR (250) NOT NULL UNIQUE,
    dob DATE NOT NULL,
    national_id VARCHAR (250) NOT NULL UNIQUE,
    phone_no VARCHAR (250) NOT NULL,
    city VARCHAR (250) NOT NULL,
    disadvantaged VARCHAR (250) NOT NULL,
    disability VARCHAR (250) NOT NULL,
    department VARCHAR (50) NOT NULL,
    role VARCHAR (250) NOT NULL,
    employment_type VARCHAR (250) NOT NULL,
    doj DATE,
    employment_status VARCHAR (250) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);





-- Assignments table 
CREATE TABLE IF NOT EXISTS training_assignments
( 
    id INT PRIMARY KEY AUTO_INCREMENT,
    staff_id INT NOT NULL,
    program_id INT NOT NULL,
    assigned_date DATE,
    scheduled_date DATE,
    end_date DATE,
    type VARCHAR (250), 
    status VARCHAR (250),
    
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






-- Role table 
CREATE TABLE roles
(
    id INT PRIMARY KEY AUTO_INCREMENT,
    department VARCHAR (250) NOT NULL,
    role VARCHAR (250) NOT NULL,
    description VARCHAR (250) NOT NULL,
    status VARCHAR (250) NOT NULL,
    
    UNIQUE KEY unique_role (
        department,
        role
    )
);








-- Training Matrix 
CREATE TABLE matrix
(
    id INT PRIMARY KEY AUTO_INCREMENT,
    role_id INT NOT NULL,
    program_id INT NOT NULL,
    type VARCHAR (250),
    
    FOREIGN KEY (role_id) REFERENCES roles (id) ON DELETE CASCADE,
    FOREIGN KEY (program_id) REFERENCES training_programs (id) ON DELETE CASCADE
);








-- Training requests table 
CREATE TABLE IF NOT EXISTS training_requests
(
    id INT PRIMARY KEY AUTO_INCREMENT,
    staff_id INT NOT NULL,
    
    training_code VARCHAR (50),
    training_name VARCHAR (250) NOT NULL,
    description VARCHAR (250) NOT NULL,
    duration VARCHAR (250) NOT NULL,
    category VARCHAR (250) NOT NULL,
    type VARCHAR (250) NOT NULL,
    validity VARCHAR (250) NOT NULL,
    training_status VARCHAR (250) NOT NULL,
    trainer VARCHAR (250) NOT NULL,
    provider VARCHAR (250) NOT NULL,
    location VARCHAR (250) NOT NULL,
    contact VARCHAR (50) NOT NULL,
    email VARCHAR (250) NOT NULL,
    
    cost DECIMAL (10,2) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    reason TEXT NOT NULL,
    
    request_status VARCHAR (250) DEFAULT 'Pending',
    requested_date DATE DEFAULT (CURRENT_DATE),
    
    FOREIGN KEY (staff_id) REFERENCES staff(id)
    
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