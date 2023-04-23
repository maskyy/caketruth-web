import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { CgArrowLeft } from "react-icons/cg";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Header } from "../../header/Header";
import { PageLayout } from "../../layouts/PageLayout";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { addDiaryRecord, deleteDiaryRecord, deleteRecipe, fetchRecipe, updateDiaryRecord, updateUser } from "../../../store/action";
import { Spinner } from "../../spinner/Spinner";
import { NotFound } from "../not-found/NotFound";
import { Entry } from "../../../types/Entry";
import DatePicker from "react-date-picker";
import { DiaryData } from "../../../types/DiaryRecord";
import { DateData } from "../../../types/DateData";
import { AuthStatus } from "../../../types/AuthStatus";
import { UserBan } from "../../../types/User";


export const ViewRecipe = () => {
  const dispatch = useAppDispatch();
  const id = Number(useParams().id);

  const record = useAppSelector((state) => state.record);
  const recipe = useAppSelector((state) => state.recipe);
  const isLoading = useAppSelector((state) => state.isLoading);
  const meals = useAppSelector((state) => state.meals);
  const recipeCategories = useAppSelector((state) => state.recipeCategories);
  const productBrands = useAppSelector((state) => state.productBrands);
  const user = useAppSelector((state) => state.user);
  const authStatus = useAppSelector((state) => state.authStatus);
  const isStaff = authStatus === AuthStatus.Moderator || authStatus === AuthStatus.Admin;

  const navigate = useNavigate();
  const [mass, setMass] = useState(recipe?.mass ?? record?.mass ?? 100);
  const [date, setDate] = useState(record?.added_date ? new Date(record.added_date) : new Date());
  const [banDate, setBanDate] = useState(new Date());

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
    if (entry === undefined || (!v && !(v === 0 && v.mass))) {
      return null;
    }

    let value: string | number | undefined = v;
    if (entry.categories) {
      value = entry.categories.find((c) => c.id === v)?.title;
      if (value === undefined) {
        return null;
      }
    } else if (entry.mass) {
      value = (Number(value) * mass / 100).toFixed(2);
    }

    return (
      <tr key={k} className="border-y border-gray-300">
        <td>{entry.title}</td>
        <td>{value} {entry.suffix ?? ""}</td>
      </tr>
    );
  });

  const renderedIngedients = recipe?.products.map((p, idx) => {
    const brand = productBrands.find((b) => b.id === p.product.product_brand)?.title ?? "";
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

    if (record) {
      dispatch(updateDiaryRecord(data));
    } else {
      dispatch(addDiaryRecord(data));
    }
    navigate("/diary");
  };

  const handleDelete = (id: number) => {
    dispatch(deleteDiaryRecord(id));
    navigate("/diary");
  };

  const handleBan = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form) as Iterable<[UserBan]>;
    const data: UserBan & Partial<DateData> = Object.fromEntries(formData);
    delete data.day;
    delete data.month;
    delete data.year;

    dispatch(updateUser(data));
  };

  const handleRecipeDelete = (id: number) => {
    dispatch(deleteRecipe(id));
    navigate("/recipes");
  };

  return (
    <PageLayout
      title={record ? "Редактирование записи" : "Рецепт"}
      header={
        <Header icon={false}>
          <Link to="/recipes"><CgArrowLeft size={24} /></Link>
          <h1>{recipe.name}</h1>
        </Header>
      }
      footer={false}
    >
      <form className="flex flex-col items-center" onSubmit={handleSubmit}>
        {record
          ? <input type="hidden" name="id" value={record.id} />
          : <input type="hidden" name="food" value={id} />
        }
        <div className="flex justify-between gap-2">
          <label htmlFor="mass">Масса</label>
          <input className="w-24" type="number" name="mass" step={0.1} value={mass} onChange={handleMassChange} />
        </div>
        {user && <>
          <div className="flex justify-between gap-2">
            <label htmlFor="meal">Приём</label>
            <select name="meal" defaultValue={record?.meal ?? ""}>
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
          {mass > 0 && mass < 10000 && <button type="submit">{record ? "Обновить" : "Добавить в дневник"}</button>}
          {record && <button type="button" onClick={() => handleDelete(record?.id)}>Удалить</button>}
        </>}
      </form>
      <div className="flex flex-col items-center gap-2">
        <section>
          <h2 className="text-center"><strong>Информация о рецепте</strong></h2>
          <table className="mx-2 text-center">
            <tbody>
              {renderedData}
              {isStaff && <>
                <tr className="border-y border-gray-300">
                  <td>Публичный/проверенный</td>
                  <td>{recipe.is_public ? "да" : "нет"}/{recipe.is_verified ? "да" : "нет"}</td>
                </tr>

                <tr className="border-y border-gray-300">
                  <td>ID автора</td>
                  <td>{recipe.user}</td>
                </tr>
              </>}
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
        <section className="border-b-2 border-gray-200">
          <h2 className="text-center">Приготовление</h2>
          {renderedDirections}
        </section>
      </div>
      {((user?.id === recipe.user && !recipe.is_verified) || isStaff) && <div className="flex flex-col items-center">
        <Link to="edit">Редактировать</Link>
        <button type="button" onClick={() => handleRecipeDelete(recipe.id)}>Удалить</button>
      </div>}
      {isStaff && <form className="flex flex-col items-center" action="#" method="post" onSubmit={handleBan}>
        <input type="hidden" name="id" value={recipe.user} />
        <label>Срок блокировки</label>
        <DatePicker
          format="dd.MM.y"
          locale="ru-RU"
          clearIcon={null}
          onChange={setBanDate}
          value={banDate}
          name="blocked_until"
          required
        />
        <button type="submit">Заблокировать</button>
      </form>}
    </PageLayout>
  );
}
