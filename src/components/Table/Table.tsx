import { createEffect, createMemo, For, onMount, Show } from "solid-js";
import { Row } from "./Row";
import { TColumn, ICurrencyValue } from "./types";
import s from "./Table.module.scss";
import { ColumnsHeaders } from "./ColumnsHeaders";

interface ITableProps {
  title: string;
  titleId: string;
  columns: readonly TColumn[];
  data: readonly (readonly (string | ICurrencyValue)[])[];
}

export default function Table(props: ITableProps) {
  const someColumnHasTitle = createMemo(() =>
    props.columns.some((column) => column.title)
  );

  onMount(() => {
    const h = window.location.hash
    if (!h) return
  })

  return (
    <div class={s.wrapper}>
      <Show when={props.title}>
        <h1 class={s.header} id={props.titleId}>
          {props.title}
        </h1>
      </Show>
      <div class={s.table}>
        <Show when={someColumnHasTitle()}>
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
