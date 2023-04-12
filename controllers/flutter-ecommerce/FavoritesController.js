const Favorite = require("../../models/flutter-ecommerce/favorite");

class FavoriteController {
  static async getUserFavorites(req, res, next) {
    try {
      const data = await Favorite.getUserFavorites(req.params);
      let message = "";
      if (data.rows.length > 0) {
        message = "success";
      } else {
        message = "no data";
      }
      res.status(200).json({ message, data: data.rows });
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = FavoriteController;
