import { Request, Response } from 'express';
import Product from '../models/Products.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { apiError } from '../utils/apiError.js';

export const getProducts = asyncHandler(async (req: Request, res: Response) => {
    const products = await Product.getProducts();
    if (!products || products.length === 0) {
        throw new apiError(404, 'No products found' );
    }

    res.status(200).json({
        message: 'Products fetched successfully',
        products,
    });
});

export const getProductById = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!id) {
        throw new apiError(400, 'Product ID is required');
    }

    const product = await Product.getProductById(id);
    if (!product || product.length === 0) {
        throw new apiError(404, 'Product not found');
    }

    res.status(200).json({
        message: 'Product fetched successfully',
        product,
    });
});

export const createProduct = asyncHandler(async (req: Request, res: Response) => {
    const { name, price, stock, category } = req.body;
    if (!name || !price || !stock || !category) {
       throw new apiError(400, 'Missing required product fields');
    } 

    const freshProduct = await Product.createProduct({ name, price, stock, category });
    if (!freshProduct) {
        console.error('Invalid product data returned:', freshProduct);
        throw new apiError(500, 'Product could not be created');
    }

    res.status(200).json({
        message: 'Product created successfully',
        product: freshProduct,
    });
});

export const createProductReview = asyncHandler(async (req: Request, res: Response) => {
    const { id, review } = req.body;
    if (!review || !id) {
        throw new apiError(400, 'Product ID and review are required');
    }

    const freshReview = await Product.createProductReview(id, review);
    if (!freshReview) {
        console.error('Invalid review data returned:', freshReview)
        throw new apiError(400, 'Review could not be created');
    } 

    res.status(200).json({
        message: 'Review created successfully',
        review: freshReview,
    });
});

export const updateProduct = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!id) {
        throw new apiError(400, 'Product ID is required');
    }

    const { updates } = req.body;
    if (!updates) {
        throw new apiError(400, 'Update data is required');
    }

    const updatedProduct = await Product.updateProduct(id, updates);
    if (!updatedProduct) {
        throw new apiError(404, 'Product not found or update failed');
    }

    res.status(200).json({
        message: 'Product updated successfully',
        update: updatedProduct,
    });
});

export const deleteProduct = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!id) {
        throw new apiError(400, 'Product ID is required');
    }

    const deletedProduct = await Product.deleteProduct(id);
    if (!deletedProduct) {
        throw new apiError(404, 'Product not found or could not be deleted');
    }

    res.status(200).json({
        message: 'Product deleted successfully',
        delete: deletedProduct,
    });
});