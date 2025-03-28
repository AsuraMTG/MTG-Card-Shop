
import express  from 'express';
import mysql from 'mysql2';  // Importáljuk a mysql2 csomagot
import cors from 'cors';
import WebRoutes from './routes/WebRoutes.js';  // Webes végpontok
import path from 'path';
import dotenv from 'dotenv' // Környezeti változók betöltése a .env fájlból
import bcrypt from 'bcrypt'
import { request } from 'http';
const app = express();
app.use(cors());
app.use(express.json());

// Alapértelmezett route, ha valaki nem talál semmit
app.get('/', (req, res) => {
    res.send('Webshop API működik!');
});

app.use((req, res) => {
    if (req.url.includes('web')) {
        console.log("webkérés");
        
    }
})

app.get('/web/login', (req, res)=>{
    res.send("login");
})
app.get('/web/events', async (req, res) => {
    try {
        let events = await db.query(
            `SELECT event_name, event_date, max_participants, current_participants
             FROM events
             WHERE current_participants < max_participants`
        );
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ message: 'Hiba történt az események listázása közben', error });
    }
});

app.get('/image/:filename', (req, res) => {
    const filename = req.params.filename;
    const imagePath = path.join(__dirname, 'product_images', filename);
    console.log(imagePath);
    res.sendFile(imagePath, (err) => {
      if (err) {
        res.status(404).json({ error: 'Kép nem található!' });
      }
    });
});

// Webes végpontok használata (felhasználói végpontok)
app.use('/web', WebRoutes);


// Hiba kezelő middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Valami hiba történt az alkalmazásban!' });
});

// Lekérdezés végrehajtása
/*function query(sql, params) {
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
}*/


// Tranzakciók kezelése
/*async function transaction(queries) {
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
}*/


// Csatlakozás tesztelése
/*function testConnection() {
    pool.getConnection((err, connection) => {
        if (err) {
            console.error('Hiba történt a MySQL szerverhez való csatlakozáskor: ', err.stack);
            return;
        }
        console.log('Csatlakozva a MySQL szerverhez, kapcsolat ID: ' + connection.threadId);
        connection.release();  // Szabadon engedjük a kapcsolatot, hogy újra felhasználható legyen
    });
}*/





// Szerver indítása
const PORT = process.env.PORT || 3000;  // Alapértelmezett port
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


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

const username = "new_user";
const plainPassword = "user_password"

const registerUser = (username, plainPassword => {
    bcrypt.hash(plainPassword, 10, (err, hashedPassword) => {
        if (err) {
            console.error("hash password error: ", err)
            return;
        }

        const query = () => {function query(sql, params) {      // ez most mit csinál? 
            return new Promise((resolve, reject) => {           //
                pool.query(
                    'INSERT INTO customers (username, password) VALUES (?, ?)',
                    sql, params,[username, hashedPassword], (err, results) => {
                    if (err) {
                        console.error("Hiba a lekérdezés végrehajtása során: ", err);
                        reject(err);
                    } else {
                        resolve(results);
                    }
                });
                console.log("Felhasználó regisztrálva lett egy hash password-el")
            });
        } };
    });
});

const loginUser = (username, enteredPassword) => {
    pool.query(
        'SELECT password FROM customers WHERE name = ?',
        [username],
        (err, results) => {
            if (err) {
                console.error("Error querying database", err);
                return;
            }
            if (results.length === 0) {
                console.log("User not found");
                return;
            }

            const storedHashedPassword = results[0].password;

            // Compare the entered password with the stored hashed password
            bcrypt.compare(enteredPassword, storedHashedPassword, (err, results) => {
                if (err) {
                    console.error("A jelszó nem egyezik", err);
                    return;
                }
                if (results) {
                    console.log("succesful login!")
                }else{
                    console.log("rossz jelszó")
                }
            })
        }
    )
}





const transaction = () => {async function transaction(queries) {
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
}};

const testConnection = () => {function testConnection() {
    pool.getConnection((err, connection) => {
        if (err) {
            console.error('Hiba történt a MySQL szerverhez való csatlakozáskor: ', err.stack);
            return;
        }
        console.log('Csatlakozva a MySQL szerverhez, kapcsolat ID: ' + connection.threadId);
        connection.release();  // Szabadon engedjük a kapcsolatot, hogy újra felhasználható legyen
    });
}};

app.registerUser = registerUser;
app.loginUser = loginUser ;
app.transaction = transaction;
app.testConnection = testConnection;

// Default export for the entire module
export default app;









/*Then, when you import it in another file, you can use import:

// In ES Module style
import app from './path_to_your_module';

app.query();*/