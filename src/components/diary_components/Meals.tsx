import { Meal } from "../../types/Meal";
import { MealBlock } from "./MealBlock";

interface MealBlockListProps {
  mealList: Meal[];
}

export const MealBlockList = ({ mealList }: MealBlockListProps) => {
  const meals = mealList.map(meal => <MealBlock key={meal.id} name={meal.name} />);

  return (
    <div>
      {meals}
    </div>
  );
}
