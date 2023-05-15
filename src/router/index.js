// Import express and router
const express = require("express");
const router = express.Router();

// Import route
const productRouter = require('./products')
const categoryRouter = require('./category')
const customerRouter = require('./customer')
const sellerRouter = require('./seller')

// Take the route
router.use('/products', productRouter);
router.use('/category', categoryRouter);
router.use('/customer', customerRouter);
router.use('/seller', sellerRouter);

// Export to be used in index.js at root
module.exports = router;