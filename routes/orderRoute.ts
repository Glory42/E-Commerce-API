import Router from 'express';
import {
    addOrderItems,
    getMyOrders,
    getOrderById,
    getOrders,
    updateOrderPaid,
    updateOrderDelivered,
    updateOrderQuantity,
} from '../controllers/orderController.js';
import adminPrivilege from '../middlewares/adminPrivilege.js';
import userProtection from '../middlewares/userProtection.js';
import authToken from '../middlewares/authMiddleware.js';

const router = Router();

router.post('/', authToken, addOrderItems);
router.get('/', authToken, adminPrivilege, getOrders);
router.get('/myOrders', authToken, getMyOrders);

router.get('/:id', authToken, getOrderById);

router.put('/:id/deliver', authToken, adminPrivilege, updateOrderDelivered);
router.put('/:id/pay', authToken, userProtection, updateOrderPaid);
router.put('/:id/quantity', authToken, userProtection, updateOrderQuantity);

export default router; 