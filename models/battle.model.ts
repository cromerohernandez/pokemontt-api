import mongoose, { Schema, model } from 'mongoose'

import { IBattle } from '../interfaces/battle.interfaces'

const userBattle = new Schema<IBattle>({
  winner: {
    type: mongoose.Schema.Types.ObjectId,
  },
  winnerScoreIncrement: {
    type: Number,
    default: 0
  },
  looser: {
    type: mongoose.Schema.Types.ObjectId,
  },
  looserScoreIncrement: {
    type: Number,
    default: 0
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

const Battle = model<IBattle>('Battle', userBattle)

module.exports = Battle