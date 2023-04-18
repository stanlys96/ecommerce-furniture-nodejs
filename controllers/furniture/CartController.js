const Cart = require("../../models/furniture/cart");

class CartController {
  static async getCart(req, res, next) {
    try {
      const data = await Cart.getCart(req.params);
      return data;
    } catch (e) {
      console.log(e);
    }
  }

  static async addToCart(req, res, next) {
    try {
      const data = await Cart.addToCart(req.body);
      return data;
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = CartController;
