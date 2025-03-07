const pool = require('../config/db');

const getOrCreateCart = async (userId)=> {
    let cart = await pool.query(
        'SELECT id FROM carts WHERE user_id = $1',
        [userId]
    );

    if (!cart.rows[0]) {
        cart = await pool.query(
            'INSERT INTO carts(user_id) VALUES ($1) RETURNING id',
            [userId]
        );
    }
    return cart.rows[0];
};

const getCart = async (req, res) => {
    try {
        const cartId = await getOrCreateCart(req.user.id);

        const { rows } = await pool.query(`
            SELECT
                ci.product_id AS "productId", 
                ci.quantity,
                p.name,
                p.price,
                (p.price * ci.quantity) AS subtotal
            FROM cart_items ci
            JOIN products p ON ci.product_id = p.id
            WHERE ci.cart_id = $1
            `, [cartId]);
        res.json({ items: rows });
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch cart' })
    }
};

const addToCart = async (req, res) => {
    const { productId, quantity } = req.body;

    try {
        const product = await pool.query(
            `SELECT stock FROM products WHERE id = $1 FOR UPDATE`,
            [productId]
        );

        if (!product.rows[0] || product.rows[0].stock < quantity) {
            return res.status(400).json({
                error: product.rows[0] ? 'Insufficient stock': 'Invalid product'
            });
        }
        const cartId = await getOrCreateCart(req.user.id);

        await pool.query(`
            INSERT INTO cart_items (cart_id, product_id, quantity)
            VALUES ($1, $2, $3)
            ON CONFLICT (cart_id, product_id) DO UPDATE
            SET quantity = cart_items.quantity + $3
            `, [cartId, productId, quantity]);
        
        res.json({ message: 'Cart Updated' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to update cart' });
    }
};

const removeFromCart = async (req, res) => {
    const { productId } = req.params;

    try {
        const cartId = await pool.query(
            `DELETE FROM cart_items
            WHERE cart_id = $1 AND product_id = $2`,
            [cartId, productId]
        );

        if (rowCount === 0) {
            return res.status(404).json({ error: 'Item not found in cart' });
        }
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete cart' });
    }
};

module.exports = {
    getCart,
    addToCart,
    removeFromCart
};