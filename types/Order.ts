export interface OrderStatus {
        paid: boolean,
        delivered: boolean,
}

export interface OrderDTO {
    id: string,
    user_id: string,
    product_id: string,
    quantity: number,
    total_price: number,
    status: OrderStatus
}

export interface AddOrderDTO {
    user_id: string,
    product_id: string,
    quantity: number,
    total_price: number,
    status: OrderStatus
}

export interface UpdateOrderDTO {
    id: string,
    user_id: string,
    product_id: string,
    quantity: number,
    total_price: number,
    status: OrderStatus
}