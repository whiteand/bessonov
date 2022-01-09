import { Modifier } from "@popperjs/core";
import preventOverflow from "@popperjs/core/lib/modifiers/preventOverflow.js";
import {
  createEffect,
  createRenderEffect,
  createSignal,
  JSX,
  onCleanup,
  Show,
} from "solid-js";
import usePopper from "solid-popper";
import { createIsMobile } from "../../packages/createIsMobile";
import { isClickOutside } from "../../packages/isClickOutside";
import ContactButtonLink from "../ContactButtonLink/ContactButtonLink";
import circle from "./circle.svg";
import s from "./Table.module.scss";
import triangle from "./triangle.svg";

export function Plus(): JSX.Element {
  const isMobile = createIsMobile();

  return (
    <Show when={isMobile()} fallback={<>+</>}>
      <PlusWithButton />
    </Show>
  );
}
const hideOnNotTop = (hide: () => void): Modifier<"hideOnNotTop", unknown> => ({
  name: "hideOnNotTop",
  enabled: true,
  phase: "main",
  fn(params) {
    if (params.state.placement.indexOf("top") < 0) {
      hide();
    }
  },
});

function PlusWithButton() {
  const [anchor, setAnchor] = createSignal<HTMLElement>();
  const [popper, setPopper] = createSignal<HTMLElement>();
  const [visible, setVisible] = createSignal(false);

  const hide = () => setVisible(false);

  const res = usePopper(anchor, popper, {
    placement: "top-start",
    strategy: "absolute",
    modifiers: [
      hideOnNotTop(hide),
      preventOverflow,
      {
        name: "offset",
        options: {
          offset: [0, 23],
        },
      },
    ],
  });

  createEffect(() => {
    if (!visible()) return;
    const popper = res();
    if (!popper) return;
    if (popper.state.placement.indexOf("top") !== 0 && visible()) {
      setVisible(false);
    }
  });

  createEffect(() => {
    visible();
    res()?.forceUpdate()
    const t = setTimeout(() => res()?.forceUpdate(), 0);
    onCleanup(() => clearTimeout(t))
  });

  createEffect(() => {
    if (!visible()) return;
    const d = popper();
    if (!d) return;
    const handle = (e: MouseEvent) => {
      if (isClickOutside(e, d)) {
        setVisible(false);
      }
    };
    document.body.addEventListener("click", handle);
    onCleanup(() => document.body.removeEventListener("click", handle));
  });

  return (
    <>
      <button
        ref={setAnchor}
        type="button"
        class={s.plus}
        onClick={() => setVisible((visible) => !visible)}
      >
        +
      </button>
      <div ref={setPopper} class={s.popover} data-show={visible()}>
        <div class={s.text}>Со значком «+» указана минимальная стоимость</div>
        <ContactButtonLink preset="small">Узнать точную цену</ContactButtonLink>
        <div data-popper-arrow>
          <img width="20" class={s.triangle} src={triangle} data-popper-arrow />
          <img class={s.circle} src={circle} />
        </div>
      </div>
    </>
  );
}
