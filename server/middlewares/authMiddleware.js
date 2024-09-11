const jwt = require('jsonwebtoken');

// Middleware to authenticate users based on JWT token
const authenticate = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Access denied. No token provided.' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(400).json({ message: 'Invalid token.' });
  }
};

// Middleware to authorize only sellers to perform product CRUD operations
const authorizeSeller = (req, res, next) => {
  if (req.user.role !== 'seller') {
    return res.status(403).json({ message: 'Access denied. Only sellers are allowed to perform this operation.' });
  }
  next();
};

module.exports = { authenticate, authorizeSeller };
