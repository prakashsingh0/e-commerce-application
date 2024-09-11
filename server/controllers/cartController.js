const { addToCart, removeFromCart, getCartItems } = require('../models/Cart');

const addItemToCart = async (req, res) => {
  try {
    const cartItem = await addToCart(req.user.userId, req.body.productId);
    res.status(201).json({ cartItem });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while adding item to cart.' });
  }
};


const removeItemFromCart = async (req, res) => {
  const cartItem = await removeFromCart(req.user.userId, req.params.id);
  res.status(200).json({ cartItem });
};

const viewCartItems = async (req, res) => {
  const cartItems = await getCartItems(req.user.userId);
  res.status(200).json({ cartItems });
};

module.exports = { addItemToCart, removeItemFromCart, viewCartItems };
