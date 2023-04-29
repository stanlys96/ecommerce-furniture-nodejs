const express = require("express");
const UserController = require("../../controllers/flutter-ecommerce/UserController");

// WALAO

const router = express.Router();

router.get("/getAllUsers", UserController.getAllUsers);
router.get("/getAdminChats/:user_id", UserController.getAdminChats);
router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.post("/verify", UserController.verify);

module.exports = router;
