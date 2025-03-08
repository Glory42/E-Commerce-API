const express = require('express');
const app = express();
const pool = require('./config/db');
const productsRoutes = require('./routes/products');
const categoryRoutes = require('./routes/category');
const cartRoures = require('./routes/cart');
const orderRoutes = require('./routes/orders');

//middleware
app.use(express.json());

//routes
app.use('/products', productsRoutes);
app.use('/categories', categoryRoutes);
app.use('/cart', cartRoures);
app.use('/orders', orderRoutes);

//test database
app.get('/test-db', async (req, res) => {
    try {
        const { rows } = await pool.query('SELECT NOW()');
        res.json({ success: true, time: rows[0].now });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//server starting
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server is started on port: ${port}`));