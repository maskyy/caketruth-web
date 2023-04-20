import { Link } from "react-router-dom";
import { DiaryRecord } from "../../types/DiaryRecord";
import { CgMathPlus } from "react-icons/cg";
import { MealSummary } from "./MealSummary";
import { MealItem } from "./MealItem";
import { useAppSelector } from "../../hooks";

interface MealRecordsProps {
  records: DiaryRecord[];
  date: Date;
}

export const MealRecords = ({ records, date }: MealRecordsProps) => {
  const meals = useAppSelector((state) => state.meals);
  const renderedMeals = meals.map((m) => {
    const mealRecords = records.filter((r) => r.meal === m.id);
    return (
      <section key={m.id} className="relative bg-gray-200 mb-4">
        <p className="text-lg text-center">{m.name}</p>
        <Link to="/products"><CgMathPlus className="absolute right-4 top-2" /></Link>
        <MealSummary records={mealRecords} date={date} />
        <ul>
          {mealRecords.map((mr) => <MealItem key={mr.id} item={mr} />)}
        </ul>
      </section>
    );
  });

  return (
    <div>
      {renderedMeals}
    </div>
  );
};
