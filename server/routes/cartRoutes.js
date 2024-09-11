const express = require('express');
const { addItemToCart, removeItemFromCart, viewCartItems } = require('../controllers/cartController');
const authenticate = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/', authenticate, addItemToCart);
router.delete('/:id', authenticate, removeItemFromCart);
router.get('/', authenticate, viewCartItems);

module.exports = router;
