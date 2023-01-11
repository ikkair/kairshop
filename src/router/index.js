// Import express and router
const express = require("express");
const router = express.Router();

// Import route
const productRouter = require('./products')

// Take the route
router.use('/products', productRouter);

// Export to be used in index.js at root
module.exports = router;