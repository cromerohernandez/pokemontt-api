import { Request, Response, NextFunction } from 'express';
import createError from 'http-errors';

import { ISessionRequest } from '../interfaces/app.interfaces';
import { IUser } from '../interfaces/user.interfaces';

const User = require('../models/user.model');

module.exports.create = (req: Request, res: Response, next: NextFunction) => {
  const { username, password } = req.body

  const user = new User({
    username: username,
    password: password
  })

  user.save()
    .then((newUser: IUser) => res.status(201).json(newUser.id))
    .catch(next)
}

module.exports.updateSettings = (req: Request, res: Response, next: NextFunction) => {
  const settingsKeys = ['language', 'theming', 'render']

  User.findOne({ _id: req.body.currentUser.id })
    .then((user: typeof User) => {
      if (!user) {
        throw createError(404, {en: 'User not found', es: 'Usuario no encontrado'})
      } else {
        settingsKeys.forEach(key => {
          if(req.body[key]) {
            user[key] = req.body[key]
          }
        })

        user.save()
          .then((updatedUser: IUser) => res.status(200).json(updatedUser))
          .catch(next)
      }
    })
    .catch(next)
}

module.exports.getUsersRanking = (req: Request, res: Response, next: NextFunction) => {
  User.find({})
    .sort({ score: 'desc'})
    .limit(10)
    .then((users: typeof User[]) => {
      if (!users) {
        throw createError(404, {en: 'Users not found', es: 'Usuarios no encontrados'})
      } else {
        const mappedUsers = users.map(user => {
          return {
            username: user.username,
            score: user.score
          }
        })

        res.status(200).json(mappedUsers)
      }
    })
    .catch(next)
}


module.exports.login = (req: ISessionRequest, res: Response, next: NextFunction) => {
  const { username, password } = req.body
  
  if (!username || !password) {
    throw createError(400, 'missing credentials')
  }

  User.findOne({ username: username })
    .then((user: typeof User) => {
      if (!user) {
        throw createError(404, 'invalid username or password')
      } else {
        return user.checkUserPassword(password)
          .then((match: boolean) => {
            if (!match) {
              throw createError(400, 'invalid username or password')
            } else {
              req.session.user = user
              res.json(user)
            }
          })
      }
    })
    .catch(next)
}

module.exports.logout = (req: ISessionRequest, res: Response) => {
  req.session.destroy()
  res.status(204).json()
}
