const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const axios = require('axios');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const EXTERNAL_API_BASE = 'http://20.207.122.201/evaluation-service';
const TOKEN = process.env.ACCESS_TOKEN;

app.use(cors());
app.use(express.json());

// Proxy GET /api/notifications
app.get('/api/notifications', async (req, res) => {
  try {
    const { page, limit, notification_type } = req.query;
    
    const response = await axios.get(`${EXTERNAL_API_BASE}/notifications`, {
      headers: {
        Authorization: `Bearer ${TOKEN}`
      },
      params: {
        page,
        limit,
        type: notification_type // pass-through mapping
      }
    });

    res.json(response.data);
  } catch (error) {
    console.error('Error fetching notifications:', error.message);
    res.status(error.response?.status || 500).json({
      error: 'Failed to fetch notifications',
      details: error.response?.data || error.message
    });
  }
});

// Proxy POST /api/logs
app.post('/api/logs', async (req, res) => {
  try {
    const { stack, level, package: pkg, message } = req.body;
    
    const response = await axios.post(`${EXTERNAL_API_BASE}/logs`, {
      stack,
      level,
      package: pkg,
      message
    }, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        'Content-Type': 'application/json'
      }
    });

    res.json(response.data);
  } catch (error) {
    console.error('Error sending logs:', error.message);
    res.status(error.response?.status || 500).json({
      error: 'Failed to send log',
      details: error.response?.data || error.message
    });
  }
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({ status: "Backend running" });
});

app.listen(PORT, () => {
  console.log(`Server started. Listening on http://localhost:${PORT}`);
});
