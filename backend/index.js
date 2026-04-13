const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Basic health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'MoveFast API is running.' });
});

// Example crowd status mock data
app.get('/api/crowd-status', (req, res) => {
  res.json({
    zones: [
      { id: 'Z1', name: 'North Gate', density: 'High', capacity: 85 },
      { id: 'Z2', name: 'East Concourse', density: 'Moderate', capacity: 55 },
      { id: 'Z3', name: 'Food Court A', density: 'Low', capacity: 20 },
    ]
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
