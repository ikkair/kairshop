// Import express and router
const express = require("express");
const router = express.Router();

// Import route
const productRouter = require('./products')
const categoryRouter = require('./category')
const customerRouter = require('./customer')

// Take the route
router.use('/products', productRouter);
router.use('/category', categoryRouter);
router.use('/customer', customerRouter);

// Export to be used in index.js at root
module.exports = router;