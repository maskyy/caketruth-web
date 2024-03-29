import { createReducer } from "@reduxjs/toolkit";
import { User } from "../types/User";
import { AuthStatus } from "../types/AuthStatus";
import { addDiaryRecord, addProduct, addRecipe, deleteDiaryRecord, deleteProduct, deleteRecipe, fetchDiary, fetchMeals, fetchProduct, fetchProductBrands, fetchProductCategories, fetchProducts, fetchRecipe, fetchRecipeCategories, fetchRecipes, fetchRecord, fetchUser, loginUser, logoutUser, refreshToken, registerUser, resetRecord, resetSucceeded, setAuthStatus, setMeals, updateDiaryRecord, updateProduct, updateRecipe, updateUser } from "./action";
import { Token } from "../util/token";
import { getAuthStatus } from "../util/util";
import { ServerErrors } from "../types/api";
import { Meal } from "../types/Meal";
import { BasicProduct, Product } from "../types/Product";
import { BasicRecipe, Recipe } from "../types/Recipe";
import { Category } from "../types/Category";
import { DiaryRecord } from "../types/DiaryRecord";

type State = {
  authStatus: AuthStatus;
  user: User | null;
  errors: ServerErrors | null;
  succeeded: boolean;
  meals: Meal[];
  mealsFetched: boolean;
  products: BasicProduct[];
  recipes: BasicRecipe[];
  productCategories: Category[];
  productBrands: Category[];
  recipeCategories: Category[];
  isLoading: boolean;
  product: Product | null;
  recipe: Recipe | null;
  diary: DiaryRecord[];
  record: DiaryRecord | null;
};

const initialState: State = {
  authStatus: AuthStatus.NoAuth,
  user: null,
  errors: null,
  succeeded: false,
  meals: [],
  mealsFetched: false,
  products: [],
  recipes: [],
  productCategories: [],
  productBrands: [],
  recipeCategories: [],
  isLoading: false,
  product: null,
  recipe: null,
  diary: [],
  record: null,
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(registerUser.fulfilled, (state, action) => {
      state.succeeded = true;
    })
    .addCase(registerUser.rejected, (state, action) => {
      state.errors = action.payload as ServerErrors;
    })
    .addCase(loginUser.fulfilled, (state, action) => {
      Token.save(action.payload);
      state.authStatus = AuthStatus.Unknown;
    })
    .addCase(loginUser.rejected, (state, action) => {
      state.errors = action.payload as ServerErrors;
    })
    .addCase(refreshToken.fulfilled, (state, action) => {
      Token.save(action.payload);
    })
    .addCase(logoutUser.fulfilled, (state, action) => {
      Token.drop();
      state.authStatus = AuthStatus.NoAuth;
      state.user = null;
      state.meals = [];
    })
    .addCase(fetchUser.fulfilled, (state, action) => {
      state.authStatus = getAuthStatus(action.payload);
      state.user = action.payload;
    })
    .addCase(updateUser.fulfilled, (state, action) => {
      if (action.payload.id === Number(localStorage.getItem("ct-user-id"))) {
        state.authStatus = getAuthStatus(action.payload);
        state.user = action.payload;
      }
    })
    .addCase(updateUser.rejected, (state, action) => {
      state.errors = action.payload as ServerErrors;
    })
    .addCase(setAuthStatus, (state, action) => {
      state.authStatus = action.payload;
    })
    .addCase(fetchMeals.fulfilled, (state, action) => {
      state.meals = action.payload;
      state.mealsFetched = true;
    })
    .addCase(setMeals.fulfilled, (state, action) => {
      state.meals = action.payload;
      state.mealsFetched = true;
    })
    .addCase(fetchProducts.fulfilled, (state, action) => {
      state.products = action.payload;
    })
    .addCase(fetchRecipes.fulfilled, (state, action) => {
      state.recipes = action.payload;
    })
    .addCase(fetchProductCategories.fulfilled, (state, action) => {
      state.productCategories = action.payload;
    })
    .addCase(fetchProductBrands.fulfilled, (state, action) => {
      state.productBrands = action.payload;
    })
    .addCase(fetchRecipeCategories.fulfilled, (state, action) => {
      state.recipeCategories = action.payload;
    })
    .addCase(fetchProduct.fulfilled, (state, action) => {
      state.product = action.payload;
      state.isLoading = false;
    })
    .addCase(fetchProduct.rejected, (state) => {
      state.isLoading = false;
    })
    .addCase(fetchProduct.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(fetchRecipe.fulfilled, (state, action) => {
      state.recipe = action.payload;
      state.isLoading = false;
    })
    .addCase(fetchRecipe.rejected, (state) => {
      state.isLoading = false;
    })
    .addCase(fetchRecipe.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(fetchDiary.fulfilled, (state, action) => {
      state.diary = action.payload;
      state.isLoading = false;
    })
    .addCase(fetchDiary.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(fetchDiary.rejected, (state) => {
      state.isLoading = false;
    })
    .addCase(addDiaryRecord.fulfilled, (state, action) => {
      state.diary = [ ...state.diary, action.payload];
    })
    .addCase(updateDiaryRecord.fulfilled, (state, action) => {
      state.diary = state.diary.map((r) => {
        if (r.id !== action.payload.id) {
          return r;
        }
        return action.payload;
      });
    })
    .addCase(deleteDiaryRecord.fulfilled, (state, action) => {
      state.diary = state.diary.filter((r) => {
        return r.id !== action.payload;
      });
    })
    .addCase(addProduct.fulfilled, (state, action) => {
      state.products = [...state.products, action.payload];
      state.succeeded = true;
    })
    .addCase(addProduct.rejected, (state, action) => {
      state.errors = action.payload as ServerErrors;
    })
    .addCase(updateProduct.fulfilled, (state, action) => {
      state.products = state.products.map((p) => {
        if (p.id !== action.payload.id) {
          return p;
        }
        return action.payload;
      });
      state.succeeded = true;
    })
    .addCase(updateProduct.rejected, (state, action) => {
      state.errors = action.payload as ServerErrors;
    })
    .addCase(resetSucceeded, (state) => {
      state.errors = null;
      state.succeeded = false;
    })
    .addCase(addRecipe.fulfilled, (state, action) => {
      state.recipes = [...state.recipes, action.payload];
      state.succeeded = true;
    })
    .addCase(addRecipe.rejected, (state, action) => {
      state.errors = action.payload as ServerErrors;
    })
    .addCase(updateRecipe.fulfilled, (state, action) => {
      state.recipes = state.recipes.map((r) => {
        if (r.id !== action.payload.id) {
          return r;
        }
        return action.payload;
      });
      state.succeeded = true;
    })
    .addCase(updateRecipe.rejected, (state, action) => {
      state.errors = action.payload as ServerErrors;
    })
    .addCase(fetchRecord.fulfilled, (state, action) => {
      state.record = action.payload;
      state.isLoading = false;
    })
    .addCase(fetchRecord.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(fetchRecord.rejected, (state) => {
      state.isLoading = false;
    })
    .addCase(resetRecord, (state) => {
      state.record = null;
    })
    .addCase(deleteProduct.fulfilled, (state, action) => {
      state.products = state.products.filter((p) => p.id !== action.payload);
    })
    .addCase(deleteRecipe.fulfilled, (state, action) => {
      state.recipes = state.recipes.filter((r) => r.id !== action.payload);
    });
});
