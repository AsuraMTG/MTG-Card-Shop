// db.js
import mysql from 'mysql2/promise';

export const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',       // módosítsd a saját jelszavadra
  database: 'cardshop',
  port: 3307,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});
