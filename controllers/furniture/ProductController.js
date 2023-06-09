const Product = require("../../models/furniture/product");

class ProductController {
  static async getAllProducts(req, res, next) {
    try {
      const data = await Product.getAllProducts();
      res.status(200).json(data.rows);
    } catch (e) {
      console.log(e);
    }
  }

  static async getProductById(req, res, next) {
    try {
      const data = await Product.getProductById(req.params);
      res.status(200).json(data);
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = ProductController;
