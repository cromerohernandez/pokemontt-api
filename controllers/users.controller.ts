const { Request, Response, NextFunction } = require('express');
const createError = require('http-errors');

const User = require('../models/user.model');
import { IUser } from '../interfaces/user.interfaces';

module.exports.create = (req: typeof Request, res: typeof Response, next: typeof NextFunction) => {
  const { username, password } = req.body

  const user = new User({
    username: username,
    password: password
  })

  user.save()
    .then(() => res.status(201))
    .catch(next)
}

module.exports.updateScore = (req: typeof Request, res: typeof Response, next: typeof NextFunction) => {
  User.findOne({ _id: req.currentUser.id })
    .then((user: typeof User) => {
      if(!user) {
        throw createError(404, {en: 'User not found', es: 'Usuario no encontrado'})
      } else {
        const newScore = user.score + req.body.scoreIncrease
        user.score = newScore

        user.save()
          .then((updatedUser: IUser) => res.status(200).json(updatedUser.score))
          .catch(next)
      }
    })
    .catch(next)

}

module.exports.updateSettings = (req: typeof Request, res: typeof Response, next: typeof NextFunction) => {
  const settingsKeys = ['language', 'theming', 'render']

  User.findOne({ _id: req.currentUser.id })
    .then((user: typeof User) => {
      if(!user) {
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
