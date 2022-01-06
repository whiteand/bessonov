import { JSX } from "solid-js";
import s from "./Table.module.scss";

export function TextCell(props: {
  text: string;
  align?: "left" | "right" | "middle";
  columns: number;
}): JSX.Element {
  return (
    <div
      class={s.cell}
      style={{
        "flex-grow": props.columns,
      }}
      classList={{
        [s.left]: props.align === "left",
        [s.right]: props.align === "right",
      }}
    >
      {props.text}
    </div>
  );
}
