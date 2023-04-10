import { configureStore } from "@reduxjs/toolkit";
import { reducer } from "./reducer";
import { api } from "../api";
import { Token } from "../util/token";
import { fetchUser } from "./action";

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
  store.dispatch(fetchUser(Token.getId()));
}
