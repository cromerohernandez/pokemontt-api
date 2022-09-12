import { Request, Response, NextFunction } from 'express';
import { IError, IErrorData, ISessionRequest } from './interfaces/app.interfaces';

require('dotenv').config();

const cookieParser = require('cookie-parser');
const createError = require('http-errors');
const express = require('express');
const logger = require('morgan');
const path = require('path');
const mongoose = require('mongoose');

require('./config/db.config');

const cors = require('./config/cors.config');
const session = require('./config/session.config');

/** 
 * Configure express
 */
const app = express();
app.use(cors);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session);

app.use((req: ISessionRequest, res: Response, next: any) => {
  req.body.currentUser = req.session.user
  next()
});

/**
 * Configure routes
 */
const router = require('./config/routes');
app.use('/', router);

// catch 404 and forward to error handler
app.use((req: Request, res: Response, next: NextFunction) => {
  next(createError(404));
});

// error handler
app.use(function (error: IError, req: Request, res: Response, next: NextFunction) {
  //console.error('-' * 1000) //TODOCRH: review
  console.error(error);

  res.status(error.status || 500);

  const data: IErrorData = {
    errors: undefined,
    message: undefined
  }

  if (error instanceof mongoose.Error.ValidationError) {
    res.status(400);

    for (let field of Object.keys(error.errors)) {
      error.errors[field] = error.errors[field].message
    }

    data.errors = error.errors
  } else if (error instanceof mongoose.Error.CastError) {
    error = createError(404, 'RESOURCE_NOT_FOUND')
  } else if (error.code === 11000) {
    res.status(500)
    const key = Object.keys(error.keyValue)[0]
    data.errors = { [key]: {message: `${key} already exists`} }
  }

  data.message = error.message;
  res.json(data);
});

/** 
 * Listen on provided port
 */
const providedPort = normalizePort(process.env.PORT || '5000');
app.listen(providedPort, () => {
  console.log(`Listening on port ${providedPort}`);
});

/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val: string) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}
