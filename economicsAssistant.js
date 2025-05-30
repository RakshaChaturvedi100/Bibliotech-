// economicsAssistant.js
const { Configuration, OpenAIApi } = require('openai');
require('dotenv').config();

// Setup OpenAI Configuration
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY, // 🔑 from your .env file
});

const openai = new OpenAIApi(configuration);

// Main function to handle economics Q&A
async function getEconomicsAnswer(question) {
  try {
    const prompt = `
You are an intelligent UPSC Economics Assistant for Bibliotech. Answer the question in a clear, helpful, structured manner. Break down complex topics. Add real examples or recent data if possible.

User's question: "${question}"

Answer:
    `;

    const response = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo', // or gpt-4 if available
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
      max_tokens: 1000,
    });

    const answer = response.data.choices[0].message.content.trim();
    return answer;

  } catch (error) {
    console.error("Error in AI Response:", error);
    return "Sorry 😔, I'm facing some technical difficulty. Please try again later.";
  }
}

module.exports = { getEconomicsAnswer };
