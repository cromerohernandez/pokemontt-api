const cors = require('cors')

const corsMiddleware = cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  allowedHeaders: ['Content-Type', 'origin'],
  methods: ['GET', 'POST', 'PATCH'],
  optionsSuccessStatus: 200,
  credentials: true,
})

module.exports = corsMiddleware
