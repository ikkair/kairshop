// Import database config from config folder
const {pool} = require("../config/db");

// Function to query all or search customer table
function selectAllCustomer(querySearch, querySortBy, querySort, queryLimit, queryOffset){
    return pool.query(
        `SELECT * FROM customers WHERE customer_name LIKE '%${querySearch}%' `+
        `ORDER BY ${querySortBy} ${querySort} LIMIT ${queryLimit} OFFSET ${queryOffset}`
    )
}

// Function to get record from id
function selectCustomer(queryId){
    return pool.query(
        `SELECT * FROM customers WHERE id='${queryId}'`
    );
}

// Function to get record from email
function selectEmailCustomer(queryEmail){
    return pool.query(
        `SELECT * FROM customers WHERE customer_email='${queryEmail}'`
    );
}

// Function to insert 
function insertCustomer(queryObject){
    const {queryPwd, queryId, customer_name, customer_email, customer_phone, customer_role} = queryObject;
    return pool.query(
        `INSERT INTO customers(id, customer_name, customer_email, customer_phone, customer_password, customer_role) `+
        `VALUES('${queryId}', '${customer_name}', '${customer_email}', ${customer_phone}, '${queryPwd}', '${customer_role}')`
    );
}

// Function to update record
function updateCustomer(queryObject){
    const {id, customer_name, customer_email, customer_phone} = queryObject; 
    return pool.query(
        `UPDATE customers SET customer_name='${customer_name}', `+
        `customer_email='${customer_email}', customer_phone=${customer_phone} `+
        `WHERE id='${id}'`

    );
}

// Function to delete record from id
function deleteCustomer(queryId){
    return pool.query(
        `DELETE FROM customers WHERE id='${queryId}'`
    );
}


// Function to count customers
function countCustomer(){
    return pool.query(
        `SELECT COUNT(*) FROM customers`
    );
}

// Export function to controller 
module.exports = {
    selectAllCustomer,
    selectEmailCustomer,
    selectCustomer,
    insertCustomer,
    updateCustomer,
    countCustomer,
    deleteCustomer
};