import { Category } from "./Category";

export interface Entry {
  key: string;
  title: string;
  suffix?: string;
  categories?: Category[];
  mass?: boolean;
}
