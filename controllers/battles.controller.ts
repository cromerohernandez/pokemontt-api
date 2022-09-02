import { Request, Response, NextFunction } from 'express';
import createError from 'http-errors';
import { Types } from 'mongoose';

import { getAttackDamage } from '../helpers/battles.helpers';
import { IAttackData, IAttackResponse, IBattleMoveData } from '../interfaces/battle.interfaces';
import { WINNER_POINTS_POINTS_IN_COMPUTER_BATTLE } from '../const/battle.const';

import { IUser } from '../interfaces/user.interfaces';

const Battle = require('../models/battle.model');
const User = require('../models/user.model');

module.exports.getUserBattles = (req: Request, res: Response, next: NextFunction) => {
  const userId = req.body.currentUser.id

  Battle.find({ $or: [ {winner: userId}, {loser: userId} ] })
    .sort({ timestamps: 'asc'})
    .then((battles: typeof Battle[]) => {
      if (!battles) {
        throw createError(404, {en: 'User has no battles.', es: 'El usuario no tiene batallas.'})
      } else {
        battles.forEach(battle => {
          const win = battle.winner === userId
          return {
            win: win,
            opponent: win ? battle.loser : battle.winner,
            userScoreIncrement: win ? battle.winnerScoreIncrement : battle.loserScoreIncrement,
          }
        })

        res.status(200).json(battles)
      }
    })
    .catch(next)
}

module.exports.sendAttack = (req: Request, res: Response, next: NextFunction) => {
  const { attackingPokemon, defendingPokemon, attackMoveName } = req.body as IAttackData
  const attackMove = attackingPokemon.moves.find((move: IBattleMoveData) => move.name === attackMoveName)

  if (!attackMove) {
    throw createError(
      400, `${attackingPokemon.name} doesn't have the ${attackMoveName} move available.`
    )
  } else {
    const attackDamage = Math.round(getAttackDamage(attackingPokemon, defendingPokemon, attackMove))
    const resultDefendignPokemonHealth = defendingPokemon.hpInBattle - attackDamage
    const attackResponse: IAttackResponse = {
      damage: attackDamage,
      usedMoveName: attackMove.name,
      newDefendignPokemonHealth: resultDefendignPokemonHealth > 0 ? resultDefendignPokemonHealth : 0,
    }

    if (attackResponse.newDefendignPokemonHealth === 0) {
      const attackingPokemonScoreIncrease = WINNER_POINTS_POINTS_IN_COMPUTER_BATTLE + defendingPokemon.hp
      const defendingPokemonScoreIncrease = attackingPokemon.hp - attackingPokemon.hpInBattle //TODOCRH: review (attackingPokemon.hp don't update (useState))

      attackResponse.attackingPokemonScoreIncrease = attackingPokemonScoreIncrease
      attackResponse.defendingPokemonScoreIncrease = defendingPokemonScoreIncrease

      //save new player scores
      let DDBBplayersDataToSave: Promise<IUser>[] = []
      const battlePokemon = [
        {
          id: attackingPokemon.userId ? new Types.ObjectId(attackingPokemon.userId) : null,
          scoreIncrement: attackingPokemonScoreIncrease,
          battleAction: 'attack',
        },
        {
          id: defendingPokemon.userId ? new Types.ObjectId(defendingPokemon.userId) : null,
          scoreIncrement: defendingPokemonScoreIncrease,
          battleAction: 'defense',
        }
      ];

      battlePokemon.forEach(pokemon => {
        if (pokemon.id) {
          User.findOne({ _id: pokemon.id })
          .then((user: typeof User) => {
            if (!user) {
              throw createError(404, {en: 'User not found', es: 'Usuario no encontrado'})
            } else {
              const newScore = user.score + pokemon.scoreIncrement
              user.score = newScore

              if(pokemon.battleAction === 'attack') {
                attackResponse.newAttackingPokemonScore = newScore
              }

              if(pokemon.battleAction === 'defense') {
                attackResponse.newDefendingPokemonScore = newScore
              }

              DDBBplayersDataToSave.push(
                user.save()
              )
            }
          })
          .catch(next)
        }
      })

      //save battle data
      const battle = new Battle({
        winnerId: attackingPokemon.userId ?? null,
        winnerScoreIncrement: attackingPokemonScoreIncrease,
        loserId: defendingPokemon.userId ?? null,
        loserScoreIncrement: defendingPokemonScoreIncrease,
      })

      //save to DDBB and respond
      Promise.all([
        battle.save(),
        ...DDBBplayersDataToSave
      ])
        .then(() => {
          res.status(200).json(attackResponse)
        })
        .catch(next)
    } else {
      res.status(200).json(attackResponse)
    }
  }
}
