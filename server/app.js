const express = require('express');
const cors = require('cors');  // Import the CORS middleware
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
require('dotenv').config();

const app = express();

// Enable CORS for all routes and origins (or configure for specific origin)
app.use(cors({
  origin: 'http://localhost:3000',  // Allow frontend running on this URL (change as needed)
  methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Allowed HTTP methods
  credentials: true,  // Allow credentials (e.g., cookies, authorization headers)
}));

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
