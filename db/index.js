const { Pool } = require('pg');

const pool = new Pool({
  user: 'jenniezeng',
  host: '127.0.0.1',
  database: 'homocide',
  password: '',
  port: 5432,
});

module.exports = pool;
