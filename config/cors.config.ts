const cors = require('cors')

const corsMiddleware = cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  allowedHeaders: ['Content-Type', 'origin'],
  //headers: {'Access-Control-Allow-Origin': 'http://localhost:5000'}, //'https://pokemontt-api.netlify.app'},
  //headers: ('Access-Control-Allow-Origin: *'),
  preflightContinue: false,
  credentials: true,
})

module.exports = corsMiddleware
