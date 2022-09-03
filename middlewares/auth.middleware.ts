import { Response, NextFunction } from 'express';

import { ISessionRequest } from '../interfaces/app.interfaces';

const createError = require('http-errors');

/**
 * @description middleware function to check if user is authenticated
 * @param req ISessionRequest
 * @param next NextFunction
 */
module.exports.isAuthenticated = (req: ISessionRequest, res: Response, next: NextFunction) => {
  console.log('CRH-req-isAuthenticated', req)

  if (req.session.user) {
    next()
  } else {
    next(createError(401, 'USER_NOT_AUTHENTICATED'))
  }
};

/**
 * @description middleware function to check if user is not authenticated
 * @param req ISessionRequest
 * @param next NextFunction
 */
module.exports.isNotAuthenticated = (req: ISessionRequest, res: Response, next: NextFunction) => {
  if (req.session.user) {
    next(createError(403, 'USER_ALREADY_AUTHENTICATED'))
  } else {
    next()
  }
};