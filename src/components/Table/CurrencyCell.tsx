import { Show } from "solid-js";
import { ICurrencyValue, TCurrency } from "./types";
import s from "./Table.module.scss";
import { Plus } from "./Plus";

const CURRENCY_LABEL: Record<TCurrency, string> = {
  UAH: "₴",
};

export function CurrencyCell(
  props: ICurrencyValue & {
    align: "left" | "right" | "middle";
    columns: number;
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
      }}
    >
      <div>
        {props.value}
        {CURRENCY_LABEL[props.currency]}
      </div>
      <Show when={props.plus}>
        <Plus />
      </Show>
    </div>
  );
}
