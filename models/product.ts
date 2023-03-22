import { pool } from "../database/db";

class Product {
  static async getAllProducts() {
    try {
      const data = await pool.query("SELECT * FROM products");
      return data;
    } catch (e) {
      console.log(e);
    }
  }
}

export default Product;
