// Import pg for accessing postgres database
const { Pool } = require("pg");
// Database configs
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'tugas_backend',
    password: "",
    port: 5432
})

// Function to query all or search product table
function selectAllProduct(querySearch, querySortBy, querySort, queryLimit, queryOffset){
    return pool.query(
        `SELECT * FROM products WHERE product_name LIKE '%${querySearch}%' `+
        `ORDER BY ${querySortBy} ${querySort} LIMIT ${queryLimit} OFFSET ${queryOffset}`
    )
}

// Export function to controller 
module.exports = {
    selectAllProduct
};