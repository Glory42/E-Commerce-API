import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction} from 'express';
import config from '../config/config.js';

export const authtoken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }

    jwt.verify(token, config.JWT_TOKEN, (err, decoded) => {
        if (err) {
            res.status(403).json({ error: 'Invalid token' });
        }

        req.user = decoded;
        next();
    })
}  