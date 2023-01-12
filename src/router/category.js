// Import express and router
const express = require("express");
const router = express.Router();

// Import controller functions
const categoryController = require("../controller/category")

// Route link to controller
router.get('/', categoryController.getAllCategory);
router.get('/:id', categoryController.getDetailCategory);
router.post('/', categoryController.createCategory);
router.put('/:id', categoryController.updateCategory);
router.delete('/:id', categoryController.deleteCategory);

// Export router to index.js at router folder
module.exports = router;