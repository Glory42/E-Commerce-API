const pool = require('../config/db');

const getAllCategories = async (req, res) => {
    try {
        const { rows } = await pool.query('SELECT * FROM categories');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch categories' });
    }
};

const getCategoryById = async (req, res) => {
    const { id } = req.params;

    try {
        const { rows } = await pool.query(
            'SELECT * FROM categories WHERE id = $1',
            [id]);
        res.json(rows[0]);
    } catch (err) {
        res.status(404).json({ error: 'Category not found' });
    }
};

const createCategory = async (req, res) => {
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({ error: 'Category name is required!' });
    } 

    try {
        const { rows } = await pool.query(
            'INSERT INTO categories(name) VALUES $1 RETURNING *',
            [name]);
        res.status(201).json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: 'Failed to create category' });
    }
};

const updateCategory = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    if (!name) {
        return res.status(500).json({ error: 'Category name is required!' });
    }

    try {
        const { rows } = await pool.query(
            'Update categories SET name = $1 WHERE id = 2$ RETURNING *',
            [name, id]);
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Category not found' });
        }
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: 'Failed to update category' });
    }
};

const deleteCategory = async (req, res) => {
    const { id } = req.params;

    try {
        const { rows } = await pool.query(
            'DELETE FROM Categories WHERE id = $1',
            [id]
        );
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete category' });
    }
};

module.exports = {
    getAllCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory
};