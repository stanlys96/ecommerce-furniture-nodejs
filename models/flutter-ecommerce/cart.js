const pool = require("../../database/db");

class Cart {
  static async getUserCarts({ user_id }) {
    try {
      const cart = await pool.query(
        "SELECT * FROM flutter_ecommerce.products p JOIN flutter_ecommerce.user_cart u ON p.id = u.product_id WHERE u.user_id = $1",
        [user_id]
      );
      return cart;
    } catch (e) {
      console.log(e);
    }
  }

  static async addToCart({ user_id, product_id, amount }) {
    try {
      const productExists = await pool.query(
        "SELECT * FROM flutter_ecommerce.products WHERE id = $1",
        [product_id]
      );
      if (productExists.rows.length > 0) {
        const productStock = productExists.rows[0].stock;
        const userHasProduct = await pool.query(
          "SELECT * FROM flutter_ecommerce.user_cart WHERE user_id = $1 AND product_id = $2",
          [user_id, product_id]
        );

        if (userHasProduct.rows.length > 0) {
          const userCartAmount = userHasProduct.rows[0].amount;
          if (userCartAmount + amount > productStock) {
            return { msg: "exceeds_stock" };
          } else {
            const addToCart = await pool.query(
              "UPDATE flutter_ecommerce.user_cart SET amount = amount + $3 WHERE user_id = $1 AND product_id = $2 RETURNING *;",
              [user_id, product_id, parseInt(amount)]
            );
            return { msg: "success", data: addToCart };
          }
        } else {
          const addToCart = await pool.query(
            "INSERT INTO flutter_ecommerce.user_cart (user_id, product_id, amount) VALUES ($1, $2, $3) RETURNING *;",
            [user_id, product_id, amount]
          );
          return { msg: "success", data: addToCart };
        }
      }
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = Cart;
