const { createOrder } = require('../models/Order');
const { getProductById } = require('../models/Product');

// Controller for purchasing a product
const purchaseProduct = async (req, res) => {
  const { productId, quantity } = req.body;
  
  try {
    // Fetch the product to get its price and ensure it exists
    const product = await getProductById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Calculate total price based on quantity and product price
    const totalPrice = product.price * quantity;

    // Create the order with buyer_id, product_id, quantity, and total_price
    const order = await createOrder({
      buyer_id: req.user.userId,
      product_id: productId,
      quantity,
      total_price: totalPrice,
    });

    // Respond with the created order
    res.status(201).json({ message: 'Order created successfully', order });

  } catch (error) {
    res.status(500).json({ message: 'Unable to process the order', error: error.message });
  }
};

module.exports = { purchaseProduct };
