const cors = require('cors')

const corsMiddleware = cors({
  origin: process.env.CORS_ORIGIN,
  allowedHeaders: ['Access-Control-Allow-Headers', 'Authorization', 'Content-Type', 'X-Requested-With', 'Origin'],
  credentials: true,
})

module.exports = corsMiddleware
