import express  from 'express';
import bodyParser  from 'body-parser';
import cors  from 'cors'; // Ha több domainről szeretnél hozzáférni
import WebRoutes from './routes/WebRoutes.js';  // Webes végpontok

// DesktopRoutes kell? Mire? 

import path from 'path';
const app = express();



// Middleware-ek beállítása
app.use(bodyParser.json()); // JSON formátumú kérés feldolgozása
app.use(bodyParser.urlencoded({ extended: true })); // URL-enkódolt adatok
app.use(cors());  // Ha szükséges, CORS engedélyezése

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