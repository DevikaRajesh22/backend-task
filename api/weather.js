const express = require('express');
const weatherRoute=require('../routes/weatherRoute')
const { notFound, errorHandler } = require('../middleware/errorHandler');

require('dotenv').config();

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  console.log('Request Body:', req.body);
  next();
});

app.use('/api/weather', weatherRoute);
app.use(notFound);
app.use(errorHandler);

module.exports = app;