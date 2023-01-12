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
    id INT PRIMARY KEY,
    product_name VARCHAR(255) NOT NULL,
    product_price INT NOT NULL
);


-- Select with search and pagination
SELECT * FROM products WHERE product_name LIKE '%${queryParam}%' 
ORDER BY ${sortBy} ${sort} LIMIT ${limit} OFFSET ${offset};

-- Select using id
SELECT * FROM products WHERE id=${id};

-- Count how many record available in product table
SELECT COUNT(*) FROM products;

-- Insert product
INSERT INTO products(id, product_name, product_price) VALUES(${queryId}, ${queryName}, ${queryPrice});

-- Update product
UPDATE products SET product_name='${queryName}', product_price='${queryPrice}' WHERE id=${queryId};

-- Delete product using id
DELETE FROM products WHERE id=${queryId}

-- Dummy data
INSERT INTO products(id, product_name, product_price) 
    VALUES
        (1, 'gelas bts', 40000),
        (2, 'baju kuning', 55000),
        (3, 'microphone', 100000),
        (4, 'laptop', 3300000),
        (5, 'gundam', 230000),
        (6, 'os', 97800),
        (7, 'smartphone', 552300);



-- Table Init
-- Delete table if same name exist
DROP TABLE IF EXISTS categories;

-- Creating category table
CREATE TABLE categories(
    id INT PRIMARY KEY,
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
        (7, 'Memory');


-- Creating customers table
CREATE TABLE customers(
    id INT PRIMARY KEY,
    customer_name VARCHAR(255) NOT NULL,
    customer_email VARCHAR(255) NOT NULL,
    customer_phone BIGINT NOT NULL
);

-- Dummy data category
INSERT INTO customers(id, customer_name, customer_email, customer_phone) 
    VALUES
        (1, 'Iqbal', 'Iqbal@gmail.com', 08887899978),
        (2, 'Desi', 'Desi@gmail.com', 08678967899),
        (3, 'Rahman', 'Rahman@gmail.com', 0823423444),
        (4, 'Yuli', 'Yuli@gmail.com', 08128945344),
        (5, 'Kair', 'Kair@gmail.com', 08432930000);