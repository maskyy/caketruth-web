import { useEffect, useReducer } from "react";
import DatePicker from "react-date-picker";
import { Bar, BarChart, Cell, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Header } from "../../header/Header";
import { PageLayout } from "../../layouts/PageLayout";

import { Summary } from "../../../types/Summary";
import { reportsData } from "../../../testData";

interface IReportDataState {
  start: Date,
  end: Date,
  data: Summary[]
};

enum ReportDataActions {
  INIT_DATA,
  SET_START_DATE,
  SET_END_DATE,
};

interface ReportDataAction {
  type: ReportDataActions,
  date?: Date
};

const collectData = (state: IReportDataState) => {
  const start = state.start.getDate();
  const end = state.end.getDate();

  const reports = reportsData.filter(r => {
    const date = new Date(r.date).getDate();
    console.log(start, date);
    return start <= date && date <= end;
  });

  return reports;
};

const reportDataReducer = (state: IReportDataState, action: ReportDataAction): IReportDataState => {
  const newState = state;
  switch (action.type) {
    case ReportDataActions.INIT_DATA:
      break;
    case ReportDataActions.SET_START_DATE:
      newState.start = action.date!;
      break;
    case ReportDataActions.SET_END_DATE:
      newState.end = action.date!;
      break;
    default:
      return state;
  }
  newState.data = collectData(newState);
  return { ...newState };
}

export const Reports = () => {
  const [state, dispatch] = useReducer(reportDataReducer, {
    start: new Date(),
    end: new Date(),
    data: []
  });
  useEffect(() => {
    dispatch({ type: ReportDataActions.INIT_DATA });
  },
    //eslint-disable-next-line
    []);

  const onStartDateChange = (value: Date) => {
    console.log("start" + value);
    dispatch({
      type: ReportDataActions.SET_START_DATE,
      date: value
    });
  };

  const onEndDateChange = (value: Date) => {
    console.log("end" + value);
    dispatch({
      type: ReportDataActions.SET_END_DATE,
      date: value
    });
  };

  return (
    <PageLayout
      title="Продукты"
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
            onChange={onStartDateChange}
            value={state.start}
            format="dd.MM.y"
            locale="ru-RU"
          />
        </div>
        <div className="flex justify-between mx-4">
          <p>Конечная дата</p>
          <DatePicker
            className="self-end"
            onChange={onEndDateChange}
            value={state.end}
            format="dd.MM.y"
            locale="ru-RU"
          />
        </div>
      </section>
        <BarChart
          width={320}
          height={200}
          data={state.data}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="proteins" color="#ff0000" />
          <Bar dataKey="fats" color="#00ff00" />
          <Bar dataKey="carbs" color="#0000ff" />
          <Bar dataKey="calories" color="#00ffff" />
          <Bar dataKey="rdi" color="#ffff00" />
        </BarChart>
    </PageLayout>
  );
}
