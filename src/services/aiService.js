const Groq = require('groq-sdk');

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const callAI = async (promptText) => {
  const completion = await groq.chat.completions.create({
    messages: [{ role: 'user', content: promptText }],
    model: 'qwen/qwen3.8-27b',
  });

  return completion.choices[0]?.message?.content || '';
};

module.exports = { callAI };