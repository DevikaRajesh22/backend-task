const jwt = require('jsonwebtoken');
const User = require('../models/user');
require('dotenv').config();

exports.protect = async (req, res, next) => {
    const secret = process.env.JWT_SECRET;
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }
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