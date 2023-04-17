import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import { Header } from "../../header/Header";
import { PageLayout } from "../../layouts/PageLayout";
import "react-tabs/style/react-tabs.css";
import { Link, useLocation } from "react-router-dom";
import { useAppSelector } from "../../../hooks";
import { ChangeEvent, FormEvent, useState } from "react";
import { CgSearch } from "react-icons/cg";

export const Products = () => {
  const location = useLocation();
  const products = useAppSelector((state) => state.products);
  const recipes = useAppSelector((state) => state.recipes);
  const productBrands = useAppSelector((state) => state.productBrands);
  const productCategories = useAppSelector((state) => state.productCategories);
  const recipeCategories = useAppSelector((state) => state.recipeCategories);
  const user = useAppSelector((state) => state.user);

  const [productQuery, setProductQuery] = useState("");
  const [recipeQuery, setRecipeQuery] = useState("");

  const filteredProducts = productQuery === "" ? products : products.filter((p) => {
    const brand = productBrands.find((b) => b.id === p.product_brand)?.title ?? "";
    const category = productCategories.find((c) => c.id === p.product_category)?.title ?? "";
    const name = `${brand} ${p.name} ${category}`;
    return name.toLowerCase().includes(productQuery.toLowerCase());
  });

  const filteredRecipes = recipeQuery === "" ? recipes : recipes.filter((r) => {
    const category = recipeCategories.find((c) => c.id === r.recipe_category)?.title ?? "";
    const name = `${category} ${r.name}`;
    return name.toLowerCase().includes(recipeQuery.toLowerCase());
  })

  const handleProductQueryChange = (e: ChangeEvent<HTMLInputElement>) => {
    setProductQuery(e.target.value);
  };

  const handleRecipeQueryChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRecipeQuery(e.target.value);
  };

  const renderedProducts = filteredProducts.map((p) => {
    const formattedName = `${productBrands.find(b => b.id === p.product_brand)?.title ?? ""} ${p.name}`;
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

  const renderedRecipes = filteredRecipes.map((r, idx) => {
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
        <TabPanel className="mx-2">
          <form action="#" onSubmit={(e) => { e.preventDefault(); }} className="flex justify-between gap-2 mx-4">
            <label>Поиск</label>
            <input type="text" name="product-query" className="border-2 border-gray-200" onChange={handleProductQueryChange} />
            <button type="submit"><CgSearch /></button>
          </form>
          <ul>
            {renderedProducts.length > 0 ? renderedProducts : <li>По данному запросу продуктов не найдено.</li>}
          </ul>
          {user && !user.blocked_until && <Link to="/products/new">Добавить</Link>}
        </TabPanel>
        <TabPanel className="mx-2">
          <form action="#" onSubmit={(e) => { e.preventDefault(); }} className="flex justify-between gap-2 mx-4">
            <label>Поиск</label>
            <input type="text" name="recipe-query" className="border-2 border-gray-200" onChange={handleRecipeQueryChange} />
            <button type="submit"><CgSearch /></button>
          </form>
          <ul>
            {renderedRecipes}
          </ul>
          {user && !user.blocked_until && <Link to="/recipes/new">Добавить</Link>}
        </TabPanel>
      </Tabs>
    </PageLayout>
  );
}
