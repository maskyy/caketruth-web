import { useState } from "react";
import DatePicker from "react-date-picker";
import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from "recharts";
import { Header } from "../../header/Header";
import { PageLayout } from "../../layouts/PageLayout";
import { useAppSelector } from "../../../hooks";
import { calculateSummary } from "../../../util/util";
import { Summary } from "../../../types/Summary";

const dateRange = (start: Date, end: Date): string[] => {
  const result = [];
  let cur = new Date(start.getTime());
  while (cur <= end) {
    result.push(cur.toISOString().slice(0, 10));
    cur.setDate(cur.getDate() + 1);
  }
  return result;
};

export const Reports = () => {

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const diary = useAppSelector((state) => state.diary);
  const days = dateRange(startDate, endDate);
  console.log(days);

  const filteredRecords = days.map((day) => diary.filter((r) => {
    return r.added_date.startsWith(day);
  }));
  const summaries: Summary[] = days.map((day, idx) => {
    const s = calculateSummary(filteredRecords[idx], day);
    return {
      proteins: +s.proteins.toFixed(2),
      fats: +s.fats.toFixed(2),
      carbs: +s.carbs.toFixed(2),
      calories: +s.calories.toFixed(2),
      date: day
    };
  });

  return (
    <PageLayout
      title="Отчёты"
      header={
        <Header>
          <h1 className="self-end">Отчёты</h1>
        </Header>
      } footer>
      <section className="flex flex-col gap-2">
        <div className="flex justify-between mx-4">
          <p>Начальная дата</p>
          <DatePicker
            className="self-end"
            onChange={setStartDate}
            value={startDate}
            format="dd.MM.y"
            locale="ru-RU"
            clearIcon={null}
            required
          />
        </div>
        <div className="flex justify-between mx-4">
          <p>Конечная дата</p>
          <DatePicker
            className="self-end"
            onChange={setEndDate}
            value={endDate}
            format="dd.MM.y"
            locale="ru-RU"
            clearIcon={null}
            required
          />
        </div>
      </section>
      <BarChart
        width={320}
        height={200}
        data={summaries}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="proteins" fill="#aa0000" name="Белки" />
        <Bar dataKey="fats" fill="#aaaa00" name="Жиры "/>
        <Bar dataKey="carbs" fill="#cc8888" name="Углеводы "/>
        <Bar dataKey="calories" fill="#00aa00" name="Калории" />
      </BarChart>
    </PageLayout>
  );
}
