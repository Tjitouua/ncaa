

CREATE DATABASE IF NOT EXIST ncaa_trainings;


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
    trainer VARCHAR (250) NOT NULL,
    training_type VARCHAR (250) NOT NULL,
    validity VARCHAR (250) NOT NULL,
    status VARCHAR (250) NOT NULL,
    target_roles VARCHAR (250) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    recurrence VARCHAR (250) NOT NULL,
    location VARCHAR (250) NOT NULL,
    contact_no VARCHAR (250) NOT NULL,
    email VARCHAR (250) NOT NULL
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
    address VARCHAR (250) NOT NULL,
    postal_address VARCHAR (250) NOT NULL,
    department VARCHAR (50) NOT NULL,
    role VARCHAR (250) NOT NULL,
    employement_type VARCHAR (250) NOT NULL,
    doj DATE,
    employement_status VARCHAR (250) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);





-- Assignments table 
CREATE TABLE training_assignments
( 
    id INT PRIMARY KEY AUTO_INCREMENT,
    staff_id INT NOT NULL,
    program_id INT NOT NULL,
    date_assigned DATE,
    deadline DATE,
    status VARCHAR (250),
    
    FOREIGN KEY (staff_id) REFERENCES staff (id) ON DELETE CASCADE,
    FOREIGN KEY (program_id) REFERENCES training_programs (id) ON DELETE CASCADE
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