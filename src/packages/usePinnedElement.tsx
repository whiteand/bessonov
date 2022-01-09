import createRAF from "@solid-primitives/raf";
import {
  Accessor,
  createRenderEffect,
  createSignal,
  onCleanup,
} from "solid-js";
import { getElementOffsetTop } from "./getElementOffsetTop";

export function usePinnedElement(
  element: Accessor<HTMLElement | null | undefined>
): [{ isPinned: Accessor<boolean> }] {
  let pinned: HTMLElement | null | undefined = null;
  const [originalY, setOriginalY] = createSignal(0);
  createRenderEffect(() => {
    let dom: HTMLElement | null | undefined = element();
    if (!dom) return;
    setOriginalY(getElementOffsetTop(dom));
  });
  const [isPinned, setIsPinned] = createSignal(false);

  const pin = () => {
    const pinned = element();
    if (!pinned) return;
    const scrollY = document.documentElement.scrollTop;
    const pinnedY = originalY();
    if (scrollY <= pinnedY) {
      if (isPinned()) {
        pinned.style.position = "relative";
        setIsPinned(false);
      }
    } else {
      if (!isPinned()) {
        pinned.style.position = "fixed";
        pinned.style.top = "0";
        setIsPinned(true);
      }
    }
  };
  const [_, start, stop] = createRAF(pin);

  createRenderEffect(() => {
    pinned = element();
    if (!pinned) return;
    start();
    onCleanup(() => stop());
  });

  return [{ isPinned }];
}
