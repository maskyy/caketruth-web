import { DiaryRecord } from "../types/DiaryRecord";
import { Product } from "../types/Product";
import { Recipe } from "../types/Recipe";
import { User } from "../types/User";

export const users: User[] = [
  {
    id: 1,
    email: "eaa1991@aa.com",
    nickname: "eaa1991",
    role: "user",
  },
  {
    id: 2,
    email: "me@me.org",
    nickname: "me",
    role: "user",
  },
];

export const productCategories = [
  "Фрукты", "Молочная продукция", "Алкоголь", "nope"
];

export const productBrands = [
  "ВкусВилл", "Перекресток", "Светофор", "Окей", "nono"
];

export const products: Product[] = [
  {
    id: 1,
    name: "Творог 5%",
    calories: 117,
    proteins: 16.5,
    fats: 5,
    carbs: 1.5,
    is_public: true,
    is_verified: true,
    type: "product",
    author_name: "me",
    net_grams: 400,
    product_category: "Молочная продукция",
    product_brand: "ВкусВилл",
  },
  {
    id: 2,
    name: "Банан",
    calories: 95,
    proteins: 1.5,
    fats: 0.2,
    carbs: 21.8,
    is_public: true,
    is_verified: true,
    type: "product",
    author_name: "me",
    product_category: "Фрукты",
    product_brand: "Окей",
  },
  {
    id: 3,
    name: "Авокадо Хасс",
    calories: 160,
    proteins: 2,
    fats: 14.66,
    carbs: 1.83,
    is_public: true,
    is_verified: true,
    type: "product",
    author_name: "me",
    product_category: "Фрукты",
    product_brand: "Перекресток",
  },
  {
    id: 4,
    name: "Спирт",
    calories: 700,
    proteins: 0,
    fats: 0,
    carbs: 0,
    ethanol: 100,
    is_public: true,
    is_verified: true,
    type: "product",
    author_name: "me",
    product_category: "Алкоголь",
    product_brand: "Светофор",
  },
];

export const recipeCategories = ["Завтрак", "Обед", "Нема"];

export const recipes: Recipe[] = [
  {
    id: 1,
    name: "Банановая запеканка",
    calories: 150,
    proteins: 10,
    fats: 7,
    carbs: 8,
    is_public: false,
    is_verified: false,
    type: "recipe",
    author_name: "me",
    directions: `
1. Пюрировать бананы с молоком
2. Смешать творог и пюре
3. Добавить манку и сахар, перемешать
4. Смазать форму маслом, выложить в неё творог
5. Выпекать в форме при 190 C 30 мин`,
    mass: 1200,
    recipe_category: "Завтрак",
    ingredients: [
      { ...products[0], mass: 500 },
      { ...products[1], mass: 250 },
    ],
  },
  {
    id: 2,
    name: "Пюре из авокадо и бананов",
    calories: 345,
    proteins: 12,
    fats: 34,
    carbs: 56,
    is_public: true,
    is_verified: false,
    type: "recipe",
    author_name: "me",
    directions: `test`,
    mass: 600,
    recipe_category: "Обед",
    ingredients: [
      { ...products[1], mass: 123 },
      { ...products[2], mass: 345 },
    ],
  },
];

export const mealItems: DiaryRecord[] = [
  {
    id: 1,
    name: "Вкусвилл Творог 5%",
    mass: 81,
    calories: 95,
    proteins: 13.36,
    fats: 4.05,
    carbs: 1.22,
  },
  {
    id: 2,
    name: "Магнит Айва",
    mass: 249,
    calories: 120,
    proteins: 1.49,
    fats: 1.25,
    carbs: 23.9,
  },
  {
    id: 3,
    name: "Магнит Айва",
    mass: 249,
    calories: 120,
    proteins: 1.49,
    fats: 1.25,
    carbs: 23.9,
  },
  {
    id: 4,
    name: "Магнит Айва",
    mass: 249,
    calories: 120,
    proteins: 1.49,
    fats: 1.25,
    carbs: 23.9,
  },
  {
    id: 5,
    name: "Магнит Айва",
    mass: 249,
    calories: 120,
    proteins: 1.49,
    fats: 1.25,
    carbs: 23.9,
  },
];