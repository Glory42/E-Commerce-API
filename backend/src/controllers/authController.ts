import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import config from '../config/config.js';

export async function register(req: Request, res: Response) {
    try {
        const { email, password, username, phone, role='user' } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: 'Email and Password are required' });
        }

        const freshUser = await User.createUser({ email, password, username, phone, role });
        if (!freshUser || !freshUser.id) {
            console.error('Invalid user data returned: ', { freshUser });
            return res.status(500).json({ error: 'Invalid user data returned' });
        }

        const token = jwt.sign(
            { id: freshUser.id, email, role },
            config.JWT_TOKEN,
            { expiresIn: '1h' }
        )

        res.status(201).json({ message: 'User succesfully stored', user: freshUser, token });


    } catch (err) {
        if (err instanceof Error) {
            console.error('Register Error:', err.message, err.stack);
            res.status(500).json({ error: 'server error!', details: err.message || err.toString() });
        }
    }
}

export async function login(req:Request, res: Response) {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({ error: 'Email and Password are required' });
        }

        const user = await User.getUserByEmail(email);
        if (!user) {
            return res.status(400).json({ error: 'User cannot be found or Invalid email' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid) {
            return res.status(400).json({ error: 'Invalid password' });
        }
        

        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role },
            config.JWT_TOKEN,
            { expiresIn: '1h' }
        );

        res.status(200).json({
            message: 'Login succefull',
            user: {
                id: user.id,
                email: user.email,
                password: user.password,
                role: user.role,
                token
            }
        });
        
    } catch (err) {
        if (err instanceof Error) {
            console.error('Login Error: ', err.message, err.stack);
            res.status(500).json({ error: 'server error!', details: err.message || err.toString() });
        }
    }
}