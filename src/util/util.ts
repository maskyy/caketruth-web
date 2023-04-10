import { AuthStatus } from "../types/AuthStatus";
import { User } from "../types/User";

export const getAuthStatus = ({ role }: User) => {
  switch (role.name) {
    case "user":
      return AuthStatus.User;
    case "moderator":
      return AuthStatus.Moderator;
    case "admin":
      return AuthStatus.Admin;
  }
};
