import { DiaryRecord } from "../../types/DiaryRecord";
import { calculateSummary } from "../../util/util";

interface SummaryProps {
  records: DiaryRecord[];
  date: Date;
}

export const DaySummary = ({ records, date }: SummaryProps) => {
  const { proteins, fats, carbs, calories } = calculateSummary(records, date);
  const titles = ["Белки", "Жиры", "Углеводы", "Калории"];
  const values = [
    proteins,
    fats,
    carbs,
    calories,
  ].map(value => value.toFixed(2));

  const renderedElements = values.map((value, idx) => (
    <li key={titles[idx]} className="flex flex-col text-xs">
      <p>{titles[idx]}</p>
      <p><strong>{value}</strong></p>
    </li>
  ));

  return (
    <div className="bg-gray-50 mx-2">
      <ul className="flex justify-between">
        {renderedElements}
      </ul>
    </div>
  );
}
