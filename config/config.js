let env = process.env.NODE_ENV;

if (env != "production") {
  require("dotenv").config();
}

const { Pool } = require("pg");

let pool;

const connectDb = async () => {
  try {
    pool = new Pool({
      user: process.env.DB_USERNAME_DEV,
      host: process.env.DB_HOST_DEV,
      database: process.env.DB_DATABASE_DEV,
      password: process.env.DB_PASSWORD_DEV,
      port: 5432,
    });
    await pool.connect();
  } catch (e) {
    console.log(e);
  }
};

module.exports = { pool, connectDb };
