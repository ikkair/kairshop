-- Inisialisasi Database 
-- Delete database if same name exist
DROP DATABASE IF EXISTS tugas_backend;

-- Creating database
CREATE DATABASE tugas_backend;

-- Inisialisasi Table
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
SELECT COUNT(*) FROM product;

-- Insert product
INSERT INTO product(id, product_name, product_price) VALUE= (${queryId}, ${queryName}, ${queryPrice});

-- Update product
UPDATE product SET product_name='${queryName}', product_price='${queryPrice}' WHERE id=${queryId};

-- Delete product using id
DELETE FROM products WHERE id=${queryId}