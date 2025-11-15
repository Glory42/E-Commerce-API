import Router from 'express';
import {
    getUsers,
    getUserById,
    getUserProfile,
    updateUserById,
    updateUserProfile,
    deleteUser,
} from '../controllers/userController.js';
import {
    register,
    login,
} from '../controllers/authController.js';

//To do: add Protection on user priviliage routes.
import adminPrivilege from '../middlewares/adminPrivilege.js';
const router = Router();

//admin only
router.get('/', adminPrivilege, getUsers);
router.get('/:id', adminPrivilege, getUserById);
router.put('/:id', adminPrivilege, updateUserById);
router.delete('/:id', adminPrivilege, deleteUser);

//user 
router.post('/register', register);
router.post('/login', login);
// user protecion must.
router.put('/profile', updateUserProfile);
router.get('/profile', getUserProfile);3

export default router;
