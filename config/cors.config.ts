const cors = require('cors')

const corsMiddleware = cors({
  origin: 'http://localhost:3000', //process.env.CORS_ORIGIN || 'http://localhost:3000',
  //allowedHeaders: ['Content-Type', 'origin'],
  //headers: {'Access-Control-Allow-Origin': 'http://localhost:5000'}, //'https://pokemontt-api.netlify.app'},
  methods: ['GET', 'POST', 'PATCH'],
  optionsSuccessStatus: 200,
  credentials: true,
})

module.exports = corsMiddleware
