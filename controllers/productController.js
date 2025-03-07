const pool = require('../config/db');

const getAllProducts = async (req, res) => {
    try {
        const { rows } = await pool.query('SELECT * FROM products');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch products' });
    }
};

const getProductById = async (req, res) => {
    const { id } = req.params;
    try {
        const { rows } = await pool.query(
            'SELECT * FROM products WHERE id = $1',
            [id]
        );
        if (rows.length === 0) return res.status(404).json({ error: 'Product not found' });
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch product' });
    }
};

const createProduct = async (req, res) => {
    const { name, price, stock, category_id } = req.body;
    if (!name || !price || !stock || !category_id) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const { rows } = await pool.query(
            'INSERT INTO products(name, price, stock, category_id) VALUES ($1, $2, $3, $4) RETURNING *',
            [name, price, stock, category_id]
        );
        res.status(201).json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: 'Failed to create product' });
    }
};

const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { name, price, stock, category_id } = req.body;

    try {
        const updates = [];
        const values = [];
        let paramIndex = 1;

        if (name) {
            updates.push(`name = $${paramIndex}`);
            values.push(name);
            paramIndex++;
        }
        if (price) {
            updates.push(`price = $${paramIndex}`);
            values.push(price);
            paramIndex++;
        }
        if (stock) {
            updates.push(`stock = $${paramIndex}`);
            values.push(stock);
            paramIndex++;
        }
        if (category_id) {
            updates.push(`category_id = $${paramIndex}`);
            values.push(category_id);
            paramIndex++;
        }

        if (updates.length === 0) {
            return res.status(400).json({ error: 'No fields to update' });
        }

        const query = `
            UPDATE products
            SET ${updates.join(', ')}
            WHERE id = $${paramIndex}
            RETURNING *
        `;
        values.push(id);

        const { rows } = await pool.query(query, values);
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: 'Failed to update product' });
    }
};

const deleteProduct = async (req, res) => {
    const { id } = req.params;
    
    try {
        const { rowCount } = await pool.query(
            'DELETE FROM products WHERE id = $1',
            [id]
        );
        if (rowCount === 0) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete product' });
    }
};


module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
  };