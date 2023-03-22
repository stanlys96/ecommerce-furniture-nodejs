import express from "express";
import "dotenv/config";
import cors from "cors";
import router from "./routes";
// Aw
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(router);

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}...`);
});
