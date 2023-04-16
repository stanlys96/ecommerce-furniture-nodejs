const Blog = require("../../models/furniture/blog");

class BlogController {
  static async getAllBlogs(req, res, next) {
    try {
      const data = await Blog.getAllBlogs();
      res.status(200).json(data.rows);
    } catch (e) {
      console.log(e);
    }
  }

  static async getBlogById(req, res, next) {
    try {
      const data = await Blog.getBlogById(req.params);
      res.status(200).json(data);
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = BlogController;
