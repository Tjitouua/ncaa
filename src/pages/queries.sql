

CREATE DATABASE IF NOT EXIST ncaa_trainings;


-- User table 
CREATE TABLE IF NOT EXISTS users 
(
    id INT PRIMARY KEY AUTO_INCREMENT,
    role VARCHAR (250) NOT NULL,
    username VARCHAR(250) NOT NULL,
    password VARCHAR(250) NOT NULL
);


-- Training programs table 
CREATE TABLE IF NOT EXISTS training_programs
(
    id INT PRIMARY KEY AUTO_INCREMENT,
    training_code VARCHAR (50) NOT NULL,
    training_name VARCHAR (250) NOT NULL,
    description VARCHAR (250) NOT NULL,
    category VARCHAR (250) NOT NULL,
    duration VARCHAR (250) NOT NULL,
    provider VARCHAR (250) NOT NULL
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
CREATE TABLE staff
(
    id INT PRIMARY KEY AUTO_INCREMENT,
    staff_id VARCHAR (50) NOT NULL,
    first_name VARCHAR (250) NOT NULL,
    last_name VARCHAR (250) NOT NULL,
    email VARCHAR (250) NOT NULL,
    phone_no VARCHAR (250) NOT NULL,
    city VARCHAR (250) NOT NULL,
    address VARCHAR (250) NOT NULL,
    postal_address VARCHAR (250) NOT NULL,
    department VARCHAR (50) NOT NULL,
    role VARCHAR (250) NOT NULL,
    employement_type VARCHAR (250) NOT NULL,
    employement_status VARCHAR (250) NOT NULL,
    profile_pic VARCHAR (250) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
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