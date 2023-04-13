const pool = require("../../database/db");

class Favorite {
  static async getUserFavorites({ user_id }) {
    try {
      const favorites = await pool.query(
        "SELECT * FROM flutter_ecommerce.products p JOIN flutter_ecommerce.user_favorite u ON p.id = u.product_id WHERE u.user_id = $1",
        [user_id]
      );
      return favorites;
    } catch (e) {
      console.log(e);
    }
  }

  static async addToFavorite({ user_id, product_id }) {
    try {
      const userHasProduct = await pool.query(
        "SELECT * FROM flutter_ecommerce.user_favorite WHERE user_id = $1 AND product_id = $2",
        [user_id, product_id]
      );
      if (userHasProduct.rowCount > 0) {
        return {
          msg: "This product has been added to favorites",
        };
      } else {
        const addToFavorites = await pool.query(
          "INSERT INTO flutter_ecommerce.user_favorite(user_id, product_id) VALUES($1, $2) RETURNING *;",
          [user_id, product_id]
        );
        return { msg: "Success", data: addToFavorites.rows };
      }
    } catch (e) {
      console.log(e);
    }
  }

  static async deleteFavorite({user_id, product_id}) {
    try {
      const userHasProduct = await pool.query(
        "SELECT * FROM flutter_ecommerce.user_favorite WHERE user_id = $1 AND product_id = $2",
        [user_id, product_id]
      );
      if (userHasProduct.rowCount > 0) {
        const deleteQuery = await pool.query("DELETE FROM flutter_ecommerce.user_favorite WHERE user_id = $1 AND product_id = $2 RETURNING *;", [user_id, product_id]);
        return { msg: "Success", data: deleteQuery.rows };
      } else {
        return { msg: "Favorite doesn't exist" };
      }
    } catch(e) {
      console.log(e);
    }
  }
}

module.exports = Favorite;
