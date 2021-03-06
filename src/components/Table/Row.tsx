import { Accessor, createMemo, For, JSX } from "solid-js";
import { createIsMobile } from "../../packages/createIsMobile";
import { Cell } from "./Cell";
import { getColumnWidth } from "./getColumnWidth";
import { ICellProps } from "./ICellProps";
import s from "./Table.module.scss";
import { ICurrencyValue, TColumn } from "../../types/Table";

interface IRowProps {
  columns: readonly TColumn[];
  columnHasPlus: readonly boolean[];
  data: readonly (string | ICurrencyValue)[];
  index: Accessor<number>;
}

function equalData(
  first: string | ICurrencyValue | null,
  second: string | ICurrencyValue | null
) {
  if (first == null || second == null) return false;
  if (typeof first === "string" && typeof second === "string") {
    return first === second;
  }
  if (typeof first === "string" || typeof second === "string") {
    return false;
  }
  return (
    first.currency === second.currency &&
    (first.plus || false) === (second.plus || false) &&
    first.value === second.value
  );
}

function mergeSameCells(cells: ICellProps[]) {
  let i = cells.length - 1;
  while (i >= 1) {
    const cell = cells[i];
    const prevCell = cells[i - 1];
    if (equalData(cell.data, prevCell.data)) {
      cells.splice(i, 1);
      cells[i - 1].align = "middle";
      cells[i - 1].columns = cell.columns + prevCell.columns;
    }
    i--;
  }
}

export function Row(props: IRowProps): JSX.Element {
  const cells = createMemo(() => {
    const columns = props.columns;
    const data = props.data;
    const res = columns.map(
      (column, ind): ICellProps => ({
        align: column.align,
        columns: getColumnWidth(column, columns.length),
        data: data[ind],
        type: column.type,
        columnHasPlus: props.columnHasPlus[ind],
      })
    );
    mergeSameCells(res);
    return res;
  });

  return (
    <div class={s.row}>
      <For each={cells()}>{(cell) => <Cell {...cell} />}</For>
    </div>
  );
}
