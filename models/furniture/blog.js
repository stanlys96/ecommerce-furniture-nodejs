const pool = require("../../database/db");

class Blog {
  static async getAllBlogs() {
    try {
      const blogs = await pool.query("SELECT * FROM blog ORDER BY id ASC");
      return blogs;
    } catch (e) {
      console.log(e);
    }
  }

  static async getBlogById({ id }) {
    try {
      const blog = await pool.query("SELECT * FROM blog WHERE id = $1", [id]);
      return { msg: "success", data: blog.rows };
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = Blog;
