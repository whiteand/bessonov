import { JSX, Match, Switch } from "solid-js";
import { ICurrencyValue } from "../../types/Table";
import s from "./Table.module.scss";
import { ICellProps } from "./ICellProps";
import { TextCell } from "./TextCell";
import { CurrencyCell } from "./CurrencyCell";

export function Cell(props: ICellProps): JSX.Element {
  return (
    <Switch
      fallback={
        <div
          class={`${s.cell} ${s.empty}`}
          classList={{
            [s.right]: props.align === "right",
            [s.left]: props.align === "left",
            [s.middle]: props.align === "middle",
          }}
        >
          —
        </div>
      }
    >
      <Match when={props.type === "text" && props.data != null}>
        <TextCell
          text={props.data as string}
          align={props.align}
          columns={props.columns}
        />
      </Match>
      <Match when={props.type === "currency" && props.data != null}>
        <CurrencyCell
          value={(props.data as ICurrencyValue).value}
          plus={(props.data as ICurrencyValue).plus}
          currency={(props.data as ICurrencyValue).currency}
          withTooltip={(props.data as ICurrencyValue).withTooltip}
          columns={props.columns}
          columnHasPlus={props.columnHasPlus}
          align={props.align}
        />
      </Match>
    </Switch>
  );
}
