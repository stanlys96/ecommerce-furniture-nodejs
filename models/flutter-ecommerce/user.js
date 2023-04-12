const pool = require("../../database/db");
const { hashPassword, comparePassword } = require("../../helpers/bcrypt");
const { generateToken, verifyToken } = require("../../helpers/jwt");
const dayjs = require("dayjs");

class User {
  static async getAllUsers() {
    try {
      const users = await pool.query("SELECT * FROM flutter_ecommerce.users");
      return users;
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
      const { name, password, email } = account;
      const findUser = await pool.query(
        "SELECT * FROM flutter_ecommerce.users WHERE email = $1",
        [email]
      );
      if (findUser.rowCount > 0) {
        return { msg: "email_exist" };
      } else {
        const hashedPassword = hashPassword(password);
        const newUser = await pool.query(
          "INSERT INTO flutter_ecommerce.users (name, password, email, created_on) VALUES($1, $2, $3, $4) RETURNING *;",
          [name, hashedPassword, email, dayjs().format()]
        );
        return newUser;
      }
    } catch (e) {
      console.log(e);
    }
  }

  static async login(account) {
    try {
      const { password, email } = account;
      const findUser = await pool.query(
        "SELECT * FROM flutter_ecommerce.users WHERE email = $1",
        [email]
      );
      if (findUser.rowCount > 0) {
        const passwordCorrect = comparePassword(
          password,
          findUser.rows[0].password
        );
        if (!passwordCorrect) {
          return { msg: "password_incorrect" };
        }
        const token = generateToken(
          { email: findUser.rows[0].email },
          process.env.SECRET
        );
        return {
          msg: "success",
          email: findUser.rows[0].email,
          token,
          user_id: findUser.id,
        };
      } else {
        return { msg: "email_not_found" };
      }
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = User;
