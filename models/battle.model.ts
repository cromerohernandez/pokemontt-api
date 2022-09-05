import { model, Schema, Types } from 'mongoose'

import { IBattle } from '../interfaces/battle.interfaces'

const userBattle = new Schema<IBattle>({
  winnerId: {
    type: Types.ObjectId,
    ref: 'User',
  },
  winnerUserName: {
    type: String,
  },
  winnerScoreIncrement: {
    type: Number,
    default: 0
  },
  loserId: {
    type: Types.ObjectId,
    ref: 'User',
  },
  loserUserName: {
    type: String,
  },
  loserScoreIncrement: {
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