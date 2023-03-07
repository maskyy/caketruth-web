import { Meal } from "./Meal";

export function Meals({ mealList }: {
  mealList: string[]
}) {
  const meals = mealList.map(meal => <Meal key={meal} name={meal} />);

  return (
    <div>
      {meals}
    </div>
  );
}
