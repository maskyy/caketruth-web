import { FC } from "react";
import { Diary } from "../components/pages/diary/Diary";
import { EditProduct } from "../components/pages/editProduct/EditProduct";
import { Product } from "../components/pages/product/Product";
import { Products } from "../components/pages/products/Products";
import { Profile } from "../components/pages/profile/Profile";
import { Reports } from "../components/pages/reports/Reports";
import { Welcome } from "../components/pages/welcome/Welcome";

interface route {
  path: string,
  component: FC
}

const routes: route[] = [
  { path: "/", component: Welcome },
  { path: "/products", component: Products },
  { path: "/products/:productId", component: Product },
  { path: "/products/:productId/edit", component: EditProduct },
  { path: "/diary", component: Diary },
  { path: "/reports", component: Reports },
  { path: "/profile", component: Profile },
];

// TODO
const authRoutes: route[] = [

];

export { routes, authRoutes };
