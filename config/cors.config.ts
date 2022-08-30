const cors = require('cors')

const corsMiddleware = cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  allowedHeaders: ['Content-Type', 'Origin'],
  credentials: true
})

module.exports = corsMiddleware
