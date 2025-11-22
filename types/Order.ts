export interface OrderDTO {
    id: string,
    user_id: string,
    product_id: string,
    quantity: number,
    total_price: number,
    paid: boolean,
    delivered: boolean,
    status: 'ordered' | 'approved' | 'preparing' | 'sent' | 'delivered' 
}

export interface AddOrderDTO {
    user_id: string,
    product_id: string,
    quantity: number,
    total_price: number,
}

export interface UpdateOrderDTO {
    quantity?: number,
    total_price?: number,
    paid?: boolean,
    delivered?: boolean,
}