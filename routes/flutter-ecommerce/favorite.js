const express = require("express");
const FavoritesController = require("../../controllers/flutter-ecommerce/FavoritesController");

const router = express.Router();

router.get("/getFavorites/:user_id", FavoritesController.getUserFavorites);
router.post("/addToFavorites", FavoritesController.addToFavorites);

module.exports = router;
