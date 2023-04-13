import { ChangeEvent, FormEvent, useState } from "react";
import { CgArrowLeft } from "react-icons/cg";
import { Link, useNavigate, useParams } from "react-router-dom";
import { mealList, recipes } from "../../../testData";
import { Header } from "../../header/Header";
import { PageLayout } from "../../layouts/PageLayout";

const titles: string[][] = [
  ["calories", "Калориийность", "ккал"],
  ["proteins", "Белки", "г"],
  ["fats", "Жиры", "г"],
  ["carbs", "Углеводы", "г"],
  ["ethanol", "Этанол", "г"],
  ["mass", "Масса готового блюда", "г"],
  ["recipe_category", "Категория"],
];

const dependsOnMass = ["calories", "proteins", "fats", "carbs", "ethanol"];

export const ViewRecipe = () => {
  const recipeId = Number(useParams().recipeId);
  const recipe = recipes.find(r => r.id === recipeId)!;

  const navigate = useNavigate();
  const [mass, setMass] = useState(recipe.mass);
  const [meal, setMeal] = useState(0);

  const renderedMeals = mealList.map(meal => {
    return <option key={meal.id} value={meal.id}>{meal.name}</option>
  });

  const recipeEntries = Object.entries(recipe);
  const renderedData = recipeEntries.map(entry => {
    let translation = titles.find(t => t[0] === entry[0]);
    if (translation === undefined) {
      return null;
    }
    const title = translation[1];
    let value: string | number = entry[1];
    if (dependsOnMass.indexOf(entry[0]) !== -1) {
      value = +value;
      value = (value * mass / 100).toFixed(2);
    }
    const suffix = translation[2] ?? "";

    return (
      <tr key={title} className="border-y border-gray-300">
        <td>{title}</td>
        <td>{value} {suffix}</td>
      </tr>
    );
  });

  const renderedIngedients = recipe.ingredients.map((p, idx) => {
    const title = `${p.product.product_brand} ${p.product.name}`;
    return (
      <tr key={p.product.name} className="border-y border-gray-300">
        <td><Link to={`/products/${p.product.id}`}>{title}</Link></td>
        <td>{p.mass}</td>
      </tr>
    );
  });

  const renderedDirections = recipe.directions.split("\n").map((line, idx) => {
    return <p key={idx}>{line}</p>;
  });

  const handleMassChange = (ev: ChangeEvent<HTMLInputElement>) => {
    setMass(+ev.target.value);
  };

  const handleMealChange = (ev: ChangeEvent<HTMLSelectElement>) => {
    setMeal(+ev.target.value);
  };

  const handleSubmit = (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const data = {
      food_id: recipeId,
      mass: mass,
      meal_id: meal,
      added_date: new Date()
    };
    console.log(data);
    navigate("/diary");
  }

  return (
    <PageLayout
      title="Рецепт"
      header={
        <Header icon={false}>
          <Link to="/recipes"><CgArrowLeft size={24} /></Link>
          <h1>{recipe.name}</h1>
        </Header>
      }
      footer={false}
    >
      <form className="flex flex-col items-center" onSubmit={handleSubmit}>
        <div className="flex justify-between gap-2">
          <label htmlFor="mass">Масса</label>
          <input className="w-24" type="number" name="mass" value={mass} onChange={handleMassChange} />
        </div>
        <div className="flex justify-between gap-2">
          <label htmlFor="meal">Приём</label>
          <select name="meal" onChange={handleMealChange}>
            {renderedMeals}
          </select>
        </div>
        <button type="submit">Добавить в дневник</button>
      </form>
      <div className="flex flex-col items-center">
        <h2><strong>Информация о продукте</strong></h2>
        <table className="mx-2 text-center">
          <tbody>
            {renderedData}
          </tbody>
        </table>
        <section>
          <h2 className="text-center">Ингредиенты</h2>
          <table className="text-center">
            <tbody>
              {renderedIngedients}
            </tbody>
          </table>
        </section>
        <section>
          <h2 className="text-center">Приготовление</h2>
          <p>{renderedDirections}</p>
        </section>
      </div>
    </PageLayout>
  );
}
