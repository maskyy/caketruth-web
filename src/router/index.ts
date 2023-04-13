import { Diary } from "../components/pages/diary/Diary";
import { EditProduct } from "../components/pages/editProduct/EditProduct";
import { EditRecipe } from "../components/pages/editRecipe/EditRecipe";
import { ViewProduct } from "../components/pages/viewProduct/ViewProduct";
import { Products } from "../components/pages/products/Products";
import { Profile } from "../components/pages/profile/Profile";
import { ViewRecipe } from "../components/pages/viewRecipe/ViewRecipe";
import { Reports } from "../components/pages/reports/Reports";
import { Welcome } from "../components/pages/welcome/Welcome";
import { EditRecord } from "../components/pages/editRecord/EditRecord";
import { Login } from "../components/pages/login/Login";
import { SignUp } from "../components/pages/signUp/SignUp";
import { Logout } from "../components/pages/logout/Logout";
import { Meals } from "../components/pages/meals/Meals";

interface route {
  path: string;
  component: () => JSX.Element;
}

export const routes: route[] = [
  { path: "/", component: Welcome },
  { path: "/products", component: Products },
  { path: "/recipes", component: Products },
  { path: "/products/:productId", component: ViewProduct },
  { path: "/recipes/:recipeId", component: ViewRecipe },
  { path: "/recipes/new", component: EditRecipe },
  { path: "/login", component: Login },
  { path: "/signup", component: SignUp },
];

export const authRoutes: route[] = [
  { path: "/logout", component: Logout },
  { path: "/products/new", component: EditProduct },
  { path: "/products/:productId/edit", component: EditProduct },
  { path: "/recipes/:recipeId/edit", component: EditRecipe },
  { path: "/diary", component: Diary },
  { path: "/diary/:recordId/edit", component: EditRecord },
  { path: "/reports", component: Reports },
  { path: "/profile", component: Profile },
  { path: "/meals", component: Meals },
];
