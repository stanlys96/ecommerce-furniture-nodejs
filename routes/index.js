const express = require("express");
const productRoutes = require("./product");
const accountRoutes = require("./account");

const router = express.Router();

router.use("/products", productRoutes);
router.use("/account", accountRoutes);

module.exports = router;
