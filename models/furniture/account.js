const dayjs = require("dayjs");
const pool = require("../../database/db");
const { hashPassword, comparePassword } = require("../../helpers/bcrypt");
const { generateToken, verifyToken } = require("../../helpers/jwt");

class Account {
  static async getAllAccounts() {
    try {
      const accounts = await pool.query("SELECT * FROM accounts");
      return accounts;
    } catch (e) {
      console.log(e);
    }
  }

  static async verify(account) {
    try {
      const { token } = account;
      const walao = verifyToken(token, process.env.SECRET);
      return walao;
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
        return { msg: "email_exist" };
      } else {
        const hashedPassword = hashPassword(password);
        const newAccount = await pool.query(
          "INSERT INTO accounts (username, password, email, created_on) VALUES($1, $2, $3, $4) RETURNING *;",
          [username, hashedPassword, email, dayjs().format()]
        );
        return newAccount;
      }
    } catch (e) {
      console.log(e);
    }
  }

  static async login(account) {
    try {
      const { password, email } = account;
      const findAccount = await pool.query(
        "SELECT * FROM accounts WHERE email = $1",
        [email]
      );
      if (findAccount.rowCount > 0) {
        const passwordCorrect = comparePassword(
          password,
          findAccount.rows[0].password
        );
        if (!passwordCorrect) {
          return { msg: "password_incorrect" };
        }
        const token = generateToken(
          { email: findAccount.rows[0].email },
          process.env.SECRET
        );
        return {
          msg: "success",
          email: findAccount.rows[0].email,
          token,
        };
      } else {
        return { msg: "email_not_found" };
      }
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = Account;
