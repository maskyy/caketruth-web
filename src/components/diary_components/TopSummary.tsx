import { Summary } from "../../types/Summary";
import { TopSummaryText } from "./TopSummaryText";

interface ITopSummaryProps {
  summary: Summary;
}

export const TopSummary = ({ summary }: ITopSummaryProps) => {
  const { proteins, fats, carbs, calories } = summary;
  const titles = ["Белки", "Жиры", "Углеводы", "Калории"];
  const values = [
    proteins,
    fats,
    carbs,
    calories,
  ].map(value => value.toString());

  const renderedElements = values.map((value, idx) => {
    return <TopSummaryText key={titles[idx]} title={titles[idx]} text={value} />
  })
  return (
    <div className="bg-gray-50 mx-2">
      <ul className="flex justify-between">
        {renderedElements}
      </ul>
    </div>
  );
}
