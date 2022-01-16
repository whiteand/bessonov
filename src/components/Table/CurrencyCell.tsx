import { Show } from "solid-js";
import { ICurrencyValue, TCurrency } from "../../types/Table";
import s from "./Table.module.scss";
import { Plus } from "./Plus";

const CURRENCY_LABEL: Record<TCurrency, string> = {
  UAH: "₴",
};

export function CurrencyCell(
  props: ICurrencyValue & {
    align: "left" | "right" | "middle";
    columns: number;
    columnHasPlus?: boolean;
  }
) {
  return (
    <div
      class={`${s.cell} ${s.currency}`}
      style={{
        "flex-grow": props.columns,
      }}
      classList={{
        [s.left]: props.align === "left",
        [s.right]: props.align === "right",
        [s.middle]: props.align === "middle",
        [s.padAbsentPlus]: !props.plus && props.columnHasPlus,
      }}
    >
      <div>
        <span class={s.value}>{props.value}</span>
        <span class={s.currency}>{CURRENCY_LABEL[props.currency]}</span>
      </div>
      <Show when={props.plus}>
        <Plus />
      </Show>
    </div>
  );
}
