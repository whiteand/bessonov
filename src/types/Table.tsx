interface ITextColumn {
  type: "text";
  align: "left" | "right";
  title?: string;
}
interface ICurrencyColumn {
  type: "currency";
  align: "left" | "right";
  title?: string;
}
export type TColumn = Readonly<ITextColumn> | Readonly<ICurrencyColumn>;
export type TData = (string | ICurrencyValue)[];
export type TCurrency = "UAH";
export interface ICurrencyValue {
  readonly currency: TCurrency;
  readonly plus?: boolean;
  readonly value: number;
}

export interface ITable {
  title: string;
  titleId: string;
  contactButtonText: string
  columns: readonly TColumn[];
  data: readonly (readonly (string | ICurrencyValue)[])[];
}
