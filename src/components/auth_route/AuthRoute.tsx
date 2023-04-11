import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../hooks";
import { AuthStatus } from "../../types/AuthStatus";

interface AuthRouteProps {
  children: JSX.Element;
}

export const AuthRoute = ({ children }: AuthRouteProps) => {
  const authStatus = useAppSelector((state) => state.authStatus);

  return authStatus !== AuthStatus.NoAuth ? children : <Navigate to="/login" />;
};
