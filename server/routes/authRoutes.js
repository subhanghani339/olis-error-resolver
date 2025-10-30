const express = require('express');
const router = express.Router();

const {
    register,
    login,
    logout,
    profile
} = require('../controllers/authController');

const { verifyAuth } = require('../middleware/authMiddleware');

// =====================
// Auth Routes
// =====================

// Register a new user
router.post('/register', register);

// Login user
router.post('/login', login);

// Logout user (protected)
router.post('/logout', verifyAuth, logout);

// Get profile of logged-in user (protected)
router.get('/profile', verifyAuth, profile);

module.exports = router;
