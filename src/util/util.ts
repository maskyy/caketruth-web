import { AuthStatus } from "../types/AuthStatus";
import { DiaryRecord } from "../types/DiaryRecord";
import { Summary } from "../types/Summary";
import { User } from "../types/User";

export const getAuthStatus = ({ role }: User) => {
  switch (role.name) {
    case "user":
      return AuthStatus.User;
    case "moderator":
      return AuthStatus.Moderator;
    case "admin":
      return AuthStatus.Admin;
  }
};

export const calculateSummary = (records: DiaryRecord[], date: Date): Summary => {
  let result: Summary = {
    proteins: 0,
    fats: 0,
    carbs: 0,
    calories: 0,
    date: date.toISOString().slice(0, 10),
  };

  records.forEach((r) => {
    result.proteins += r.calc_proteins;
    result.fats += r.calc_fats;
    result.carbs += r.calc_carbs;
    result.calories += r.calc_calories;
  });

  return result;
};
