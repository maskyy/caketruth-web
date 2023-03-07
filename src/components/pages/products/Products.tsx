import { FC } from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import { Header } from "../../header/Header";
import { PageLayout } from "../../layouts/PageLayout";
import "react-tabs/style/react-tabs.css";
import { Link } from "react-router-dom";

export const Products: FC = () => {
  const products = [
    { name: "ВкусВилл Творог 5%", calories: 117 },
    { name: "Перекрёсток Авокадо Хасс", calories: 160 },
    { name: "Окей Банан", calories: 95 },
  ];

  const recipes = [
    { name: "Банановая запеканка", calories: 150 },
    { name: "Карбонара с ветчиной", calories: 230 },
    { name: "Банановые панкейки", calories: 270 },
  ];

  const renderedProducts = products.map((p, idx) => {
    return (
      <Link key={idx} to={`/products/${idx}`}>
        <li className="border-green-200 border-b-2">
          {p.name}
          <br />
          {p.calories} ккал (100 г)
        </li>
      </Link>
    );
  });

  const renderedRecipes = recipes.map((r, idx) => {
    return (
      <Link key={idx} to={`/recipes/${idx}`}>
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
      <Tabs>
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
