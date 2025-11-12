const { Pool } = require("pg");

const pool = new Pool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "mitracking",
  password: process.env.DB_PASS || "mitracking123",
  database: process.env.DB_NAME || "mitracking",
  port: process.env.DB_PORT || 5432,
});

async function testConnection() {
  try {
    const res = await pool.query("SELECT NOW() as now");
    console.log("Conectado a PostgreSQL ✅", res.rows[0].now);
  } catch (err) {
    console.error("❌ Error al conectar a PostgreSQL:", err.message);
  }
}

module.exports = { pool, testConnection };
