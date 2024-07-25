const User = require('../models/user');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Register a new user
exports.registerUser = async (req, res) => {
    try {
        const { username, password } = req.body
        if (!username || !password) {
            return res.status(400).json({ message: 'Username and password are required' });
        }
        if (username.length < 3) {
            return res.status(400).json({ message: 'Username must be at least 3 characters long' });
        }
        if (password.length < 6) {
            return res.status(400).json({ message: 'Password must be at least 6 characters long' });
        }
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists' });
        }
        const user = new User({ username, password });
        await user.save();
        res.status(201).json({ message: 'User registered' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};


// Login user and generate JWT
exports.loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ message: 'Username and password are required' });
        }
        const user = await User.findOne({ username: username });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const secret = process.env.JWT_SECRET;
        const expiresIn = process.env.JWT_EXPIRES_IN;
        if (!secret || !expiresIn) {
            console.error('JWT secret or expiresIn is not defined');
            return res.status(500).json({ message: 'Server configuration error' });
          }
          const token = jwt.sign({ id: user._id }, secret, { expiresIn });
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};


// Protected route example
exports.getProfile = (req, res) => {
    res.status(200).json({ message: 'Access granted', user: req.user });
};