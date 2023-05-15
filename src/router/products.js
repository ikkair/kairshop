// Import express and router
const express = require("express");
const router = express.Router();

// Import upload
const uploadMiddleware = require("../middleware/upload");

// Import auth
const authMiddleware = require("../middleware/auth");

// Import controller functions
const productController = require("../controller/products.js");

// Route link to controller
router.get("/", productController.getAllProducts);
router.get("/:id", productController.getDetailProduct);
// router.post('/', authMiddleware.authToken, authMiddleware.authoSeller, uploadMiddleware.single("product_photo"), productController.createProduct);
router.post(
  "/",
  uploadMiddleware.single("product_photo"),
  productController.createProduct
);
router.put(
  "/:id",
  // authMiddleware.authToken,
  // authMiddleware.authoSeller,
  uploadMiddleware.single("product_photo"),
  productController.updateProduct
);
router.delete(
  "/:id",
  // authMiddleware.authToken,
  // authMiddleware.authoSeller,
  productController.deleteProduct
);

// Export router to index.js at router folder
module.exports = router;
