const pool = require("../../database/db");

class Cart {
  static async getUserCarts({ user_id }) {
    try {
      const cart = await pool.query(
        "SELECT * FROM flutter_ecommerce.products p JOIN flutter_ecommerce.user_cart u ON p.id = u.product_id WHERE u.user_id = $1 ORDER BY u.id ASC",
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
          if (
            parseInt(userCartAmount) + parseInt(amount) >
            parseInt(productStock)
          ) {
            return { msg: "exceeds_stock" };
          } else {
            const addToCart = await pool.query(
              "UPDATE flutter_ecommerce.user_cart SET amount = amount + $3 WHERE user_id = $1 AND product_id = $2 RETURNING *;",
              [user_id, product_id, parseInt(amount)]
            );
            return { msg: "success", data: addToCart.rows };
          }
        } else {
          const addToCart = await pool.query(
            "INSERT INTO flutter_ecommerce.user_cart (user_id, product_id, amount) VALUES ($1, $2, $3) RETURNING *;",
            [user_id, product_id, amount]
          );
          return { msg: "success", data: addToCart.rows };
        }
      }
    } catch (e) {
      console.log(e);
    }
  }

  static async updateCart({ user_id, product_id, amount }) {
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
          if (parseInt(amount) > parseInt(productStock)) {
            return { msg: "exceeds_stock" };
          } else {
            const updateCart = await pool.query(
              "UPDATE flutter_ecommerce.user_cart SET amount = $3 WHERE user_id = $1 AND product_id = $2 RETURNING *;",
              [user_id, product_id, parseInt(amount)]
            );
            return { msg: "success", data: updateCart.rows };
          }
        } else {
          const updateCart = await pool.query(
            "INSERT INTO flutter_ecommerce.user_cart (user_id, product_id, amount) VALUES ($1, $2, $3) RETURNING *;",
            [user_id, product_id, amount]
          );
          return { msg: "success", data: updateCart.rows };
        }
      }
    } catch (e) {
      console.log(e);
    }
  }

  static async deleteCart({ user_id, product_id }) {
    try {
      const productExists = await pool.query(
        "SELECT * FROM flutter_ecommerce.products WHERE id = $1",
        [product_id]
      );
      if (productExists.rows.length > 0) {
        const userHasProduct = await pool.query(
          "SELECT * FROM flutter_ecommerce.user_cart WHERE user_id = $1 AND product_id = $2",
          [user_id, product_id]
        );
        if (userHasProduct.rows.length > 0) {
          const deleteCart = await pool.query(
            "DELETE FROM flutter_ecommerce.user_cart WHERE user_id = $1 AND product_id = $2 RETURNING *;",
            [user_id, product_id]
          );
          return { msg: "success", data: deleteCart.rows };
        }
      }
    } catch (e) {
      console.log(e);
    }
  }

  static async deleteAllCart({ user_id }) {
    try {
      const deleteAllCart = await pool.query(
        "DELETE FROM flutter_ecommerce.user_cart WHERE user_id = $1 RETURNING *;",
        [user_id]
      );
      return { msg: "success", data: deleteAllCart.rows };
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = Cart;
