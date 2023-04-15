import { Food } from "./Food";

export interface Product extends Food {
  net_grams?: number;
  drained_grams?: number;
  product_category: number;
  product_brand: number;
}

export type BasicProduct = Pick<Product, "id" | "name" | "calories" | "product_category" | "product_brand">;
