import { Request, Response } from 'express';
import Order from '../models/Order.js';

export async function getOrders(req: Request, res: Response) {
    try {
        const orders = await Order.getOrders();
        if (!orders) {
            return res.status(404).json({ message: 'Orders not found' });
        }

        res.status(200).json({
            message: 'Orders fetched successfully',
            orders,
        });

    } catch (err) {
        if (err instanceof Error) {
            console.error('Failed to fetch Order:', err.message, err.stack);
            res.status(500).json({ error: 'server error!', details: err.message || err.toString() });
        }
    }
}

export async function getOrderById(req: Request, res: Response) {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: 'Order ID is required' });
        }

        const order = await Order.getOrderById(id);
        if (!order) {
            return res.status(404).json({message: 'Order not found'});
        } 
        
        res.status(200).json({
            message: 'Order fetched successfully',
            order,
        });

    } catch (err) {
        if (err instanceof Error) {
            console.error('Failed to fetch Order:', err.message, err.stack);
            res.status(500).json({ error: 'server error!', details: err.message || err.toString() });
        }
    }
}

export async function getMyOrders(req: Request, res: Response) {
    try {
        const user_id = req.user?.id;
        if (!user_id) {
            return res.status(400).json({ message: 'User ID is required' });
        }

        const orders = await Order.getUserOrders(user_id);
        if (!orders) {
            return res.status(404).json({ message: 'Orders not found' });
        }

        res.status(200).json({
            message: 'User order fetched successfully',
            orders,
        })

    } catch (err) {
        if (err instanceof Error) {
            console.error('Failed to fetch Order:', err.message, err.stack);
            res.status(500).json({ error: 'server error!', details: err.message || err.toString() });
        }
    }
}

export async function addOrderItems(req: Request, res: Response) {
    try {
        const user_id = req.user?.id;
        const { product_id, quantity, total_price } = req.body;
        if (!user_id || !product_id) {
            return res.status(400).json({ message: 'User and Product IDs are required' });
        }
        if (!quantity || !total_price) {
            return res.status(400).json({ message: 'Order Informations required' });
        }

        const newOrder = await Order.addItems({
            user_id,
            product_id,
            quantity,
            total_price,
        });
        if (!newOrder) {
            return res.status(404).json({ message: 'Order datas not found' });
        }

        res.status(201).json({
            message: 'Order added successfully',
            newOrder,
        });

    } catch (err) {
        if (err instanceof Error) {
            console.error('Failed to fetch Order:', err.message, err.stack);
            res.status(500).json({ error: 'server error!', details: err.message || err.toString() });
        }
    }
}

export async function updateOrderPaid(req: Request, res: Response) {
  try {
    const orderId = req.params.id;
    if (!orderId) {
        return res.status(400).json({ message: 'Order ID is required' });
    }
    
    const updatedOrder = await Order.updateOrder(orderId, { paid: true });
    if (!updatedOrder) {
        return res.status(404).json({ message: 'Order not found' });
    };
    res.status(200).json({
        message: 'Payment successful',
        updatedOrder
    });

  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ error: 'Server error', details: err.message });
    }
  }
}

export async function updateOrderDelivered(req: Request, res: Response) {
  try {
    const orderId = req.params.id;
    if (!orderId) {
        return res.status(400).json({ message: 'Order ID is required' });
    }

    const updatedOrder = await Order.updateOrder(orderId, { delivered: true });
    if (!updatedOrder) {
        return res.status(404).json({ message: 'Order not found' });
    };

    res.status(200).json({ 
        message: 'Order marked as delivered',
        updatedOrder,
    });

  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ error: 'Server error', details: err.message });
    }
  }
}

export async function updateOrderQuantity(req: Request, res: Response) {
  try {
    const orderId = req.params.id;
    if (!orderId) {
        return res.status(400).json({ message: 'Order ID is required' });
    }
    const { quantity } = req.body;
    if (!quantity) {
        return res.status(400).json({ message: 'Quantity is required' });
    };

    const updatedOrder = await Order.updateOrder(orderId, { quantity });
    if (!updatedOrder) {
        return res.status(404).json({ message: 'Order not found' });
    };

    res.status(200).json({
        message: 'Order quantity updated',
        updatedOrder,
    });

  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ error: 'Server error', details: err.message });
    }
  }
}
