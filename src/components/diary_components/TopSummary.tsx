import Summary from "../../types/Summary";
import TopSummaryText from "./TopSummaryText";

function TopSummary({ protein, fat, carbs, calories, rdi }: Summary) {
  const titles = ["Белки", "Жиры", "Углеводы", "Осталось", "Калории"];
  const values = [
    protein,
    fat,
    carbs,
    `${rdi - calories} (${Math.round(calories / rdi * 100)}%)`,
    calories
  ].map(value => typeof value === "string" ? value : value.toString());

  const renderedElements = values.map((value, idx) => {
    return <TopSummaryText title={titles[idx]} text={value} />
  })
  return (
    <div className="bg-gray-50 mx-2">
      <ul className="flex justify-between">
        {renderedElements}
      </ul>
    </div>
  );
}

export default TopSummary;
