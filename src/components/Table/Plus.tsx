import { createEffect, createSignal, JSX, onCleanup, Show } from "solid-js";
import s from "./Table.module.scss";
import ContactButtonLink from "../ContactButtonLink/ContactButtonLink";
import triangle from "./triangle.svg";
import circle from "./circle.svg";
import { createIsMobile } from "../../packages/createIsMobile";
import { getZIndex } from "../../utils/getZIndex";

export function Plus(): JSX.Element {
  const isMobile = createIsMobile();
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
    <Show when={isMobile()} fallback={<>+</>}>
      <button
        type="button"
        class={s.plus}
        classList={{
          [s.popoverVisible]: visible(),
        }}
        onClick={[setVisible, true]}
      >
        +
        <div class={s.popover} style={{ "z-index": getZIndex("popover") }}>
          <div class={s.text}>Со значком «+» указана минимальная стоимость</div>
          <ContactButtonLink preset="small">
            Узнать точную цену
          </ContactButtonLink>
          <img width="20" class={s.triangle} src={triangle} />
          <img class={s.circle} src={circle} />
        </div>
      </button>
    </Show>
  );
}
