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
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader("Access-Control-Allow-Credentials", "true");
      res.setHeader("Access-Control-Max-Age", "1800");
      res.setHeader("Access-Control-Allow-Headers", "content-type");
      res.setHeader(
        "Access-Control-Allow-Methods",
        "PUT, POST, GET, DELETE, PATCH, OPTIONS"
      );
      res.status(200).json(data);
    } catch (e) {
      console.log(e);
    }
  }

  static async updateCart(req, res, next) {
    try {
      const data = await Cart.updateCart(req.body);
      res.status(200).json(data);
    } catch (e) {
      console.log(e);
    }
  }

  static async deleteCart(req, res, next) {
    try {
      const data = await Cart.deleteCart(req.body);
      res.status(200).json(data);
    } catch (e) {
      console.log(e);
    }
  }

  static async deleteAllCart(req, res, next) {
    try {
      const data = await Cart.deleteAllCart(req.body);
      res.status(200).json(data);
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = CartController;
