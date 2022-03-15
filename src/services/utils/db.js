import pg from "pg";

const { Pool } = pg;

const { PGPORT, PGPASSWORD, PGDATABASE, PGUSER, PGHOST } = process.env;
const pool = new Pool({
  user: PGUSER,
  host: PGHOST,
  database: PGDATABASE,
  password: PGPASSWORD,
  port: PGPORT,
});

export const testConnection = async () => {
  try {
    await pool.query("SELECT 3+1 AS result;");

    console.log("is connected!");
  } catch (error) {
    console.log(error);
  }
};

export default pool;
