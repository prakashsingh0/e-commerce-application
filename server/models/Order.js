const pool = require('../config/db');

// Function to create a new order
const createOrder = async (orderData) => {
  const query = `
    INSERT INTO orders (buyer_id, product_id, quantity, total_price) 
    VALUES ($1, $2, $3, $4) 
    RETURNING *;
  `;
  const values = [
    orderData.buyer_id,
    orderData.product_id,
    orderData.quantity,
    orderData.total_price,
  ];

  try {
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (error) {
    throw new Error(`Unable to create order: ${error.message}`);
  }
};

module.exports = { createOrder };
