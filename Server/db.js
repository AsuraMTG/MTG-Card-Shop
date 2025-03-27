const mysql = require('mysql2');
require('dotenv').config();

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DATABASE,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

function query(sql, params) {
    return new Promise((resolve, reject) => {
        pool.query(sql, params, (err, results) => {
            if (err) {
                console.error("Error executing query: ", err);
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
}

function testConnection() {
    pool.getConnection((err, connection) => {
        if (err) {
            console.error('An error occurred while connecting to the MySQL server: ', err.stack);
            return;
        }
        console.log('Connected to MySQL server, connection ID: ' + connection.threadId);
        connection.release();
    });
}

module.exports = {
    query,
    testConnection
};