const pool = require('../config/db');

const addToCart = async (userId, productId) => {
  // Check if the product already exists in the cart
  const checkQuery = 'SELECT * FROM cart WHERE user_id = $1 AND product_id = $2';
  const checkValues = [userId, productId];
  const checkResult = await pool.query(checkQuery, checkValues);

  if (checkResult.rows.length > 0) {
    // If it exists, increment the quantity
    const cartItemId = checkResult.rows[0].id;
    const updateQuery = 'UPDATE cart SET quantity = quantity + 1 WHERE id = $1 RETURNING *';
    const updateValues = [cartItemId];
    const updateResult = await pool.query(updateQuery, updateValues);
    return updateResult.rows[0];
  } else {
    // If it does not exist, insert a new record with quantity = 1
    const insertQuery = 'INSERT INTO cart (user_id, product_id, quantity) VALUES ($1, $2, 1) RETURNING *';
    const insertValues = [userId, productId];
    const insertResult = await pool.query(insertQuery, insertValues);
    return insertResult.rows[0];
  }
};

const removeFromCart = async (userId, cartItemId) => {
  const query = 'DELETE FROM cart WHERE id = $1 AND user_id = $2 RETURNING *';
  const values = [cartItemId, userId];
  const result = await pool.query(query, values);
  return result.rows[0];
};

const getCartItems = async (userId) => {
  const query = 'SELECT * FROM cart WHERE user_id = $1';
  const result = await pool.query(query, [userId]);
  return result.rows;
};

module.exports = { addToCart, removeFromCart, getCartItems };
