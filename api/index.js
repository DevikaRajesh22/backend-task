const express = require('express');
const socketIo = require('socket.io');
const connectDB = require('../config/db');
const productRoutes = require('../routes/productRoutes');
const userRoutes = require('../routes/userRoutes');
const weatherRoutes = require('../routes/weatherRoutes');
const { notFound, errorHandler } = require('../middleware/errorHandler');
const logger = require('../utils/logger');

// Load environment variables
require('dotenv').config();

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  console.log('Request Body:', req.body);
  next();
});

// Routes
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/weather', weatherRoutes);

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

module.exports = (req, res) => {
  return new Promise((resolve, reject) => {
    app(req, res);
    resolve();
  });
};
