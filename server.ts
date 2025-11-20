import express from 'express';
import cors from 'cors';
import config from './config/config.js';
import userRoute from './routes/userRoute.js';
import productRoute from './routes/productRoute.js';
import orderRoute from './routes/orderRoute.js';
import notFoundHandler from './middlewares/404handler.js';
import errorHandler from './middlewares/errorHandler.js';

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api/user', userRoute);
app.use('/api/product', productRoute);
app.use('/api/order', orderRoute);
app.use(notFoundHandler);
app.use(errorHandler);

app.get('/', (req, res) => {
    res.json({ message: 'Server is running :)' });
})

app.listen(config.port, () => console.log(`server is running on http://localhost:${config.port}`));
