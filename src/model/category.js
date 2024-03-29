// Import database config from config folder
const {pool} = require("../config/db");

// Function to query all or search category table
function selectAllCategory(querySearch, querySortBy, querySort, queryLimit, queryOffset){
    return pool.query(
        `SELECT * FROM categories WHERE category_type LIKE '%${querySearch}%' `+
        `ORDER BY ${querySortBy} ${querySort} LIMIT ${queryLimit} OFFSET ${queryOffset}`
    )
}

// Function to get record from id
function selectCategory(queryId){
    return pool.query(
        `SELECT * FROM categories WHERE id='${queryId}'`
    );
}

// Function to insert 
function insertCategory(queryObject, queryId){
    const {category_type} = queryObject;
    return pool.query(
        `INSERT INTO categories(id, category_type) `+
        `VALUES('${queryId}', '${category_type}')`
    );
}

// Function to update record
function updateCategory(queryObject){
    const {id, category_type} = queryObject; 
    return pool.query(
        `UPDATE categories SET category_type='${category_type}' `+
        `WHERE id='${id}'`
    );
}

// Function to delete record from id
function deleteCategory(queryId){
    return pool.query(
        `DELETE FROM categories WHERE id='${queryId}'`
    );
}


// Function to count category 
function countCategory(){
    return pool.query(
        `SELECT COUNT(*) FROM categories`
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
