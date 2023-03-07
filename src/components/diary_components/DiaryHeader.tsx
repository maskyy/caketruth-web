import { FC, useState } from "react";
import DatePicker from "react-date-picker";
import { Header } from "../header/Header";

export const DiaryHeader: FC = () => {
  const [date, setDate] = useState(new Date());

  const onDateChange = (value: Date) => {
    console.log(value);
    setDate(value);
  }
  return (
    <Header>
      <DatePicker
        className="self-end"
        onChange={onDateChange}
        value={date}
        format="dd.MM.y"
        locale="ru-RU"
      />
    </Header>
  );
}
