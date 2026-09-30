const Groq = require('groq-sdk');

let groq;
const getClient = () => {
  if (!groq) {
    groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
  }
  return groq;
};

const callAI = async (promptText) => {
  const completion = await getClient().chat.completions.create({
    messages: [{ role: 'user', content: promptText }],
    model: 'qwen/qwen3.8-27b',
  });

  return completion.choices[0]?.message?.content || '';
};

module.exports = { callAI };