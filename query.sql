-- Inisialisasi Database 
-- Delete database jika ada database bernama yang sama
DROP DATABASE IF EXISTS tugas_backend;

-- Membuat database
CREATE DATABASE tugas_backend;

-- Inisialisasi Table
-- Delete table jika ada table bernama yang sama
DROP TABLE IF EXISTS products;

-- Membuat table customer sebagai Parent
CREATE TABLE products(
    id INT PRIMARY KEY,
    product_name VARCHAR(255) NOT NULL,
    product_price INT NOT NULL
);


-- Select 
SELECT * FROM products WHERE product_name LIKE '%${queryParam}%' 
ORDER BY ${sortBy} ${sort} LIMIT ${limit} OFFSET ${offset};