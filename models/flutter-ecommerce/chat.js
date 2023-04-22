const pool = require("../../database/db");
const dayjs = require("dayjs");

class Chat {
  static async getNormalUserChat({ user_id }) {
    try {
      const chat = await pool.query(
        "SELECT * FROM flutter_ecommerce.chat WHERE user_id = $1 ORDER BY message_sent ASC",
        [user_id]
      );
      return { msg: "success", data: chat.rows };
    } catch (e) {
      console.log(e);
    }
  }

  static async addToChat({ user_id, message, to_user }) {
    try {
      const addChat = await pool.query(
        "INSERT INTO flutter_ecommerce.chat (user_id, message, to_user, message_sent) VALUES($1, $2, $3, $4) RETURNING *;",
        [user_id, message, to_user, dayjs().format()]
      );
      return { msg: "success", data: addChat.rows };
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = Chat;
