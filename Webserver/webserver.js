
import express  from 'express';
import mysql from 'mysql2';  // Importáljuk a mysql2 csomagot
import cors from 'cors';
const app = express();
app.use(cors());
app.use(express.json());

// MySQL kapcsolat létrehozása /wcreate connection
const pool = mysql.createConnection({
    host: 'localhost',      // Az adatbázis hosztja
    user: 'root',           // Az adatbázis felhasználóneve
    password: '',           // Az adatbázis jelszava
    database: 'cardshop',   // Az adatbázis neve
    port: 3307
});

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

app.use((req,res)=>{
    res.send("404");
})
app.listen(3002,()=>{
    console.log("fut");
});

export default app;