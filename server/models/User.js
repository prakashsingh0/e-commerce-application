const pool = require('../config/db');

// Create a new user (with role)
const createUser = async (userData) => {
  const query = `
    INSERT INTO users (name, email, password, role) 
    VALUES ($1, $2, $3, $4) 
    RETURNING id, name, email, role
  `;
  const values = [userData.name, userData.email, userData.password, userData.role];
  
  try {
    const result = await pool.query(query, values);
    return result.rows[0]; // Return the created user
  } catch (error) {
    throw new Error(`Unable to create user: ${error.message}`);
  }
};

// Find a user by email (for login)
const findUserByEmail = async (email) => {
  const query = 'SELECT * FROM users WHERE email = $1';
  
  try {
    const result = await pool.query(query, [email]);
    return result.rows[0]; // Return the user if found
  } catch (error) {
    throw new Error(`Unable to find user by email: ${error.message}`);
  }
};

module.exports = { createUser, findUserByEmail };
