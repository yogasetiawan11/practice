const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { register } = require('./utils/metrics');
const authRoutes = require('./routes/authRoutes');

const app = express();

// Security Middleware
app.use(helmet()); 
app.use(express.json());

// Rate Limiting to prevent Brute Force
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per window
});
app.use('/api/auth', limiter);

// Metrics Endpoint for Prometheus
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
});

// Routes
app.use('/api/auth', authRoutes);

mongoose.connect(process.env.MONGO_URI).then(() => {
  app.listen(3000, () => console.log('Auth Service running on port 3000'));
});