const bcrypt = require('bcrypt')
import { NextFunction } from 'express';

import { IUser } from '../interfaces/user.interfaces';
import { SALT_WORK_FACTOR } from '../const/user.const';

export const checkPassword = (password: string, userPassword: string): boolean => {
  return bcrypt.compare(password, userPassword)
}

export const hashPassword = (next: NextFunction, user: IUser): void => { //TODO CRH: it is necessary?
  bcrypt.genSalt(SALT_WORK_FACTOR)
    .then((salt: string) => {
      return bcrypt.hash(user.password, salt)
        .then((hash: string) => {
          user.password = hash
          next()
        })
    })
    .catch((error: any) => next(error))
}
