import { FC } from "react";
import Meals from "../../diary_components/Meals";
import TopSummary from "../../diary_components/TopSummary";
import Header from "../../header/Header";
import PageLayout from "../../layouts/PageLayout";

const Diary: FC = () => {
  return (
    <PageLayout title="Дневник" header={<Header />} footer>
      <TopSummary protein={123.45} fat={123.45} carbs={123.45} calories={1234} rdi={2200} />
      <Meals mealList={["Завтрак", "Обед", "Полдник", "Ужин"]} />
    </PageLayout>
  );
}

export default Diary;