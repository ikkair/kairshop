-- Database Init
-- Delete database if same name exist
DROP DATABASE IF EXISTS tugas_backend;

-- Creating database
CREATE DATABASE tugas_backend;

-- Table Init
-- Delete table if same name exist
DROP TABLE IF EXISTS products;

-- Creating products table
CREATE TABLE products(
    id VARCHAR(40) PRIMARY KEY,
    product_name VARCHAR(255) NOT NULL,
    product_price INT NOT NULL,
    product_photo VARCHAR(255) 
);

-- Dummy data
INSERT INTO products(id, product_name, product_price) 
    VALUES
        (1, 'gelas bts', 40000),
        (2, 'baju kuning', 55000),
        (3, 'microphone', 100000),
        (4, 'laptop', 3300000),
        (5, 'gundam', 230000),
        (6, 'os', 97800),
        (7, 'smartphone', 552300),
        (16, 'anime', 923999);



-- Table Init
-- Delete table if same name exist
DROP TABLE IF EXISTS categories;

-- Creating category table
CREATE TABLE categories(
    id VARCHAR(40) PRIMARY KEY,
    category_type VARCHAR(255) NOT NULL
);

-- Dummy data category
INSERT INTO categories(id, category_type) 
    VALUES
        (1, 'Elektronik'),
        (2, 'Baju'),
        (3, 'Celana'),
        (4, 'Alat Memasak'),
        (5, 'Mainan'),
        (6, 'Software'),
        (7, 'Memory'),
        (16,'Keyboard');

-- Table Init
-- Delete table if same name exist
DROP TABLE IF EXISTS customers;

-- Creating role type
CREATE TYPE role AS ENUM ('user', 'seller');
-- Creating customers table
CREATE TABLE customers(
    id CHAR(36) PRIMARY KEY,
    customer_name VARCHAR(255) NOT NULL,
    customer_email VARCHAR(255) UNIQUE NOT NULL,
    customer_phone BIGINT NOT NULL,
    customer_password CHAR(60) NOT NULL,
    customer_role role NOT NULL 
);

-- Dummy data category
INSERT INTO customers(id, customer_name, customer_email, customer_phone) 
    VALUES
        (1, 'Iqbal', 'Iqbal@gmail.com', 08887899978),
        (2, 'Desi', 'Desi@gmail.com', 08678967899),
        (3, 'Rahman', 'Rahman@gmail.com', 0823423444),
        (4, 'Yuli', 'Yuli@gmail.com', 08128945344),
        (5, 'Kair', 'Kair@gmail.com', 08432930000),
        (16, 'Yuandika', 'Yuandika@gmail.com', 08289239327);