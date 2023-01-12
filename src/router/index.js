// Import express and router
const express = require("express");
const router = express.Router();

// Import route
const productRouter = require('./products')
const categoryRouter = require('./category')

// Take the route
router.use('/products', productRouter);
router.use('/category', categoryRouter);

// Export to be used in index.js at root
module.exports = router;