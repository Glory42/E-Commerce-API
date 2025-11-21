import { Request, Response } from 'express';
import Order from '../models/Order.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { apiError } from '../utils/apiError.js';

export const getOrders = asyncHandler(async (req: Request, res: Response) => {
        const orders = await Order.getOrders();
        if (!orders) {
            throw new apiError(400, 'Orders not found');
        }

        res.status(200).json({
            message: 'Orders fetched successfully',
            orders,
        });   
});

export const getOrderById = asyncHandler(async (req: Request, res: Response) => {
        const { id } = req.params;
        if (!id) {
            throw new apiError(400, 'Order ID is required');
        }

        const order = await Order.getOrderById(id);
        if (!order) {
            throw new apiError(404,'Order not found');
        } 
        
        res.status(200).json({
            message: 'Order fetched successfully',
            order,
        });
});

export const getMyOrders = asyncHandler(async (req: Request, res: Response) => {
        const user_id = req.user?.id;
        if (!user_id) {
            throw new apiError(400, 'User ID is required');
        }

        const orders = await Order.getUserOrders(user_id);
        if (!orders) {
            throw new apiError(404, 'Orders not found');
        }

        res.status(200).json({
            message: 'User order fetched successfully',
            orders,
        });
});

export const addOrderItems = asyncHandler(async (req: Request, res: Response) => {
        const user_id = req.user?.id;
        const { product_id, quantity, total_price } = req.body;
        if (!user_id || !product_id) {
            throw new apiError(400, 'User and Product IDs are required');
        }
        if (!quantity || !total_price) {
            throw new apiError(400, 'Order Informations required');
        }

        const newOrder = await Order.addItems({
            user_id,
            product_id,
            quantity,
            total_price,
        });
        if (!newOrder) {
            throw new apiError(404, 'Order datas not found');
        }

        res.status(201).json({
            message: 'Order added successfully',
            newOrder,
        });
});

export const updateOrderPaid = asyncHandler(async (req: Request, res: Response) => {
    const orderId = req.params.id;
    if (!orderId) {
        throw new apiError(400, 'Order ID is required');
    }
    
    const updatedOrder = await Order.updateOrder(orderId, { paid: true });
    if (!updatedOrder) {
        throw new apiError(404, 'Order not found');
    };

    res.status(200).json({
        message: 'Payment successful',
        updatedOrder
    });
});

export const updateOrderDelivered = asyncHandler(async (req: Request, res: Response) => {
    const orderId = req.params.id;
    if (!orderId) {
        throw new apiError(400, 'Order ID is required');
    }

    const updatedOrder = await Order.updateOrder(orderId, { delivered: true });
    if (!updatedOrder) {
        throw new apiError(404, 'Order not found');
    };

    res.status(200).json({ 
        message: 'Order marked as delivered',
        updatedOrder,
    });
});

export const updateOrderQuantity = asyncHandler(async (req: Request, res: Response) => {
    const orderId = req.params.id;
    if (!orderId) {
        throw new apiError(400, 'Order ID is required');
    }
    const { quantity } = req.body;
    if (!quantity) {
        throw new apiError(400, 'Quantity is required');
    };

    const updatedOrder = await Order.updateOrder(orderId, { quantity });
    if (!updatedOrder) {
        throw new apiError(404, 'Order not found');
    };

    res.status(200).json({
        message: 'Order quantity updated',
        updatedOrder,
    });
});