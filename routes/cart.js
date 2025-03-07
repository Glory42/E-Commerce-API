const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const auth = require('../middleware/auth');

router.use(auth);

router.get('/', cartController.getCart);
router.post('/items', cartController.addToCart);
router.delete('/items/:productId', cartController.removeFromCart);

module.exports = router;