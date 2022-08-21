export interface IAttackData {
  attackingPokemon: IBattlePokemonData,
  defendingPokemon: IBattlePokemonData,
  attackMoveName: string,
}

export interface IAttackParameters  {
  bonus: number,
  effectiveness: number,
  variation: number,
  attackingPokemonLevel: number,
  attackingPokemonAttack: number,
  movePower: number,
  defendingPokemonDefense: number,
}

export interface IAttackResponse {
  damage: number,
  newDefendignPokemonHealth: number,
}

export interface IBattleMoveData {
  name: string,
  power: number,
  type: string,
}

export interface IBattlePokemonData {
  name: string,
  types: string[],
  experience: number,
  hp: number,
  attack: number,
  defense: number,
  moves: IBattleMoveData[],
  image: string | null,
}

export interface ITypesValues {
  normal: INestedTypesValues,
  fire: INestedTypesValues,
  water: INestedTypesValues,
  grass: INestedTypesValues,
  flying: INestedTypesValues,
  fighting: INestedTypesValues,
  poison: INestedTypesValues,
  electric: INestedTypesValues,
  ground: INestedTypesValues,
  rock: INestedTypesValues,
  psychic: INestedTypesValues,
  ice: INestedTypesValues,
  bug: INestedTypesValues,
  ghost: INestedTypesValues,
  steel: INestedTypesValues,
  dragon: INestedTypesValues,
  dark: INestedTypesValues,
  fairy: INestedTypesValues,
  [key: string]: INestedTypesValues,
}

interface INestedTypesValues {
  normal: number,
  fire: number,
  water: number,
  grass: number,
  flying: number,
  fighting: number,
  poison: number,
  electric: number,
  ground: number,
  rock: number,
  psychic: number,
  ice: number,
  bug: number,
  ghost: number,
  steel: number,
  dragon: number,
  dark: number,
  fairy: number,
  [key: string]: number,
}
