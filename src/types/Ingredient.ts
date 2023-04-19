import { BasicProduct, Product } from "./Product";

export interface Ingredient {
  product: BasicProduct;
  mass: number;
}

export type UpdateIngredient = { product: number } & Pick<Ingredient, "mass">;
