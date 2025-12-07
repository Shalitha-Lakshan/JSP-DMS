const express = require('express');
const router = express.Router();
const { 
    register, 
    login, 
    getMe,
    logout,
    getCurrentUser
} = require('../controllers/auth');
const { protect } = require('../middleware/auth');

// Public routes
router.post('/register', register);
router.post('/login', login);

// Protected routes
router.use(protect);
router.get('/me', getMe);
router.get('/logout', logout);
router.get('/current-user', getCurrentUser);

module.exports = router;
