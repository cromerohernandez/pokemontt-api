const cors = require('cors')

const corsMiddleware = cors({
  origin: process.env.CORS_ORIGIN,
  allowedHeaders: ['Content-Type', 'Access-Control-Allow-Headers', 'Authorization', 'X-Requested-With', 'Origin'],
  credentials: true,
})

module.exports = corsMiddleware
