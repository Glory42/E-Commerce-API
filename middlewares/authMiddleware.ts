import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction} from 'express';
import config from '../config/config.js';

export default function authtoken(req: Request, res: Response, next: NextFunction) {
    const header = req.headers.authorization;
    if (!header) {
        return res.status(401).json({ message: 'Authorization header missing' });
    }

    const token = header.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Token is missind' });
    }

    try {
        const decoded = jwt.verify(token, config.JWT_TOKEN);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(500).json({ error: 'Invalid or expired token' });
    }
}  