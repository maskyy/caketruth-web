import { Food } from "./Food";
import { Product } from "./Product";

export interface Recipe extends Food {
  directions: string,
  mass: number,
  recipe_category: string,
  ingredients: Product[],
};
