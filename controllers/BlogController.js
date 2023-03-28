const Blog = require("../models/blog");

class BlogController {
  static async getAllBlogs(req, res, next) {
    try {
      const data = await Blog.getAllBlogs();
      res.status(200).json(data.rows);
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = BlogController;
