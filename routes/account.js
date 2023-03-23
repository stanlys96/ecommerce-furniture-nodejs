const express = require("express");
const AccountController = require("../controllers/AccountController");

const router = express.Router();

router.post("/register", AccountController.register);
router.get("/getAllAccounts", AccountController.getAllAccounts);

module.exports = router;
