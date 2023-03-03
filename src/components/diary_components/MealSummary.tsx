import Summary from "../../types/Summary";

function MealSummary({ protein, fat, carbs, calories, rdi}: Summary) {
  const values = [protein, fat, carbs, calories / rdi, calories].map((value, idx) => {
    return value.toFixed(idx > 2 ? 0 : 2);
  });
  const elements = values.map(value => <li className="text-xs">{value}</li>);

  return (
    <ul className="flex justify-between mx-4">
      {elements}
    </ul>
  );
}

export default MealSummary;
