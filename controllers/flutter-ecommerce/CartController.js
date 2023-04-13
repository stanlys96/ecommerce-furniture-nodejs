const Cart = require("../../models/flutter-ecommerce/cart");

class CartController {
  static async getUserCart(req, res, next) {
    try {
      const data = await Cart.getUserCarts(req.params);
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

  static async addToCart(req, res, next) {
    try {
      const data = await Cart.addToCart(req.body);
      res.status(200).json(data);
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = CartController;
