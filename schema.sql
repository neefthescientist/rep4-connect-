-- PostgreSQL Schema for REP4 Connect

CREATE TABLE IF NOT EXISTS students (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    school VARCHAR(255) NOT NULL,
    education_level VARCHAR(50) NOT NULL,
    grad_year INT NOT NULL,
    cohort INT NOT NULL,
    status VARCHAR(50) DEFAULT 'Active',
    interests TEXT[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS programs (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(100) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    description TEXT
);

CREATE TABLE IF NOT EXISTS service_hours (
    id SERIAL PRIMARY KEY,
    student_id INT REFERENCES students(id) ON DELETE CASCADE,
    program_id INT REFERENCES programs(id) ON DELETE SET NULL,
    hours DECIMAL(5, 2) NOT NULL,
    activity_description TEXT NOT NULL,
    logged_date DATE DEFAULT CURRENT_DATE
);