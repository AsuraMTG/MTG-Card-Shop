import express from 'express';
import path from 'path';
import cors from 'cors';
import fs from 'fs';
import { pool } from '../db.js';
import multer from 'multer';
import { fileURLToPath } from 'url';

const router = express.Router();

// Get the directory name using import.meta.url
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
router.get('/', async (req, res) => {
    try {
        const products = await pool.query(
            `SELECT * FROM products`
        );
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while listing products.', error });
    }
});

// Create products
router.post('/', upload.single('image'), async (req, res) => {
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
        const result = await pool.query(query, [name, category_id, price, stock_quantity, available, description, imageUrl]);

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
router.put('/:id', async (req, res) => {
    const product_id = req.params.id;
    const { name, category_id, price, stock_quantity, available, description } = req.body;

    const categoryToSet = category_id || null;
    try {
        const result = await pool.query(
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

export default router;