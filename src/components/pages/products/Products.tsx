import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import { Header } from "../../header/Header";
import { PageLayout } from "../../layouts/PageLayout";
import "react-tabs/style/react-tabs.css";
import { Link, useLocation } from "react-router-dom";
import { products, recipes } from "../../../testData";

export const Products = () => {
  const location = useLocation();

  const renderedProducts = products.map((p, idx) => {
    const formattedName = `${p.product_brand} ${p.name}`;
    return (
      <Link key={p.id} to={`/products/${p.id}`}>
        <li className="border-green-200 border-b-2">
          {formattedName}
          <br />
          {p.calories} ккал (100 г)
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
