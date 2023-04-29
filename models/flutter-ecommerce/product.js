const pool = require("../../database/db");

class Product {
  static async getAllProducts() {
    try {
      const products = await pool.query(
        "SELECT * FROM products ORDER BY id ASC"
      );
      return products;
    } catch (e) {
      console.log(e);
    }
  }

  static async getProductsByCategory({ category }) {
    try {
      const products = await pool.query(
        "SELECT * FROM products WHERE category = $1 ORDER BY id ASC",
        [category]
      );
      return products;
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = Product;
