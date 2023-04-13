const Product = require("../../models/flutter-ecommerce/product");

class ProductController {
  static async getAllProducts(req, res, next) {
    try {
      const data = await Product.getAllProducts();
      let msg = "";
      if (data.rows.length > 0) {
        msg = "success";
      } else {
        msg = "no data";
      }
      res.status(200).json({ msg, data: data.rows });
    } catch (e) {
      console.log(e);
    }
  }

  static async getProductsByCategory(req, res, next) {
    try {
      const data = await Product.getProductsByCategory(req.params);
      let msg = "";
      if (data.rows.length > 0) {
        msg = "success";
      } else {
        msg = "no data";
      }
      res.status(200).json({ msg, data: data.rows });
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = ProductController;
