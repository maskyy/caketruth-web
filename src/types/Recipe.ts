import { Food } from "./Food";
import { Ingredient } from "./Ingredient";

export interface Recipe extends Food {
  directions: string;
  mass: number;
  recipe_category: string;
  ingredients: Ingredient[];
}

export type BasicRecipe = Pick<Recipe, "id" | "name" | "calories" | "mass" | "recipe_category">;
