import { Schema, model } from 'mongoose'

interface IUser {
  username: string,
  password: string,
  score: number,
  language: string,
  theming: string,
  render: string,
}

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

const User = model<IUser>('User', userSchema)

module.exports = User