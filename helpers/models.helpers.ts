const bcrypt = require('bcrypt')
import { NextFunction } from 'express';

import { IUser } from '../interfaces/user.interfaces';
import { SALT_WORK_FACTOR } from '../const/user.const';

/**
 * @description function to check password with database user password
 * @param password string
 * @param userPassword string
 * @returns boolean
 */
export const checkPassword = (password: string, userPassword: string): boolean => {
  return bcrypt.compare(password, userPassword)
}

/**
 * @description function to hash password
 * @param next NextFunction
 * @param user IUser
 */
export const hashPassword = (next: NextFunction, user: IUser): void => {
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
