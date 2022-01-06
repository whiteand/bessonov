import { For, Show } from "solid-js";
import { Row } from "./Row";
import { TColumn, ICurrencyValue } from "./types";
import s from "./Table.module.scss";
import { ColumnsHeaders } from "./ColumnsHeaders";

interface ITableProps {
  title: string;
  titleId: string
  columns: TColumn[];
  data: (string | ICurrencyValue)[][];
}

export default function Table(props: ITableProps) {
  return (
    <div class={s.wrapper}>
      <Show when={props.title}>
        <h1 class={s.header}>{props.title}</h1>
      </Show>
      <div class={s.table}>
        <Show when={props.columns.some((column) => column.title)}>
          <ColumnsHeaders columns={props.columns} />
        </Show>
        <For each={props.data}>
          {(row, index) => (
            <Row columns={props.columns} data={row} index={index} />
          )}
        </For>
      </div>
    </div>
  );
}
