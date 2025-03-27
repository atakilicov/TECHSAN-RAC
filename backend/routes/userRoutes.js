const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

// Mevcut rotalar
router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.post('/forgot-password', userController.forgotPassword);
router.post('/reset-password', userController.resetPassword);
router.post('/change-password', authMiddleware, userController.changePassword);

// Profil güncelleme rotası
router.put('/profile', authMiddleware, userController.updateProfile);

module.exports = router; 