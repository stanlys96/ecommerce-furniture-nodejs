const express = require("express");
const ChatController = require("../../controllers/flutter-ecommerce/ChatController");

const router = express.Router();

router.get("/getChat/:user_id", ChatController.getNormalUserChat);

module.exports = router;
