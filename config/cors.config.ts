const cors = require('cors')

const corsMiddleware = cors({
  origin: 'https://pokemontt-arena.herokuapp.com/', //process.env.CORS_ORIGIN || 'http://localhost:3000',
  allowedHeaders: ['Content-Type', 'origin'],
  credentials: true
})

module.exports = corsMiddleware
