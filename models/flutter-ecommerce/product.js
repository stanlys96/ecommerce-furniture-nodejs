const pool = require("../../database/db");

class Product {
  static async getAllProducts() {
    try {
      const products = await pool.query(
        "SELECT * FROM flutter_ecommerce.products"
      );
      return products;
    } catch (e) {
      console.log(e);
    }
  }

  static async getProductsByCategory({ category }) {
    try {
      const products = await pool.query(
        "SELECT * FROM flutter_ecommerce.products WHERE category = $1",
        [category]
      );
      return products;
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = Product;
