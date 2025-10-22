import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.json({ message: 'Server is running :)' });
})

const port = process.env.PORT;
app.listen(port, () => console.log(`server is running on http://localhost:${port}`));
