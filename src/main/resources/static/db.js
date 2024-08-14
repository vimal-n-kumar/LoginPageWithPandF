const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: '34.31.48.129', // e.g., 'localhost' or your Cloud SQL instance IP
  database: 'loginpagedb',
  password: 'LoginPage@123',
  port: 5432, // default PostgreSQL port
});

module.exports = pool;