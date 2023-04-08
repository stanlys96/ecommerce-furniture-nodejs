const express = require('express');
const BlogController = require('../../controllers/furniture/BlogController');

const router = express.Router();

router.get('/getAllBlogs', BlogController.getAllBlogs);

module.exports = router;
