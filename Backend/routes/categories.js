// routes/categories.js
import express from 'express';
import { pool } from '../db.js';

const router = express.Router();

router.get('/', async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM categories');
  res.json(rows);
});

router.get('/:id', async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM categories WHERE category_id = ?', [req.params.id]);
  res.json(rows[0]);
});

router.post('/', async (req, res) => {
  const { category_name, category_description } = req.body;
  const [result] = await pool.query(
    'INSERT INTO categories (category_name, category_description) VALUES (?, ?)',
    [category_name, category_description]
  );
  res.json({ id: result.insertId, category_name, category_description });
});

router.put('/:id', async (req, res) => {
  const { category_name, category_description } = req.body;
  await pool.query(
    'UPDATE categories SET category_name = ?, category_description = ? WHERE category_id = ?',
    [category_name, category_description, req.params.id]
  );
  res.sendStatus(204);
});

router.delete('/:id', async (req, res) => {
  await pool.query('DELETE FROM categories WHERE category_id = ?', [req.params.id]);
  res.sendStatus(204);
});

export default router;
