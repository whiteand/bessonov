import {
  Accessor,
  createEffect,
  createMemo,
  createRenderEffect,
  createSignal,
  onCleanup,
} from "solid-js";
import { getElementOffsetTop } from "./getElementOffsetTop";

export function usePinnedElement(
  getPinElement: Accessor<HTMLElement | null | undefined>
): [{ isPinned: Accessor<boolean> }] {
  const [getPinnedElementOffsetY, setPinnedElementOffsetY] = createSignal(0);

  createRenderEffect(() => {
    let dom: HTMLElement | null | undefined = getPinElement();
    if (!dom) return;
    setPinnedElementOffsetY(getElementOffsetTop(dom));
  });

  const [getIsPinned, setIsPinned] = createSignal(false);

  const getScrollListener = createMemo(() => {
    const offsetY = getPinnedElementOffsetY();
    const pinElement = getPinElement();

    if (!pinElement) return null;

    if (getIsPinned()) {
      return () => {
        if (document.documentElement.scrollTop > offsetY) return;
        setIsPinned(false);
      };
    } else {
      return () => {
        if (document.documentElement.scrollTop <= offsetY) return;
        setIsPinned(true);
      };
    }
  });

  createEffect(() => {
    const scrollListener = getScrollListener();
    if (!scrollListener) return;
    function handler() {
      if (scrollListener) {
        scrollListener();
      }
    }
    onCleanup(() => {
      document.removeEventListener("scroll", handler);
    });
    document.addEventListener("scroll", handler);
  });

  return [{ isPinned: getIsPinned }];
}
