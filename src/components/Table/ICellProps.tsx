import { ICurrencyValue } from "./types";

export interface ICellProps {
  data: string | ICurrencyValue;
  type: "text" | "currency";
  align: "left" | "right" | "middle";
  columns: number;
}
