const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const connectDB = require('./config/db');
const productRoutes = require('./routes/productRoute');
const userRoutes = require('./routes/userRoute');
const weatherRoutes = require('./routes/weatherRoute');
const { notFound, errorHandler } = require('./middleware/errorHandler');
const logger = require('./utils/logger');

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
app.get('/', (req, res) => {
  res.send('products api running new deploy');
});

app.use('/products', productRoutes);
app.use('/users', userRoutes);
app.use('/weather', weatherRoutes);

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

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports=app;