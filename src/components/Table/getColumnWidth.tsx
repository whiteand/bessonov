import { TColumn } from "./types";

export function getColumnWidth(column: TColumn, columnsAmount: number): number {
  if (column.type === "currency") {
    return 1;
  }
  if (columnsAmount > 2) {
    return 2;
  }
  return 3;
}
