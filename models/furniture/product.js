const pool = require("../../database/db");

class Product {
  static async getAllProducts() {
    try {
      const data = await pool.query("SELECT * FROM products ORDER BY id ASC");
      return data;
    } catch (e) {
      console.log(e);
    }
  }

  static async getProductById({ id }) {
    try {
      const data = await pool.query("SELECT * FROM products WHERE id = $1", [
        id,
      ]);
      return { msg: "success", data: data.rows };
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = Product;
