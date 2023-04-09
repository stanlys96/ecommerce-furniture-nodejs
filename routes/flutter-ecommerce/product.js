const express = require("express");
const ProductController = require("../../controllers/flutter-ecommerce/ProductController");

const router = express.Router();

router.get("/getAllProducts", ProductController.getAllProducts);
router.get("/getProducts/:category", ProductController.getProductsByCategory);

module.exports = router;
