const Favorite = require("../../models/flutter-ecommerce/favorite");

class FavoriteController {
  static async getUserFavorites(req, res, next) {
    try {
      const data = await Favorite.getUserFavorites(req.params);
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

  static async addToFavorites(req, res, next) {
    try {
      const data = await Favorite.addToFavorite(req.body);
      res.status(200).json(data);
    } catch (e) {
      console.log(e);
    }
  }

  static async deleteFavorite(req, res, next) {
    try {
      const data = await Favorite.deleteFavorite(req.body);
      res.status(200).json(data);
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = FavoriteController;
