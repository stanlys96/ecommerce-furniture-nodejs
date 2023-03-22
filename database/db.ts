import pg from "pg";
import "dotenv/config";
const Pool = pg.Pool;

const devConfig = {
  connectionString: `postgresql://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_HOST}:${process.env.DATABASE_PORT}/${process.env.DATABASE}`,
};

const proConfig = {
  connectionString: process.env.DATABASE_URL,
  ssl: {
    require: true,
    rejectUnauthorized: false,
  },
};

export const pool = new Pool(proConfig);
