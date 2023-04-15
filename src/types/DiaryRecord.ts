import { BasicProduct } from "./Product";
import { BasicRecipe } from "./Recipe";

export interface DiaryRecord {
  id: number;
  name: string;
  mass: number;
  calc_calories: number;
  calc_proteins: number;
  calc_fats: number;
  calc_carbs: number;
  calc_ethanol?: number;
  user: number;
  meal: number;
  added_date: string;
  recipe?: BasicRecipe;
  product?: BasicProduct;
}

export type DiaryData = Pick<DiaryRecord, "mass" | "meal"> & {
  food: number;
  added_date?: string;
};
