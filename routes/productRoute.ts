import Router from 'express';
import {
    getProducts,
    getProductById,
    createProduct,
    createProductReview,
    updateProduct,
    deleteProduct
} from '../controllers/productController.js';
//To do: add Protection on user priviliage routes.
import adminPrivilege from '../middlewares/adminPrivilege.js';

const router = Router();

//all
router.get('/', getProducts);
router.get('/:id', getProductById);
// user protecion
router.get('/:id/reviews', createProductReview);
// admin only 
router.post('/', adminPrivilege, createProduct);
router.put('/:id', adminPrivilege, updateProduct);
router.delete('/:id', adminPrivilege, deleteProduct);

export default router;
