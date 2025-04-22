import express from 'express';
import { pool } from '../db.js';

const router = express.Router();

// List all registrations for events
router.get('/', async (req, res) => {
    try {
        const [rows] = await pool.query(
            `SELECT r.registration_id, r.event_id, r.customer_id, r.registration_date, e.event_name, c.name AS customer_name
             FROM registrations r
             JOIN events e ON r.event_id = e.event_id
             JOIN customers c ON r.customer_id = c.customer_id`
        );
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while listing registrations.', error });
    }
});

// Registering a participant dor an event 
router.post('/', async (req, res) => {
    const { event_id, customer_id } = req.body;

    if (!event_id || !customer_id) {
        return res.status(400).json({ message: 'Missing event_id or customer_id' });
    }

    try {
        const [result] = await pool.query(
            `INSERT INTO registrations (event_id, customer_id, registration_date)
             VALUES (?, ?, NOW())`,
            [event_id, customer_id]
        );

        await pool.query(
            `UPDATE events
             SET current_participants = current_participants + 1
             WHERE event_id = ?`,
            [event_id]
        );

        res.status(201).json({ registration_id: result.insertId });
    } catch (error) {
        console.error("Registration failed:", error);
        res.status(500).json({ message: 'Registration failed.', error });
    }
});



// Cancel a registration (delete application)
router.delete('/:id', async (req, res) => {
    const registrationId = req.params.id;

    try {
        const [registration] = await pool.query('SELECT * FROM registrations WHERE registration_id = ?', [registrationId]);

        if (registration.length === 0) {
            return res.status(404).json({ message: 'Registration not found' });
        }

        const eventId = registration[0].event_id;

        // Decrease the current participants for the event
        await pool.query(
            `UPDATE events
             SET current_participants = current_participants - 1
             WHERE event_id = ?`, [eventId]
        );

        // Delete the registration
        await pool.query('DELETE FROM registrations WHERE registration_id = ?', [registrationId]);

        res.sendStatus(204); // No content, as the registration was deleted
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while deleting the registration.', error });
    }
});

export default router;
