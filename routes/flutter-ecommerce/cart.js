const express = require("express");
const CartController = require("../../controllers/flutter-ecommerce/CartController");

const router = express.Router();

router.get("/getCart/:user_id", CartController.getUserCart);
router.post("/addToCart", CartController.addToCart);
router.put("/updatedCart", CartController.updateCart);

module.exports = router;