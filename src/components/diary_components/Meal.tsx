import { CgMathPlus } from "react-icons/cg";
import DiaryRecord from "../../types/DiaryRecord";
import MealItem from "./MealItem";
import MealSummary from "./MealSummary";

function Meal({ name }: {
  name: string
}) {
  const mealItems: DiaryRecord[] = [
    {
      name: "Вкусвилл Творог 5%",
      mass: 81,
      calories: 95,
      proteins: 13.36,
      fats: 4.05,
      carbs: 1.22,
    },
    {
      name: "Магнит Айва",
      mass: 249,
      calories: 120,
      proteins: 1.49,
      fats: 1.25,
      carbs: 23.9,
    },
    {
      name: "Магнит Айва",
      mass: 249,
      calories: 120,
      proteins: 1.49,
      fats: 1.25,
      carbs: 23.9,
    },
    {
      name: "Магнит Айва",
      mass: 249,
      calories: 120,
      proteins: 1.49,
      fats: 1.25,
      carbs: 23.9,
    },
    {
      name: "Магнит Айва",
      mass: 249,
      calories: 120,
      proteins: 1.49,
      fats: 1.25,
      carbs: 23.9,
    },
  ];

  const renderedItems = mealItems.map(item => <MealItem item={item} rdi={2200} />);

  return (
    <section className="relative bg-gray-200 mb-4">
      <p className="text-lg text-center">{name}</p>
      <CgMathPlus className="absolute right-4 top-2" />
      <MealSummary
        protein={11.22}
        fat={12.34}
        carbs={34.56}
        calories={234}
        rdi={2200}
      />
      <ul>
        {renderedItems}
      </ul>
    </section>
  );
}

export default Meal;
