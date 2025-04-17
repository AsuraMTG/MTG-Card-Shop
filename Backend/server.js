import express from 'express';
import categoriesRoutes from './routes/categories.js';
import customersRoutes from './routes/customers.js';
import registrationsRoutes from './routes/registrations.js';
import productsRoutes from './routes/products.js';
import eventsRoutes from './routes/events.js';
import eventregistrations from './routes/eventregistrations.js';
//import ordersRoutes from './routes/orders.js';
//import orderItemsRoutes from './routes/order_items.js';
//import bodyParser from 'body-parser'; T
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();

// Get the directory name using import.meta.url
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//app.use(express.json()); T

// Use body-parser middleware
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Route to serve images
app.get('/image/:filename', (req, res) => {
  const filename = req.params.filename;
  const imagePath = path.join(__dirname, 'product_images', filename);
  console.log(imagePath);
  res.sendFile(imagePath, (err) => {
    if (err) {
      res.status(404).json({ error: 'Image not found!' });
    }
  });
});

// Route handlers
app.use('/categories', categoriesRoutes);
app.use('/customers', customersRoutes);
//app.use('/events', eventsRoutes);
app.use('/registrations', registrationsRoutes);
app.use('/products', productsRoutes);
app.use('/events', eventsRoutes);
//app.use('/orders', ordersRoutes);
//app.use('/order_items', orderItemsRoutes);
app.use('/eventregistrations', eventregistrations);
app.use('/', (req, res) => {
  res.send('Üdvözöljük a Magic: The Gathering kártya boltban!');
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Szerver fut a http://localhost:${PORT} címen`);
  console.log(`Kép elérési út: http://localhost:${PORT}/image/`);
});