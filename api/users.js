const express=require('express')
const connectDB = require('../config/db');
const userRoutes = require('../routes/userRoute');
const { notFound, errorHandler } = require('../middleware/errorHandler');
require('dotenv').config();

const app = express();
connectDB();

app.use(express.json());

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  console.log('Request Body:', req.body);
  next();
});

app.use('/api/users', userRoutes);
app.use(notFound);
app.use(errorHandler);

module.exports = app;