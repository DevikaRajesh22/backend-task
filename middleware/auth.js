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
    console.log('tok',token)
    if (!token) {
        return res.status(401).json({ message: 'Not authorized' });
    }
    try {
        const decoded = jwt.verify(token, secret);
        req.user = await User.findById(decoded.id).select('-password');
        next();
    } catch (error) {
        res.status(401).json({ message: 'Not authorized' });
    }
};