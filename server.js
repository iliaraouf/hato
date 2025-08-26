// server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const PORT = 3000;

// ✅ Your OpenAI API key
const OPENAI_API_KEY = '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';

// ✅ Middleware
app.use(cors());
app.use(bodyParser.json());

// ✅ Chat route
app.post('/chat', async (req, res) => {
  const userMessage = req.body.message;

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: userMessage }],
      },
      {
        headers: {
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const reply = response.data.choices[0].message.content.trim();
    res.json({ reply });

  } catch (error) {
    console.error('OpenAI Error:', error.response?.data || error.message);
    res.status(500).json({ error: 'OpenAI API request failed.' });
  }
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
