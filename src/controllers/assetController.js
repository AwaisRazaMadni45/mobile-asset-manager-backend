const Asset = require('../models/Asset');

// @desc   Create new asset (snippet)
// @route  POST /api/assets
const createAsset = async (req, res) => {
  try {
    const { title, language, code, description } = req.body;

    if (!title || !code) {
      return res.status(400).json({ message: 'Title and code are required' });
    }

    const asset = await Asset.create({
      user: req.user._id,
      title,
      language,
      code,
      description,
    });

    res.status(201).json(asset);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc   Get all assets of logged-in user
// @route  GET /api/assets
const getAssets = async (req, res) => {
  try {
    const assets = await Asset.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(assets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc   Get single asset by id
// @route  GET /api/assets/:id
const getAssetById = async (req, res) => {
  try {
    const asset = await Asset.findOne({ _id: req.params.id, user: req.user._id });

    if (!asset) {
      return res.status(404).json({ message: 'Asset not found' });
    }

    res.json(asset);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc   Update asset
// @route  PUT /api/assets/:id
const updateAsset = async (req, res) => {
  try {
    const asset = await Asset.findOne({ _id: req.params.id, user: req.user._id });

    if (!asset) {
      return res.status(404).json({ message: 'Asset not found' });
    }

    const { title, language, code, description, isFavorite } = req.body;

    asset.title = title ?? asset.title;
    asset.language = language ?? asset.language;
    asset.code = code ?? asset.code;
    asset.description = description ?? asset.description;
    asset.isFavorite = isFavorite ?? asset.isFavorite;

    const updatedAsset = await asset.save();
    res.json(updatedAsset);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc   Delete asset
// @route  DELETE /api/assets/:id
const deleteAsset = async (req, res) => {
  try {
    const asset = await Asset.findOne({ _id: req.params.id, user: req.user._id });

    if (!asset) {
      return res.status(404).json({ message: 'Asset not found' });
    }

    await asset.deleteOne();
    res.json({ message: 'Asset deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createAsset,
  getAssets,
  getAssetById,
  updateAsset,
  deleteAsset,
};