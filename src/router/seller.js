// Import express and router
const express = require("express");
const router = express.Router();

// Import auth
const authMiddleware = require("../middleware/auth")

// Import controller functions
const sellerController = require("../controller/seller");

// Route link to controller
router.get('/', sellerController.getAllSellers);
router.get('/:id', sellerController.getDetailSeller);
router.post('/register', sellerController.registerSeller);
router.post('/login', sellerController.loginSeller);
router.put('/:id', authMiddleware.authToken, authMiddleware.authoSeller, sellerController.updateSeller);
router.delete('/:id', authMiddleware.authToken, authMiddleware.authoSeller, sellerController.deleteSeller);

// Export router to index.js at router folder
module.exports = router;