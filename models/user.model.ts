import { model, Schema } from 'mongoose';
const bcrypt = require('bcrypt')

import { checkPassword, hashPassword } from '../helpers/models.helpers'
import { IUser } from '../interfaces/user.interfaces';
import { SALT_WORK_FACTOR } from '../const/user.const';

const userSchema = new Schema<IUser>({
  username: {
    type: String,
    required: [true, 'username is required'],
    unique: true,
    inmutable: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, 'password is required'],
    minlength: [6, 'password needs at least 6 chars']
  },
  score: {
    type: Number,
    default: 0
  },
  language: {
    type: String,
    enum: ['en', 'es'],
    default: 'en'
  },
  theming: {
    type: String,
    enum: ['dark', 'light'],
    default: 'light'
  },
  render: {
    type: String,
    enum: ['canvas', 'html'],
    default: 'html'
  }
}, {
  timestamps: true,
  toJSON: {
    transform: (doc, ret) => {
      ret.id = doc._id;
      delete ret._id;
      delete ret.__v;
      delete ret.password;
      return ret
    }
  }
})

userSchema.pre('save', function (next) {
  if (this.isModified('password')) {
    bcrypt.genSalt(SALT_WORK_FACTOR)
    .then((salt: string) => {
      return bcrypt.hash(this.password, salt)
        .then((hash: string) => {
          this.password = hash
          next()
        })
    })
    .catch((error: any) => next(error))
  } else {
    next()
  }
})

userSchema.methods.checkUserPassword = function (password: string): boolean {
  return checkPassword(password, this.password)
}

const User = model<IUser>('User', userSchema)

module.exports = User
