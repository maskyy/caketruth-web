import { Food } from "./Food";

export interface Product extends Food {
  net_grams?: number,
  drained_grams?: number,
  product_category: string,
  product_brand: string
};
