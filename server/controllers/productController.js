const { addProduct, updateProduct, deleteProduct, getAllProducts } = require('../models/Product');

// Controller for adding a new product (only accessible by sellers)
const addNewProduct = async (req, res) => {
  const productData = { ...req.body, seller_id: req.user.userId };  // seller_id is derived from the logged-in user
  try {
    const product = await addProduct(productData);
    res.status(201).json({ product });
  } catch (error) {
    res.status(500).json({ message: 'Unable to add product', error: error.message });
  }
};

// Controller for editing a product (only accessible by sellers)
const editProduct = async (req, res) => {
  try {
    const product = await updateProduct(req.params.id, req.body);
    res.status(200).json({ product });
  } catch (error) {
    res.status(500).json({ message: 'Unable to update product', error: error.message });
  }
};

// Controller for deleting a product (only accessible by sellers)
const deleteExistingProduct = async (req, res) => {
  try {
    const product = await deleteProduct(req.params.id);
    res.status(200).json({ product });
  } catch (error) {
    res.status(500).json({ message: 'Unable to delete product', error: error.message });
  }
};

// Controller for searching products (accessible by all users)
const searchProducts = async (req, res) => {
  try {
    const products = await getAllProducts(req.query);
    res.status(200).json({ products });
  } catch (error) {
    res.status(500).json({ message: 'Unable to fetch products', error: error.message });
  }
};

module.exports = { addNewProduct, editProduct, deleteExistingProduct, searchProducts };
