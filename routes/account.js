const express = require("express");
const AccountController = require("../controllers/AccountController");

const router = express.Router();

router.post("/register", AccountController.register);
router.post("/login", AccountController.login);
router.get("/getAllAccounts", AccountController.getAllAccounts);

module.exports = router;
