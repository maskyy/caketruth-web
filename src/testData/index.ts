import { DiaryRecord } from "../types/DiaryRecord";
import { Meal } from "../types/Meal";
import { Product } from "../types/Product";
import { Recipe } from "../types/Recipe";
import { Summary } from "../types/Summary";
import { User } from "../types/User";

const userRole: User["role"] = {
  name: "user",
  title: "Пользователь"
};

export const users: User[] = [
  {
    id: 1,
    email: "eaa1991@aa.com",
    username: "eaa1991",
    blocked_until: null,
    role: userRole,
  },
  {
    id: 2,
    email: "me@me.org",
    username: "me",
    blocked_until: null,
    role: userRole,
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
    user: 1,
    net_grams: 400,
    product_category: 1,
    product_brand: 1,
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
    user: 1,
    product_category: 1,
    product_brand: 1,
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
    user: 1,
    product_category: 1,
    product_brand: 1,
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
    user: 1,
    product_category: 1,
    product_brand: 1,
  },
];

export const recipeCategories = ["Завтрак", "Обед", "Нема"];

export const recipes: Recipe[] = [
  {
    id: 1001,
    name: "Банановая запеканка",
    calories: 150,
    proteins: 10,
    fats: 7,
    carbs: 8,
    is_public: false,
    is_verified: false,
    user: 1,
    directions: `
1. Пюрировать бананы с молоком
2. Смешать творог и пюре
3. Добавить манку и сахар, перемешать
4. Смазать форму маслом, выложить в неё творог
5. Выпекать в форме при 190 C 30 мин`,
    mass: 1200,
    recipe_category: "Завтрак",
    products: [
      { product: products[0], mass: 500 },
      { product: products[1], mass: 250 },
    ],
  },
  {
    id: 1002,
    name: "Пюре из авокадо и бананов",
    calories: 345,
    proteins: 12,
    fats: 34,
    carbs: 56,
    is_public: true,
    is_verified: false,
    user: 1,
    directions: `test`,
    mass: 600,
    recipe_category: "Обед",
    products: [
      { product: products[1], mass: 123 },
      { product: products[2], mass: 345 },
    ],
  },
];

export const mealList: Meal[] = [
  { id: 1, name: "Завтрак" },
  { id: 2, name: "Обед" },
  { id: 3, name: "Полдник" },
  { id: 4, name: "Ужин" },
];

export const mealItems: DiaryRecord[] = [
];

export const daySummary: Summary = {
  proteins: 123.45,
  fats: 123.45,
  carbs: 123.45,
  calories: 1234,
  date: "2022-03-10"
};

export const reportsData: Summary[] = [
  {
    proteins: 20,
    fats: 30,
    carbs: 40,
    calories: 1400,
    date: "2022-03-06",
  },
  {
    proteins: 50,
    fats: 0,
    carbs: 20,
    calories: 900,
    date: "2022-03-07",
  },
  {
    proteins: 60,
    fats: 90,
    carbs: 70,
    calories: 1945,
    date: "2022-03-08",
  },
  {
    proteins: 80,
    fats: 80,
    carbs: 80,
    calories: 1900,
    date: "2022-03-09",
  },
  {
    proteins: 140,
    fats: 70,
    carbs: 400,
    calories: 2800,
    date: "2022-03-10",
  },
  {
    proteins: 90,
    fats: 90,
    carbs: 90,
    calories: 2100,
    date: "2022-03-11",
  },
  {
    proteins: 80,
    fats: 80,
    carbs: 80,
    calories: 2250,
    date: "2022-03-12",
  },
];
