import { ICurrencyValue } from "../../types/Table";

export interface ICellProps {
  data: string | ICurrencyValue;
  type: "text" | "currency";
  align: "left" | "right" | "middle";
  columnHasPlus?: boolean
  columns: number;
}
