const Account = require("../models/account");

class AccountController {
  static async getAllAccounts(req, res, next) {
    try {
      const data = await Account.getAllAccounts();
      res.status(200).json(data.rows);
    } catch (e) {
      console.log(e);
    }
  }

  static async register(req, res, next) {
    try {
      const data = await Account.register(req.body);
      res.status(200).json(data.rows);
    } catch (e) {
      console.log(e);
    }
  }

  static async login(req, res, next) {
    try {
      const data = await Account.login(req.body);
      if (data.msg !== "success") {
        res.status(400).json(data);
      } else {
        res.status(200).json(data);
      }
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = AccountController;
