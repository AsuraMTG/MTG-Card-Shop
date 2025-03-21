import express from 'express';  // express importálása
import bcrypt from 'bcrypt';    // bcrypt importálása
import db from '../webserver.js'; // Feltételezve, hogy az adatbázis kapcsolódás és lekérdezések külön fájlban vannak

const router = express.Router();

// Események listázása, amelyekre még lehet jelentkezni (a maximális résztvevők számának figyelembevételével)
router.get('/events', async (req, res) => {
    try {
        let events = await db.query(
            `SELECT event_name, event_date, max_participants, current_participants
             FROM events
             WHERE current_participants < max_participants`
        );
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ message: 'Hiba történt az események listázása közben', error });
    }
});

// Egy adott esemény részleteinek lekérése
router.get('/events/:eventId', async (req, res) => {
    const eventId = req.params.eventId;
    try {
        let event = await db.query(
            `SELECT event_name, event_date, event_description, max_participants, current_participants
             FROM events
             WHERE event_id = ?`, [eventId]
        );
        if (event.length > 0) {
            res.status(200).json(event[0]);
        } else {
            res.status(404).json({ message: 'Esemény nem található' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Hiba történt az esemény adatainak lekérése közben', error });
    }
});

// Jelentkezés egy eseményre
router.post('/events/:eventId/register', async (req, res) => {
    const eventId = req.params.eventId;
    const customerId = req.body.customer_id;  // A felhasználó ID-ja, amit a bejelentkezés során kaptunk

    try {
        // Először ellenőrizzük, hogy van-e még hely az eseményen
        let event = await db.query(
            `SELECT current_participants, max_participants
             FROM events
             WHERE event_id = ?`, [eventId]
        );
        
        if (event.length === 0) {
            return res.status(404).json({ message: 'Esemény nem található' });
        }
        
        let { current_participants, max_participants } = event[0];

        if (current_participants >= max_participants) {
            return res.status(400).json({ message: 'Nincs több hely ezen az eseményen' });
        }

        // Hozzáadjuk a felhasználót a jelentkezési táblához
        await db.query(
            `INSERT INTO registrations (event_id, customer_id)
             VALUES (?, ?)`, [eventId, customerId]
        );

        // Frissítjük az események résztvevőinek számát
        await db.query(
            `UPDATE events
             SET current_participants = current_participants + 1
             WHERE event_id = ?`, [eventId]
        );

        res.status(201).json({ message: 'Sikeresen jelentkezett az eseményre' });
    } catch (error) {
        res.status(500).json({ message: 'Hiba történt a jelentkezés során', error });
    }
});

// A felhasználó által jelentkezett események listázása
router.get('/events/my-events', async (req, res) => {
    const customerId = req.user.id;  // Feltételezve, hogy a felhasználó ID-ja a bejelentkezés után elérhető

    try {
        let registrations = await db.query(
            `SELECT e.event_name, e.event_date, e.event_description
             FROM registrations r
             JOIN events e ON r.event_id = e.event_id
             WHERE r.customer_id = ?`, [customerId]
        );
        res.status(200).json(registrations);
    } catch (error) {
        res.status(500).json({ message: 'Hiba történt a jelentkezett események lekérése közben', error });
    }
});

// Felhasználó regisztrálása
router.post('/web/register', async (req, res) => { 
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = { name: req.body.name, password: hashedPassword };
        customerId.push(user);  // Itt szükséges lenne a customerId tárolása, jelenleg undefined
        res.status(201).json({message: 'Sikeres regisztráció.'});
    } catch (error) {
        res.status(500).json({message: 'Hiba történt a regisztráció során', error});
    }
});

// Felhasználó bejelentkeztetése
router.post('/web/login', async (req, res) => {
    const customerId = req.body.customer_id;
    const user = user.find(user => user.name === req.body.name);
    if (user == null) {
        return res.status(400).json({message: "A felhasználó nem található"});
    }
    try {
        if (await bcrypt.compare(req.body.password, user.password)) {
            res.status(201).json({message: "Sikeres bejelentkezés"});
        } else {
            res.status(500).json({message: "Rossz jelszó"});
        }
    } catch (error) {
        res.status(500).json({message: 'Hiba történt a bejelentkezés során', error});
    }
});

export default router;  // Az exportálás ES Modules szintaxissal
