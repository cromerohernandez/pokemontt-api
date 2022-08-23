import { Request, Response, NextFunction } from 'express';
import createError from 'http-errors';

import { getAttackDamage } from '../helpers/battles.helpers'
import { IAttackData, IAttackResponse, IBattleMoveData } from '../interfaces/battle.interfaces'
import { winnerPointsInComputerBattle } from '../const/battle.const'

const Battle = require('../models/battle.model');

module.exports.create = (req: Request, res: Response, next: NextFunction) => {
  const { winner, winnerScoreIncrement, loser, loserScoreIncrement } = req.body
 
  const battle = new Battle({
    winner: winner,
    winnerScoreIncrement: winnerScoreIncrement,
    loser: loser,
    loserScoreIncrement: loserScoreIncrement,
  })

  battle.save()
    .then(() => res.status(201)) //TODOCRH: review
    .catch(next)
}

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

module.exports.sendAttack = (req: Request, res: Response) => {
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
      const attackingPokemonScoreIncrease = winnerPointsInComputerBattle + defendingPokemon.hp
      const defendingPokemonScoreIncrease = attackingPokemon.hp - attackingPokemon.hpInBattle //TODOCRH: review (attackingPokemon.hp don't update (useState))

      attackResponse.attackingPokemonScoreIncrease = attackingPokemonScoreIncrease
      attackResponse.defendingPokemonScoreIncrease = defendingPokemonScoreIncrease

      //save battle data
      const battle = new Battle({
        winner: attackingPokemon.name,
        winnerScoreIncrement: attackingPokemonScoreIncrease,
        loser: defendingPokemon.name,
        loserScoreIncrement: defendingPokemonScoreIncrease,
      })
    
      battle.save()
        .then(() => res.status(201)) //TODOCRH: review
        .catch(() => console.log('CRHERROR')) //TODOCEH: (next)

      //TODOCRH: save players score
    }

    res.status(200).json(attackResponse)
  }
}
