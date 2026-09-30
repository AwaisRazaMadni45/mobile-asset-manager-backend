const rateLimit = require('express-rate-limit');

// AI endpoints ke liye — 20 requests per 15 minutes
const aiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20,
  message: {
    message: 'Too many AI requests. Please wait 15 minutes before trying again.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Login ke liye — 5 attempts per 15 minutes
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: {
    message: 'Too many login attempts. Please wait 15 minutes.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Register ke liye — 3 attempts per hour
const registerLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 3,
  message: {
    message: 'Too many accounts created. Please try again after an hour.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Forgot/reset password ke liye — 5 attempts per 15 minutes
const passwordLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { message: 'Bohat zyada koshishein. 15 minute baad try karein.' },
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = { aiLimiter, loginLimiter, registerLimiter, passwordLimiter };