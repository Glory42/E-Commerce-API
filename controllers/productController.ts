import { Request, Response } from 'express';
import Product from '../models/Products.js';

export async function getProducts(req: Request, res: Response) {
    try {
        const products = await Product.getProducts();
        if (!products) {
            res.status(404).json({ message: 'Products not found' });
        }

        res.status(200).json({
            message: 'Products get',
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
            return res.status(400).json({ message: 'Product id is required' });
        }

        const product = await Product.getProductById(id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json({
            message: 'Product get by id',
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

    } catch (err) {
        if (err instanceof Error) {
            console.error('Failed to create product: ', err.message, err.stack);
            res.status(500).json({ error: 'server error!', details: err.message || err.toString() });
        }
    }
}

export async function createProductReview(req: Request, res: Response) {
    try {

    } catch (err) {
        if (err instanceof Error) {
            console.error('Failed to create product review: ', err.message, err.stack);
            res.status(500).json({ error: 'server error!', details: err.message || err.toString() });
        }
    }
}

export async function updateProduct(req: Request, res: Response) {
    try {

    } catch (err) {
        if (err instanceof Error) {
            console.error('Failed to update product: ', err.message, err.stack);
            res.status(500).json({ error: 'server error!', details: err.message || err.toString() });
        }
    }
}

export async function deleteProduct(req: Request, res: Response) {
    try {

    } catch (err) {
        if (err instanceof Error) {
            console.error('Failed to delete product: ', err.message, err.stack);
            res.status(500).json({ error: 'server error!', details: err.message || err.toString() });
        }
    }
}