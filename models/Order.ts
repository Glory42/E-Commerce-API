import supabase from '../config/database.js';
import { 
    OrderDTO, 
    UpdateOrderDTO, 
    AddOrderDTO, 
} from '../types/Order.js';


export default class Order {
    static async addItems(order: AddOrderDTO): Promise<OrderDTO | null> {
        try {
            const { data, error } = await supabase
            .from('orders')
            .insert({
                user_id: order.user_id,
                product_id: order.product_id,
                quantity: order.quantity,
                total_price: order.total_price,
                timestamp: new Date().toISOString(),
                paid: false,
                delivered: false, 
            })
            .select('*')
            .single()
            if (error) throw error;

            return data;
        } catch (err) {
            if (err instanceof Error) {
                console.log(JSON.stringify({
                    action: 'Error fetching Order data',
                    message: err.message,
                    stack: err.stack,
                    timestamp: new Date().toISOString()
                }));
            }
            throw new Error('Failed to fetch Order Data');
        }
    }

    static async getUserOrders(user_id: string): Promise<OrderDTO[]> {
        try {
            const { data, error } = await supabase
                .from('orders')
                .select('*')
                .eq('user_id', user_id)
            if (error) throw error;

            return data;

        } catch (err) {
            if (err instanceof Error) {
                console.log({
                    action: 'Error fetchin Order data',
                    message: err.message,
                    stack: err.stack,
                    timestamp: new Date().toISOString
                });
            }
            throw new Error('Failed to fetch User Order Data');            
        }
    }

    static async getOrderById(id: string): Promise<OrderDTO> {
        try {
            const { data, error } = await supabase
                .from('orders')
                .select('*')
                .eq('id', id)
                .single()
            if (error) throw error;

            return data;

        } catch (err) {
            if (err instanceof Error) {
                console.log({
                    action: 'Error fetching Order data',
                    message: err.message,
                    stack: err.stack,
                    timestamp: new Date().toISOString
                });
            }
            throw new Error('Failed to fetch Order by ID');
        }
    }

    static async getOrders(): Promise<OrderDTO[]> {
        try {
            const { data, error } = await supabase
                .from('orders')
                .select('*')
            if (error) throw error;

            return data;
            
        } catch (err) {
            if (err instanceof Error) {
                console.log(JSON.stringify({
                    action: 'Error fetching Order data',
                    message: err.message,
                    stack: err.stack,
                    timestamp: new Date().toISOString()
                }));
            }
            throw new Error('Failed to fetch Order Data');
        }

    }

    static async updateOrder(id: string, updates: UpdateOrderDTO): Promise<OrderDTO | null> {
        try {
            const { data, error } = await supabase
                .from('orders')
                .update(updates)
                .eq('id', id)
                .select()
                .single()
            if (error) throw error;

            return data;

        } catch (err) {
            if (err instanceof Error) {
                console.log(JSON.stringify({
                    action: 'Error while updating Order',
                    message: err.message,
                    stack: err.stack,
                    timestamp: new Date().toISOString()
                }));
            }
            throw new Error('Failed to update order');
        }
    }
}