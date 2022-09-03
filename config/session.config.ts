const session = require('express-session');
const MongoStore = require('connect-mongo');
import mongoose from 'mongoose';

let mongodbConnection = (process.env.NODE_ENV === 'dev') ? 'mongodb://localhost:27017/pokemontt' : process.env.MONGODB_URI

const SESSION_MAX_AGE_SECONDS = Number(process.env.SESSION_MAX_AGE_SECONDS) || 60 * 60 * 24 // 1 day

module.exports = session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false,
    httpOnly: true,
    maxAge: SESSION_MAX_AGE_SECONDS * 1000
  },
  store: new MongoStore({
    mongoUrl: mongodbConnection,
    mongooseConnection: mongoose.connection,
    ttl: SESSION_MAX_AGE_SECONDS
  })
})
