const express = require('express');
const router = express.Router();

const path = require('path');
const cors = require('cors'); // Ha több domainről szeretnél hozzáférni
const fs = require('fs');
const db = require('../db');





const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = path.join(__dirname, '../product_images/');
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir); // Ha nem létezik a mappa, létrehozza
        }
        cb(null, dir); // A fájlok ide kerülnek
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Egyedi fájlnév
    }
});

const upload = multer({ storage });

router.use(cors());
router.use(express.json());
router.use('/product_images', express.static(path.join(__dirname, 'product_images'))); // Publikus képek


















// Termékek lekérdezése
router.get('/admin/products', async (req, res) => {
    try {
        const products = await db.query(
            `SELECT * FROM products`
        );
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Hiba történt a termékek listázása közben', error });
    }
});

// Termek letrehozasa
router.post('/admin/products', upload.single('image'), async (req, res) => {
    const { name, category_id, price, stock_quantity, available, description } = req.body;
    const imageUrl = req.file ? `${req.file.filename}` : null;

    if (!name || !description || !imageUrl) {
        return res.status(400).json({ error: 'Minden mezőt ki kell tölteni!' });
    }

    try {
        // SQL lekérdezés a termékek beszúrására
        const query = `
        INSERT INTO products (name, category_id, price, stock_quantity, available, description, imageUrl)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `;
        const result = await db.query(query, [name, category_id, price, stock_quantity, available, description, imageUrl]);

        // Ha sikeres a beszúrás, visszaadjuk az adatokat
        res.json({
            message: 'Feltöltés sikeres!',
            data: {
                id: result.insertId,  // Az új rekord azonosítója
                name,
                category_id,
                price,
                stock_quantity,
                available,
                description,
                imageUrl
            }
        });

    } catch (error) {
        console.error('Adatbázis hiba:', error);
        res.status(500).json({ error: 'Szerverhiba az adatbázis írás során' });
    }
});


router.put('/admin/products/:id', async (req, res) => {

    const product_id = req.params.id;

    const { name, category_id, price, stock_quantity, available, description } = req.body;

    // Check if category_id is provided, else set it to NULL
    const categoryToSet = category_id || null;
    try {
        const result = await db.query(
            `UPDATE products
            SET name = ?, category_id = ?, price = ?, stock_quantity = ?, available = ?, description = ?
            WHERE product_id = ?`,
            [name, categoryToSet, price, stock_quantity, available, description, product_id]
        );
        res.status(200).json({ message: 'Esemény frissítve' });
    } catch (error) {
        res.status(500).json({ message: 'Hiba történt az esemény frissítése közben', error });
    }
});






















// Események listázása
router.get('/admin/events', async (req, res) => {
    try {
        const events = await db.query(
            `SELECT * FROM events`
        );
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ message: 'Hiba történt az események listázása közben', error });
    }
});

// Új esemény hozzáadása
router.post('/admin/events', async (req, res) => {
    const { event_name, event_date, event_description, max_participants } = req.body;
    try {
        const result = await db.query(
            `INSERT INTO events (event_name, event_date, event_description, max_participants, current_participants)
             VALUES (?, ?, ?, ?, 0)`, [event_name, event_date, event_description, max_participants]
        );
        res.status(201).json({ message: 'Esemény hozzáadva', eventId: result.insertId });
    } catch (error) {
        res.status(500).json({ message: 'Hiba történt az esemény hozzáadása közben', error });
    }
});

// Esemény frissítése
router.put('/admin/events/:eventId', async (req, res) => {
    const eventId = req.params.eventId;
    const { event_name, event_date, event_description, max_participants } = req.body;
    try {
        const result = await db.query(
            `UPDATE events
             SET event_name = ?, event_date = ?, event_description = ?, max_participants = ?
             WHERE event_id = ?`, [event_name, event_date, event_description, max_participants, eventId]
        );
        res.status(200).json({ message: 'Esemény frissítve' });
    } catch (error) {
        res.status(500).json({ message: 'Hiba történt az esemény frissítése közben', error });
    }
});

// Esemény törlése
router.delete('/admin/events/:eventId', async (req, res) => {
    const eventId = req.params.eventId;
    try {
        await db.query(`DELETE FROM events WHERE event_id = ?`, [eventId]);
        res.status(200).json({ message: 'Esemény törölve' });
    } catch (error) {
        res.status(500).json({ message: 'Hiba történt az esemény törlése közben', error });
    }
});


// Felhasználók listázása
router.get('/admin/customers', async (req, res) => {
    try {
        const customers = await db.query(
            `SELECT * FROM customers`
        );
        res.status(200).json(customers);
    } catch (error) {
        res.status(500).json({ message: 'Hiba történt a felhasználók listázása közben', error });
    }
});

// Felhasználói adatok frissítése
router.put('/admin/customers/:customerId', async (req, res) => {
    const customerId = req.params.customerId;
    const { name, email, address, phone_number } = req.body;
    try {
        await db.query(
            `UPDATE customers
             SET name = ?, email = ?, address = ?, phone_number = ?
             WHERE customer_id = ?`, [name, email, address, phone_number, customerId]
        );
        res.status(200).json({ message: 'Felhasználói adatok frissítve' });
    } catch (error) {
        res.status(500).json({ message: 'Hiba történt a felhasználói adatok frissítése közben', error });
    }
});

// Felhasználó törlése
router.delete('/admin/customers/:customerId', async (req, res) => {
    const customerId = req.params.customerId;
    try {
        await db.query(`DELETE FROM customers WHERE customer_id = ?`, [customerId]);
        res.status(200).json({ message: 'Felhasználó törölve' });
    } catch (error) {
        res.status(500).json({ message: 'Hiba történt a felhasználó törlése közben', error });
    }
});

// Jelentkezések kezelése

// Eseményekhez tartozó jelentkezések listázása
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
        res.status(500).json({ message: 'Hiba történt a jelentkezések listázása közben', error });
    }
});

// Jelentkezés törlése
router.delete('/admin/registrations/:registrationId', async (req, res) => {
    const registrationId = req.params.registrationId;
    try {
        const registration = await db.query(`SELECT * FROM registrations WHERE registration_id = ?`, [registrationId]);

        if (registration.length === 0) {
            return res.status(404).json({ message: 'Jelentkezés nem található' });
        }

        // Az esemény résztvevőinek számát csökkentjük
        const eventId = registration[0].event_id;
        await db.query(
            `UPDATE events
             SET current_participants = current_participants - 1
             WHERE event_id = ?`, [eventId]
        );

        // Jelentkezés törlése
        await db.query(`DELETE FROM registrations WHERE registration_id = ?`, [registrationId]);

        res.status(200).json({ message: 'Jelentkezés törölve' });
    } catch (error) {
        res.status(500).json({ message: 'Hiba történt a jelentkezés törlése közben', error });
    }
});






module.exports = router;