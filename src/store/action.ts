import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError, AxiosInstance } from "axios";
import { User, UserAuth, UserSignup, UserUpdate } from "../types/User";
import { AuthResponse, ServerErrors } from "../types/api";
import { AuthStatus } from "../types/AuthStatus";
import { Meal } from "../types/Meal";
import { BasicProduct, Product } from "../types/Product";
import { BasicRecipe, Recipe } from "../types/Recipe";
import { Category } from "../types/Category";

interface Extra {
  api: AxiosInstance;
}

export const Action = {
  REGISTER_USER: "user/register",
  LOGIN_USER: "user/login",
  REFRESH_TOKEN: "token/refresh",
  LOGOUT_USER: "user/logout",
  FETCH_USER: "user/fetch",
  UPDATE_USER: "user/update",
  SET_AUTH_STATUS: "authStatus/set",
  FETCH_MEALS: "meals/fetch",
  SET_MEALS: "meals/set",
  FETCH_PRODUCTS: "products/fetch",
  FETCH_RECIPES: "recipes/fetch",
  FETCH_PRODUCT_CATEGORIES: "productCategories/fetch",
  FETCH_PRODUCT_BRANDS: "productBrands/fetch",
  FETCH_RECIPE_CATEGORIES: "recipeCategories/fetch",
  FETCH_PRODUCT: "product/fetch",
  FETCH_RECIPE: "recipe/fetch",
};

export const registerUser = createAsyncThunk<User, UserSignup, { extra: Extra }>(
  Action.REGISTER_USER,
  async (signupData, { extra, rejectWithValue }) => {
    const { api } = extra;
    try {
      const { data } = await api.post<User>("/users/", signupData);
      return data;
    } catch (err) {
      let error = err as AxiosError<ServerErrors>;
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response?.data);
    }
  }
);

export const loginUser = createAsyncThunk<AuthResponse, UserAuth, { extra: Extra }>(
  Action.LOGIN_USER,
  async (credentials, { extra, rejectWithValue }) => {
    const { api } = extra;
    try {
      const response = await api.post<AuthResponse>("/users/login/", credentials);
      return response.data;
    } catch (err) {
      let error = err as AxiosError<ServerErrors>;
      if (!error.response) {
        throw err;
      }
      return rejectWithValue(error.response?.data);
    }
  }
);

export const refreshToken = createAsyncThunk<AuthResponse, { refresh: string }, { extra: Extra }>(
  Action.REFRESH_TOKEN,
  async (token, { extra }) => {
    const { api } = extra;
    const { data } = await api.post<AuthResponse>("/users/login/refresh/", token);
    return data;
  }
);

export const logoutUser = createAsyncThunk<undefined, { refresh: string }, { extra: Extra }>(
  Action.LOGOUT_USER,
  async (token, { extra }) => {
    const { api } = extra;
    const { data } = await api.post("/users/logout/", token);
    return data;
  }
);

export const fetchUser = createAsyncThunk<User, User["id"], { extra: Extra }>(
  Action.FETCH_USER,
  async (id, { extra }) => {
    const { api } = extra;
    const { data } = await api.get(`/users/${id}/`);
    return data;
  }
);

export const updateUser = createAsyncThunk<User, UserUpdate, { extra: Extra }>(
  Action.UPDATE_USER,
  async (user, { extra }) => {
    const { api } = extra;
    const { id } = user;
    const newData = { ...user };
    delete newData.id;
    Object.keys(newData).forEach((k) => {
      if (!(newData as { [k: string]: number | string })[k]) {
        delete (newData as { [k: string]: number | string })[k];
      }
    });

    try {
      const { data } = await api.patch<User>(`/users/${id}/`, newData);
      return data;
    } catch (error) {
      return Promise.reject(error as AxiosError);
    }
  }
)

export const setAuthStatus = createAction<AuthStatus>(Action.SET_AUTH_STATUS);

export const fetchMeals = createAsyncThunk<Meal[], undefined, { extra: Extra }>(
  Action.FETCH_MEALS,
  async (_, { extra }) => {
    const { api } = extra;
    const { data } = await api.get<Meal[]>("/meals/");
    return data;
  }
);

export const setMeals = createAsyncThunk<Meal[], string[], { extra: Extra }>(
  Action.SET_MEALS,
  async (names, { extra }) => {
    const { api } = extra;
    const data: Meal[] = [];
    for (const name of names) {
      const response = await api.post<Meal>("/meals/", { name });
      data.push(response.data);
    }
    return data;
  }
);

export const fetchProducts = createAsyncThunk<BasicProduct[], undefined, { extra: Extra}>(
  Action.FETCH_PRODUCTS,
  async (_, { extra }) => {
    const { api } = extra;
    const { data } = await api.get<BasicProduct[]>("/products/");
    return data;
  }
);

export const fetchRecipes = createAsyncThunk<BasicRecipe[], undefined, { extra: Extra}>(
  Action.FETCH_RECIPES,
  async (_, { extra }) => {
    const { api } = extra;
    const { data } = await api.get<BasicRecipe[]>("/recipes/");
    return data;
  }
);

export const fetchProductCategories = createAsyncThunk<Category[], undefined, { extra: Extra}>(
  Action.FETCH_PRODUCT_CATEGORIES,
  async (_, { extra }) => {
    const { api } = extra;
    const { data } = await api.get<Category[]>("/product-categories/");
    return data;
  }
);

export const fetchProductBrands = createAsyncThunk<Category[], undefined, { extra: Extra}>(
  Action.FETCH_PRODUCT_BRANDS,
  async (_, { extra }) => {
    const { api } = extra;
    const { data } = await api.get<Category[]>("/product-brands/");
    return data;
  }
);

export const fetchRecipeCategories = createAsyncThunk<Category[], undefined, { extra: Extra}>(
  Action.FETCH_RECIPE_CATEGORIES,
  async (_, { extra }) => {
    const { api } = extra;
    const { data } = await api.get<Category[]>("/recipe-categories/");
    return data;
  }
);

export const fetchProduct = createAsyncThunk<Product, number, { extra: Extra }>(
  Action.FETCH_PRODUCT,
  async (id, { extra }) => {
    const { api } = extra;
    const { data } = await api.get<Product>(`/products/${id}`);
    return data;
  }
);

export const fetchRecipe = createAsyncThunk<Recipe, number, { extra: Extra }>(
  Action.FETCH_RECIPE,
  async (id, { extra }) => {
    const { api } = extra;
    const { data } = await api.get<Recipe>(`/recipes/${id}`);
    return data;
  }
);
