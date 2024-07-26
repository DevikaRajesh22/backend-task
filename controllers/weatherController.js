const axios = require('axios');
const NodeCache = require('node-cache');
const weatherCache = new NodeCache({ stdTTL: 600 }); // Cache for 10 minutes
const asyncHandler = require('express-async-handler');

const getWeather = asyncHandler(async(req,res)=>{
  const cachedWeather = weatherCache.get('weatherData');
  if (cachedWeather) {
    return res.status(200).json(cachedWeather);
  }
  try {
    const response = await axios.get('http://api.weatherapi.com/v1/current.json?key=5aa9279dfcde405a8e350817242507&q=London');
    weatherCache.set('weatherData', response.data);
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
})

module.exports={getWeather}