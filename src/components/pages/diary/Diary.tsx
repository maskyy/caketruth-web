import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { daySummary, mealList } from "../../../testData";
import { DiaryHeader } from "../../diary_components/DiaryHeader";
import { MealBlockList } from "../../diary_components/Meals";
import { TopSummary } from "../../diary_components/TopSummary";
import { PageLayout } from "../../layouts/PageLayout";
import { useNavigate } from "react-router-dom";
import { fetchMeals } from "../../../store/action";

export const Diary = () => {
  const meals = useAppSelector((state) => state.meals);
  const mealsFetched = useAppSelector((state) => state.mealsFetched);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!mealsFetched) {
      dispatch(fetchMeals());
    }
    if (mealsFetched && meals.length === 0) {
      navigate("/meals");
    }
  }, [dispatch, meals, mealsFetched, navigate]);

  return (
    <PageLayout title="Дневник" header={<DiaryHeader />} footer>
      <TopSummary summary={daySummary} />
      <MealBlockList mealList={mealList} />
    </PageLayout>
  );
}
