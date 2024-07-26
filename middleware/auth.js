const jwt = require('jsonwebtoken');
const User = require('../models/user');
require('dotenv').config();

const authenticate = async (req, res, next) => {
    try {
        console.log('try');
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }
        
        const secret = process.env.JWT_SECRET;
        if (!secret) {
            return res.status(500).json({ message: 'Secret not configured' });
        }

        const decoded = jwt.verify(token, secret);
        console.log('decoded', decoded);
        
        req.user = await User.findById(decoded.id).select('-password');
        console.log('user', req.user);

        if (!req.user) {
            return res.status(404).json({ message: 'User not found' });
        }

        next();
    } catch (error) {
        console.error('JWT verification error:', error.message);
        res.status(401).json({ message: 'Not authorized', error: error.message });
    }
};

module.exports = authenticate;
