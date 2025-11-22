import Router from 'express';
import {
    getProducts,
    getProductById,
    createProduct,
    createProductReview,
    updateProduct,
    deleteProduct
} from '../controllers/productController.js';
import adminPrivilege from '../middlewares/adminPrivilege.js';
import userProtection from '../middlewares/userProtection.js';
import authToken from '../middlewares/authMiddleware.js';

const router = Router();

router.get('/', getProducts);
router.post('/', authToken, adminPrivilege, createProduct);

router.get('/:id', getProductById);
router.put('/:id', authToken, adminPrivilege, updateProduct);
router.delete('/:id', authToken, adminPrivilege, deleteProduct);

router.post('/:id/reviews', authToken, createProductReview);

export default router;
