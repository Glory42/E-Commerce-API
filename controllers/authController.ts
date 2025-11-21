import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import config from '../config/config.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { apiError } from '../utils/apiError.js';

export const register = (async (req: Request, res: Response) => {
        const { email, password, username, phone, role='user' } = req.body;
        if (!email || !password) {
            throw new apiError(400, 'Email and Password are required');
        }

        const freshUser = await User.createUser({ email, password, username, phone, role });
        if (!freshUser || !freshUser.id) {
            console.error('Invalid user data returned: ', { freshUser });
            throw new apiError(401, 'Invalid user data returned');
        }

        const token = jwt.sign(
            { id: freshUser.id, email, role },
            config.JWT_TOKEN,
            { expiresIn: '1h' }
        )

        res.status(201).json({ 
            message: 'User succesfully stored',
            user: freshUser, 
            token 
        });
});

export const login = asyncHandler(async (req:Request, res: Response) => {
        const { email, password } = req.body;
        if (!email || !password) {
            throw new apiError(400, 'Email and Password are required');
        }

        const user = await User.getUserByEmail(email);
        if (!user) {
            throw new apiError(404, 'User cannot be found or Invalid email');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid) {
            throw new apiError(401, 'Invalid password');
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
                username: user.username,
                role: user.role,
            },
            token
        });
});