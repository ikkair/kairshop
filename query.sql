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
DROP TABLE IF EXISTS category;

-- Creating category table
CREATE TABLE category(
    id INT PRIMARY KEY,
    category_type VARCHAR(255) NOT NULL
);

-- Dummy data category
INSERT INTO category(id, category_type) 
    VALUES
        (1, 'Elektronik'),
        (2, 'Baju'),
        (3, 'Celana'),
        (4, 'Alat Memasak'),
        (5, 'Mainan'),
        (6, 'Software'),
        (7, 'Memory');