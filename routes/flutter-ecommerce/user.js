const express = require('express');
const UserController = require('../../controllers/flutter-ecommerce/UserController');

const router = express.Router();

router.get('/getAllUsers', UserController.getAllUsers);

module.exports = router;
