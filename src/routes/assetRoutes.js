const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const {
  createAsset,
  getAssets,
  getAssetById,
  updateAsset,
  deleteAsset,
} = require('../controllers/assetController');

const router = express.Router();

router.post('/', protect, createAsset);
router.get('/', protect, getAssets);
router.get('/:id', protect, getAssetById);
router.put('/:id', protect, updateAsset);
router.delete('/:id', protect, deleteAsset);

module.exports = router;