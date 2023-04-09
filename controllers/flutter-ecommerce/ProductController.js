const Product = require("../../models/flutter-ecommerce/product");

class ProductController {
  static async getAllProducts(req, res, next) {
    try {
      const data = await Product.getAllProducts();
      res.status(200).json(data.rows);
    } catch (e) {
      console.log(e);
    }
  }

  static async getProductsByCategory(req, res, next) {
    try {
      const data = await Product.getProductsByCategory(req.params);
      res.status(200).json(data.rows);
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = ProductController;
