import { IAttackParameters, IBattleMoveData, IBattlePokemonData } from '../interfaces/battle.interfaces';
import { EFFECTIVENESS_ATTACK_VALUES } from '../const/battle.const';

/**
 * @description function to get attack damage value
 * @param attackingPokemon IBattlePokemonData
 * @param defendingPokemon IBattlePokemonData
 * @param attackMove IBattleMoveData
 * @returns number
 */
export const getAttackDamage = (
  attackingPokemon: IBattlePokemonData,
  defendingPokemon: IBattlePokemonData,
  attackMove: IBattleMoveData
): number => {
  const {
    bonus,
    effectiveness,
    variation,
    attackingPokemonLevel,
    attackingPokemonAttack,
    movePower,
    defendingPokemonDefense
  } = _getAttackParameters(attackingPokemon, defendingPokemon, attackMove)
  const modifiers = 0.01 * bonus * effectiveness * variation
  const attack = (0.2 * attackingPokemonLevel + 1) * attackingPokemonAttack * movePower
  const defense = 25 * defendingPokemonDefense

  return modifiers * ((attack / defense) + 2)
}

/**
 * @description private function to get attack parameters
 * @param attackingPokemon IBattlePokemonData
 * @param defendingPokemon IBattlePokemonData
 * @param attackMove IBattleMoveData
 * @returns IAttackParameters
 */
const _getAttackParameters = (
  attackingPokemon: IBattlePokemonData,
  defendingPokemon: IBattlePokemonData,
  attackMove: IBattleMoveData
): IAttackParameters => {
  return {
    bonus: attackMove.type === attackingPokemon.types[0] ? 1.5 : 1,
    effectiveness: _getAttackEffectiveness(attackMove.type, defendingPokemon.types),
    variation: Math.floor(Math.random() * (100 - 85) + 85),
    attackingPokemonLevel: Math.pow(attackingPokemon.experience, 1/3),
    attackingPokemonAttack: attackingPokemon.attack,
    movePower: attackMove.power,
    defendingPokemonDefense: defendingPokemon.defense
  }
}

/**
 * @description private function to get attack effectiveness value
 * @param attackMoveType string
 * @param defendingPokemonTypes string[]
 * @returns number
 */
const _getAttackEffectiveness = (attackMoveType: string, defendingPokemonTypes: string[]): number => {
  const effectivenessResults: number[] = []

  defendingPokemonTypes.forEach((defendingPokemonType: string) => {
    effectivenessResults.push(EFFECTIVENESS_ATTACK_VALUES[attackMoveType][defendingPokemonType])
  })

  return effectivenessResults.reduce((acc, cur) => acc * cur, 1)
}
