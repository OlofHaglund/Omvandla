export type Unit = 'g' | 'ml' | 'dl' | 'tsk' | 'msk' | 'cup'

export type Ingredient = {
  densitet: number
}

export type IngredientsMap = Record<string, Ingredient>
