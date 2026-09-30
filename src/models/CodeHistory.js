const mongoose = require('mongoose');

const codeHistorySchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    type: {
      type: String,
      enum: ['generate', 'fixBug', 'convert', 'detectBug'],
      required: true,
    },
    inputPrompt: { type: String, required: true },
    outputCode: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('CodeHistory', codeHistorySchema);