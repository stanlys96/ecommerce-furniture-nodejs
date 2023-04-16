const express = require("express");
const BlogController = require("../../controllers/furniture/BlogController");

const router = express.Router();

router.get("/getAllBlogs", BlogController.getAllBlogs);
router.get("/getBlog/:id", BlogController.getBlogById);

module.exports = router;
