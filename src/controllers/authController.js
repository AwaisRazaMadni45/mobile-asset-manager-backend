const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const User = require('../models/User.js');
const sendEmail = require('../utils/sendEmail');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// @desc   Register new user
// @route  POST /api/auth/register
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const user = await User.create({ name, email, password });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400).json({ message: 'Invalid user data' });
  }
};

// @desc   Login user
// @route  POST /api/auth/login
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(401).json({ message: 'Invalid email or password' });
  }
};

// @desc   Change password
// @route  PUT /api/auth/change-password
const changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isMatch = await user.matchPassword(oldPassword);
    if (!isMatch) {
      return res.status(400).json({ message: 'Current password is incorrect' });
    }

    user.password = newPassword;
    await user.save();

    res.json({ message: 'Password changed successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc   Forgot password — sends 6-digit code via email
// @route  POST /api/auth/forgot-password
const forgotPassword = async (req, res) => {
  const email = String(req.body.email || '');
  const user = await User.findOne({ email });

  if (user) {
    const code = crypto.randomInt(100000, 999999).toString();
    user.resetPasswordToken = crypto.createHash('sha256').update(code).digest('hex');
    user.resetPasswordExpires = Date.now() + 15 * 60 * 1000;
    await user.save();
    await sendEmail(user.email, 'Password reset code', `Aap ka code: ${code} (15 minute valid)`);
  }

  // Hamesha same jawab, taake koi email enumerate na kar sake
  res.json({ message: 'Agar email registered hai to code bhej diya gaya hai' });
};

// @desc   Reset password using 6-digit code
// @route  POST /api/auth/reset-password
const resetPassword = async (req, res) => {
  const email = String(req.body.email || '');
  const code = String(req.body.code || '');
  const { newPassword } = req.body;

  const hashed = crypto.createHash('sha256').update(code).digest('hex');
  const user = await User.findOne({
    email,
    resetPasswordToken: hashed,
    resetPasswordExpires: { $gt: Date.now() },
  });

  if (!user) return res.status(400).json({ message: 'Code ghalat ya expire ho gaya' });

  user.password = newPassword;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;
  await user.save();

  res.json({ message: 'Password reset ho gaya' });
};

module.exports = { registerUser, loginUser, changePassword, forgotPassword, resetPassword };
