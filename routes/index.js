const express = require("express");
const furnitureProductRoutes = require("./furniture/product");
const furnitureAccountRoutes = require("./furniture/account");
const furnitureBlogRoutes = require("./furniture/blog");
const flutterEcommerceUserRoutes = require("./flutter-ecommerce/user");
const flutterEcommerceProductRoutes = require("./flutter-ecommerce/product");

const router = express.Router();

// Furniture
router.use("/furniture/products", furnitureProductRoutes);
router.use("/furniture/account", furnitureAccountRoutes);
router.use("/furniture/blog", furnitureBlogRoutes);

// Flutter Ecommerce
router.use("/flutter-ecommerce/users", flutterEcommerceUserRoutes);
router.use("/flutter-ecommerce/products", flutterEcommerceProductRoutes);

module.exports = router;
