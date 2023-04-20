import { DiaryRecord } from "../../types/DiaryRecord";
import { calculateSummary } from "../../util/util";

interface MealSummaryProps {
  records: DiaryRecord[];
  date: Date;
}

export function MealSummary({ records, date }: MealSummaryProps) {
  const { proteins, fats, carbs, calories } = calculateSummary(records, date);
  const values = [proteins, fats, carbs, calories].map((value) => {
    return value.toFixed(2);
  });
  const elements = values.map((value, idx) => <li className="text-xs" key={idx}>{value}</li>);

  return (
    <ul className="flex justify-between mx-4">
      {elements}
    </ul>
  );
}
