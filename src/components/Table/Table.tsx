import { createMemo, For, onMount, Show } from "solid-js";
import { ColumnsHeaders } from "./ColumnsHeaders";
import { ITable } from "../../types/Table";
import { Row } from "./Row";
import s from "./Table.module.scss";

interface ITableProps
  extends Pick<ITable, "title" | "titleId" | "columns" | "data"> {
  ref?: HTMLDivElement | ((element: HTMLDivElement) => void);
}

export default function Table(props: ITableProps) {
  const someColumnHasTitle = createMemo(() =>
    props.columns.some((column) => column.title)
  );

  onMount(() => {
    const h = window.location.hash;
    if (!h) return;
  });

  const columnHasPlus = createMemo(() => {
    return props.columns.map(
      (column, ind) =>
        column.type === "currency" &&
        props.data.some((row) => {
          const d = row[ind];
          if (typeof d === "string") return false;
          return d.plus || false;
        })
    );
  });

  return (
    <div ref={props.ref} class={s.wrapper}>
      <Show when={props.title}>
        <h3 class={s.header} id={props.titleId}>
          {props.title}
        </h3>
      </Show>
      <div class={s.table}>
        <Show when={someColumnHasTitle()}>
          <ColumnsHeaders columns={props.columns} />
        </Show>
        <For each={props.data}>
          {(row, index) => (
            <Row
              columnHasPlus={columnHasPlus()}
              columns={props.columns}
              data={row}
              index={index}
            />
          )}
        </For>
      </div>
    </div>
  );
}
