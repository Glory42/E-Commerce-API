import { Request, Response } from 'express';
import Product from '../models/Products.js';

export async function getProducts(req: Request, res: Response) {
    try {
        const products = await Product.getProducts();
        if (!products || products.length === 0) {
            return res.status(404).json({ message: 'No products found' });
        }

        res.status(200).json({
            message: 'Products fetched successfully',
            products,
        });

    } catch (err) {
        if (err instanceof Error) {
            console.error('Failed to fetch products: ', err.message, err.stack);
            res.status(500).json({ error: 'server error!', details: err.message || err.toString() });
        }
    }
}

export async function getProductById(req: Request, res: Response) {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: 'Product ID is required' });
        }

        const product = await Product.getProductById(id);
        if (!product || product.length === 0) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json({
            message: 'Product fetched successfully',
            product,
        });
        
    } catch (err) {
        if (err instanceof Error) {
            console.error('Failed to fetch product: ', err.message, err.stack);
            res.status(500).json({ error: 'server error!', details: err.message || err.toString() });
        }
    }
}

export async function createProduct(req: Request, res: Response) {
    try {
        const { name, price, stock, category } = req.body;
        if (!name || !price || !stock || !category) {
            return res.status(400).json({ message: 'Missing required product fields' });
        } 

        const freshProduct = await Product.createProduct({ name, price, stock, category });
        if (!freshProduct) {
            console.error('Invalid product data returned:', freshProduct);
            return res.status(500).json({ message: 'Product could not be created' });
        }

        res.status(200).json({
            message: 'Product created successfully',
            product: freshProduct,
        });

    } catch (err) {
        if (err instanceof Error) {
            console.error('Failed to create product: ', err.message, err.stack);
            res.status(500).json({ error: 'server error!', details: err.message || err.toString() });
        }
    }
}

export async function createProductReview(req: Request, res: Response) {
    try {
        const { id, review } = req.body;
        if (!review || !id) {
            return res.status(400).json({ message: 'Product ID and review are required' });
        }

        const freshReview = await Product.createProductReview(id, review);
        if (!freshReview) {
            console.error('Invalid review data returned:', freshReview)
            return res.status(400).json({ message: 'Review could not be created' });
        } 

        res.status(200).json({
            message: 'Review created successfully',
            review: freshReview,
        });

    } catch (err) {
        if (err instanceof Error) {
            console.error('Failed to create product review: ', err.message, err.stack);
            res.status(500).json({ error: 'server error!', details: err.message || err.toString() });
        }
    }
}

export async function updateProduct(req: Request, res: Response) {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: 'Product ID is required' });
        }

        const { updates } = req.body;
        if (!updates) {
            return res.status(400).json({ message: 'Update data is required' });
        }

        const updatedProduct = await Product.updateProduct(id, updates);
        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found or update failed' });
        }

        res.status(200).json({
            message: 'Product updated successfully',
            update: updatedProduct,
        });

    } catch (err) {
        if (err instanceof Error) {
            console.error('Failed to update product: ', err.message, err.stack);
            res.status(500).json({ error: 'server error!', details: err.message || err.toString() });
        }
    }
}

export async function deleteProduct(req: Request, res: Response) {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: 'Product ID is required' });
        }

        const deletedProduct = await Product.deleteProduct(id);
        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product not found or could not be deleted' });
        }

        res.status(200).json({
            message: 'Product deleted successfully',
            delete: deletedProduct,
        });

    } catch (err) {
        if (err instanceof Error) {
            console.error('Failed to delete product: ', err.message, err.stack);
            res.status(500).json({ error: 'server error!', details: err.message || err.toString() });
        }
    }
}