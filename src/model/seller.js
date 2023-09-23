// Import database config from config folder
const { pool } = require("../config/db");

// Function to query all or search seller table
function selectAllSellers(querySearch, querySortBy, querySort, queryLimit, queryOffset) {
  return pool.query(
    `SELECT * FROM sellers WHERE seller_name LIKE '%${querySearch}%' ` +
    `ORDER BY ${querySortBy} ${querySort} LIMIT ${queryLimit} OFFSET ${queryOffset}`
  )
}

// Function to get record from id
function selectSeller(queryId) {
  return pool.query(
    `SELECT * FROM sellers WHERE id='${queryId}'`
  );
}

// Function to get record from email
function selectEmailSeller(queryEmail) {
  return pool.query(
    `SELECT * FROM sellers WHERE seller_email='${queryEmail}'`
  );
}

// Function to insert 
function insertSeller(queryObject) {
  const { queryPwd, queryId, seller_name, seller_email, seller_phone, seller_role } = queryObject;
  return pool.query(
    `INSERT INTO sellers(id, seller_name, seller_email, seller_phone, seller_password, seller_role) ` +
    `VALUES('${queryId}', '${seller_name}', '${seller_email}', ${seller_phone}, '${queryPwd}', '${seller_role}')`
  );
}

// Function to update record
function updateSeller(queryObject) {
  const { id, seller_name, seller_email, seller_phone } = queryObject;
  return pool.query(
    `UPDATE sellers SET seller_name='${seller_name}', ` +
    `seller_email='${seller_email}', seller_phone='${seller_phone}' ` +
    `WHERE id='${id}'`

  );
}

// Function to delete record from id
function deleteSeller(queryId) {
  return pool.query(
    `DELETE FROM sellers WHERE id='${queryId}'`
  );
}


// Function to count sellers
function countSeller() {
  return pool.query(
    `SELECT COUNT(*) FROM sellers`
  );
}

// Export function to controller 
module.exports = {
  selectAllSellers,
  selectEmailSeller,
  selectSeller,
  insertSeller,
  updateSeller,
  countSeller,
  deleteSeller
};
