import Meal from "./Meal";

function Meals({ mealList }: {
  mealList: string[]
}) {
  const meals = mealList.map(meal => <Meal key={meal} name={meal} />);

  return (
    <div>
      {meals}
    </div>
  );
}

export default Meals;
