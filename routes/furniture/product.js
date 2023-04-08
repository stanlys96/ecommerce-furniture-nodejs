const express = require('express');
const ProductController = require('../../controllers/furniture/ProductController');

const router = express.Router();

router.get('/getAllProducts', ProductController.getAllProducts);

module.exports = router;
