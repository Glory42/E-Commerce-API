import Router from 'express';
import {
    getUsers,
    getUserById,
    getUserProfile,
    updateUserById,
    updateUserProfile,
    deleteUser,
    register,
    login,

} from '../controllers/userController.js';

//To do: add Protection on user priviliage routes, and add protecion to admin only route.

const router = Router();

//admin only
router.get('/', getUsers);
router.get('/:id', getUserById);
router.put('/:id', updateUserById);
router.delete('/:id', deleteUser);

//user 
router.post('/register', register);
router.post('/login', login);
// user protecion must.
router.put('/profile', updateUserProfile);
router.get('/profile', getUserProfile);3

export default router;
