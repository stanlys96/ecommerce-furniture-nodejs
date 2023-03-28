const pool = require("../database/db");

class Blog {
  static async getAllBlogs() {
    try {
      const blogs = await pool.query("SELECT * FROM blog ORDER BY blog_id ASC");
      return blogs;
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = Blog;
