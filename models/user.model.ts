import { model, Schema } from 'mongoose';
const bcrypt = require('bcrypt')

import { checkPassword } from '../helpers/models.helpers'
import { IUser } from '../interfaces/user.interfaces';
import { SALT_WORK_FACTOR } from '../const/user.const';

const userSchema = new Schema<IUser>({
  username: {
    type: String,
    required: [true, 'INVALID_USERNAME'],
    unique: true,
    inmutable: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, 'INVALID_PASSWORD'],
    minlength: [6, 'INVALID_PASSWORD']
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
  theme: {
    type: String,
    enum: ['dark', 'light'],
    default: 'light'
  },
  render: {
    type: String,
    enum: ['canvas', 'html'],
    default: 'canvas'
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

//hash password
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

//custom error to duplicated username
userSchema.post('save', (error: any, doc: any, next: any) => {
  if (error.name === 'MongoServerError' && error.code === 11000) {
    next(new Error('USERNAME_ALREADY_EXISTS'))
  } else {
    next(error)
  }
});

//check hashed password
userSchema.methods.checkUserPassword = function (password: string): boolean {
  return checkPassword(password, this.password)
}

const User = model<IUser>('User', userSchema)

module.exports = User
