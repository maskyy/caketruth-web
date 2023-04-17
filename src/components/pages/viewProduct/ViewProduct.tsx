import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { CgArrowLeft } from "react-icons/cg";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Header } from "../../header/Header";
import { PageLayout } from "../../layouts/PageLayout";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { Spinner } from "../../spinner/Spinner";
import { NotFound } from "../not-found/NotFound";
import { addDiaryRecord, fetchProduct } from "../../../store/action";
import { Entry } from "../../../types/Entry";
import DatePicker from "react-date-picker";
import { DiaryData } from "../../../types/DiaryRecord";
import { DateData } from "../../../types/DateData";

export const ViewProduct = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const id = Number(useParams().id);
  const product = useAppSelector((state) => state.product);
  const isLoading = useAppSelector((state) => state.isLoading);
  const meals = useAppSelector((state) => state.meals);
  const productCategories = useAppSelector((state) => state.productCategories);
  const user = useAppSelector((state) => state.user);

  const [mass, setMass] = useState(100);
  const [whole, setWhole] = useState(false);
  const [drained, setDrained] = useState(false);
  const [date, setDate] = useState(new Date());

  const entries: Entry[] = [
    { key: "calories", title: "Калорийность", suffix: "ккал", mass: true },
    { key: "proteins", title: "Белки", suffix: "г", mass: true },
    { key: "fats", title: "Жиры", suffix: "г", mass: true },
    { key: "carbs", title: "Углеводы", suffix: "г", mass: true },
    { key: "ethanol", title: "Этанол", suffix: "г", mass: true },
    { key: "net_grams", title: "Масса нетто", suffix: "г" },
    { key: "drained_grams", title: "Масса основного продукта", suffix: "г" },
    { key: "product_category", title: "Категория", categories: productCategories },
  ];

  useEffect(() => {
    if (id) {
      dispatch(fetchProduct(id));
    }
  }, [dispatch, id]);

  if (isLoading) {
    return <Spinner />;
  }
  if (!product) {
    return <NotFound />;
  }

  const renderedMeals = meals.map(meal => {
    return <option key={meal.id} value={meal.id}>{meal.name}</option>
  });

  const productEntries = Object.entries(product);

  const renderedData = productEntries.map(([k, v]) => {
    let entry = entries.find((t) => t.key === k);
    if (entry === undefined || (!v && !(v === 0 && v.mass))) {
      return null;
    }

    let value: string | number = v;
    if (entry.categories) {
      value = entry.categories.find((c) => c.id === v)!.title;
    } else if (entry.mass) {
      value = +value;
      if (whole && product.net_grams) {
        value = value * mass * (product.net_grams);
      } else if (drained && product.net_grams && product.drained_grams) {
        value = value * mass * (product.net_grams / product.drained_grams);
      } else {
        value = value * mass;
      }
      value = +(value / 100).toFixed(2);
    }

    return (
      <tr key={k} className="border-y border-gray-300">
        <td>{entry.title}</td>
        <td>{value} {entry.suffix ?? ""}</td>
      </tr>
    );
  });

  const handleMassChange = (ev: ChangeEvent<HTMLInputElement>) => {
    setMass(+ev.target.value);
  };

  const handleWholeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setWhole(e.target.checked);
    if (e.target.checked) {
      setMass(+(mass / product.net_grams!).toFixed(2));
    } else {
      setMass(+(mass * product.net_grams!).toFixed(2));
    }
  };

  const handleDrainedChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDrained(e.target.checked);
    if (e.target.checked) {
      setMass(+(mass / (product.net_grams! / product.drained_grams!)).toFixed(2));
    } else {
      setMass(+(mass * (product.net_grams! / product.drained_grams!)).toFixed(2));
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form) as Iterable<[DiaryData]>;
    const data: DiaryData & Partial<DateData> = Object.fromEntries(formData);
    if (whole) {
      data.mass = data.mass * product.net_grams!;
    } else if (drained) {
      data.mass = data.mass * (product.net_grams! / product.drained_grams!);
    }
    data.mass = +(+data.mass).toFixed(2);
    delete data.day;
    delete data.month;
    delete data.year;

    dispatch(addDiaryRecord(data));
    navigate("/diary");
  };

  return (
    <PageLayout
      title="Продукт"
      header={
        <Header icon={false}>
          <Link to="/products"><CgArrowLeft size={24} /></Link>
          <h1>{product.name}</h1>
        </Header>
      }
      footer={false}
    >
      <form className="flex flex-col items-center" onSubmit={handleSubmit}>
        <input type="hidden" name="food" value={id} />
        <div className="flex justify-between gap-2">
          <label htmlFor="mass">{whole ? "Кол-во" : "Масса"}</label>
          <input className="w-24" type="number" name="mass" value={mass} onChange={handleMassChange} />
        </div>
        {product?.net_grams && !drained && <div>
          <label>Кол-во</label>
          <input type="checkbox" onChange={handleWholeChange} />
        </div>}
        {product?.drained_grams && !whole && <div>
          <label>Вес основного</label>
          <input type="checkbox" onChange={handleDrainedChange} />
        </div>}
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
      <div className="flex flex-col items-center">
        <h2><strong>Информация о продукте</strong></h2>
        <table className="mx-2 text-center">
          <tbody>
            {renderedData}
          </tbody>
        </table>
      </div>
      {((user?.id === product.user && !product.is_verified) || user?.role.name !== "user") && <div className="flex flex-col items-center">
        <Link to="edit">Редактировать</Link>
      </div>}
    </PageLayout>
  );
}
