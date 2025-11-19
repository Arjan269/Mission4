// index.js
const express = require('express');
const cors = require('cors');          
const dotenv = require('dotenv');
const { chatWithTina } = require('./controllers/tinaController');

dotenv.config();
const app = express();

// Middleware
app.use(express.json());

// Enable CORS for all routes from your frontend
app.use(cors({
  origin: 'http://localhost:5173',  
  methods: ['GET','POST','OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// -----------------------------
// Routes
// -----------------------------
app.get('/', (req, res) => res.send('Tina backend is running!'));

app.use('/api/tina', require('./routes/tinaRoutes'));

// -----------------------------
// Global error handler
// -----------------------------
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ error: 'Internal Server Error' });
});

// -----------------------------
// Start server
// -----------------------------
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Tina backend running on http://localhost:${PORT}`));
