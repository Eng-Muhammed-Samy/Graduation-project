const { Pool } = require('pg');


const connection = new Pool({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    port: process.env.DATABASE_PORT,
    database: process.env.DATABASE,
  ssl: {
    rejectUnauthorized: false
  }
});




module.exports.connection = connection