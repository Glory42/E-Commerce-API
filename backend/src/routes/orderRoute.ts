import Router from 'express';
import {
  addOrderItems,
  getMyOrders,
  getOrderById,
  getOrders,
  updateOrderToDelivered,
  updateOrderToPaid,
} from '../controllers/orderController.js';
//To do: add Protection on user priviliage routes, and add protecion to admin only route.

const router = Router();

//user protection
router.post('/', addOrderItems);
router.get('/:id', getOrderById);
router.get('/myOrders', getMyOrders);
router.put('/:id/pay', updateOrderToPaid);

//admin + user
router.get('/', getOrders);
router.put('/:id/deliver', updateOrderToDelivered);
router.put('/:id/pay', updateOrderToPaid);

export default router; 