import { Summary } from "../../types/Summary";

export function MealSummary({ proteins, fats, carbs, calories }: Summary) {
  const values = [proteins, fats, carbs, calories].map((value, idx) => {
    return value.toFixed(2);
  });
  const elements = values.map((value, idx) => <li className="text-xs" key={idx}>{value}</li>);

  return (
    <ul className="flex justify-between mx-4">
      {elements}
    </ul>
  );
}
