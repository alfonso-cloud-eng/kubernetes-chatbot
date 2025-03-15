const fs = require('fs');
// Conditionally load .env only if it exists (for local development)
if (fs.existsSync('.env')) {
  require('dotenv').config();
}

const express = require('express');
const cors = require('cors');
const path = require('path');
const { Configuration, OpenAIApi } = require('openai');

const app = express();
app.use(cors());
app.use(express.json());

// Debug log: verify that the environment variable is set.
console.log("OPENAI_API_KEY is:", process.env.OPENAI_API_KEY ? "set" : "not set");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
});
const openai = new OpenAIApi(configuration);

// API endpoint for chatbot
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

// In production, serve the static files from the React app build folder.
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
  });
}

// Listen on the port specified by the environment (set to 80 in production)
const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is listening on port ${PORT}`);
});
