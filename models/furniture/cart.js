const pool = require("../../database/db");

class Cart {
  static async getCart({ user_id }) {
    try {
      const cart = await pool.query("SELECT * FROM cart WHERE user_id = $1", [
        user_id,
      ]);
      return { msg: "success", data: cart.rows };
    } catch (e) {
      console.log(e);
    }
  }

  static async addToCart({ user_id, product_id, quantity }) {
    try {
      const productExists = await pool.query(
        "SELECT * FROM products WHERE id = $1",
        [product_id]
      );
      if (productExists.rows.length > 0) {
        const userHasProduct = await pool.query(
          "SELECT * FROM cart WHERE user_id = $1 AND product_id = $2",
          [user_id, product_id]
        );
        if (userHasProduct.rows.length > 0) {
          const updateCart = await pool.query(
            "UPDATE cart SET quantity = quantity + $1 WHERE user_id = $2 AND product_id = $3 RETURNING *;",
            [parseInt(quantity), user_id, product_id]
          );
          return { msg: "success", data: updateCart.rows };
        } else {
          const insertCart = await pool.query(
            "INSERT INTO cart(user_id, product_id, quantity) VALUES($1, $2, $3) RETURNING *;",
            [user_id, product_id, parseInt(quantity)]
          );
          return { msg: "success", data: insertCart.rows };
        }
      }
    } catch (e) {
      console.log(e);
      return { msg: "failed", error: e };
    }
  }
}

module.exports = Cart;
