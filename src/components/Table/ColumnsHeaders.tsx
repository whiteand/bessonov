import { For, JSX, Show } from "solid-js";
import { TColumn } from "./types";
import s from "./Table.module.scss";
import ColumnHeader from "./ColumnHeader";

interface ITableHeaderProps {
  columns: readonly TColumn[];
}
export function ColumnsHeaders(props: ITableHeaderProps): JSX.Element {
  return (
    <div class={s.columnHeaders}>
      <For each={props.columns}>
        {(column) => (
          <Show
            fallback={<div class={`${s.empty} ${s.columnHeader}`} />}
            when={column.title}
          >
            <ColumnHeader
              column={column}
              columnsLength={props.columns.length}
            />
          </Show>
        )}
      </For>
    </div>
  );
}
