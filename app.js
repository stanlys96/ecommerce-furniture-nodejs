const express = require("express");
require("dotenv").config();
const cors = require("cors");
const router = require("./routes");
const Chat = require("./models/flutter-ecommerce/chat");
const User = require("./models/flutter-ecommerce/user");

const corsOptions = {
  origin: "*",
  methods: ["POST", "GET", "PUT", "PATCH", "DELETE"],
  preflightContinue: false,
  optionsSuccessStatus: 200,
};

const app = express();
app.use(cors(corsOptions));
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router);

const server = app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}...`);
});

const io = require("socket.io")(server);

const connectedUser = new Set();
io.on("connection", (socket) => {
  console.log("Connected successfully!", socket.id);
  // io.emit("connected-user", connectedUser.length);
  connectedUser.add(socket.id);
  socket.on("disconnect", () => {
    console.log("Disconnected!", socket.id);
    connectedUser.delete(socket.id);
    // io.emit("connected-user".connectedUser.length);
  });

  socket.on("message", async (data) => {
    await Chat.addToChat(data.sentByMe, data.message, 49);
    socket.broadcast.emit("message-receive", data);
  });
});
