const cors = require('cors')

const corsMiddleware = cors({
  origin: 'https://pokemontt-arena.netlify.app', //process.env.CORS_ORIGIN || 'http://localhost:3000',
  allowedHeaders: ['Content-Type', 'origin'],
  headers: {'Access-Control-Allow-Origin': 'https://pokemontt-api.netlify.app'},
  methods: ['GET', 'POST', 'PATCH'],
  optionsSuccessStatus: 200,
  credentials: true,
})

module.exports = corsMiddleware
