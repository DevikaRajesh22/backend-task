const express=require('express')
const connectDB=require('../config/db')
const productRoutes=require('../routes/productRoute')
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

app.use('/api/products', productRoutes);
app.use(notFound);
app.use(errorHandler);


module.exports = app;