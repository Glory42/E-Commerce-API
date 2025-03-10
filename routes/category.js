const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const auth = require('../middleware/auth');
const isAdmin = require('../middleware/isAdmin');

router.get('/', categoryController.getAllCategories);
router.get('/:id', categoryController.getCategoryById);

router.post('/', auth, isAdmin, categoryController.createCategory);
router.put('/:id', auth, isAdmin, categoryController.updateCategory);
router.delete('/:id', auth, isAdmin, categoryController.deleteCategory);

module.exports = router;