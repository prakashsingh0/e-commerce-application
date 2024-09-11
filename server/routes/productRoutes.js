const express = require('express');
const { addNewProduct, editProduct, deleteExistingProduct, searchProducts } = require('../controllers/productController');
const { authenticate, authorizeSeller } = require('../middlewares/authMiddleware');
const router = express.Router();

// Routes for product operations
router.post('/', authenticate, authorizeSeller, addNewProduct);         // Only sellers can add products
router.put('/:id', authenticate, authorizeSeller, editProduct);         // Only sellers can edit products
router.delete('/:id', authenticate, authorizeSeller, deleteExistingProduct); // Only sellers can delete products
router.get('/', searchProducts);                                        // All users can search products

module.exports = router;
