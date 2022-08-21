import { Request, Response, NextFunction } from 'express';
import createError from 'http-errors';

import { getAttackDamage } from '../helpers/battles.helpers'
import { IBattleMoveData } from '../interfaces/battle.interfaces'

//TODOCRH: ¿controller?
module.exports.getAttackDamage = (req: Request, res: Response, next: NextFunction) => {
  const { playerPokemon, opponentPokemon, playerCurrentMove } = req.body

  const playerMove = playerPokemon.moves.find((move: IBattleMoveData) => move.name === playerCurrentMove)

  if (!playerMove) {
    throw createError(
      400,
      {
        en: `${playerPokemon.name} doesn't have the ${playerCurrentMove} move available.`,
        es: `${playerPokemon.name} no tiene disponible el ataque ${playerCurrentMove}.`
      }
    )
  } else {
    const attackDamage = getAttackDamage(playerPokemon, opponentPokemon, playerMove)
    res.status(200).json(attackDamage)
  }
}
