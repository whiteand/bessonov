import { TColumn } from "./types";
import s from "./Table.module.scss";

export default function ColumnHeader(props: { column: TColumn }) {
  return (
    <div
      class={s.columnHeader}
      classList={{
        [s.right]: props.column.align === "right",
        [s.left]: props.column.align === "left",
      }}
    >
      {props.column.title}
    </div>
  );
}
