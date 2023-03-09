import { FC } from "react";
import { daySummary, mealList } from "../../../testData";
import { DiaryHeader } from "../../diary_components/DiaryHeader";
import { Meals } from "../../diary_components/Meals";
import { TopSummary } from "../../diary_components/TopSummary";
import { PageLayout } from "../../layouts/PageLayout";

export const Diary: FC = () => {
  return (
    <PageLayout title="Дневник" header={<DiaryHeader />} footer>
      <TopSummary summary={daySummary} />
      <Meals mealList={mealList} />
    </PageLayout>
  );
}
