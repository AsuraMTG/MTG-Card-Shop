import express from 'express';
import { pool } from '../db.js';
const router = express.Router();

router.post('/', async (req, res) => {
    const { customer_id, cartItems } = req.body;
  
    if (!customer_id || !Array.isArray(cartItems) || cartItems.length === 0) {
      return res.status(400).json({ error: 'Hiányzó vagy érvénytelen adatok' });
    }
  
    const connection = await pool.getConnection();
    await connection.beginTransaction();
  
    try {
      const totalAmount = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  
      // 1. Rendelés mentése
      const [orderResult] = await connection.query(
        'INSERT INTO orders (customer_id, order_date, total_amount, status) VALUES (?, NOW(), ?, ?)',
        [customer_id, totalAmount, 'Feldolgozás alatt']
      );
  
      const orderId = orderResult.insertId;
  
      // 2. Order itemek mentése
      for (const item of cartItems) {
        await connection.query(
          'INSERT INTO order_items (order_id, product_id, quantity, price_at_order) VALUES (?, ?, ?, ?)',
          [orderId, item.id, item.quantity, item.price]
        );
      }
  
      await connection.commit();
      res.status(201).json({ message: 'Rendelés sikeresen létrehozva', order_id: orderId });
    } catch (err) {
      await connection.rollback();
      console.error(err);
      res.status(500).json({ error: 'Hiba történt a rendelés mentésekor' });
    } finally {
      connection.release();
    }
  });

  export default router;