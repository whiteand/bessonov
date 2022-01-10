import { TColumn } from "./types";
import s from "./Table.module.scss";
import { getColumnWidth } from "./getColumnWidth";

export default function ColumnHeader(props: {
  column: TColumn;
  columnsLength: number;
}) {
  return (
    <div
      class={s.columnHeader}
      style={{
        "flex-grow": getColumnWidth(props.column, props.columnsLength),
      }}
      classList={{
        [s.right]: props.column.align === "right",
        [s.left]: props.column.align === "left",
      }}
    >
      {props.column.title}
    </div>
  );
}
