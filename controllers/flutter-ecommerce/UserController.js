const User = require("../../models/flutter-ecommerce/user");

class UserController {
  static async getAllUsers(req, res, next) {
    try {
      const data = await User.getAllUsers();
      res.status(200).json(data.rows);
    } catch (e) {
      console.log(e);
    }
  }

  static async register(req, res, next) {
    try {
      const data = await User.register(req.body);
      res.status(200).json(data);
    } catch (e) {
      console.log(e);
    }
  }

  static async login(req, res, next) {
    try {
      const data = await User.login(req.body);
      if (data.msg !== "success") {
        res.status(200).json(data);
      } else {
        res.status(200).json(data);
      }
    } catch (e) {
      console.log(e);
    }
  }

  static async verify(req, res, next) {
    try {
      const data = await User.verify(req.body);
      if (data) {
        res.status(200).json({ msg: "Success", ...data });
      } else {
        res.status(404).json({ msg: "Token is noob" });
      }
    } catch (e) {
      console.log(e);
    }
  }

  static async getAdminChats(req, res, next) {
    try {
      const data = await User.getAdminChats(req.params);
      res.status(200).json(data);
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = UserController;
