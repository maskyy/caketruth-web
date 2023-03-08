import { CgMathPlus } from "react-icons/cg";
import { mealItems } from "../../testData";
import { DiaryRecord } from "../../types/DiaryRecord";
import { MealItem } from "./MealItem";
import { MealSummary } from "./MealSummary";

export function Meal({ name }: {
  name: string
}) {
  const renderedItems = mealItems.map((item, idx) => {
    return <MealItem key={item.id} item={item} rdi={2200} />
  });

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
