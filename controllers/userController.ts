import { Request, Response } from 'express';
import User from '../models/User.js';

export async function getUsers(req: Request, res: Response) {
    try {
        
    } catch (err) {
        if (err instanceof Error) {
            console.error('fetching error: ', err.message, err.stack);
            res.status(500).json({ error: 'server error!', details: err.message || err.toString() });
        }
    }
}

export async function getUserById(req: Request, res: Response) {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: 'User id is required' });
        }

        const user = await User.getUserById(Number(id));
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        res.status(200).json({
            message: 'User get by id',
            user,
        });

    } catch (err) {
        if (err instanceof Error) {
            console.error('Failed to fetch user: ', err.message, err.stack);
            res.status(500).json({ error: 'server error!', details: err.message || err.toString() });
        }

    }
}

export async function getUserProfile(req: Request, res: Response) {
    try {

    } catch (err) {
        if (err instanceof Error) {
            console.error('fetching error: ', err.message, err.stack);
            res.status(500).json({ error: 'server error!', details: err.message || err.toString() });
        }

    }
}

export async function updateUserById(req: Request, res: Response) {
    try {

    } catch (err) {
        if (err instanceof Error) {
            console.error('fetching error: ', err.message, err.stack);
            res.status(500).json({ error: 'server error!', details: err.message || err.toString() });
        }

    }
}

export async function updateUserProfile(req: Request, res: Response) {
    try {

    } catch (err) {
        if (err instanceof Error) {
            console.error('fetching error: ', err.message, err.stack);
            res.status(500).json({ error: 'server error!', details: err.message || err.toString() });
        }

    }
}

export async function deleteUser(req: Request, res: Response) {
    try {

    } catch (err) {
        if (err instanceof Error) {
            console.error('fetching error: ', err.message, err.stack);
            res.status(500).json({ error: 'server error!', details: err.message || err.toString() });
        }

    }
}