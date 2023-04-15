const pool = require("../../database/db");
const dayjs = require("dayjs");

class Order {
  static async getUserOrders({ user_id }) {
    try {
      const cart = await pool.query(
        "SELECT * FROM flutter_ecommerce.user_order WHERE user_id = $1 ORDER BY id DESC",
        [user_id]
      );
      return cart;
    } catch (e) {
      console.log(e);
    }
  }

  static async addOrder({
    order_number,
    tracking_number,
    status,
    shipping_address,
    payment_method,
    card_number,
    delivery_method,
    delivery_fee,
    discount,
    total_amount,
    products,
    user_id,
  }) {
    try {
      const addOrder = await pool.query(
        "INSERT INTO flutter_ecommerce.user_order (order_number, tracking_number, status, order_date, shipping_address, payment_method, card_number, delivery_method, delivery_fee, discount, total_amount, products, user_id) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING *;",
        [
          order_number,
          tracking_number,
          status,
          dayjs().tz("Asia/Jakarta").format("DD/MM/YYYY z"),
          shipping_address,
          payment_method,
          card_number,
          delivery_method,
          delivery_fee,
          discount,
          total_amount,
          products,
          user_id,
        ]
      );
      return { msg: "success", data: addOrder.rows };
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = Order;
