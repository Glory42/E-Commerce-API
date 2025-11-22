import supabase from '../config/database.js';
import { 
    ProductDTO, 
    UpdateProductDTO, 
    CreateProductDTO, 
    ReviewDTO,
    CreateReviewDTO 
} from '../types/Product.js';

export default class Product {
    static async getProducts(): Promise<ProductDTO[]> {
        try {
            const { data, error } = await supabase
                .from('products')
                .select('*');
            if (error) throw error;

            return data;

        } catch (err) {
            if (err instanceof Error) {
                console.log(JSON.stringify({
                    action: 'Error fetching Products',
                    message: err.message,
                    stack: err.stack,
                    timestamp: new Date().toISOString()
                }));   
            }
            throw new Error('Failed to fetch products');
        }
    }

    static async getProductById(id: string): Promise<ProductDTO[] | null> {
        try {
            const { data, error } = await supabase
                .from('products')
                .select('*')
                .eq('id', id)
                .single()
            if (error) throw error;

            return data;

        } catch (err) {
           if (err instanceof Error) {
                console.log(JSON.stringify({
                    action: 'Error fetching Product by id',
                    message: err.message,
                    stack: err.stack,
                    timestamp: new Date().toISOString()
                }));
            } 
            throw new Error('Failed to fetch product');
        }
    }

    static async getProductByName(name: string): Promise<ProductDTO[] | null> {
        try {
            const { data, error } = await supabase
                .from('products')
                .select('*')
                .eq('name', name)
                .single()
            if (error) throw error;

            return data;

        } catch (err) {
            if (err instanceof Error) {
                console.log(JSON.stringify({
                    action: 'Error fetching Product by name',
                    message: err.message,
                    stack: err.stack,
                    timestamp: new Date().toISOString()
                }));
            }
            throw new Error('Failed to fetch product');
        }
    }

    static async getProductByPrice(price: number): Promise<ProductDTO[] | null> {
        try {
            const { data, error } = await supabase
                .from('products')
                .select('*')
                .eq('price', price)
                .single()
            if (error) throw error;

            return data;

        } catch (err) {
            if (err instanceof Error) {
                console.log(JSON.stringify({
                    action: 'Error fetching Product by price',
                    message: err.message,
                    stack: err.stack,
                    timestamp: new Date().toISOString()
                }));
            }
            throw new Error('Failed to fetch product');
        }
    }

    static async getProductByStock(stock: string | boolean): Promise<ProductDTO[] | null> {
        try {
            const { data, error } = await supabase
                .from('products')
                .select('*')
                .eq('stock', stock)
                .single()
            if (error) throw error;

            return data;
            
        } catch (err) {
            if (err instanceof Error) {
                console.log(JSON.stringify({
                    action: 'Error fetching Product by stock',
                    message: err.message,
                    stack: err.stack,
                    timestamp: new Date().toISOString()
                }));
            }
            throw new Error('Failed to fetch product');
        }
    }

    static async getProductByCategory(category: string): Promise<ProductDTO[] | null> {
        try {
            const { data, error } = await supabase
                .from('products')
                .select('*')
                .eq('category', category)
                .single()
            if (error) throw error;

            return data;

        } catch (err) {
            if (err instanceof Error) {
                console.log(JSON.stringify({
                    action: 'Error fetching Product by category',
                    message: err.message,
                    stack: err.stack,
                    timestamp: new Date().toISOString()
                }));
            }
            throw new Error('Failed to fetch product');
        }
    }

    //to do make getProdcut review
    /* static async getProductReview(id: string): Promise<ReviewDTO | null> {
        try {
            const { data, error } = await supabase
                .from('products')
                .select('*')
                .eq('')
        } catch (err) {
            if (err instanceof Error) {
                console.log(JSON.stringify({
                    action: 'Error fetching Product reviews',
                    message: err.message,
                    stack: err.stack,
                    timestamp: new Date().toISOString()
                }));
            }
        }
    }
    */

    static async createProduct({ name, price, stock, category }: CreateProductDTO): Promise<CreateProductDTO> {
        try {
            const { data, error } = await supabase
                .from('products')
                .insert({
                    name,
                    price,
                    stock,
                    category,
                    created_at: new Date().toISOString,
                    name_updated_at: new Date().toISOString,
                    price_updated_at: new Date().toISOString,
                    category_updated_at: new Date().toISOString
                })
                .select()
            if (error) throw error;

            if (!data || data.length === 0) {
                const { data:manualData, error:manualError } = await supabase
                    .from('products')
                    .select('*')
                    .eq('name', name)
                    .single()
                if (manualError) {
                    throw manualError;
                }

                return manualData;
            }
            
            return data[0];

        } catch (err) {
            if (err instanceof Error) {
                console.log(JSON.stringify({
                    action: 'Error while creating Product',
                    message: err.message,
                    stack: err.stack,
                    timestamp: new Date().toISOString()
                }));
            }
            throw err;
        }
    } 

    static async createProductReview(id: string, review: CreateReviewDTO): Promise<ReviewDTO> {
        try {
            const { data, error } = await supabase
                .from('products')
                .update(review)
                .eq('id', id)
                .select()
                .single()
            if (error) throw error;

            return data;

        } catch (err) {
            if (err instanceof Error) {
                console.log(JSON.stringify({
                    action: 'Error while creating Product review',
                    message: err.message,
                    stack: err.stack,
                    timestamp: new Date().toISOString()
                }));
            }
            throw err;
        }
    } 

    static async updateProduct(id: string, updates: UpdateProductDTO): Promise<ProductDTO[]> {
        try {
            const { data, error } = await supabase
                .from('products')
                .update({
                    ...updates,
                    name_updated_at: new Date().toISOString,
                    price_updated_at: new Date().toISOString,
                    category_updated_at: new Date().toISOString
                })
                .eq('id', id)
                .select()
                
            if (error) throw error;

            return data;

        } catch (err) {
            if (err instanceof Error) {
                console.log(JSON.stringify({
                    action: 'Error while updating Product',
                    message: err.message,
                    stack: err.stack,
                    timestamp: new Date().toISOString()
                }));
            }
            throw err;
        }
    }

    static async deleteProduct(id: string): Promise<ProductDTO | null> {
        try {
            const { data, error } = await supabase
                .from('products')
                .delete()
                .eq('id', id)
                
            if (error) throw error;

            return data;

        } catch (err) {
            if (err instanceof Error) {
                console.log(JSON.stringify({
                    action: 'Error while deleting Product',
                    message: err.message,
                    stack: err.stack,
                    timestamp: new Date().toISOString()
                }));
            }
            throw err;
        }
    }
}