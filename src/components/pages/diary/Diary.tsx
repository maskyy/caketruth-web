import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { PageLayout } from "../../layouts/PageLayout";
import { useNavigate } from "react-router-dom";
import { fetchMeals } from "../../../store/action";
import { Header } from "../../header/Header";
import DatePicker from "react-date-picker";
import { DaySummary } from "../../day_summary/DaySummary";
import { MealRecords } from "../../meals/MealRecords";

export const Diary = () => {
  const meals = useAppSelector((state) => state.meals);
  const mealsFetched = useAppSelector((state) => state.mealsFetched);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const diary = useAppSelector((state) => state.diary);

  const [date, setDate] = useState(new Date());

  useEffect(() => {
    if (!mealsFetched) {
      dispatch(fetchMeals());
    }
    if (mealsFetched && meals.length === 0) {
      navigate("/meals");
    }
  }, [dispatch, meals, mealsFetched, navigate]);

  const dailyRecords = diary.filter((r) => {
    return r.added_date.startsWith(date.toISOString().slice(0, 10));
  });

  return (
    <PageLayout
      title="Дневник"
      header={<Header>
        <DatePicker
          className="self-end"
          onChange={setDate}
          value={date}
          format="dd.MM.y"
          locale="ru-RU"
          clearIcon={null}
          required
        />
      </Header>}
      footer
    >
      <DaySummary records={dailyRecords} date={date} />
      <MealRecords records={dailyRecords} date={date} />
    </PageLayout>
  );
}
