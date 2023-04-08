const User = require('../../models/flutter-ecommerce/user');

class UserController {
  static async getAllUsers(req, res, next) {
    try {
      const data = await User.getAllUsers();
      res.status(200).json(data.rows);
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = UserController;
