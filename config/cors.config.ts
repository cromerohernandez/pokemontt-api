const cors = require('cors')

const corsMiddleware = cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  allowedHeaders: ['Content-Type', 'origin'],
  headers: {'Access-Control-Allow-Origin': 'https://pokemontt-arena.netlify.app'},
  methods: ['GET', 'POST', 'PATCH'],
  optionsSuccessStatus: 200,
  credentials: true,
})

module.exports = corsMiddleware
