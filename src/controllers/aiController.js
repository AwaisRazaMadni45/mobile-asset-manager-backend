const { callAI } = require('../services/aiService');
const CodeHistory = require('../models/CodeHistory');

// @desc   Generate code from idea
// @route  POST /api/ai/generate
const generateCode = async (req, res) => {
  try {
    const { idea, language } = req.body;

    if (!idea) {
      return res.status(400).json({ message: 'Idea is required' });
    }

const prompt = `You are a coding assistant. Generate clean, working code for the following request. Detect the best programming language automatically if not specified, or use ${language || 'JavaScript'}. Only return the code, no explanations.\n\nRequest: ${idea}`;

    const generatedCode = await callAI(prompt);

    // Optional: history save karna
    await CodeHistory.create({
      user: req.user._id,
      type: 'generate',
      inputPrompt: idea,
      outputCode: generatedCode,
    });

    res.json({ code: generatedCode });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc   Fix bugs in given code
// @route  POST /api/ai/fix
const fixBug = async (req, res) => {
  try {
    const { code } = req.body;

    if (!code) {
      return res.status(400).json({ message: 'Code is required' });
    }

const prompt = `Here is some code with possible bugs. Detect the programming language automatically and fix the bugs. Return only the fixed code, no explanations.\n\nCode:\n${code}`;

    const fixedCode = await callAI(prompt);

    await CodeHistory.create({
      user: req.user._id,
      type: 'fixBug',
      inputPrompt: code,
      outputCode: fixedCode,
    });

    res.json({ code: fixedCode });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc   Convert code from one language to another
// @route  POST /api/ai/convert
const convertCode = async (req, res) => {
  try {
    const { code, targetLanguage } = req.body;

    if (!code || !targetLanguage) {
      return res.status(400).json({ message: 'Code and targetLanguage are required' });
    }

const prompt = `Convert the following code into ${targetLanguage || 'Python'}. Detect the source language automatically. Only return the converted code, no explanations.\n\nCode:\n${code}`;

    const convertedCode = await callAI(prompt);

    await CodeHistory.create({
      user: req.user._id,
      type: 'convert',
      inputPrompt: code,
      outputCode: convertedCode,
    });

    res.json({ code: convertedCode });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc   Detect bugs and explain them (without fixing)
// @route  POST /api/ai/detect
const detectBug = async (req, res) => {
  try {
    const { code } = req.body;

    if (!code) {
      return res.status(400).json({ message: 'Code is required' });
    }

const prompt = `Analyze the following code. Detect the programming language automatically and list any bugs or issues you find, with short explanations.\n\nCode:\n${code}`;

    const analysis = await callAI(prompt);

    await CodeHistory.create({
      user: req.user._id,
      type: 'detectBug',
      inputPrompt: code,
      outputCode: analysis,
    });

    res.json({ result: analysis });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// @desc   Get user's code history
// @route  GET /api/ai/history
const getHistory = async (req, res) => {
  try {
    const history = await CodeHistory.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .limit(10);
    res.json(history);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = { generateCode, fixBug, convertCode, detectBug, getHistory };