import { Food } from "./Food";
import { Ingredient, UpdateIngredient } from "./Ingredient";

export interface Recipe extends Food {
  directions: string;
  mass: number;
  recipe_category?: number;
  products: Ingredient[];
}

export type BasicRecipe = Pick<Recipe, "id" | "name" | "calories" | "mass" | "recipe_category">;

export type RecipeUpdate = Partial<Omit<Recipe, "products">> & { products?: UpdateIngredient[] };
