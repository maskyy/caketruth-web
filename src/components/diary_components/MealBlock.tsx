import { CgMathPlus } from "react-icons/cg";
import { Link } from "react-router-dom";
import { MealItem } from "./MealItem";
import { MealSummary } from "./MealSummary";
import { useAppSelector } from "../../hooks";

interface MealBlockProps {
  name: string;
}

export const MealBlock = ({ name }: MealBlockProps) => {
  const diary = useAppSelector((state) => state.diary);
  const renderedItems = diary.map((item, idx) => {
    return <MealItem key={item.id} item={item} />
  });

  return (
    <section className="relative bg-gray-200 mb-4">
      <p className="text-lg text-center">{name}</p>
      <Link to="/products"><CgMathPlus className="absolute right-4 top-2" /></Link>
      <MealSummary
        proteins={11.22}
        fats={12.34}
        carbs={34.56}
        calories={234}
        date=""
      />
      <ul>
        {renderedItems}
      </ul>
    </section>
  );
}
