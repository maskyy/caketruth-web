import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import { Header } from "../../header/Header";
import { PageLayout } from "../../layouts/PageLayout";
import "react-tabs/style/react-tabs.css";
import { Link, useLocation } from "react-router-dom";
import { useAppSelector } from "../../../hooks";

export const Products = () => {
  const location = useLocation();
  const products = useAppSelector((state) => state.products);
  const recipes = useAppSelector((state) => state.recipes);
  const product_brands = useAppSelector((state) => state.productBrands);
  const product_categories = useAppSelector((state) => state.productCategories);
  const recipe_categories = useAppSelector((state) => state.recipeCategories);

  const renderedProducts = products.map((p) => {
    const formattedName = `${product_brands.find(b => b.id === p.id)?.title ?? ""} ${p.name}`;
    return (
      <Link key={p.id} to={`/products/${p.id}`}>
        <li className="border-green-200 border-b-2">
          {formattedName}
          <br />
          {p.calories} ккал
        </li>
      </Link>
    );
  });

  const renderedRecipes = recipes.map((r, idx) => {
    return (
      <Link key={r.id} to={`/recipes/${r.id}`}>
        <li key={idx} className="border-green-200 border-b-2">{r.name}<br />{r.calories} ккал (100 г)</li>
      </Link>
    );
  });

  return (
    <PageLayout
      title="Продукты"
      header={
        <Header>
          <h1 className="self-end">Продукты</h1>
        </Header>
      } footer>
      <Tabs defaultIndex={location.pathname === "/recipes" ? 1 : 0}>
        <TabList>
          <Tab>Продукты</Tab>
          <Tab>Рецепты</Tab>
        </TabList>
        <TabPanel>
          <ul className="mx-2">
            {renderedProducts}
          </ul>
        </TabPanel>
        <TabPanel>
          <ul className="mx-2">
            {renderedRecipes}
          </ul>
        </TabPanel>
      </Tabs>
    </PageLayout>
  );
}
