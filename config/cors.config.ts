const cors = require('cors')

const corsMiddleware = cors({
  origin: process.env.CORS_ORIGIN,
  allowedHeaders: ['Accept', 'Accept-Encoding', 'Accept-Language', 'Access-Control-Allow-Headers', 'Authorization', 'Content-Type', 'X-Requested-With', 'Origin'],
  credentials: true,
})

module.exports = corsMiddleware
