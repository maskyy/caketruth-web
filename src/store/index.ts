import { configureStore } from "@reduxjs/toolkit";
import { reducer } from "./reducer";
import { api } from "../api";
import { Token } from "../util/token";
import { fetchMeals, fetchUser, setAuthStatus } from "./action";
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

if (Token.getId()) {
  store.dispatch(setAuthStatus(AuthStatus.Unknown));
  store.dispatch(fetchUser(Token.getId()));
  store.dispatch(fetchMeals());
}
