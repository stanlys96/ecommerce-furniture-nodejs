const pool = require("../../database/db");
const dayjs = require("dayjs");
var utc = require("dayjs/plugin/utc");
var timezone = require("dayjs/plugin/timezone");
var advanced = require("dayjs/plugin/advancedFormat");

class Order {
  static async getUserOrders({ user_id }) {
    try {
      const cart = await pool.query(
        "SELECT * FROM user_order WHERE user_id = $1 ORDER BY id DESC",
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
      dayjs.extend(timezone);
      dayjs.extend(utc);
      dayjs.extend(advanced);
      const addOrder = await pool.query(
        "INSERT INTO user_order (order_number, tracking_number, status, order_date, shipping_address, payment_method, card_number, delivery_method, delivery_fee, discount, total_amount, products, user_id) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING *;",
        [
          order_number,
          tracking_number,
          status,
          dayjs().tz("Asia/Jakarta").format(),
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
      const productsArray = JSON.parse(products);
      for (const product of productsArray) {
        await pool.query(
          "UPDATE products SET stock = stock - $1 WHERE id = $2 RETURNING *;",
          [product.amount, product.product_id]
        );
      }
      return { msg: "success", data: addOrder.rows };
    } catch (e) {
      console.log(e);
      return { msg: "failed" };
    }
  }
}

module.exports = Order;
