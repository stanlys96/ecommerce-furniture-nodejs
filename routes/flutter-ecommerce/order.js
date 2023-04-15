const express = require("express");
const OrderController = require("../../controllers/flutter-ecommerce/OrderController");

const router = express.Router();

router.get("/getOrders/:user_id", OrderController.getUserOrders);
router.post("/addOrder", OrderController.addOrder);

module.exports = router;
