-- Creating database
CREATE DATABASE tugas_backend;

-- Creating products table
CREATE TABLE products(
    id VARCHAR(40) PRIMARY KEY,
    product_name VARCHAR(255) NOT NULL,
    product_price INT NOT NULL,
    product_photo VARCHAR(255) 
);

-- Creating category table
CREATE TABLE categories(
    id VARCHAR(40) PRIMARY KEY,
    category_type VARCHAR(255) NOT NULL
);

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

-- Creating customers table
CREATE TABLE sellers(
    id CHAR(36) PRIMARY KEY,
    seller_name VARCHAR(255) NOT NULL,
    seller_email VARCHAR(255) UNIQUE NOT NULL,
    seller_phone BIGINT NOT NULL,
    seller_password CHAR(60) NOT NULL,
    seller_role role NOT NULL 
);
