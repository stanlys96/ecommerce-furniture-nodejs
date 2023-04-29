const Pool = require("pg").Pool;
require("dotenv").config();

const devConfig = {
  connectionString: `postgresql://${process.env.DB_USERNAME_DEV}:${process.env.DB_PASSWORD_DEV}@${process.env.DB_HOST_DEV}:${process.env.DATABASE_PORT}/${process.env.DB_DATABASE_DEV}`,
};

const proConfig = {
  connectionString: process.env.DATABASE_URL,
  ssl: {
    require: true,
    rejectUnauthorized: false,
  },
};

const pool = new Pool(devConfig);
module.exports = pool;
