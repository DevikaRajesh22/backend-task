const express = require('express');
const http = require('http');
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
const server = http.createServer(app);
const io = socketIo(server);

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  console.log('Request Body:', req.body);
  next();
});

// Routes
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/weather', weatherRoutes);

io.on('connection', (socket) => {
  console.log('New client connected');
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
  socket.on('newMessage', (message) => {
    io.emit('messageReceived', message);
  });
});

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

module.exports = (req, res) => {
  return new Promise((resolve, reject) => {
    server.once('request', (req, res) => {
      app(req, res);
    });
    server.listen(0, () => resolve());
  });
};