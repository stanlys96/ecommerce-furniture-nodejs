const Order = require("../../models/flutter-ecommerce/order");

class OrderController {
  static async getUserOrders(req, res, next) {
    try {
      const data = await Order.getUserOrders(req.params);
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

  static async addOrder(req, res, next) {
    try {
      const data = await Order.addOrder(req.body);
      res.status(200).json(data);
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = OrderController;
