const express = require("express");
require("dotenv").config();
const cors = require("cors");
const router = require("./routes");

const corsOptions = {
  origin: "https://ecommerce-furniture-stanly.vercel.app",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

const app = express();
app.use(cors(corsOptions));
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router);

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}...`);
});
