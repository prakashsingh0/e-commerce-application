const pool = require('../config/db');

const addProduct = async (productData) => {
  const query = 'INSERT INTO products (name, category, description, price, discount, seller_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';
  const values = [productData.name, productData.category, productData.description, productData.price, productData.discount, productData.seller_id];
  const result = await pool.query(query, values);
  return result.rows[0];
};

const updateProduct = async (id, productData) => {
  const query = 'UPDATE products SET name = $1, category = $2, description = $3, price = $4, discount = $5 WHERE id = $6 RETURNING *';
  const values = [productData.name, productData.category, productData.description, productData.price, productData.discount, id];
  const result = await pool.query(query, values);
  return result.rows[0];
};

const deleteProduct = async (id) => {
  const query = 'DELETE FROM products WHERE id = $1 RETURNING *';
  const result = await pool.query(query, [id]);
  return result.rows[0];
};

const getAllProducts = async (filter) => {
  let query = 'SELECT * FROM products';
  let values = [];
  if (filter.category) {
    query += ' WHERE category = $1';
    values = [filter.category];
  } else if (filter.name) {
    query += ' WHERE name ILIKE $1';
    values = [`%${filter.name}%`];
  }
  const result = await pool.query(query, values);
  return result.rows;
};

// Fetch a product by its ID
const getProductById = async (productId) => {
  const query = 'SELECT * FROM products WHERE id = $1';
  try {
    const result = await pool.query(query, [productId]);
    return result.rows[0];
  } catch (error) {
    throw new Error(`Unable to fetch product: ${error.message}`);
  }
};

module.exports = { addProduct, updateProduct, deleteProduct, getAllProducts, getProductById };
