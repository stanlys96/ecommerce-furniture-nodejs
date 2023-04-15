const express = require("express");
const furnitureProductRoutes = require("./furniture/product");
const furnitureAccountRoutes = require("./furniture/account");
const furnitureBlogRoutes = require("./furniture/blog");
const flutterEcommerceUserRoutes = require("./flutter-ecommerce/user");
const flutterEcommerceProductRoutes = require("./flutter-ecommerce/product");
const flutterEcommerceFavoritesRoutes = require("./flutter-ecommerce/favorite");
const flutterEcommerceCartRoutes = require("./flutter-ecommerce/cart");
const flutterEcommerceOrderRoutes = require("./flutter-ecommerce/order");

const router = express.Router();

// Furniture
router.use("/furniture/products", furnitureProductRoutes);
router.use("/furniture/account", furnitureAccountRoutes);
router.use("/furniture/blog", furnitureBlogRoutes);

// Flutter Ecommerce
router.use("/flutter-ecommerce/users", flutterEcommerceUserRoutes);
router.use("/flutter-ecommerce/products", flutterEcommerceProductRoutes);
router.use("/flutter-ecommerce/favorites", flutterEcommerceFavoritesRoutes);
router.use("/flutter-ecommerce/cart", flutterEcommerceCartRoutes);
router.use("/flutter-ecommerce/orders", flutterEcommerceOrderRoutes);

module.exports = router;
