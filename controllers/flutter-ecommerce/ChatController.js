const Chat = require("../../models/flutter-ecommerce/chat");

class ChatController {
  static async getNormalUserChat(req, res, next) {
    try {
      const data = await Chat.getNormalUserChat(req.params);
      res.status(200).json(data);
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = ChatController;
