const pool = require('../config/db');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const createOrder = async (req, res) => {
    const userId = req.user.id;
    let client;

    try {
        client = await pool.connect();
        await client.query('BEGIN');

        const cartItems = await client.query(`
            SELECT 
                ci.product_id AS "productId", 
                ci.quantity, 
                p.price, 
                p.stock
            FROM carts c
            JOIN cart_items ci ON c.id = ci.cart_id
            JOIN products p ON ci.product_id = p.id
            WHERE c.user_id = $1
            FOR UPDATE
            `, [userId]);
        if (cartItems.rows.length === 0) {
            return res.status(400).json({ error: 'cart is empty' });
        }

        let total = 0;
        for (const item  of cartItems.rows) {
            if (item.stock < item.quentity) {
                await client.query('ROLLBACK');
                return res.status(400).json({ error: `Insufficient stock for product ${item.productId}` });
            }
            total += item.price * item.quentity;
        }
        
        const paymentIntent = await stripe.paymentIntent.create({
            amount: Math.round(total * 100),
            currency: 'try',
            metadata: { userId: userId.toString() }
        });

        const order = await client.query(
            `INSERT INTO orders (user_id, total, payment_id)
            VALUES ($1, $2, $3)
            RETURNING id, created_at`,
            [userId, total, paymentIntent.id]
        );

        for (const item of cartItems.rows) {
            await client.query(
                `UPDATE products 
                SET stock = stock - $1 
                WHERE id = $2`,
                [item.quentity, item.productId]
            );
        }

        await client.query(
            'DELETE FROM cart_items WHERE cart_id IN (SELECT id FROM carts WHERE user_id = $1)',
            [userId]
        );
        await client.query('COMMIT');

        res.json({
            orderId: order.rows[0].id,
            clientSecret: paymentIntent.client_secret
        });
    } catch (err) {
        if (client) await client.query('ROLLBACK');
        console.error(err);
        res.status(500).json({ error: 'Checkout failed' });
    } finally {
        if (client) client.release();
    }
};

const getOrderHistory = async (req, res) => {
    try {
        const { rows } = await pool.query(`
            SELECT o.id, o.total, o.status, o.created_at, 
             json_agg(p.name) AS products
            FROM orders o
            JOIN order_items oi ON o.id = oi.order_id
            JOIN products p ON oi.product_id = p.id
            WHERE o.user_id = $1
            GROUP BY o.id
            `, [req.user.id]);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fench order' });
    };
}

module.exports = {
    createOrder,
    getOrderHistory
};