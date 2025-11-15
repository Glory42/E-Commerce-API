import { Request, Response } from 'express';
import User from '../models/User.js';

export async function getUsers(req: Request, res: Response) {
    try {
        const users = await User.getUser();
        if (!users) {
            res.status(404).json({ message: 'Users not found' });
        }

        res.status(200).json({
            message: 'Users get',
            users,
        });

    } catch (err) {
        if (err instanceof Error) {
            console.error('Failed to fetch users: ', err.message, err.stack);
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

        const user = await User.getUserById(id);
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
        const userId = req.user?.id;
         if (!userId) {
            return res.status(401).json({ error: 'Unauthorized - User ID not found' });
        }

        const userProfile = await User.getUserProfile(userId);
        if (!userProfile) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({
            message: 'Public profile fetched',
            userProfile,
        });

    } catch (err) {
        if (err instanceof Error) {
            console.error('Failed to fetch user profile: ', err.message, err.stack);
            res.status(500).json({ error: 'server error!', details: err.message || err.toString() });
        }

    }
}

export async function updateUserById(req: Request, res: Response) {
    try {
        const { id } = req.params;
        if (!id) {
            res.status(400).json({ message: 'User id is required' });
        }

        const updates = req.body;
        if (!updates) {
            return res.status(400).json({ message: 'No fields provided to update' });
        }
        
        const updatedUser = await User.updateUser(String(id), updates);
        if (!updatedUser) {
            return res.status(404).json({ message: 'Failed to update user by id' });
        }

        res.status(200).json({
            message: 'User updated successfully',
            updatedUser,
        });

    } catch (err) {
        if (err instanceof Error) {
            console.error('Failed to fetch update user: ', err.message, err.stack);
            res.status(500).json({ error: 'server error!', details: err.message || err.toString() });
        }

    }
}

export async function updateUserProfile(req: Request, res: Response) {
    try {
        const loggedIn = req.user?.id;
        if (!loggedIn) {
            return res.status(400).json({ message: 'Profile id is required' });
        }

        const updates = req.body;
        if (!updates) {
            return res.status(400).json({ message: 'No fields provided to update' });
        }

        const updatedUser = await User.updateUser(loggedIn!, updates);

        res.status(200).json({
            message: 'Profile updated successfully',
            updatedUser,
        });

    } catch (err) {
        if (err instanceof Error) {
            console.error('Failed to fetch update user: ', err.message, err.stack);
            res.status(500).json({ error: 'server error!', details: err.message || err.toString() });
        }

    }
}

export async function deleteUser(req: Request, res: Response) {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: 'User id is required' });
        }

        const deletedUser = await User.deleteUser(id);
        if (!deletedUser) {
            return res.status(404).json({ message: 'Failed to delete user' });
        }

        res.status(200).json({
            message: 'User deleted succesfully',
            deletedUser,
        });

    } catch (err) {
        if (err instanceof Error) {
            console.error('Failed to fetch delete user: ', err.message, err.stack);
            res.status(500).json({ error: 'server error!', details: err.message || err.toString() });
        }

    }
}