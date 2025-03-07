const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const auth  = require('../middleware/auth');
const isAdmin = require('../middleware/isAdmin'); 

router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);

router.post('/', auth, isAdmin, productController.createProduct);
router.put('/:id', auth, isAdmin, productController.updateProduct);
router.delete('/:id', auth, isAdmin, productController.deleteProduct);

module.exports = router;