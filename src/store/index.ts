import { configureStore } from "@reduxjs/toolkit";
import { reducer } from "./reducer";
import { api } from "../api";
import { Token } from "../util/token";
import { fetchMeals, fetchProductBrands, fetchProductCategories, fetchProducts, fetchRecipeCategories, fetchRecipes, fetchUser, setAuthStatus } from "./action";
import { AuthStatus } from "../types/AuthStatus";

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    thunk: {
      extraArgument: {
        api
      },
    },
  }),
});

store.dispatch(fetchProductCategories());
store.dispatch(fetchProductBrands());
store.dispatch(fetchRecipeCategories());

store.dispatch(fetchProducts());
store.dispatch(fetchRecipes());

if (Token.getId()) {
  store.dispatch(setAuthStatus(AuthStatus.Unknown));
  store.dispatch(fetchUser(Token.getId()));
  store.dispatch(fetchMeals());
}
