const express = require('express');
const router = express.Router();
const path = require('path');
const cors = require('cors');
const fs = require('fs');
const db = require('../db');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = path.join(__dirname, '../product_images/');
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }
        cb(null, dir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

router.use(cors());
router.use(express.json());
router.use('/product_images', express.static(path.join(__dirname, 'product_images')));

// Query products
router.get('/admin/products', async (req, res) => {
    try {
        const products = await db.query(
            `SELECT * FROM products`
        );
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while listing products.', error });
    }
});

// Create products
router.post('/admin/products', upload.single('image'), async (req, res) => {
    const { name, category_id, price, stock_quantity, available, description } = req.body;
    const imageUrl = req.file ? `${req.file.filename}` : null;

    if (!name || !description || !imageUrl) {
        return res.status(400).json({ error: 'All fields must be filled in!' });
    }

    try {
        const query = `
        INSERT INTO products (name, category_id, price, stock_quantity, available, description, imageUrl)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `;
        const result = await db.query(query, [name, category_id, price, stock_quantity, available, description, imageUrl]);

        res.json({
            message: 'Upload successful!',
            data: {
                id: result.insertId, name, category_id, price, stock_quantity, available, description, imageUrl
            }
        });
        
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({ error: 'Server error while writing to database' });
    }
});

// Product update
router.put('/admin/products/:id', async (req, res) => {
    const product_id = req.params.id;
    const { name, category_id, price, stock_quantity, available, description } = req.body;

    const categoryToSet = category_id || null;
    try {
        const result = await db.query(
            `UPDATE products
            SET name = ?, category_id = ?, price = ?, stock_quantity = ?, available = ?, description = ?
            WHERE product_id = ?`,
            [name, categoryToSet, price, stock_quantity, available, description, product_id]
        );
        res.status(200).json({ message: 'Event updated' });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while updating the event.', error });
    }
});

// List events
router.get('/admin/events', async (req, res) => {
    try {
        const events = await db.query(
            `SELECT * FROM events`
        );
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while listing events.', error });
    }
});

// Add new event
router.post('/admin/events', async (req, res) => {
    const { event_name, event_date, event_description, max_participants } = req.body;
    try {
        const result = await db.query(
            `INSERT INTO events (event_name, event_date, event_description, max_participants, current_participants)
             VALUES (?, ?, ?, ?, 0)`, [event_name, event_date, event_description, max_participants]
        );
        res.status(201).json({ message: 'Event added', eventId: result.insertId });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while adding the event.', error });
    }
});

// Update event
router.put('/admin/events/:eventId', async (req, res) => {
    const eventId = req.params.eventId;
    const { event_name, event_date, event_description, max_participants } = req.body;
    try {
        const result = await db.query(
            `UPDATE events
             SET event_name = ?, event_date = ?, event_description = ?, max_participants = ?
             WHERE event_id = ?`, [event_name, event_date, event_description, max_participants, eventId]
        );
        res.status(200).json({ message: 'Event updated' });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while updating the event.', error });
    }
});

// Delete event
router.delete('/admin/events/:eventId', async (req, res) => {
    const eventId = req.params.eventId;
    try {
        await db.query(`DELETE FROM events WHERE event_id = ?`, [eventId]);
        res.status(200).json({ message: 'Event cancelled' });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while deleting the event.', error });
    }
});


// List users
router.get('/admin/customers', async (req, res) => {
    try {
        const customers = await db.query(
            `SELECT * FROM customers`
        );
        res.status(200).json(customers);
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while listing users.', error });
    }
});

// Update user data
router.put('/admin/customers/:customerId', async (req, res) => {
    const customerId = req.params.customerId;
    const { name, email, address, phone_number } = req.body;
    try {
        await db.query(
            `UPDATE customers
             SET name = ?, email = ?, address = ?, phone_number = ?
             WHERE customer_id = ?`, [name, email, address, phone_number, customerId]
        );
        res.status(200).json({ message: 'User data updated' });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while updating user data.', error });
    }
});

// Delete user
router.delete('/admin/customers/:customerId', async (req, res) => {
    const customerId = req.params.customerId;
    try {
        await db.query(`DELETE FROM customers WHERE customer_id = ?`, [customerId]);
        res.status(200).json({ message: 'User deleted' });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while deleting the user.', error });
    }
});

// List applications for events
router.get('/admin/registrations', async (req, res) => {
    try {
        const registrations = await db.query(
            `SELECT r.registration_id, r.event_id, r.customer_id, r.registration_date, e.event_name, c.name AS customer_name
             FROM registrations r
             JOIN events e ON r.event_id = e.event_id
             JOIN customers c ON r.customer_id = c.customer_id`
        );
        res.status(200).json(registrations);
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while listing applications.', error });
    }
});

// Cancel application
router.delete('/admin/registrations/:registrationId', async (req, res) => {
    const registrationId = req.params.registrationId;
    try {
        const registration = await db.query(`SELECT * FROM registrations WHERE registration_id = ?`, [registrationId]);

        if (registration.length === 0) {
            return res.status(404).json({ message: 'Application not found' });
        }

        const eventId = registration[0].event_id;
        await db.query(
            `UPDATE events
             SET current_participants = current_participants - 1
             WHERE event_id = ?`, [eventId]
        );

        await db.query(`DELETE FROM registrations WHERE registration_id = ?`, [registrationId]);

        res.status(200).json({ message: 'Application deleted' });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while deleting the application.', error });
    }
});

module.exports = router;