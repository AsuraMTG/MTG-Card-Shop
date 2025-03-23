// át kell pakolni ennek a tartalmát a webserver.js-be


const mysql = require('mysql2');
require('dotenv').config();  // Környezeti változók betöltése a .env fájlból

// Adatbázis kapcsolat létrehozása
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DATABASE,
    waitForConnections: true,  // Várakozik, ha nincs szabad kapcsolat
    connectionLimit: 10,  // Max. 10 egyidejű kapcsolat
    queueLimit: 0  // Nincs korlátozva a várakozó kapcsolatok száma
});



// Lekérdezés végrehajtása
function query(sql, params) {
    return new Promise((resolve, reject) => {
        pool.query(sql, params, (err, results) => {
            if (err) {
                console.error("Hiba a lekérdezés végrehajtása során: ", err);
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
}

// Tranzakciók kezelése
async function transaction(queries) {
    const connection = await pool.promise().getConnection();
    try {
        await connection.beginTransaction();

        for (const queryObj of queries) {
            const { sql, params } = queryObj;
            await connection.query(sql, params);
        }

        await connection.commit(); // Minden lekérdezés sikeresen lefutott, commit
        connection.release();
        return true; // Visszaadjuk, hogy sikeres volt a tranzakció

    } catch (err) {
        await connection.rollback(); // Hibás tranzakció esetén rollback
        connection.release();
        console.error("Hiba történt a tranzakció során: ", err);
        throw err; // Hibát dobunk, hogy azt az alkalmazás kezelni tudja
    }
}

// Csatlakozás tesztelése
function testConnection() {
    pool.getConnection((err, connection) => {
        if (err) {
            console.error('Hiba történt a MySQL szerverhez való csatlakozáskor: ', err.stack);
            return;
        }
        console.log('Csatlakozva a MySQL szerverhez, kapcsolat ID: ' + connection.threadId);
        connection.release();  // Szabadon engedjük a kapcsolatot, hogy újra felhasználható legyen
    });
}

module.exports = {
    query,
    transaction,
    testConnection
};