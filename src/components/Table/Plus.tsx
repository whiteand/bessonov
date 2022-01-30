import { createEffect, createSignal, JSX, onCleanup, Show } from "solid-js";
import { createIsMobile } from "../../packages/createIsMobile";
import circle from "./circle.svg";
import s from "./Table.module.scss";
import triangle from "./triangle.svg";

export function Plus(props: { withTooltip?: boolean }): JSX.Element {
  const isMobile = createIsMobile();

  return (
    <Show when={isMobile() && props.withTooltip} fallback={<>+</>}>
      <PlusWithButton />
    </Show>
  );
}

function PlusWithButton() {
  const [visible, setVisible] = createSignal(true);

  createEffect(() => {
    if (!visible()) return;
    const listener = () => setVisible(false);
    window.addEventListener("scroll", listener);
    onCleanup(() => {
      window.removeEventListener("scroll", listener);
    });
    document.body.addEventListener("click", listener);
    onCleanup(() => {
      document.body.removeEventListener("click", listener);
    });
  });

  return (
    <>
      <button
        type="button"
        class={s.plus}
        onClick={() => setVisible((visible) => !visible)}
      >
        +
        <img class={s.circle} src={circle} />
        <Show when={visible()}>
          <div class={s.popover}>
            <div class={s.text}>
              Со значком «+» указана минимальная стоимость
            </div>
            <div data-popper-arrow>
              <img
                width="20"
                class={s.triangle}
                src={triangle}
                data-popper-arrow
              />
            </div>
          </div>
        </Show>
      </button>
    </>
  );
}
