import Router from 'express';
import {
    getProducts,
    getProductById,
    createProduct,
    createProductReview,
    updateProduct,
    deleteProduct
} from '../controllers/productController.js';
//To do: add Protection on user priviliage routes, and add protecion to admin only route.

const router = Router();

//all
router.get('/', getProducts);
router.get('/:id', getProductById);
// user protecion
router.get('/:id/reviews', createProductReview);
// admin only 
router.post('/',createProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

export default router;
