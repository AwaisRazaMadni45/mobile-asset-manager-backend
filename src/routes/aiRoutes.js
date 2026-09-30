const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { aiLimiter } = require('../middleware/rateLimitMiddleware');
const {
  generateCode,
  fixBug,
  convertCode,
  detectBug,
  getHistory,
} = require('../controllers/aiController');

const router = express.Router();

// AI limiter sab routes pe lagayein
router.post('/generate', protect, aiLimiter, generateCode);
router.post('/fix', protect, aiLimiter, fixBug);
router.post('/convert', protect, aiLimiter, convertCode);
router.post('/detect', protect, aiLimiter, detectBug);
router.get('/history', protect, getHistory);

module.exports = router;