import { FC } from "react";
import { Diary } from "../components/pages/diary/Diary";
import { EditProduct } from "../components/pages/editProduct/EditProduct";
import { EditRecipe } from "../components/pages/editRecipe/EditRecipe";
import { ViewProduct } from "../components/pages/viewProduct/ViewProduct";
import { Products } from "../components/pages/products/Products";
import { Profile } from "../components/pages/profile/Profile";
import { ViewRecipe } from "../components/pages/viewRecipe/ViewRecipe";
import { Reports } from "../components/pages/reports/Reports";
import { Welcome } from "../components/pages/welcome/Welcome";

interface route {
  path: string,
  component: FC
}

const routes: route[] = [
  { path: "/", component: Welcome },
  { path: "/products", component: Products },
  { path: "/recipes", component: Products },
  { path: "/products/:productId", component: ViewProduct },
  { path: "/products/new", component: EditProduct },
  { path: "/products/:productId/edit", component: EditProduct },
  { path: "/recipes/:recipeId", component: ViewRecipe },
  { path: "/recipes/new", component: EditRecipe },
  { path: "/recipes/:recipeId/edit", component: EditRecipe },
  { path: "/diary", component: Diary },
  { path: "/reports", component: Reports },
  { path: "/profile", component: Profile },
];

// TODO
const authRoutes: route[] = [

];

export { routes, authRoutes };
