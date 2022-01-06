import { createEffect, createSignal, JSX, onCleanup, Show } from "solid-js";
import { ICurrencyValue, TCurrency } from "./types";
import s from "./Table.module.scss";
import ContactButtonLink from "../ContactButtonLink/ContactButtonLink";
import triangle from "./triangle.svg";
import circle from "./circle.svg";

function Plus(): JSX.Element {
  const [visible, setVisible] = createSignal(false);
  createEffect(() => {
    if (!visible()) return;
    function handler() {
      setVisible(false);
    }
    window.addEventListener("click", handler);
    onCleanup(() => {
      window.removeEventListener("click", handler);
    });
  });
  return (
    <button
      type="button"
      class={s.plus}
      classList={{
        [s.popoverVisible]: visible(),
      }}
      onClick={[setVisible, true]}
    >
      +
      <div class={s.popover}>
        <div class={s.text}>Со значком «+» указана минимальная стоимость</div>
        <ContactButtonLink preset="small">Узнать точную цену</ContactButtonLink>
        <img width="20" class={s.triangle} src={triangle} />
        <img class={s.circle} src={circle} />
      </div>
    </button>
  );
}

const CURRENCY_LABEL: Record<TCurrency, string> = {
  UAH: "₴",
};

export function CurrencyCell(
  props: ICurrencyValue & {
    align: "left" | "right" | "middle";
    columns: number;
  }
) {
  return (
    <div
      class={s.cell}
      style={{
        "flex-grow": props.columns,
      }}
      classList={{
        [s.left]: props.align === "left",
        [s.right]: props.align === "right",
        [s.middle]: props.align === "middle",
      }}
    >
      {props.value} {CURRENCY_LABEL[props.currency]}{" "}
      <Show when={props.plus}>
        <Plus />
      </Show>
    </div>
  );
}
