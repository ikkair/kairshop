// Import express and router
const express = require("express");
const router = express.Router();

// Import controller functions
const customerController = require("../controller/customers.js");

// Route link to controller
router.get('/', customerController.getAllCustomers);
router.get('/:id', customerController.getDetailCustomer);
router.post('/register', customerController.registerCustomer);
router.post('/login', customerController.loginCustomer);
router.put('/:id', customerController.updateCustomer);
router.delete('/:id', customerController.deleteCustomer);

// Export router to index.js at router folder
module.exports = router;