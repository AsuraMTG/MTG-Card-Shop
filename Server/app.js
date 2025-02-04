const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Ha több domainről szeretnél hozzáférni
const WebRoutes = require('./routes/WebRoutes');  // Webes végpontok
const DesktopRoutes = require('./routes/DesktopRoutes'); // Adminisztrátori végpontok

const app = express();

// Middleware-ek beállítása
app.use(bodyParser.json()); // JSON formátumú kérés feldolgozása
app.use(bodyParser.urlencoded({ extended: true })); // URL-enkódolt adatok
app.use(cors());  // Ha szükséges, CORS engedélyezése

// Alapértelmezett route, ha valaki nem talál semmit
app.get('/', (req, res) => {
    res.send('Webshop API működik!');
});

// Webes végpontok használata (felhasználói végpontok)
app.use('/api/web', WebRoutes);

// Adminisztrátori (asztali) végpontok használata
app.use('/api/desktop', DesktopRoutes);

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