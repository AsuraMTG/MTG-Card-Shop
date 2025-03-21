import mysql from 'mysql2';  // Importáljuk a mysql2 csomagot

// MySQL kapcsolat létrehozása
const pool = mysql.createConnection({
    host: 'localhost',      // Az adatbázis hosztja
    user: 'root',           // Az adatbázis felhasználóneve
    password: '',           // Az adatbázis jelszava
    database: 'cardshop',   // Az adatbázis neve
    port: 3307
});

// Tranzakciók kezelése
export async function transaction(queries) {
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
export function testConnection() {
    pool.getConnection((err, connection) => {
        if (err) {
            console.error('Hiba történt a MySQL szerverhez való csatlakozáskor: ', err.stack);
            return;
        }
        console.log('Csatlakozva a MySQL szerverhez, kapcsolat ID: ' + connection.threadId);
        connection.release();  // Szabadon engedjük a kapcsolatot, hogy újra felhasználható legyen
    });
}
