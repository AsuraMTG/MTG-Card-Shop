
import express  from 'express';
import mysql from 'mysql2';  // Importáljuk a mysql2 csomagot
import cors from 'cors';
import bodyParser  from 'body-parser';
import WebRoutes from './routes/WebRoutes.js';  // Webes végpontok
import path from 'path';
const app = express();
app.use(cors());
app.use(express.json());

// Middleware-ek beállítása
app.use(bodyParser.json()); // JSON formátumú kérés feldolgozása
app.use(bodyParser.urlencoded({ extended: true })); // URL-enkódolt adatok


// DesktopRoutes kell? Mire? 



// Alapértelmezett route, ha valaki nem talál semmit
app.get('/', (req, res) => {
    res.send('Webshop API működik!');
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
app.use('/routes', WebRoutes);


// Adminisztrátori (asztali) végpontok használata
//app.use('/desktop', DesktopRoutes);             Not defined 

// Hiba kezelő middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Valami hiba történt az alkalmazásban!' });
});

// Szerver indítása
const PORT = process.env.PORT || 3000;  // Alapértelmezett port
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


// MySQL kapcsolat létrehozása /wcreate connection
const pool = mysql.createConnection({
    host: 'localhost',      // Az adatbázis hosztja
    user: 'root',           // Az adatbázis felhasználóneve
    password: '',           // Az adatbázis jelszava
    database: 'cardshop',   // Az adatbázis neve
    port: 3306
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