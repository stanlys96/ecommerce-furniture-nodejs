const express = require("express");
const ProductController = require("../controllers/ProductController");

const router = express.Router();

router.get("/getAllProducts", ProductController.getAllProducts);

module.exports = router;
