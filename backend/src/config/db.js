const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections:true,
    connectionLimit:35,
    queueLimit:0
  });

module.exports = pool.promise(); // folosim promise pt a putea utiliza impreuna cu async/await