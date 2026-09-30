const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const aiRoutes = require('./routes/aiRoutes');
const assetRoutes = require('./routes/assetRoutes');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

const app = express();

const allowedOrigins = (process.env.CORS_ORIGINS || '').split(',').filter(Boolean);

app.use(cors({
  origin: (origin, cb) => {
    // Mobile app Origin header nahi bhejti, isliye !origin allow hai
    if (!origin || allowedOrigins.includes(origin)) return cb(null, true);
    cb(new Error('Not allowed by CORS'));
  },
}));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/assets', assetRoutes);

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.get('/health', (req, res) => {
  const dbUp = mongoose.connection.readyState === 1;
  res.status(dbUp ? 200 : 503).json({
    status: dbUp ? 'ok' : 'degraded',
    db: dbUp ? 'up' : 'down',
    uptime: process.uptime(),
  });
});

app.use(notFound);
app.use(errorHandler);

module.exports = app;