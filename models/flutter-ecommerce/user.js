const pool = require("../../database/db");
const { hashPassword, comparePassword } = require("../../helpers/bcrypt");
const { generateToken, verifyToken } = require("../../helpers/jwt");
const dayjs = require("dayjs");

class User {
  static async getAllUsers() {
    try {
      const users = await pool.query("SELECT * FROM users ORDER BY id ASC");
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
        "SELECT * FROM users WHERE email = $1",
        [email]
      );
      if (findUser.rowCount > 0) {
        return { msg: "email_exist" };
      } else {
        const hashedPassword = hashPassword(password);
        const newUser = await pool.query(
          "INSERT INTO users (name, password, email, created_on) VALUES($1, $2, $3, $4) RETURNING *;",
          [name, hashedPassword, email, dayjs().format()]
        );
        return { msg: "success", data: newUser };
      }
    } catch (e) {
      console.log(e);
      return { msg: "error", error: e };
    }
  }

  static async login(account) {
    try {
      const { password, email } = account;
      const findUser = await pool.query(
        "SELECT * FROM users WHERE email = $1",
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
          user_id: findUser.rows[0].id,
          name: findUser.rows[0].name,
          admin: findUser.rows[0].admin,
        };
      } else {
        return { msg: "email_not_found" };
      }
    } catch (e) {
      return { msg: "error", error: e };
    }
  }

  static async getAdminChats({ user_id }) {
    const findUser = await pool.query("SELECT * FROM users WHERE id = $1", [
      user_id,
    ]);
    if (findUser.rowCount > 0) {
      if (findUser.rows[0].admin) {
        const getChats = await pool.query(
          "SELECT * FROM chat c INNER JOIN users u ON c.to_user = u.id INNER JOIN users a ON c.user_id = a.id WHERE c.to_user = $1 ORDER BY u.id ASC;",
          [user_id]
        );
        return { msg: "success", data: getChats.rows };
      } else {
        return { msg: "not_admin" };
      }
    } else {
      return { msg: "user_not_found" };
    }
  }
}

module.exports = User;
