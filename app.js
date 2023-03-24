const express = require("express");
require("dotenv").config();
const cors = require("cors");
const router = require("./routes");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(router);

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}...`);
});
