const express = require("express");
const CartController = require("../../controllers/furniture/CartController");

const router = express.Router();

router.get("/getCart/:user_id", CartController.getCart);
router.post("/addToCart", CartController.addToCart);

module.exports = router;
