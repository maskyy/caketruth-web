import { Route, Routes } from "react-router-dom";
import { authRoutes, routes } from "../router";
import { AuthRoute } from "./auth_route/AuthRoute";

export const AppRouter = () => {
  return (
    <Routes>
      {routes.map(route =>
        <Route key={route.path} path={route.path} element={<route.component />} />
      )}
      {authRoutes.map((route) => (
        <Route
          key={route.path}
          path={route.path}
          element={
            <AuthRoute>
              <route.component />
            </AuthRoute>}
        />))}
    </Routes>
  );
}
