import { Request, Response } from 'express';
import createError from 'http-errors';

import { getAttackDamage } from '../helpers/battles.helpers'
import { IAttackData, IAttackResponse, IBattleMoveData } from '../interfaces/battle.interfaces'

module.exports.sendAttack = (req: Request, res: Response) => {
  const { attackingPokemon, defendingPokemon, attackMoveName } = req.body as IAttackData
  const attackMove = attackingPokemon.moves.find((move: IBattleMoveData) => move.name === attackMoveName)

  if (!attackMove) {
    throw createError(
      400,
      {
        en: `${attackingPokemon.name} doesn't have the ${attackMoveName} move available.`,
        es: `${attackingPokemon.name} no tiene disponible el ataque ${attackMoveName}.`
      }
    )
  } else {
    const attackDamage = Math.round(getAttackDamage(attackingPokemon, defendingPokemon, attackMove))
    const resultDefendignPokemonHealth = defendingPokemon.hp - attackDamage
    const attackResponse: IAttackResponse = {
      damage: attackDamage,
      newDefendignPokemonHealth: resultDefendignPokemonHealth > 0 ? resultDefendignPokemonHealth : 0,
    }

    if (attackResponse.newDefendignPokemonHealth === 0) {
      //TODOCRH: save battle ranking and add players score
    }

    res.status(200).json(attackResponse)
  }
}
