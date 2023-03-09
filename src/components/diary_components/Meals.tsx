import { Meal } from "../../types/Meal";
import { MealBlock } from "./MealBlock";

export function Meals({ mealList }: {
  mealList: Meal[]
}) {
  const meals = mealList.map(meal => <MealBlock key={meal.id} name={meal.name} />);

  return (
    <div>
      {meals}
    </div>
  );
}
