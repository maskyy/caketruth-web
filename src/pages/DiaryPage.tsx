import Meals from "../components/diary_components/Meals";
import TopSummary from "../components/diary_components/TopSummary";
import Header from "../components/header/Header";

function DiaryPage() {
  return (
    <main>
      <Header />
      <TopSummary protein={123.45} fat={123.45} carbs={123.45} calories={1234} rdi={2200} />
      <Meals mealList={["Завтрак", "Обед", "Полдник", "Ужин"]}/>
    </main>
  );
}

export default DiaryPage;
