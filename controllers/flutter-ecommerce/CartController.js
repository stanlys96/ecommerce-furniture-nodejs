const Cart = require("../../models/flutter-ecommerce/cart");

class CartController {
  static async getUserCart(req, res, next) {
    try {
      const data = Cart.getUserCarts(req.params);
      let message = "";
      if (data.rows.length > 0) {
        message = "success";
      } else {
        message = "no data";
      }
      res.status(200).json({ message, data: data.rows });
    } catch (e) {
      console.log(e);
    }
  }

  static async addToCart(req, res, next) {
    try {
      const data = Cart.addToCart(req.body);
      res.status(200).json(data);
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = CartController;
