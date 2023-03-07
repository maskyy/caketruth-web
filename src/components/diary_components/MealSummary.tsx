import { Summary } from "../../types/Summary";

export function MealSummary({ protein, fat, carbs, calories, rdi }: Summary) {
  const values = [protein, fat, carbs, calories / rdi, calories].map((value, idx) => {
    return value.toFixed(idx > 2 ? 0 : 2);
  });
  const elements = values.map((value, idx) => <li className="text-xs" key={idx}>{value}</li>);

  return (
    <ul className="flex justify-between mx-4">
      {elements}
    </ul>
  );
}
