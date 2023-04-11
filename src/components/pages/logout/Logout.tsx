import { useEffect } from "react";
import { Navigate } from "react-router-dom"
import { Token } from "../../../util/token";
import { useAppDispatch } from "../../../hooks";
import { logoutUser } from "../../../store/action";

export const Logout = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(logoutUser({ refresh: Token.getRefresh() }));
  }, [dispatch]);

  return <Navigate to="/" />;
}
