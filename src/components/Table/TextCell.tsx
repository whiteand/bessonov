import { createMemo, For, JSX, Match, Switch } from "solid-js";
import s from "./Table.module.scss";

interface ITextPart {
  type: "text" | "sup";
  text: string;
}

export function TextCell(props: {
  text: string;
  align?: "left" | "right" | "middle";
  columns: number;
}): JSX.Element {
  const textParts = createMemo((): ITextPart[] => {
    const text = props.text;
    if (text.indexOf("^") < 0) return [{ type: "text", text }];

    const parts: ITextPart[] = [];
    let mode: "text" | "sup" = "text";
    for (let i = 0; i < text.length; i++) {
      const ch = text[i];
      if (ch === "^") {
        mode = "sup";
        continue;
      }
      if (parts.length <= 0) {
        parts.push({
          type: mode,
          text: ch,
        });
        continue;
      }
      const last = parts[parts.length - 1];
      if (last.type === mode) {
        last.text += ch;
        continue;
      }
      parts.push({
        type: mode,
        text: ch,
      });
    }
    return parts;
  });
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
      <For each={textParts()}>
        {(part) => (
          <Switch fallback={<>{part.text}</>}>
            <Match when={part.type === "sup"}>
              <sup>{part.text}</sup>
            </Match>
          </Switch>
        )}
      </For>
    </div>
  );
}
