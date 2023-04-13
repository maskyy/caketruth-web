import { Link } from "react-router-dom";
import { DiaryRecord } from "../../types/DiaryRecord";

interface MealItemProps {
  item: DiaryRecord;
}

export const MealItem = ({ item }: MealItemProps) => {
  const macros = [item.proteins, item.fats, item.carbs, item.calories];
  const renderedMacros = macros.map((macro, idx) => {
    return <li key={idx}>{macro}</li>
  });

  return (
    <li className="border-b border-white">
      <Link to={`/diary/${item.id}/edit`}>
        <div className="flex justify-between mx-4">
          <p>{item.name}<br />{item.mass} г</p>
        </div>
        <ul className="flex justify-between mx-4 text-xs">
          {renderedMacros}
        </ul>
      </Link>
    </li>
  );
}
