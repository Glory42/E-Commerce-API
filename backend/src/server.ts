import express from 'express';
import cors from 'cors';
import config from './config/config.js';
import userRoute from './routes/userRoute.js';
import productRoute from './routes/productRoute.js';
import orderRoute from './routes/orderRoute.js';

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api/user', userRoute);
app.use('/api/product', productRoute);
app.use('/api/order', orderRoute);

app.get('/', (req, res) => {
    res.json({ message: 'Server is running :)' });
})

app.listen(config.port, () => console.log(`server is running on http://localhost:${config.port}`));
