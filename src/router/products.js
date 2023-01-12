// Import express and router
const express = require("express");
const router = express.Router();

// Import controller functions
const productController = require("../controller/products.js");

// Route link to controller
router.get('/', productController.getAllProducts);
router.get('/:id', productController.getDetailProduct);
router.post('/', productController.createProduct);
router.put('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

// Export router to index.js at router folder
module.exports = router;