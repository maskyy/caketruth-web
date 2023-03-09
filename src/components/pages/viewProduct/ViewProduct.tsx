import { ChangeEvent, FC, FormEvent, useState } from "react";
import { CgArrowLeft } from "react-icons/cg";
import { Link, useNavigate, useParams } from "react-router-dom";
import { mealList, products } from "../../../testData";
import { Header } from "../../header/Header";
import { PageLayout } from "../../layouts/PageLayout";

const titles: string[][] = [
  ["calories", "Калориийность", "ккал"],
  ["proteins", "Белки", "г"],
  ["fats", "Жиры", "г"],
  ["carbs", "Углеводы", "г"],
  ["ethanol", "Этанол", "г"],
  ["net_grams", "Масса нетто", "г"],
  ["drained_grams", "Масса основного продукта", "г"],
  ["product_category", "Категория"],
];

const dependsOnMass = ["calories", "proteins", "fats", "carbs", "ethanol"];

export const ViewProduct: FC = () => {
  const navigate = useNavigate();
  const productId = Number(useParams().productId);
  const [mass, setMass] = useState(100);
  const [meal, setMeal] = useState(0);

  const renderedMeals = mealList.map(meal => {
    return <option key={meal.id} value={meal.id}>{meal.name}</option>
  });

  const product = products.find(p => p.id === productId)!;
  const productEntries = Object.entries(product);
  const renderedData = productEntries.map(entry => {
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

  const handleMassChange = (ev: ChangeEvent<HTMLInputElement>) => {
    setMass(+ev.target.value);
  };

  const handleMealChange = (ev: ChangeEvent<HTMLSelectElement>) => {
    setMeal(+ev.target.value);
  };

  const handleSubmit = (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const data = {
      food_id: productId,
      mass: mass,
      meal_id: meal,
      added_date: new Date()
    };
    console.log(data);
    navigate("/diary");
  }

  return (
    <PageLayout
      title="Продукт"
      header={
        <Header icon={false}>
          <Link to="/products"><CgArrowLeft size={24} /></Link>
          <h1>
            {product.product_brand} {product.name}
          </h1>
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
      </div>
    </PageLayout>
  );
}
