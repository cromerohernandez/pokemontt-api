import { IBattleAttackData, IBattleMoveData, IBattlePokemonData } from "../interfaces/battle.interfaces";
const effectivenessAttackValues = require('../const/battle.const');

export const getAttackDamage = (
  playerPokemon: IBattlePokemonData,
  opponentPokemon: IBattlePokemonData,
  playerCurrentMove: IBattleMoveData
): number => {
  const {
    bonus,
    effectiveness,
    variation,
    playerPokemonLevel,
    playerPokemonAttack,
    movePower,
    opponentPokemonDefense
  } = getAttackData(playerPokemon, opponentPokemon, playerCurrentMove)
  const modifiers = 0.01 * bonus * effectiveness * variation
  const attack = (0.2 * playerPokemonLevel + 1) * playerPokemonAttack * movePower
  const defense = 25 * opponentPokemonDefense

  return modifiers * ((attack / defense) + 2)
}

const getAttackData = (
  playerPokemon: IBattlePokemonData,
  opponentPokemon: IBattlePokemonData,
  playerCurrentMove: IBattleMoveData
): IBattleAttackData => {
  return {
    bonus: playerCurrentMove.type === playerPokemon.types[0] ? 1.5 : 1, //TODOCRH: review pokemon with two types
    effectiveness: getAttackEffectiveness(playerPokemon.types, opponentPokemon.types[0]),
    variation: Math.floor(Math.random() * (100 - 85) + 85),
    playerPokemonLevel: Math.pow(playerPokemon.experience, 1/3),
    playerPokemonAttack: playerPokemon.attack,
    movePower: playerCurrentMove.power,
    opponentPokemonDefense: opponentPokemon.defense
  }
}

const getAttackEffectiveness = (playerPokemonTypes: string[], opponentPokemonType: string): number => {
  const effectivenessResults: number[] = []

  playerPokemonTypes.forEach(playerType => {
    effectivenessResults.push(effectivenessAttackValues[playerType][opponentPokemonType])
  })

  return effectivenessResults.reduce((acc, cur) => acc * cur, 1)
}
