import express from 'express';
import categoriesRoutes from './routes/categories.js';
//import customersRoutes from './routes/customers.js';
//import eventsRoutes from './routes/events.js';
//import registrationsRoutes from './routes/registrations.js';
//import productsRoutes from './routes/products.js';
//import ordersRoutes from './routes/orders.js';
//import orderItemsRoutes from './routes/order_items.js';

const app = express();
app.use(express.json());


// route-ok
app.use('/categories', categoriesRoutes);
//app.use('/customers', customersRoutes);
//app.use('/events', eventsRoutes);
//app.use('/registrations', registrationsRoutes);
//app.use('/products', productsRoutes);
//app.use('/orders', ordersRoutes);
//app.use('/order_items', orderItemsRoutes);
app.use('/', (req, res) => {
  res.send('Üdvözöljük a Magic: The Gathering kártya boltban!');
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Szerver fut a ${PORT}-es porton`);
});
