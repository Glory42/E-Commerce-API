export interface ProductDTO {
    name: string,
    price: number,
    stock: number | boolean,
    category: string,
    image_url?: string,
    description?: string,
} 

export interface UpdateProductDTO {
    name?: string;
    price?: number;
    stock?: number;
    category?: string | boolean;
}

export interface CreateProductDTO {
    name: string,
    price: number,
    stock: string | boolean,
    category: string,
    image_url?: string,
    description?: string,
}

export interface ReviewDTO {
    id?: string;
    userId?: string;
    rating: number;
    comment?: string;
    createdAt?: string;
}

export interface CreateReviewDTO {
    rating: number,
    comment?: string;
    created_at: string;
}