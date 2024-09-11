const express = require('express');
const { purchaseProduct } = require('../controllers/orderController');
const { authenticate } = require('../middlewares/authMiddleware');
const router = express.Router();

// Route for purchasing a product (only buyers can make purchases)
router.post('/purchase', authenticate, purchaseProduct);

module.exports = router;
