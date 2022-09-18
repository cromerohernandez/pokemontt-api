const session = require('express-session');
const MongoStore = require('connect-mongo');
import mongoose from 'mongoose';

let mongodbConnection = process.env.MONGODB_URI
const SESSION_MAX_AGE_SECONDS = Number(process.env.SESSION_MAX_AGE_SECONDS) || 60 * 60 * 24 // 1 day

module.exports = session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  proxy: process.env.NODE_ENV === 'prod' ? true : false,
  cookie: {
    secure: process.env.NODE_ENV === 'prod' ? true : false,
    httpOnly: true,
    maxAge: SESSION_MAX_AGE_SECONDS * 1000,
    sameSite: process.env.NODE_ENV === 'prod' ? 'none' : false,
  },
  store: new MongoStore({
    mongoUrl: mongodbConnection,
    mongooseConnection: mongoose.connection,
    ttl: SESSION_MAX_AGE_SECONDS
  }),
})
