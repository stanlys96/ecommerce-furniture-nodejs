const express = require("express");
const ProductController = require("../../controllers/furniture/ProductController");

const router = express.Router();

router.get("/getAllProducts", ProductController.getAllProducts);
router.get("/getProduct/:id", ProductController.getProductById);

module.exports = router;
