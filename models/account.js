const pool = require("../database/db");
const { hashPassword } = require("../helpers/bcrypt");

class Account {
  static async getAllAccounts() {
    try {
      const accounts = await pool.query("SELECT * FROM accounts");
      return accounts;
    } catch (e) {
      console.log(e);
    }
  }

  static async register(account) {
    try {
      const { username, password, email } = account;
      const findAccount = await pool.query(
        "SELECT * FROM accounts WHERE email = $1",
        [email]
      );
      if (findAccount.rowCount > 0) {
        return "email_exist";
      } else {
        const lastId = await pool.query(
          "SELECT * FROM accounts ORDER BY user_id DESC LIMIT 1"
        );
        let currentId = 0;
        if (lastId.rowCount > 0) {
          console.log("WALAO");
        } else {
          currentId = 1;
        }
        const hashedPassword = hashPassword(password);
        const newAccount = await pool.query(
          "INSERT INTO accounts (user_id, username, password, email, created_on) VALUES($1, $2, $3, $4, $5);",
          [currentId, username, hashedPassword, email, Date.now()]
        );
        return newAccount;
      }
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = Account;
