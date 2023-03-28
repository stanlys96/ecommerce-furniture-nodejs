const express = require("express");
const productRoutes = require("./product");
const accountRoutes = require("./account");
const blogRoutes = require("./blog");

const router = express.Router();

router.use("/products", productRoutes);
router.use("/account", accountRoutes);
router.use("/blog", blogRoutes);

module.exports = router;
