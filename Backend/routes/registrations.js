// routes/registrations.js
import express from 'express';
import { pool } from '../db.js';

// username = name lehet? 

const router = express.Router();

router.post('/registrations/register', async (req, res) => {
    console.log(req.body);
    const { username, password } = req.body;
    registerUser(username, password, email);
    res.send('User registered');
});

router.post('/registrations/login', async (req, res) => {
    console.log(req.body);
    const { username, password } = req.body;
    loginUser(username, password);
    res.send('Login attempted');
});

router.get('registrations/customers', async (req, res) => {
    console.log(req.body);
    const {customer_id, username, password, email, address, phone_number, registration_date} = req.body;
    getUser(customer_id, username, password, email, address, phone_number, registration_date);
    res.send('user adatai')
})

export default router;