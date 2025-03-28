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

// Serve product images statically
router.use(cors());
router.use(express.json());
router.use('/product_images', express.static(path.join(__dirname, 'product_images')));

// Query products
router.get('/', async (req, res) => {
    const [rows] = await pool.query('SELECT * FROM products');
    res.json(rows);
});

// Get a specific product by ID
router.get('/:id', async (req, res) => {
    const [rows] = await pool.query('SELECT * FROM products WHERE product_id = ?', [req.params.id]);
    res.json(rows[0]);
});

// Create a new product
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
        const [result] = await pool.query(query, [name, category_id, price, stock_quantity, available, description, imageUrl]);

        res.json({
            id: result.insertId,
            name,
            category_id,
            price,
            stock_quantity,
            available,
            description,
            imageUrl
        });
        
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({ error: 'Server error while writing to database' });
    }
});

// Update an existing product
router.put('/:id', async (req, res) => {
    const { name, category_id, price, stock_quantity, available, description } = req.body;
    const product_id = req.params.id;

    const categoryToSet = category_id || null;
    try {
        await pool.query(
            `UPDATE products
            SET name = ?, category_id = ?, price = ?, stock_quantity = ?, available = ?, description = ?
            WHERE product_id = ?`,
            [name, categoryToSet, price, stock_quantity, available, description, product_id]
        );
        res.sendStatus(204);
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while updating the product.', error });
    }
});

// Delete a product by ID
router.delete('/:id', async (req, res) => {
    await pool.query('DELETE FROM products WHERE product_id = ?', [req.params.id]);
    res.sendStatus(204);
});

export default router;
