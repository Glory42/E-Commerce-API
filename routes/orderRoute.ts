import Router from 'express';
import {
    addOrderItems,
    getMyOrders,
    getOrderById,
    getOrders,
    updateOrderToDelivered,
    updateOrderToPaid,
} from '../controllers/orderController.js';
import adminPrivilege from '../middlewares/adminPrivilege.js';
import userProtection from '../middlewares/userProtection.js';
import authToken from '../middlewares/authMiddleware.js';

const router = Router();

router.post('/', authToken, addOrderItems);
router.get('/', authToken, adminPrivilege, getOrders);
router.get('/myOrders', authToken, getMyOrders);

router.get('/:id', authToken, getOrderById);

router.put('/:id/deliver', authToken, adminPrivilege, updateOrderToDelivered);
router.put('/:id/pay', authToken, adminPrivilege, updateOrderToPaid);

export default router; 