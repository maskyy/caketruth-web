import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { CgArrowLeft } from "react-icons/cg";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Header } from "../../header/Header";
import { PageLayout } from "../../layouts/PageLayout";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { addDiaryRecord, fetchRecipe } from "../../../store/action";
import { Spinner } from "../../spinner/Spinner";
import { NotFound } from "../not-found/NotFound";
import { Entry } from "../../../types/Entry";
import DatePicker from "react-date-picker";
import { DiaryData } from "../../../types/DiaryRecord";
import { DateData } from "../../../types/DateData";

export const ViewRecipe = () => {
  const dispatch = useAppDispatch();
  const id = Number(useParams().id);
  const recipe = useAppSelector((state) => state.recipe);
  const isLoading = useAppSelector((state) => state.isLoading);
  const meals = useAppSelector((state) => state.meals);
  const recipeCategories = useAppSelector((state) => state.recipeCategories);
  const productBrands = useAppSelector((state) => state.productBrands);

  const navigate = useNavigate();
  const [mass, setMass] = useState(recipe?.mass ?? 100);
  const [date, setDate] = useState(new Date());

  const entries: Entry[] = [
    { key: "calories", title: "Калорийность", suffix: "ккал", mass: true },
    { key: "proteins", title: "Белки", suffix: "г", mass: true },
    { key: "fats", title: "Жиры", suffix: "г", mass: true },
    { key: "carbs", title: "Углеводы", suffix: "г", mass: true },
    { key: "ethanol", title: "Этанол", suffix: "г", mass: true },
    { key: "mass", title: "Масса", suffix: "г" },
    { key: "recipe_category", title: "Категория", categories: recipeCategories },
  ];

  useEffect(() => {
    if (id) {
      dispatch(fetchRecipe(id));
    }
  }, [dispatch, id]);

  if (isLoading) {
    return <Spinner />;
  }
  if (!recipe) {
    return <NotFound />;
  }

  const renderedMeals = meals.map(meal => {
    return <option key={meal.id} value={meal.id}>{meal.name}</option>
  });

  const recipeEntries = Object.entries(recipe ?? {});
  const renderedData = recipeEntries.map(([k, v]) => {
    let entry = entries.find(t => t.key === k);
    if (entry === undefined) {
      return null;
    }

    let value: string | number = v;
    if (entry.categories) {
      value = entry.categories.find((c) => c.id === v)!.title;
    } else if (entry.mass) {
      value = (+value * mass / 100).toFixed(2);
    }

    return (
      <tr key={k} className="border-y border-gray-300">
        <td>{entry.title}</td>
        <td>{value} {entry.suffix ?? ""}</td>
      </tr>
    );
  });

  const renderedIngedients = recipe?.products.map((p, idx) => {
    const brand = productBrands.find((b) => b.id === p.product.product_brand)!.title;
    const title = `${brand} ${p.product.name}`;
    return (
      <tr key={p.product.name} className="border-y border-gray-300">
        <td><Link to={`/products/${p.product.id}`}>{title}</Link></td>
        <td>{p.mass} г</td>
      </tr>
    );
  });

  const renderedDirections = recipe.directions.split("\n").map((line, idx) => {
    return <p key={idx}>{line}</p>;
  });

  const handleMassChange = (ev: ChangeEvent<HTMLInputElement>) => {
    setMass(+ev.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form) as Iterable<[DiaryData]>;
    const data: DiaryData & Partial<DateData> = Object.fromEntries(formData);

    data.mass = +(+data.mass).toFixed(2);
    delete data.day;
    delete data.month;
    delete data.year;

    dispatch(addDiaryRecord(data));
    navigate("/diary");
  };

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
        <input type="hidden" name="food" value={id} />
        <div className="flex justify-between gap-2">
          <label htmlFor="mass">Масса</label>
          <input className="w-24" type="number" name="mass" value={mass} onChange={handleMassChange} />
        </div>
        <div className="flex justify-between gap-2">
          <label htmlFor="meal">Приём</label>
          <select name="meal">
            {renderedMeals}
          </select>
        </div>
        <div className="flex justify-between gap-2">
          <label htmlFor="date">Дата</label>
          <DatePicker
            className="self-end"
            format="dd.MM.y"
            locale="ru-RU"
            clearIcon={null}
            onChange={setDate}
            value={date}
            name="added_date"
            required
          />
        </div>
        {mass > 0 && mass < 10000 && <button type="submit">Добавить в дневник</button>}
      </form>
      <div className="flex flex-col items-center gap-2">
        <section>
          <h2 className="text-center"><strong>Информация о рецепте</strong></h2>
          <table className="mx-2 text-center">
            <tbody>
              {renderedData}
            </tbody>
          </table>
        </section>
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
          {renderedDirections}
        </section>
      </div>
    </PageLayout>
  );
}
