const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { protect } = require('../middleware/auth');

router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.get('/profile', protect, userController.getProfile);

module.exports = router;