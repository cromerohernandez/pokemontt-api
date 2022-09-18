const cors = require('cors')

const corsMiddleware = cors({
  origin: process.env.CORS_ORIGIN,
  allowedHeaders: ['Accept','Accept-Encoding','Accept-Language','Access-Control-Request-Header','Access-Control-Request-Method','Authorization','Cache-Control','Connection','Content-Type','DNT','Host','If-Modified-Since','Keep-Alive','Origin','Pragma','Referer','User-Agent','x-csrf-token','x-requested-with', 'Accept', 'Accept-Encoding', 'Accept-Language', 'Access-Control-Allow-Headers', 'Authorization', 'Content-Type', 'X-Requested-With', 'Origin'],
  credentials: true,
})

module.exports = corsMiddleware
