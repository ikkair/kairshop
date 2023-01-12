// Import pg for accessing postgres database
const { Pool } = require("pg");
// Database configs
const pool = new Pool({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT
})

// Function to query all or search product table
function selectAllProduct(querySearch, querySortBy, querySort, queryLimit, queryOffset){
    return pool.query(
        `SELECT * FROM products WHERE product_name LIKE '%${querySearch}%' `+
        `ORDER BY ${querySortBy} ${querySort} LIMIT ${queryLimit} OFFSET ${queryOffset}`
    )
}

// Function to get record from id
function selectProduct(queryId){
    return pool.query(
        `SELECT * FROM products WHERE id=${queryId}`
    );
}

// Function to insert 
function insertProduct(queryObject){
    const {id, product_name, product_price} = queryObject;
    return pool.query(
        `INSERT INTO products(id, product_name, product_price) `+
        `VALUES(${id}, '${product_name}', ${product_price})`
    );
}

// Function to update record
function updateProduct(queryObject){
    const {id, product_name, product_price} = queryObject; 
    return pool.query(
        `UPDATE products SET product_name='${product_name}', `+
        `product_price='${product_price}' WHERE id=${id}`

    );
}

// Function to delete record from id
function deleteProduct(queryId){
    return pool.query(
        `DELETE FROM products WHERE id=${queryId}`
    );
}


// Function to count products
function countProduct(){
    return pool.query(
        `SELECT COUNT(*) FROM products`
    );
}

// Export function to controller 
module.exports = {
    selectAllProduct,
    selectProduct,
    insertProduct,
    updateProduct,
    countProduct,
    deleteProduct
};