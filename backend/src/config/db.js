// Conexión a PostgreSQL (Neon en producción, Docker en local).
const { Pool } = require('pg');
const env = require('./env');

const pool = new Pool({
  connectionString: env.DATABASE_URL,
  // Neon exige SSL; el Postgres local de Docker no.
  ssl: env.DATABASE_URL.includes('neon.tech') ? { rejectUnauthorized: false } : false,
  max: 5,
});

pool.on('error', (err) => console.error('[db] Error inesperado:', err.message));

const query = (text, params) => pool.query(text, params);

module.exports = { pool, query };
