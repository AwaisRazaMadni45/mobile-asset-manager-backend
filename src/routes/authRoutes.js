const express = require('express');
const { registerUser, loginUser, changePassword, forgotPassword, resetPassword } = require('../controllers/authController');
const { loginLimiter, registerLimiter, passwordLimiter } = require('../middleware/rateLimitMiddleware');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', registerLimiter, registerUser);
router.post('/login', loginLimiter, loginUser);
router.put('/change-password', protect, changePassword);           // protect add hua
router.post('/forgot-password', passwordLimiter, forgotPassword);
router.post('/reset-password', passwordLimiter, resetPassword);

module.exports = router;
