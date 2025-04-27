import express from 'express';
import { pool } from '../db.js';
const router = express.Router();

router.post('/', (req, res) => {
    const { order_id, product_id, quantity, price_at_order } = req.body;
  
    if (!order_id || !product_id || !quantity || !price_at_order) {
      return res.status(400).json({ error: 'Minden mező kötelező' });
    }
  
    const sql = `
      INSERT INTO order_items (order_id, product_id, quantity, price_at_order)
      VALUES (?, ?, ?, ?)
    `;
  
    pool.query(sql, [order_id, product_id, quantity, price_at_order], (err, result) => {
      if (err) {
        console.error('Hiba az order item létrehozásakor:', err);
        return res.status(500).json({ error: 'Adatbázis hiba' });
      }
      res.status(201).json({ message: 'Order item hozzáadva', order_item_id: result.insertId });
    });
  });
  
  
  // 2. Order item módosítása (PUT /order-items/:order_item_id)
  router.put('/:order_item_id', (req, res) => {
    const { quantity, price_at_order } = req.body;
    const { order_item_id } = req.params;
  
    const sql = `
      UPDATE order_items
      SET quantity = ?, price_at_order = ?
      WHERE order_item_id = ?
    `;
  
    pool.query(sql, [quantity, price_at_order, order_item_id], (err, result) => {
      if (err) {
        console.error('Hiba az order item frissítésekor:', err);
        return res.status(500).json({ error: 'Adatbázis hiba' });
      }
      res.json({ message: 'Order item frissítve' });
    });
  });
  
  
  // 3. Order item-ek listázása egy rendeléshez (GET /order-items/:order_id)
  router.get('/:order_id', (req, res) => {
    const { order_id } = req.params;
  
    const sql = `
      SELECT * FROM order_items WHERE order_id = ?
    `;
  
    pool.query(sql, [order_id], (err, results) => {
      if (err) {
        console.error('Hiba az order item-ek lekérdezésekor:', err);
        return res.status(500).json({ error: 'Adatbázis hiba' });
      }
      res.json(results);
    });
  });
  
  
  // 4. Order item törlése (DELETE /order-items/:order_item_id)
  router.delete('/:order_item_id', (req, res) => {
    const { order_item_id } = req.params;
  
    const sql = `
      DELETE FROM order_items WHERE order_item_id = ?
    `;
  
    pool.query(sql, [order_item_id], (err, result) => {
      if (err) {
        console.error('Hiba az order item törlésekor:', err);
        return res.status(500).json({ error: 'Adatbázis hiba' });
      }
      res.json({ message: 'Order item törölve' });
    });
  });

  // Új tétel hozzáadása
router.post('/order-items', async (req, res) => {
    try {
      const { product_id, quantity, price_at_order } = req.body;
      const [result] = await db.query(
        'INSERT INTO order_items (order_id, product_id, quantity, price_at_order) VALUES (?, ?, ?, ?)',
        [1, product_id, quantity, price_at_order] // itt most mindig order_id = 1 (DE ezt majd később dinamikussá kell tenni)
      );
      res.json({ order_item_id: result.insertId });
    } catch (err) {
      console.error('Hiba az order-item létrehozásakor:', err);
      res.status(500).send('Server error');
    }
  });
  
  // Tétel törlése
  router.delete('/order-items/:id', async (req, res) => {
    try {
      const { id } = req.params;
      await db.query('DELETE FROM order_items WHERE order_item_id = ?', [id]);
      res.sendStatus(204);
    } catch (err) {
      console.error('Hiba törléskor:', err);
      res.status(500).send('Server error');
    }
  });

export default router;