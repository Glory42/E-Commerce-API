import supabase from '../config/database.js';
import Products from '../types/Product.js';
import Updateproducts from '../types/Pupadate.js'

export default class Product {
    static async getProducts() {
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
                    static: err.stack,
                    timestamp: new Date().toISOString()
                }));
                throw new Error('Failed to fetch products');
            }
        }
    }

    static async getProductById(id: string) {
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
                    static: err.stack,
                    timestamp: new Date().toISOString()
                }));
                throw new Error('Failed to fetch product');
            } 
        }
    }

    static async getProductByName(name: string) {
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
                    static: err.stack,
                    timestamp: new Date().toISOString()
                }));
                throw new Error('Failed to fetch product');
            }
        }
    }

    static async getProductByPrice(price: number) {
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
                    static: err.stack,
                    timestamp: new Date().toISOString()
                }));
                throw new Error('Failed to fetch product');
            }
        }
    }

    static async getProductByStock(stock: string | boolean) {
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
                    static: err.stack,
                    timestamp: new Date().toISOString()
                }));
                throw new Error('Failed to fetch product');
            }
        }
    }

    static async getProductByCategory(category: string) {
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
                    static: err.stack,
                    timestamp: new Date().toISOString()
                }));
                throw new Error('Failed to fetch product');
            }
        }
    }

    static async createProduct({ name, price, stock, category }: Products) {
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
                    static: err.stack,
                    timestamp: new Date().toISOString()
                }));
                throw err;
            }
        }
    } 

    static async createProductReview(id: string, review: string) {
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
                    static: err.stack,
                    timestamp: new Date().toISOString()
                }));
                throw err;
            }
        }
    } 
    // change the type or die -------------->  this has to go
    static async updateProduct(id: string, updates: Updateproducts) {
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
                    static: err.stack,
                    timestamp: new Date().toISOString()
                }));
                throw err;
            }
        }
    }

    static async deleteProduct(id: string) {
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
                    static: err.stack,
                    timestamp: new Date().toISOString()
                }));
                throw err;
            }
        }
    }
}