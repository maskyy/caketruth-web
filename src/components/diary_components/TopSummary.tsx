import { FC } from "react";
import { Summary } from "../../types/Summary";
import { TopSummaryText } from "./TopSummaryText";

interface ITopSummaryProps {
  summary: Summary
};

export const TopSummary: FC<ITopSummaryProps> = (props) => {
  const { proteins, fats, carbs, calories, rdi } = props.summary;
  const titles = ["Белки", "Жиры", "Углеводы", "Осталось", "Калории"];
  const values = [
    proteins,
    fats,
    carbs,
    `${rdi - calories} (${Math.round(calories / rdi * 100)}%)`,
    calories
  ].map(value => typeof value === "string" ? value : value.toString());

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
