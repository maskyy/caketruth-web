import { ChangeEvent, FormEvent, useState } from "react";
import { Header } from "../../header/Header"
import { PageLayout } from "../../layouts/PageLayout"
import { useAppDispatch } from "../../../hooks";
import { setMeals } from "../../../store/action";
import { useNavigate } from "react-router-dom";

export const Meals = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [count, setCount] = useState(3);

  const handleCountChange = (e: ChangeEvent<HTMLInputElement>) => {
    const amount = Number(e.target.value);
    if (amount < 1 || amount > 10) {
      return;
    }
    setCount(amount);
    navigate("/diary");
  };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form) as Iterable<[string]>;
    const names: string[] = Object.values(Object.fromEntries(formData));
    names.shift();
    dispatch(setMeals(names));
  };

  const renderedFields = Array.from({ length: count }).map((_, idx) => {
    return (
      <div key={idx} className="flex justify-around">
        <label>Приём {idx + 1}</label>
        <input type="text" name={`meal-${idx}`} placeholder="Завтрак" required />
      </div>
    )
  });

  return (
    <PageLayout
      title="Приёмы пищи"
      header={
        <Header>
          <h1 className="self-end">Приёмы пищи</h1>
        </Header>
      } footer>
      <p>Пожалуйста, установите приёмы пищи</p>
      <form className="flex justify-center flex-col gap-2" action="#" method="post" onSubmit={handleFormSubmit}>
        <div className="flex justify-around">
          <label>Кол-во приёмов</label>
          <input type="number" name="count" placeholder="3" defaultValue={3} required onChange={handleCountChange} />
        </div>
        {renderedFields}
        <div className="flex justify-center">
          <button type="submit">Отправить</button>
        </div>
      </form>
    </PageLayout>
  );
};
