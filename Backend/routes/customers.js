import express from 'express';
import { pool } from '../db.js';

const router = express.Router();

// List all customers
router.get('/', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM customers');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while listing customers.', error });
    }
});

// Get a specific customer by ID
router.get('/:id', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM customers WHERE customer_id = ?', [req.params.id]);
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while retrieving the customer.', error });
    }
});

// Update customer data
router.put('/:id', async (req, res) => {
    const customerId = req.params.id;
    const { name, email, address, phone_number } = req.body;

    try {
        await pool.query(
            `UPDATE customers
            SET name = ?, email = ?, address = ?, phone_number = ?
            WHERE customer_id = ?`,
            [name, email, address, phone_number, customerId]
        );
        res.sendStatus(204); // No content, as the update was successful.
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while updating user data.', error });
    }
});

router.post('/', async (req, res) => {
    const customerId = req.params.id;
    const { name, email, address, phone_number, password } = req.body;

    try {
        await pool.query(
            `INSERT INTO customers (customer_id, name, email, address, phone_number, password) VALUES (NULL, ?, ?, ?, ?, ?)`,
            [name, email, address, phone_number, password]
        );
        res.sendStatus(204); // No content, as the update was successful.
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while updating user data.', error });
    }
});


router.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    pool.query(
        'SELECT * FROM customers WHERE name = ?',
        username,
        (err, result) => {
            if (err) {
                res.send({ err: err });
            }

            if (result.length > 0) {
                if (password == result[0].password) {
                    //-- a tárolt jelszó és a kapott megegyezik
                    res.json({ auth: true, token: token, result: result });
                } else {
                    //-- nem egyezika két jelszó
                    res.json({ auth: false, message: 'wrong username/password combination' });
                }
            } else {
                res.json({ auth: false, message: 'No user found' });
            }
        }
    );
}
);

// Delete customer
router.delete('/:id', async (req, res) => {
    const customerId = req.params.id;
    try {
        await pool.query('DELETE FROM customers WHERE customer_id = ?', [customerId]);
        res.sendStatus(204); // No content, as the deletion was successful.
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while deleting the customer.', error });
    }
});

export default router;
