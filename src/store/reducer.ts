import { createReducer } from "@reduxjs/toolkit";
import { User } from "../types/User";
import { AuthStatus } from "../types/AuthStatus";
import { fetchMeals, fetchUser, loginUser, logoutUser, refreshToken, registerUser, setAuthStatus, setMeals, updateUser } from "./action";
import { Token } from "../util/token";
import { getAuthStatus } from "../util/util";
import { ServerErrors } from "../types/api";
import { Meal } from "../types/Meal";

type State = {
  authStatus: AuthStatus;
  user: User | null;
  errors: ServerErrors | null;
  registered: boolean;
  meals: Meal[];
  mealsFetched: boolean;
};

const initialState: State = {
  authStatus: AuthStatus.NoAuth,
  user: null,
  errors: null,
  registered: false,
  meals: [],
  mealsFetched: false,
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(registerUser.fulfilled, (state, action) => {
      state.registered = true;
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
    });
});
