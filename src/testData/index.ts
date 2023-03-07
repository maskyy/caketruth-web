import { Product } from "puppeteer";
import { Recipe } from "../types/Recipe";

export const products: Product[] = [];

export const recipes: Recipe[] = [
  {
    id: 0,
    name: "Банановая запеканка",
    calories: 150,
    proteins: 10,
    fats: 7,
    carbs: 8,
    ethanol: 0,
    is_public: false,
    is_verified: false,
    type: "recipe",
    author_name: "me",
    directions: `
1. Пюрировать банаы с молоком
2. Смешать творог и пюре
3. Добавить манку и сахар, перемешать
4. Смазать форму маслом, выложить в неё творог
5. Выпекать в форме при 190 C 30 мин`,
    mass: 1200,
    recipe_category: "Завтрак",
    ingredients: []
  }
];
