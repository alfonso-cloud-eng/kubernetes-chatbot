const fs = require('fs');

// Conditionally load .env only if it exists (e.g. for local development)
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

// In production, serve the static files from the React app build folder.
if (process.env.NODE_ENV === 'production') {
  // Serve static files from the client build directory
  app.use(express.static(path.join(__dirname, '../client/build')));
  
  // For any route not handled by your API, serve the index.html file.
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is listening on port ${PORT}`);
});
