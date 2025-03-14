const fs = require('fs');
// Only load .env if it exists (for local development)
if (fs.existsSync('.env')) {
  require('dotenv').config();
}

const express = require('express');
const cors = require('cors');
const { Configuration, OpenAIApi } = require('openai');

const app = express();
app.use(cors());
app.use(express.json());

// Debug log to verify that the environment variable is set
console.log("OPENAI_API_KEY is:", process.env.OPENAI_API_KEY ? "set" : "not set");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
});
const openai = new OpenAIApi(configuration);

// Health check endpoint for Ingress health checking
app.get('/healthz', (req, res) => res.status(200).send('OK'));

// Endpoint to send messages to ChatGPT
app.post('/api/chat', async (req, res) => {
  try {
    const { messages } = req.body; 
    const completion = await openai.createChatCompletion({
      model: 'gpt-4o-mini',
      messages
    });
    const responseContent = completion.data.choices[0].message.content;
    res.json({ content: responseContent });
  } catch (error) {
    console.error("Error from OpenAI:", error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'Something went wrong.' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is listening on port ${PORT}`);
});
