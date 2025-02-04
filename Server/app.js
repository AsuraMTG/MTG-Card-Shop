const express = require('express');

const app = express();

const path = require('path');

const mysql = require('mysql2');

require('dotenv').config();

const connect = require(path.join(__dirname, 'db.js'));

const connection = connect();

app.use(express.json());

if (connection) {
    console.log('Connected to the MySQL server.');
}

app.use(express.json());


app.get('/customers/:id', (req, res) => {
    let id = req.params.id;
    let sql = "SELECT * FROM customers";
    connection.query(sql, [id], function (err, results) {
        if (err) {
            console.error(err.message, err.code);
            res.status(500).send('Database error');
        } else {
            res.status(201).send(results);
        }
    });
});

app.listen(3000, () => {
    console.log('A szerver elindult a http://localhost:3000 porton.');
});