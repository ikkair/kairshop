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

// Function to query all or search category table
function selectAllCategory(querySearch, querySortBy, querySort, queryLimit, queryOffset){
    return pool.query(
        `SELECT * FROM category WHERE category_type LIKE '%${querySearch}%' `+
        `ORDER BY ${querySortBy} ${querySort} LIMIT ${queryLimit} OFFSET ${queryOffset}`
    )
}

// Function to get record from id
function selectCategory(queryId){
    return pool.query(
        `SELECT * FROM category WHERE id=${queryId}`
    );
}

// Function to insert 
function insertCategory(queryObject){
    const {id, category_type} = queryObject;
    return pool.query(
        `INSERT INTO category(id, category_type) `+
        `VALUES(${id}, '${category_type}')`
    );
}

// Function to update record
function updateCategory(queryObject){
    const {id, category_type} = queryObject; 
    return pool.query(
        `UPDATE category SET category_type='${category_type}' `+
        `WHERE id=${id}`
    );
}

// Function to delete record from id
function deleteCategory(queryId){
    return pool.query(
        `DELETE FROM category WHERE id=${queryId}`
    );
}


// Function to count category 
function countCategory(){
    return pool.query(
        `SELECT COUNT(*) FROM category`
    );
}

// Export function to controller 
module.exports = {
    selectAllCategory,
    selectCategory,
    insertCategory,
    updateCategory,
    countCategory,
    deleteCategory
};