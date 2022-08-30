import { Response, NextFunction } from 'express';

import { ISessionRequest } from '../interfaces/app.interfaces';

const createError = require('http-errors');

module.exports.isAuthenticated = (req: ISessionRequest, res: Response, next: NextFunction) => {
  if (req.session.user) {
    next()
  } else {
    next(createError(401, 'user is not authenticated'))
  }
};

module.exports.isNotAuthenticated = (req: ISessionRequest, res: Response, next: NextFunction) => {
  if (req.session.user) {
    next(createError(403, 'user is already authenticated'))
  } else {
    next()
  }
};