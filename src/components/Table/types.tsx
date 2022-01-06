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
  currency: TCurrency;
  plus?: boolean;
  value: number;
}
