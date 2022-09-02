import { Response, NextFunction } from 'express';

import { ISessionRequest } from '../interfaces/app.interfaces';

const createError = require('http-errors');

module.exports.isAuthenticated = (req: ISessionRequest, res: Response, next: NextFunction) => {
  if (req.session.user) {
    next()
  } else {
    next(createError(401, 'USER_NOT_AUTHENTICATED'))
  }
};

module.exports.isNotAuthenticated = (req: ISessionRequest, res: Response, next: NextFunction) => {
  if (req.session.user) {
    next(createError(403, 'USER_ALREADY_AUTHENTICATED'))
  } else {
    next()
  }
};