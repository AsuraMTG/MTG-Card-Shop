import express from 'express';
import { pool } from '../db.js';

const router = express.Router();

// List all events
router.get('/', async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM events');
  res.json(rows);
});

// Get a single event by ID
router.get('/:id', async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM events WHERE event_id = ?', [req.params.id]);
  res.json(rows[0]);
});

// Add a new event
router.post('/', async (req, res) => {
  const { event_name, event_date, event_description, max_participants } = req.body;
  const [result] = await pool.query(
    'INSERT INTO events (event_name, event_date, event_description, max_participants, current_participants) VALUES (?, ?, ?, ?, 0)',
    [event_name, event_date, event_description, max_participants]
  );
  res.json({
    event_id: result.insertId,
    event_name,
    event_date,
    event_description,
    max_participants
  });
});

// Update an event by ID
router.put('/:id', async (req, res) => {
  const { event_name, event_date, event_description, max_participants } = req.body;
  await pool.query(
    'UPDATE events SET event_name = ?, event_date = ?, event_description = ?, max_participants = ? WHERE event_id = ?',
    [event_name, event_date, event_description, max_participants, req.params.id]
  );
  res.sendStatus(204);
});

// Delete an event by ID
router.delete('/:id', async (req, res) => {
  await pool.query('DELETE FROM events WHERE event_id = ?', [req.params.id]);
  res.sendStatus(204);
});

export default router;
