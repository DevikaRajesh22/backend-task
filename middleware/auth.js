const jwt = require('jsonwebtoken');
const User = require('../models/user');
require('dotenv').config();

exports.protect = async (req, res, next) => {
    const secret = process.env.JWT_SECRET;
    let token;
    console.log(req.headers.authorization)
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        console.log('true')
        token = req.headers.authorization.split(' ')[1];
        console.log('tok',token)
    }
    console.log('token',token)
    if (!token) {
        return res.status(401).json({ message: 'Not authorized' });
    }
    try {
        console.log('try')
        console.log("sec",secret)
        const decoded = await jwt.verify(token, process.env.JWT_SECRET);
        console.log('dec',decoded)
        req.user = await User.findById(decoded.id).select('-password');
        console.log('user',req.user)
        next();
    } catch (error) {
        res.status(401).json({ message: 'Not authorized' });
    }
};