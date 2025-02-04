function connect() {
    const mysql = require('mysql2');
    require('dotenv').config();
    const connection = mysql.createConnection({
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DATABASE
    });
    connection.connect(function(err){
        if(err) throw err;
        console.log('Connected to the MySQL server.');
    });
    return connection;
};
module.exports = connect;