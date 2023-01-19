// Import express and router
const express = require("express");
const router = express.Router();

// Import auth
const authMiddleware = require("../middleware/auth")

// Import controller functions
const categoryController = require("../controller/category");

// Route link to controller
router.get('/', categoryController.getAllCategory);
router.get('/:id', categoryController.getDetailCategory);
router.post('/', authMiddleware.auth, categoryController.createCategory);
router.put('/:id', authMiddleware.auth, categoryController.updateCategory);
router.delete('/:id', authMiddleware.auth,categoryController.deleteCategory);

// Export router to index.js at router folder
module.exports = router;