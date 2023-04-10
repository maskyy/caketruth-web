import { createReducer } from "@reduxjs/toolkit";
import { User } from "../types/User";
import { AuthStatus } from "../types/AuthStatus";
import { fetchUser, loginUser, logoutUser, refreshToken, registerUser, updateUser } from "./action";
import { Token } from "../util/token";
import { getAuthStatus } from "../util/util";

type State = {
  authStatus: AuthStatus;
  user: User | null;
  errors: string[];
};

const initialState: State = {
  authStatus: AuthStatus.NoAuth,
  user: null,
  errors: [],
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(registerUser.fulfilled, (state, action) => {
      // TODO signup success?
    })
    .addCase(loginUser.fulfilled, (state, action) => {
      Token.save(action.payload);
      state.authStatus = AuthStatus.Unknown;
    })
    .addCase(loginUser.rejected, (state, action) => {
      state.errors = [(action.payload as { detail: string }).detail];
    })
    .addCase(refreshToken.fulfilled, (state, action) => {
      Token.save(action.payload);
    })
    .addCase(logoutUser.fulfilled, (state, action) => {
      Token.drop();
      state.authStatus = AuthStatus.NoAuth;
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
});
